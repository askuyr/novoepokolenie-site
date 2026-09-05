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
    let proposalBlob = null;
    let proposalFilename = '';

    const safeFilenamePart = value => {
      const cleaned = normalize(value)
        .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '')
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
      window.setTimeout(() => URL.revokeObjectURL(url), 1200);
      proposalOutput.classList.add('is-downloaded');
      window.setTimeout(() => proposalOutput.classList.remove('is-downloaded'), 1800);
    };

    proposalForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!proposalForm.reportValidity()) return;

      const data = new FormData(proposalForm);
      const title = normalize(data.get('title'));
      const date = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
      const text = [
        'НОВОЕ ПОКОЛЕНИЕ',
        'ЗАЯВКА НА ПРОЕКТ',
        '────────────────────────────────',
        '',
        `ПРОЕКТ: ${title}`,
        `Сформировано: ${date}`,
        '',
        `Имя: ${normalize(data.get('name'))}`,
        `Кто я: ${normalize(data.get('role'))}`,
        `Контакт: ${normalize(data.get('contact'))}`,
        '',
        'ЧТО ХОЧУ ИЗМЕНИТЬ',
        normalize(data.get('problem')),
        '',
        'ОЖИДАЕМЫЙ РЕЗУЛЬТАТ',
        normalize(data.get('result')),
        '',
        '────────────────────────────────',
        'Сформировано на сайте «Новое поколение»',
        'https://askuyr.github.io/novoepokolenie-site/'
      ].join('\n');

      proposalFilename = `Новое-поколение_${safeFilenamePart(title)}.txt`;
      proposalBlob = new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' });
      proposalText.textContent = text;
      if (proposalFileName) proposalFileName.textContent = proposalFilename;
      proposalOutput.hidden = false;
      proposalOutput.classList.remove('is-copied');

      downloadFile();
      requestAnimationFrame(() => {
        proposalOutput.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'nearest' });
      });
    });

    downloadProposal?.addEventListener('click', downloadFile);

    copyProposal?.addEventListener('click', async () => {
      const text = proposalText.textContent || '';
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
