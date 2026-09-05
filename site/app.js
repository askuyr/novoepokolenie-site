(function (root) {
  'use strict';

  const encoder = new TextEncoder();
  const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  const xmlEscape = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const normalizeLine = value => String(value ?? '').trim().replace(/[\t ]+/g, ' ');
  const normalizeMultiline = value => String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(line => line.trim().replace(/[\t ]+/g, ' '))
    .filter(Boolean);

  const bytes = value => {
    if (value instanceof Uint8Array) return value;
    if (value instanceof ArrayBuffer) return new Uint8Array(value);
    return encoder.encode(String(value));
  };

  const concatBytes = parts => {
    const arrays = parts.map(bytes);
    const length = arrays.reduce((sum, item) => sum + item.length, 0);
    const output = new Uint8Array(length);
    let offset = 0;
    arrays.forEach(item => {
      output.set(item, offset);
      offset += item.length;
    });
    return output;
  };

  const le16 = value => new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
  const le32 = value => new Uint8Array([
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff
  ]);

  let crcTable;
  const getCrcTable = () => {
    if (crcTable) return crcTable;
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      crcTable[n] = c >>> 0;
    }
    return crcTable;
  };

  const crc32 = data => {
    const table = getCrcTable();
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i += 1) crc = table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  };

  const dosDateTime = date => {
    const year = Math.max(1980, date.getFullYear());
    const time = ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | ((Math.floor(date.getSeconds() / 2)) & 0x1f);
    const day = ((year - 1980) << 9) | (((date.getMonth() + 1) & 0xf) << 5) | (date.getDate() & 0x1f);
    return { time, day };
  };

  const buildStoredZip = entries => {
    const localParts = [];
    const centralParts = [];
    let localOffset = 0;
    const now = dosDateTime(new Date());

    entries.forEach(entry => {
      const name = encoder.encode(entry.name);
      const data = bytes(entry.data);
      const crc = crc32(data);
      const local = concatBytes([
        le32(0x04034b50), le16(20), le16(0x0800), le16(0), le16(now.time), le16(now.day),
        le32(crc), le32(data.length), le32(data.length), le16(name.length), le16(0), name, data
      ]);
      localParts.push(local);

      const central = concatBytes([
        le32(0x02014b50), le16(20), le16(20), le16(0x0800), le16(0), le16(now.time), le16(now.day),
        le32(crc), le32(data.length), le32(data.length), le16(name.length), le16(0), le16(0), le16(0), le16(0),
        le32(0), le32(localOffset), name
      ]);
      centralParts.push(central);
      localOffset += local.length;
    });

    const localData = concatBytes(localParts);
    const centralData = concatBytes(centralParts);
    const end = concatBytes([
      le32(0x06054b50), le16(0), le16(0), le16(entries.length), le16(entries.length),
      le32(centralData.length), le32(localData.length), le16(0)
    ]);
    return concatBytes([localData, centralData, end]);
  };

  const run = (text, options = {}) => {
    const props = [
      options.bold ? '<w:b/>' : '',
      options.italic ? '<w:i/>' : '',
      options.color ? `<w:color w:val="${options.color}"/>` : '',
      options.size ? `<w:sz w:val="${options.size}"/><w:szCs w:val="${options.size}"/>` : '',
      options.font ? `<w:rFonts w:ascii="${options.font}" w:hAnsi="${options.font}" w:eastAsia="${options.font}" w:cs="${options.font}"/>` : ''
    ].join('');
    return `<w:r>${props ? `<w:rPr>${props}</w:rPr>` : ''}<w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r>`;
  };

  const paragraph = (content, options = {}) => {
    const properties = [
      options.style ? `<w:pStyle w:val="${options.style}"/>` : '',
      options.align ? `<w:jc w:val="${options.align}"/>` : '',
      options.before || options.after || options.line ? `<w:spacing${options.before ? ` w:before="${options.before}"` : ''}${options.after ? ` w:after="${options.after}"` : ''}${options.line ? ` w:line="${options.line}" w:lineRule="auto"` : ''}/>` : '',
      options.keepNext ? '<w:keepNext/>' : '',
      options.topBorder ? `<w:pBdr><w:top w:val="single" w:sz="${options.topBorder.size || 6}" w:space="${options.topBorder.space || 10}" w:color="${options.topBorder.color || 'D6C4B3'}"/></w:pBdr>` : ''
    ].join('');
    const body = Array.isArray(content) ? content.join('') : run(content, options.run || {});
    return `<w:p>${properties ? `<w:pPr>${properties}</w:pPr>` : ''}${body}</w:p>`;
  };

  const textParagraphs = (value, options = {}) => {
    const lines = normalizeMultiline(value);
    if (!lines.length) return paragraph('—', { run: { color: '6F6F6F', italic: true } });
    return lines.map(line => paragraph(line, options)).join('');
  };

  const cell = (label, value, options = {}) => {
    const width = options.width || 4680;
    const fill = options.fill || 'F6F1EB';
    return `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="${fill}"/><w:tcMar><w:top w:w="155" w:type="dxa"/><w:left w:w="220" w:type="dxa"/><w:bottom w:w="155" w:type="dxa"/><w:right w:w="220" w:type="dxa"/></w:tcMar><w:vAlign w:val="center"/></w:tcPr>${paragraph(label.toUpperCase(), { after: 80, run: { font: 'Arial', size: 15, bold: true, color: '8A7462' } })}${paragraph(value || '—', { after: 0, run: { font: 'Arial', size: 20, bold: true, color: '171A16' } })}</w:tc>`;
  };

  const metaTable = data => `<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="0" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="4680"/><w:gridCol w:w="4680"/></w:tblGrid><w:tr>${cell('Автор', data.name)}${cell('Роль', data.role, { fill: 'F1F3EF' })}</w:tr><w:tr>${cell('Контакт', data.contact, { fill: 'F1F3EF' })}${cell('Дата', data.date)}</w:tr></w:tbl>`;

  const contentBox = (label, title, value, accent, fill) => `<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblBorders><w:top w:val="nil"/><w:right w:val="nil"/><w:bottom w:val="nil"/><w:left w:val="single" w:sz="18" w:space="0" w:color="${accent}"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="9360"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="9360" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="${fill}"/><w:tcMar><w:top w:w="225" w:type="dxa"/><w:left w:w="330" w:type="dxa"/><w:bottom w:w="225" w:type="dxa"/><w:right w:w="330" w:type="dxa"/></w:tcMar></w:tcPr>${paragraph(label, { after: 100, run: { font: 'Arial', size: 15, bold: true, color: accent } })}${paragraph(title, { after: 180, run: { font: 'Arial', size: 25, bold: true, color: '11140F' } })}${textParagraphs(value, { after: 90, line: 320, run: { font: 'Arial', size: 21, color: '2D302B' } })}</w:tc></w:tr></w:tbl>`;

  const logoParagraph = () => `<w:p><w:pPr><w:spacing w:after="135"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="1450000" cy="688900"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="1" name="Логотип Новое поколение" descr="Новое поколение"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="logo-main.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rId2"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="1450000" cy="688900"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;

  const contentTypes = hasLogo => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${hasLogo ? '<Default Extension="png" ContentType="image/png"/>' : ''}<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;

  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;

  const documentRels = hasLogo => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${hasLogo ? '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo-main.png"/>' : ''}</Relationships>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="2B2E29"/><w:lang w:val="ru-RU"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="300" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style></w:styles>`;

  const coreXml = data => {
    const now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xmlEscape(data.title)} — проектная заявка</dc:title><dc:subject>Новое поколение — проектная заявка</dc:subject><dc:creator>Новое поколение</dc:creator><cp:lastModifiedBy>Новое поколение</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`;
  };

  const appXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Новое поколение</Application><AppVersion>1.0</AppVersion></Properties>`;

  const documentXml = (data, hasLogo) => {
    const header = hasLogo
      ? logoParagraph()
      : paragraph('НОВОЕ ПОКОЛЕНИЕ', { after: 190, run: { font: 'Arial', size: 24, bold: true, color: '5C493A' } });

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${header}${paragraph('PROJECT NOTE / НОВОЕ ПОКОЛЕНИЕ', { after: 120, run: { font: 'Arial', size: 15, bold: true, color: '8A7462' } })}${paragraph('Проектная заявка', { after: 80, line: 520, keepNext: true, run: { font: 'Arial', size: 58, bold: true, color: '0D110C' } })}${paragraph(data.title, { after: 180, line: 470, run: { font: 'Georgia', size: 42, bold: true, color: '72533B' } })}${paragraph('Черновик инициативы, сформированный на сайте проекта «Новое поколение».', { after: 220, line: 285, run: { font: 'Arial', size: 19, color: '65675F' } })}${metaTable(data)}${paragraph('', { after: 160 })}${contentBox('01 / ПРОБЛЕМА ИЛИ СИТУАЦИЯ', 'Что хотим изменить', data.problem, '876A52', 'F7F2EC')}${paragraph('', { after: 130 })}${contentBox('02 / ОЖИДАЕМЫЙ РЕЗУЛЬТАТ', 'К чему хотим прийти', data.result, '4F6048', 'F1F4EF')}${paragraph('', { after: 150 })}${paragraph('СЛЕДУЮЩИЙ ШАГ', { after: 90, keepNext: true, run: { font: 'Arial', size: 15, bold: true, color: '8A7462' } })}${paragraph('Эту заявку можно отправить руководителю проекта, обсудить с будущей командой или использовать как основу для дальнейшей проработки инициативы.', { after: 180, line: 300, run: { font: 'Arial', size: 20, color: '3F423D' } })}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="850" w:right="1276" w:bottom="850" w:left="1276" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr></w:body></w:document>`;
  };

  const fetchLogo = async () => {
    if (typeof fetch !== 'function') return null;
    try {
      const response = await fetch('assets/logo-main.png', { cache: 'force-cache' });
      if (!response.ok) return null;
      return new Uint8Array(await response.arrayBuffer());
    } catch (_) {
      return null;
    }
  };

  const buildProposalDocx = async (rawData, options = {}) => {
    const data = {
      title: normalizeLine(rawData.title) || 'Новая идея',
      name: normalizeLine(rawData.name),
      role: normalizeLine(rawData.role),
      contact: normalizeLine(rawData.contact),
      problem: String(rawData.problem ?? '').trim(),
      result: String(rawData.result ?? '').trim(),
      date: normalizeLine(rawData.date) || new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())
    };

    const logo = options.logoBytes ? bytes(options.logoBytes) : await fetchLogo();
    const hasLogo = Boolean(logo && logo.length);
    const entries = [
      { name: '[Content_Types].xml', data: contentTypes(hasLogo) },
      { name: '_rels/.rels', data: rootRels },
      { name: 'word/document.xml', data: documentXml(data, hasLogo) },
      { name: 'word/styles.xml', data: stylesXml },
      { name: 'word/_rels/document.xml.rels', data: documentRels(hasLogo) },
      { name: 'docProps/core.xml', data: coreXml(data) },
      { name: 'docProps/app.xml', data: appXml }
    ];
    if (hasLogo) entries.push({ name: 'word/media/logo-main.png', data: logo });

    return new Blob([buildStoredZip(entries)], { type: DOCX_MIME });
  };

  const api = { buildProposalDocx, DOCX_MIME };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NPProposalDocx = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
(() => {
  const root = document.documentElement;
  const progress = document.getElementById('progressBar');
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav');
  const heroArt = document.querySelector('.hero-art');
  const heroMedia = document.querySelector('.hero-media-card[data-hero-slides]');
  const themedSections = [...document.querySelectorAll('[data-theme]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  let ticking = false;

  const applyTheme = () => {
    if (!themedSections.length) return;
    const probe = window.innerHeight * 0.46;
    let active = themedSections[0];
    let best = Infinity;

    themedSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const center = rect.top + Math.min(rect.height, window.innerHeight) * 0.5;
      const distance = Math.abs(center - probe);
      if (distance < best) {
        best = distance;
        active = section;
      }
    });

    const [bg, glow, glow2] = (active.dataset.theme || '').split('|');
    if (bg) root.style.setProperty('--theme-bg', bg);
    if (glow) root.style.setProperty('--theme-glow', glow);
    if (glow2) root.style.setProperty('--theme-glow-2', glow2);
  };

  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = `${Math.min(100, (scrollTop / max) * 100)}%`;
    if (header) header.classList.toggle('is-scrolled', scrollTop > 24);


    applyTheme();
    ticking = false;
  };

  const requestScrollUI = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollUI);
  };

  window.addEventListener('scroll', requestScrollUI, { passive: true });
  window.addEventListener('resize', requestScrollUI, { passive: true });
  updateScrollUI();

  const topLinks = [...document.querySelectorAll('a[href="#top"]')];
  topLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  });

  if (menuButton && mobileNav) {
    const menuLinks = [...mobileNav.querySelectorAll('a')];
    const isMenuOpen = () => menuButton.getAttribute('aria-expanded') === 'true';

    const setMenuState = (open, { focusMenu = false, returnFocus = false } = {}) => {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      mobileNav.hidden = !open;
      header?.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);

      if (open && focusMenu) menuLinks[0]?.focus({ preventScroll: true });
      if (!open && returnFocus) menuButton.focus({ preventScroll: true });
    };

    const closeMenu = (returnFocus = false) => setMenuState(false, { returnFocus });

    menuButton.addEventListener('click', () => {
      const open = !isMenuOpen();
      setMenuState(open, { focusMenu: open });
    });

    menuLinks.forEach(link => link.addEventListener('click', () => closeMenu(false)));

    document.addEventListener('keydown', event => {
      if (!isMenuOpen()) return;
      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }
      if (event.key !== 'Tab' || !menuLinks.length) return;
      const focusable = [menuButton, ...menuLinks];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    });

    document.addEventListener('pointerdown', event => {
      if (!isMenuOpen()) return;
      if (mobileNav.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020 && isMenuOpen()) closeMenu(false);
    }, { passive: true });
  }


  if (heroMedia && !prefersReduced) {
    const sources = (heroMedia.dataset.heroSlides || '').split('|').map(item => item.trim()).filter(Boolean);
    const layers = [...heroMedia.querySelectorAll('.hero-slide')];

    if (sources.length > 1 && layers.length >= 2) {
      let sourceIndex = 0;
      let activeLayer = 0;
      let timer = 0;
      let heroVisible = true;
      const delay = 5200;
      const transitionMs = 1400;

      const preloadSource = src => {
        if (!src) return;
        const image = new Image();
        image.decoding = 'async';
        image.src = src;
      };

      const preloadNextWhenIdle = () => {
        const src = sources[(sourceIndex + 1) % sources.length];
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => preloadSource(src), { timeout: 1600 });
        } else {
          window.setTimeout(() => preloadSource(src), 500);
        }
      };

      const schedule = () => {
        window.clearTimeout(timer);
        if (document.hidden || !heroVisible) return;
        timer = window.setTimeout(showNext, delay);
      };

      const showNext = async () => {
        if (document.hidden || !heroVisible) return;

        sourceIndex = (sourceIndex + 1) % sources.length;
        const nextLayer = activeLayer === 0 ? 1 : 0;
        const current = layers[activeLayer];
        const next = layers[nextLayer];
        const src = sources[sourceIndex];

        if (next.getAttribute('src') !== src) {
          next.src = src;
          try { await next.decode(); } catch (_) {}
        }

        heroMedia.classList.remove('is-changing');
        void heroMedia.offsetWidth;
        heroMedia.classList.add('is-changing');
        next.classList.add('is-active');
        current.classList.remove('is-active');
        activeLayer = nextLayer;

        window.setTimeout(() => heroMedia.classList.remove('is-changing'), transitionMs);
        preloadNextWhenIdle();
        schedule();
      };

      if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver(entries => {
          heroVisible = entries.some(entry => entry.isIntersecting);
          if (heroVisible) schedule();
          else window.clearTimeout(timer);
        }, { rootMargin: '120px 0px', threshold: 0.01 });
        heroObserver.observe(heroMedia);
      }

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) window.clearTimeout(timer);
        else schedule();
      });

      preloadNextWhenIdle();
      schedule();
    }
  }

  const reveals = [...document.querySelectorAll('.reveal')];
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  }

  const observedSections = [...document.querySelectorAll('section[id]')];
  if ('IntersectionObserver' in window && navLinks.length) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { threshold: [0.18, 0.35, 0.55], rootMargin: '-18% 0px -58% 0px' });
    observedSections.forEach(section => navObserver.observe(section));
  }



  const proposalForm = document.getElementById('proposalForm');
  const proposalOutput = document.getElementById('proposalOutput');
  const proposalText = document.getElementById('proposalText');
  const proposalFileName = document.getElementById('proposalFileName');
  const downloadProposal = document.getElementById('downloadProposal');
  const copyProposal = document.getElementById('copyProposal');

  if (proposalForm && proposalOutput && proposalText) {
    const normalize = value => String(value || '').trim().replace(/\s+/g, ' ');
    const normalizeMultiline = value => String(value || '').trim().replace(/\r\n?/g, '\n');
    let proposalBlob = null;
    let proposalFilename = '';
    let proposalPlainText = '';

    const safeFilenamePart = value => {
      const cleaned = normalize(value)
        .replace(/[<>:\"/\\|?*\u0000-\u001F]/g, '')
        .replace(/[. ]+$/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 72);
      return cleaned || 'идея';
    };

    const downloadFile = () => {
      if (!proposalBlob || !proposalFilename) return;
      const url = URL.createObjectURL(proposalBlob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = proposalFilename;
      anchor.hidden = true;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1600);
      proposalOutput.classList.add('is-downloaded');
      window.setTimeout(() => proposalOutput.classList.remove('is-downloaded'), 1800);
    };

    proposalForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!proposalForm.reportValidity()) return;

      const submitButton = proposalForm.querySelector('.proposal-submit');
      const submitText = submitButton ? submitButton.childNodes[0]?.nodeValue : '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        if (submitButton.childNodes[0]) submitButton.childNodes[0].nodeValue = 'Формируем Word-файл ';
      }

      try {
        if (!window.NPProposalDocx?.buildProposalDocx) throw new Error('DOCX generator is unavailable');
        const data = new FormData(proposalForm);
        const title = normalize(data.get('title'));
        const date = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
        const proposalData = {
          title,
          name: normalize(data.get('name')),
          role: normalize(data.get('role')),
          contact: normalize(data.get('contact')),
          problem: normalizeMultiline(data.get('problem')),
          result: normalizeMultiline(data.get('result')),
          date
        };

        proposalPlainText = [
          'НОВОЕ ПОКОЛЕНИЕ — ПРОЕКТНАЯ ЗАЯВКА',
          '',
          `Проект: ${proposalData.title}`,
          `Дата: ${proposalData.date}`,
          `Автор: ${proposalData.name}`,
          `Роль: ${proposalData.role}`,
          `Контакт: ${proposalData.contact}`,
          '',
          'Что хотим изменить:',
          proposalData.problem,
          '',
          'Ожидаемый результат:',
          proposalData.result,
          '',
          'Сформировано на сайте «Новое поколение»',
          'https://askuyr.github.io/novoepokolenie-site/'
        ].join('\n');

        proposalBlob = await window.NPProposalDocx.buildProposalDocx(proposalData);
        if (!(proposalBlob instanceof Blob) || proposalBlob.type !== window.NPProposalDocx.DOCX_MIME) {
          throw new Error('Generator returned a non-DOCX blob');
        }
        const signature = new Uint8Array(await proposalBlob.slice(0, 4).arrayBuffer());
        if (signature[0] !== 0x50 || signature[1] !== 0x4b || signature[2] !== 0x03 || signature[3] !== 0x04) {
          throw new Error('Invalid DOCX ZIP signature');
        }
        proposalFilename = `Новое-поколение_${safeFilenamePart(title)}.docx`;
        proposalText.textContent = proposalPlainText;
        if (proposalFileName) proposalFileName.textContent = proposalFilename;
        proposalOutput.hidden = false;
        proposalOutput.classList.remove('is-copied');

        downloadFile();
        requestAnimationFrame(() => {
          proposalOutput.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'nearest' });
        });
      } catch (error) {
        console.error('Не удалось сформировать Word-файл:', error);
        window.alert('Не удалось сформировать Word-файл. Обновите страницу и попробуйте ещё раз.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
          if (submitButton.childNodes[0]) submitButton.childNodes[0].nodeValue = submitText || 'Сформировать и скачать ';
        }
      }
    });

    downloadProposal?.addEventListener('click', downloadFile);

    copyProposal?.addEventListener('click', async () => {
      const text = proposalPlainText || proposalText.textContent || '';
      if (!text) return;
      let copied = false;
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (_) {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        copied = document.execCommand('copy');
        area.remove();
      }
      if (copied) {
        proposalOutput.classList.add('is-copied');
        const textNode = [...copyProposal.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
        const original = textNode?.nodeValue || 'Скопировать ';
        if (textNode) textNode.nodeValue = 'Скопировано ';
        window.setTimeout(() => {
          if (textNode) textNode.nodeValue = original;
          proposalOutput.classList.remove('is-copied');
        }, 1800);
      }
    });
  }
  if (!prefersReduced && finePointer) {
    let pointerFrame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const paintPointerMotion = () => {
      pointerFrame = 0;
      const x = (pointerX / window.innerWidth - 0.5) * 28;
      const y = (pointerY / window.innerHeight - 0.5) * 18;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);

      if (heroArt && window.innerWidth > 760) {
        const hx = (pointerX / window.innerWidth - 0.5) * 9;
        const hy = (pointerY / window.innerHeight - 0.5) * 9;
        heroArt.style.setProperty('--hero-x', `${hx * 0.34}px`);
        heroArt.style.setProperty('--hero-y', `${hy * 0.34}px`);
      }
    };

    window.addEventListener('pointermove', event => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointerMotion);
    }, { passive: true });
  }})();
