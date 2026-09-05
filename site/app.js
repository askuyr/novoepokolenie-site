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
      if (event.key === 'Escape' && isMenuOpen()) closeMenu(true);
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
      sources.forEach(src => {
        const preload = new Image();
        preload.decoding = 'async';
        preload.src = src;
      });

      let sourceIndex = 0;
      let activeLayer = 0;
      let timer = 0;
      const delay = 5200;
      const transitionMs = 1400;

      const schedule = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(showNext, delay);
      };

      const showNext = async () => {
        if (document.hidden) {
          schedule();
          return;
        }

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
        schedule();
      };

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) schedule();
      });

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
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { threshold: [0.18, 0.35, 0.55], rootMargin: '-18% 0px -58% 0px' });
    observedSections.forEach(section => navObserver.observe(section));
  }

  if (!prefersReduced && finePointer) {
    window.addEventListener('pointermove', event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 28;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);

      if (heroArt && window.innerWidth > 760) {
        const hx = (event.clientX / window.innerWidth - 0.5) * 9;
        const hy = (event.clientY / window.innerHeight - 0.5) * 9;
        heroArt.style.setProperty('--hero-x', `${hx * 0.34}px`);
        heroArt.style.setProperty('--hero-y', `${hy * 0.34}px`);
      }
    }, { passive: true });
  }
})();
