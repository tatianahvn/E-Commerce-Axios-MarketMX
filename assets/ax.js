/* Axios Market · interacciones del tema (sin dependencias, mobile first) */
(() => {
  'use strict';

  const config = window.axConfig || {};
  const routes = config.routes || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const money = (cents) => {
    const value = Number(cents) / 100;
    return new Intl.NumberFormat(config.locale || 'es-MX', {
      style: 'currency',
      currency: config.currency || 'MXN',
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const fetchJSON = async (url, options = {}) => {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.description || data.message || 'No pudimos procesar tu pedido. Inténtalo de nuevo.');
    return data;
  };

  /* ---------- Menú móvil ---------- */
  const drawer = $('[data-ax-drawer]');
  const menuBtn = $('[data-ax-menu-open]');
  if (drawer && menuBtn) {
    const open = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('ax-lock');
      setTimeout(() => $('[data-ax-menu-close].ax-icon-btn', drawer)?.focus(), 60);
    };
    const close = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('ax-lock');
      menuBtn.focus();
    };
    menuBtn.addEventListener('click', open);
    $$('[data-ax-menu-close]', drawer).forEach((el) => el.addEventListener('click', close));
    $$('.ax-drawer__nav a', drawer).forEach((a) => a.addEventListener('click', () => drawer.classList.contains('is-open') && close()));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  /* ---------- Aparición al hacer scroll (corta, para no dejar huecos en celulares lentos) ---------- */
  const revealEls = $$('.ax-reveal');
  const revealAll = () => revealEls.forEach((el) => el.classList.add('is-in'));
  if ('IntersectionObserver' in window && !reducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px 15% 0px', threshold: 0 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealAll();
  }

  /* ---------- Galería (desplazamiento nativo + puntos + miniaturas) ---------- */
  $$('[data-ax-gallery]').forEach((gallery) => {
    const track = $('[data-ax-gallery-track]', gallery);
    const slides = $$('.ax-gallery__slide', track);
    const dots = $$('.ax-gallery__dot', gallery);
    const thumbs = $$('.ax-gallery__thumb', gallery);
    if (slides.length < 2) return;

    let current = 0;
    const mark = (index) => {
      current = index;
      dots.forEach((d, n) => d.setAttribute('aria-current', n === index ? 'true' : 'false'));
      thumbs.forEach((t, n) => t.setAttribute('aria-current', n === index ? 'true' : 'false'));
    };
    const go = (index) => {
      track.scrollTo({ left: track.clientWidth * index, behavior: reducedMotion ? 'auto' : 'smooth' });
      mark(index);
    };
    let ticking = false;
    track.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          mark(Math.round(track.scrollLeft / track.clientWidth));
          ticking = false;
        });
      },
      { passive: true }
    );
    dots.forEach((d, n) => d.addEventListener('click', () => go(n)));
    thumbs.forEach((t, n) => t.addEventListener('click', () => go(n)));
    // Flechas: avanzan como un carrusel; al final vuelven a la primera foto
    $('[data-ax-gallery-prev]', gallery)?.addEventListener('click', () => go((current - 1 + slides.length) % slides.length));
    $('[data-ax-gallery-next]', gallery)?.addEventListener('click', () => go((current + 1) % slides.length));
    gallery.axGoToMedia = (mediaId) => {
      const index = slides.findIndex((s) => s.dataset.mediaId === String(mediaId));
      if (index >= 0) go(index);
    };
  });

  /* ---------- Producto: variantes, paquetes y precio del botón ---------- */
  const productSection = $('[data-ax-product]');
  const buyBox = $('[data-ax-buy-box]');
  const form = $('[data-ax-form]');

  const updatePriceLabels = (cents) => {
    $$('[data-ax-price-label]').forEach((el) => (el.textContent = money(cents)));
  };

  if (form && productSection) {
    const variantInput = $('[data-ax-variant-id]', form);
    const variantsData = $('[data-ax-variants]', form);
    const variants = variantsData ? JSON.parse(variantsData.textContent) : null;
    const bundles = $$('[data-ax-bundle]', form);
    const buyBtn = $('[data-ax-buy]', form);
    const priceNow = $('[data-ax-price-now]', productSection);
    const priceWas = $('[data-ax-price-was]', productSection);
    const priceSave = $('[data-ax-price-save]', productSection);
    let current = variants ? variants.find((v) => v.id === Number(variantInput.value)) : null;

    const selectedBundle = () => bundles.find((b) => b.checked) || bundles[0];

    const refresh = () => {
      const unit = current ? current.price : null;
      const bundle = selectedBundle();
      let total = unit;
      if (bundle) {
        total = bundle.dataset.custom === 'true' || unit === null ? Number(bundle.dataset.total) : unit * Number(bundle.value);
      }
      if (total === null) return;
      updatePriceLabels(total);
    };

    if (variants) {
      const fieldsets = $$('[data-ax-option]', form);
      const selectedOptions = () => fieldsets.map((fs) => ($('input:checked', fs) || {}).value);

      const markAvailability = () => {
        const chosen = selectedOptions();
        fieldsets.forEach((fs, index) => {
          $$('input', fs).forEach((input) => {
            const test = [...chosen];
            test[index] = input.value;
            const match = variants.find((v) => v.options.every((o, n) => o === test[n]));
            input.closest('.ax-pill').classList.toggle('is-unavailable', !match || !match.available);
          });
        });
      };

      form.addEventListener('change', (e) => {
        if (!e.target.closest('[data-ax-option]')) return;
        const chosen = selectedOptions();
        const fs = e.target.closest('[data-ax-option]');
        $('[data-ax-option-value]', fs).textContent = e.target.value;
        current = variants.find((v) => v.options.every((o, n) => o === chosen[n])) || null;
        markAvailability();

        if (!current) {
          buyBtn.disabled = true;
          return;
        }
        variantInput.value = current.id;
        buyBtn.disabled = !current.available;
        priceNow.textContent = money(current.price);
        const onSale = current.compare > current.price;
        priceNow.classList.toggle('ax-price__now--sale', onSale);
        priceWas.hidden = !onSale;
        priceSave.parentElement.hidden = !onSale;
        if (onSale) {
          priceWas.textContent = money(current.compare);
          priceSave.textContent = `${Math.floor(((current.compare - current.price) * 100) / current.compare)}% Descuento`;
        }
        if (current.media) $('[data-ax-gallery]', productSection)?.axGoToMedia?.(current.media);
        const url = new URL(window.location.href);
        url.searchParams.set('variant', current.id);
        history.replaceState(null, '', url.toString());
        refresh();
      });
      markAvailability();
    }

    bundles.forEach((b) => b.addEventListener('change', refresh));
  }

  /* ---------- Pedido con Releasit ---------- */
  // Releasit oculta el botón del tema y pone el suyo dentro del formulario.
  // Los demás botones (barra fija, llamado final) hacen clic en ese botón.
  const releasitButton = () => {
    const sel = config.releasitSelector;
    if (!sel) return null;
    try {
      return (buyBox && $(sel, buyBox)) || $(sel);
    } catch (e) {
      return null;
    }
  };

  const waitFor = (fn, timeout) =>
    new Promise((resolve) => {
      const start = performance.now();
      const tick = () => {
        const found = fn();
        if (found || performance.now() - start > timeout) return resolve(found || null);
        setTimeout(tick, 120);
      };
      tick();
    });

  const fallbackCheckout = async (trigger) => {
    // Respaldo si Releasit no cargó: agrega al carrito y abre el checkout
    if (!form || !routes.cartAdd) return;
    const msg = $('[data-ax-msg]', form);
    const id = Number($('[data-ax-variant-id]', form).value);
    const qtyInput = $('[name="quantity"]:checked', form) || $('[name="quantity"]', form);
    const quantity = Number(qtyInput?.value || 1);
    trigger?.classList.add('is-loading');
    try {
      await fetchJSON(routes.cartAdd, { method: 'POST', body: JSON.stringify({ items: [{ id, quantity }] }) });
      window.location.href = '/checkout';
    } catch (err) {
      if (msg) msg.textContent = err.message;
      trigger?.classList.remove('is-loading');
    }
  };

  const openOrder = async (trigger) => {
    if (!buyBox) return;
    const url = buyBox.dataset.releasitUrl;
    if (url) {
      window.location.href = url;
      return;
    }
    let native = releasitButton();
    if (!native) {
      trigger?.classList.add('is-loading');
      native = await waitFor(releasitButton, 2500);
      trigger?.classList.remove('is-loading');
    }
    if (native) {
      native.click();
      return;
    }
    fallbackCheckout(trigger);
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      // Solo se intercepta el botón del tema; cualquier otro botón del formulario sigue su curso
      const submitter = e.submitter;
      if (submitter && !submitter.hasAttribute('data-ax-buy')) return;
      e.preventDefault();
      openOrder(submitter);
    });
  }

  // Barra fija y llamado final: llevan al inicio de la sección de compra (fotos, precio y paquetes);
  // el formulario de Releasit lo abre solo el botón principal.
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-ax-order]');
    if (!trigger) return;
    // Celular: la barra fija lleva directo a "Elige tu paquete". Escritorio: al inicio de la sección de compra.
    // Botones "Quiero mi…" de la página: al contador de la oferta (justo arriba de "Elige tu paquete");
    // si el contador ya no está, a los paquetes.
    const scope = productSection || document;
    const toBundles = trigger.closest('[data-ax-sticky]') && window.matchMedia('(max-width: 767px)').matches;
    const toOffer = trigger.closest('.ax-copy__cta');
    let target = productSection;
    if (toOffer) target = $('.ax-countdown', scope) || $('.ax-bundles', scope) || productSection;
    else if (toBundles) target = $('.ax-bundles', scope) || productSection;
    if (!target) return;
    e.preventDefault();
    const headerH = $('[data-ax-header]')?.offsetHeight || 0;
    const gap = target === productSection ? 0 : 16;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - gap;
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Barra fija: aparece cuando ningún botón de compra está a la vista ---------- */
  const sticky = $('[data-ax-sticky]');
  if (sticky && 'IntersectionObserver' in window) {
    const watched = new Map();
    const sync = () => {
      const anyVisible = [...watched.values()].some(Boolean);
      const visible = !anyVisible;
      sticky.classList.toggle('is-visible', visible);
      sticky.setAttribute('aria-hidden', visible ? 'false' : 'true');
      $('[data-ax-order]', sticky).tabIndex = visible ? 0 : -1;
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => watched.set(entry.target, entry.isIntersecting));
      sync();
    });
    const targets = [buyBox, $('.ax-final')].filter(Boolean);
    targets.forEach((el) => {
      watched.set(el, false);
      io.observe(el);
    });
  }

  /* ---------- Contador de la promoción ---------- */
  // Ciclo automático: fin del ciclo actual por calendario (cada N días desde una fecha fija, a medianoche local).
  // Se guarda en localStorage para que el cliente vea el mismo contador si regresa.
  const cycleEnd = (days, key) => {
    const storageKey = `ax_countdown_${key}`;
    const now = Date.now();
    try {
      const saved = Number(localStorage.getItem(storageKey));
      if (saved > now) return saved;
    } catch (e) {}
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayNumber = Math.floor((today.getTime() - today.getTimezoneOffset() * 60000) / 86400000);
    const daysLeft = days - (dayNumber % days);
    const end = new Date(today);
    end.setDate(end.getDate() + daysLeft);
    try {
      localStorage.setItem(storageKey, String(end.getTime()));
    } catch (e) {}
    return end.getTime();
  };

  $$('[data-ax-countdown], [data-ax-countdown-cycle]').forEach((el) => {
    const cycleDays = Number(el.dataset.axCountdownCycle || 0);
    let end = cycleDays ? cycleEnd(cycleDays, el.dataset.axCountdownKey) : Number(el.dataset.axCountdown) * 1000;
    const parts = { d: $('[data-d]', el), h: $('[data-h]', el), m: $('[data-m]', el), s: $('[data-s]', el) };
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      let left = end - Date.now();
      if (left <= 0 && cycleDays) {
        end = cycleEnd(cycleDays, el.dataset.axCountdownKey);
        left = end - Date.now();
      }
      if (left <= 0) {
        el.remove();
        return false;
      }
      const s = Math.floor(left / 1000);
      parts.d.textContent = pad(Math.floor(s / 86400));
      parts.h.textContent = pad(Math.floor((s % 86400) / 3600));
      parts.m.textContent = pad(Math.floor((s % 3600) / 60));
      parts.s.textContent = pad(s % 60);
      return true;
    };
    if (tick()) {
      const timer = setInterval(() => tick() || clearInterval(timer), 1000);
    }
  });

  /* ---------- Antes y después ---------- */
  $$('[data-ax-ba]').forEach((ba) => {
    const range = $('input[type="range"]', ba);
    const update = () => ba.style.setProperty('--pos', `${range.value}%`);
    range.addEventListener('input', update);
    update();

    // Al entrar en pantalla el deslizador se mueve una vez para invitar a usarlo
    if (reducedMotion || !('IntersectionObserver' in window)) return;
    let frame = null;
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    };
    ['pointerdown', 'touchstart', 'keydown', 'input'].forEach((ev) => range.addEventListener(ev, stop, { passive: true }));
    const play = () => {
      const keys = [50, 22, 78, 50];
      const segment = 800;
      const t0 = performance.now();
      const step = (now) => {
        const t = (now - t0) / segment;
        const i = Math.floor(t);
        if (i >= keys.length - 1) {
          range.value = 50;
          update();
          frame = null;
          return;
        }
        const p = t - i;
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        range.value = keys[i] + (keys[i + 1] - keys[i]) * eased;
        update();
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          setTimeout(play, 300);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(ba);
  });

  /* ---------- Reseñas: ver más ---------- */
  $$('[data-ax-reviews-more]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const list = btn.previousElementSibling;
      const extra = $$('[data-ax-review-extra]', list);
      extra.forEach((el) => {
        el.hidden = false;
      });
      btn.remove();
      extra[0]?.setAttribute('tabindex', '-1');
      extra[0]?.focus({ preventScroll: true });
    });
  });

  /* ---------- Reseñas en slider: flechas y contador ---------- */
  $$('[data-ax-slider]').forEach((slider) => {
    const track = $('[data-ax-slider-track]', slider);
    const items = [...track.children];
    const current = $('[data-ax-slider-current]', slider);
    const prev = $('[data-ax-slider-prev]', slider);
    const next = $('[data-ax-slider-next]', slider);
    const step = () => (items[1] ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth);
    const index = () => Math.round(track.scrollLeft / step());
    const sync = () => {
      const i = index();
      if (current) current.textContent = Math.min(i + 1, items.length);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reducedMotion ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });

  /* ---------- Fotos de reseñas ampliadas ---------- */
  const zoom = $('[data-ax-zoom]');
  if (zoom && typeof zoom.showModal === 'function') {
    const zoomImg = $('[data-ax-zoom-img]', zoom);
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-ax-zoom]');
      if (!link) return;
      e.preventDefault();
      zoomImg.src = link.href;
      zoomImg.alt = $('img', link)?.alt || '';
      zoom.showModal();
    });
    $('[data-ax-zoom-close]', zoom).addEventListener('click', () => zoom.close());
    zoom.addEventListener('click', (e) => {
      if (e.target === zoom) zoom.close();
    });
  }

  /* ---------- Ordenar colección ---------- */
  $$('[data-ax-sort]').forEach((select) => {
    select.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', select.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    });
  });

  /* ---------- Pedido confirmado y carrito ---------- */
  // Releasit agrega el producto al carrito al abrir su formulario; como la tienda no usa carrito,
  // se vacía al cargar para que piezas viejas no se sumen al siguiente pedido.
  if (routes.cart && routes.cartClear) {
    fetchJSON(routes.cart)
      .then((cart) => {
        if (cart.item_count > 0) return fetchJSON(routes.cartClear, { method: 'POST' });
      })
      .catch(() => {});
  }

  const params = new URLSearchParams(window.location.search);
  const thanks = $('[data-ax-thanks]');
  if (thanks && params.get('pedido') === 'confirmado') {
    const box = $('.ax-thanks__box', thanks);
    const closeThanks = (e) => {
      e?.preventDefault();
      thanks.hidden = true;
      document.documentElement.classList.remove('ax-lock');
      params.delete('pedido');
      const query = params.toString();
      history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : '') + window.location.hash);
    };
    thanks.hidden = false;
    document.documentElement.classList.add('ax-lock');
    box.focus();
    $$('[data-ax-thanks-close]', thanks).forEach((el) => el.addEventListener('click', closeThanks));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !thanks.hidden) closeThanks();
    });
  }
})();
