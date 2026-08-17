/* SIFA Consulting — Mobile App */
(function () {
  'use strict';

  var DATA = window.SIFA_DATA;
  var state = { lang: 'en', route: '/home', params: {} };
  var view = document.getElementById('view');

  /* ---------- Image map ---------- */
  var IMG = 'assets/images/';
  var META = [
    { id: 'financial', img: IMG + 'Financial-Services-DyKECTaz.webp' },
    { id: 'transaction', img: IMG + 'Transaction_services-Cm9Kl2lR.png' },
    { id: 'risk', img: IMG + 'Risk_Advisory-BcBxDQvB.png' },
    { id: 'people', img: IMG + 'people_organization-yG6oFGGD.png' },
    { id: 'it', img: IMG + 'itconsulting1-B3nSFW_Y.webp' },
    { id: 'branding', img: IMG + 'brandingmarketing-DwHieC-9.jpg' },
    { id: 'events', img: IMG + 'eventandgift1-D5PyYolZ.png' },
    { id: 'media', img: IMG + 'mediaphoto1-Bqrk-7Uc.png' }
  ];
  var IMG_BY_ID = {};
  META.forEach(function (m) { IMG_BY_ID[m.id] = m.img; });

  var HERO_IMAGES = [
    IMG + '1-DOGWu9v8.png',
    IMG + 'hero-image-tG5g-93W.png',
    IMG + 'Rectangle_4525-C2UqiZDw.png'
  ];
  var CLIENTS = [
    IMG + 'dynex-BamUxiCB.png',
    IMG + 'gga-BVEhrfgy.png',
    IMG + 'exat-B8okWW7-.png',
    IMG + 'wazen-CQy3L2yO.png',
    IMG + 'alturki-DpIQfDAH.png'
  ];

  /* ---------- I18n ---------- */
  function data() { return DATA[state.lang]; }
  function other() { return DATA[state.lang === 'en' ? 'ar' : 'en']; }
  function t(key) {
    var cur = DATA[state.lang];
    var parts = key.split('.');
    var node = cur;
    for (var i = 0; i < parts.length; i++) {
      if (node && typeof node === 'object' && parts[i] in node) { node = node[parts[i]]; }
      else { node = undefined; break; }
    }
    if (typeof node === 'string') return node;
    node = DATA.en;
    for (var j = 0; j < parts.length; j++) {
      if (node && typeof node === 'object' && parts[j] in node) { node = node[parts[j]]; }
      else { node = undefined; break; }
    }
    return typeof node === 'string' ? node : key;
  }
  function isRTL() { return state.lang === 'ar'; }

  /* ---------- Icons (SVG) ---------- */
  function ic(name) {
    var p = {
      arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
      play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
      pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z"/></svg>',
      wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.43 9.88-9.89 9.88zm8.42-18.3A11.82 11.82 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.93 11.93 0 0 0 5.77 1.47c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.5-8.44z"/></svg>',
      ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
      li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.2 8.5h4.6V23H.2zM8.2 8.5h4.4v2h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.49 3.05 5.49 7.02V23h-4.6v-6.8c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.6 1.76-2.6 3.58V23H8.2z"/></svg>',
      globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z"/></svg>'
    };
    return p[name] || '';
  }

  /* ---------- Helpers ---------- */
  function applyI18n() {
    var els = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(els, function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function svcMeta(id) { return META.find(function (m) { return m.id === id; }); }
  var SVC_KEY = { events: 'eventsGifts', media: 'mediaProduction' };
  function svcById(id) { return data().services.services[SVC_KEY[id] || id]; }
  function svcLabel(id) { return data().services.list[id] || data().services[id] || t('services.' + id); }
  function svcCard(id) {
    var c = data().services.cards[id];
    return c ? { name: c.name, desc: c.description } : { name: svcLabel(id), desc: '' };
  }

  function listHtml(items, cls) {
    if (!items || !items.length) return '';
    var html = '<ul class="tick ' + (cls || '') + '">';
    items.forEach(function (it) { html += '<li>' + ic('check') + '<span>' + esc(it) + '</span></li>'; });
    return html + '</ul>';
  }

  function sectionTitle(eyebrow, title, sub) {
    var h = '<div class="section--tight" style="padding-bottom:0">';
    if (eyebrow) h += '<span class="eyebrow">' + esc(eyebrow) + '</span>';
    if (title) h += '<h2 class="sec-title">' + title + '</h2>';
    if (sub) h += '<p class="sec-sub">' + sub + '</p>';
    return h + '</div>';
  }

  function footerHtml() {
    var c = data().common, nav = data().nav;
    var year = new Date().getFullYear();
    var copyright = t('home.footer.copyright') || t('about.eyebrow');
    return '<footer>' +
      '<div class="brand"><img src="' + IMG + 'main_logo-BcvzCDPm.png" alt="SIFA"/></div>' +
      '<p class="muted" style="font-size:13.5px">' + esc(t('contact.hero.description')) + '</p>' +
      '<div class="f-links">' +
        '<a data-nav="/about">' + esc(nav.about) + '</a>' +
        '<a data-nav="/services">' + esc(nav.services) + '</a>' +
        '<a data-nav="/insights">' + esc(nav.insight) + '</a>' +
        '<a data-nav="/contact">' + esc(nav.contacts) + '</a>' +
      '</div>' +
      '<div class="f-social">' +
        '<a href="https://wa.me/966531687985" target="_blank" aria-label="WhatsApp">' + ic('wa') + '</a>' +
        '<a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">' + ic('li') + '</a>' +
        '<a href="https://instagram.com" target="_blank" aria-label="Instagram">' + ic('ig') + '</a>' +
      '</div>' +
      '<p class="muted" style="font-size:13px">' + esc(c.officeAddress) + '</p>' +
      '<p class="muted" style="font-size:13px">' + esc(c.email) + ' · ' + esc(c.phone2) + '</p>' +
      '<div class="copy">' + copyright.replace('{year}', year) + '</div>' +
    '</footer>';
  }

  /* ---------- Router ---------- */
  var ROUTES = ['/home', '/about', '/services', '/insights', '/contact', '/pricing'];
  function parseHash() {
    var h = location.hash.replace(/^#/, '') || '/home';
    var parts = h.split('/').filter(Boolean);
    var route = '/' + (parts[0] || 'home');
    var params = { id: parts[1] || null };
    if (ROUTES.indexOf(route) === -1) route = '/home';
    return { route: route, params: params };
  }

  function render() {
    var p = parseHash();
    state.route = p.route;
    state.params = p.params;
    closeMenu();
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    document.documentElement.lang = state.lang;
    applyI18n();
    var html = '';
    if (state.route === '/home') html = homePage();
    else if (state.route === '/about') html = aboutPage();
    else if (state.route === '/services') {
      html = p.params.id ? servicePage(p.params.id) : servicesPage();
    }
    else if (state.route === '/insights') {
      html = p.params.id ? articlePage(p.params.id) : insightsPage();
    }
    else if (state.route === '/contact') html = contactPage();
    else if (state.route === '/pricing') html = pricingPage();
    view.innerHTML = html;
    updateTabbar();
    bindPage();
    window.scrollTo(0, 0);
  }

  function navTo(route) {
    location.hash = '#' + route;
    render();
  }

  /* ---------- Page: HOME ---------- */
  function homePage() {
    var h = data().home;
    var hero = h.hero;
    var slides = [1, 2, 3, 4, 5].map(function (n) {
      return { t: hero['title' + n], d: hero['description' + n], b: hero['button' + n] };
    });
    var s = '<div class="hero" id="heroSlider">';
    slides.forEach(function (sl, i) {
      s += '<div class="hero-slide' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '">' +
        '<div class="hero-bg" style="background-image:url(' + HERO_IMAGES[Math.min(i, 2)] + ')"></div>' +
        '<div class="hero-veil"></div>' +
        '<div class="hero-content">' +
          '<span class="eyebrow">SIFA Consulting</span>' +
          '<h1>' + esc(sl.t) + '</h1>' +
          '<p>' + esc(sl.d) + '</p>' +
          '<a class="btn btn--gold" data-nav="' + btnRoute(i) + '">' + esc(sl.b) + '</a>' +
        '</div></div>';
    });
    s += '<div class="hero-dots">' + slides.map(function (_, i) {
      return '<button data-dot="' + i + '" class="' + (i === 0 ? 'active' : '') + '" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('') + '</div></div>';

    // Showreel
    var sr = hero.showreel || {};
    s += '<div class="section section--tight"><div class="section-head">' +
      '<span class="eyebrow">' + (state.lang === 'ar' ? 'عرض تقديمي' : 'Showreel') + '</span>' +
      '<h2>' + esc(sr.title || '') + '</h2>' +
      (sr.description ? '<p class="muted">' + esc(sr.description) + '</p>' : '') +
      '</div>' +
      '<div class="showreel-card" data-showreel>' +
      '<img src="' + IMG + 'showreel_poster.jpg" alt="Showreel"/>' +
      '<button class="play-btn" type="button" aria-label="Play showreel">' + ic('play') + '</button>' +
      '</div></div>';

    // Why
    var why = h.why;
    s += '<div class="section">' + sectionTitle(null, esc(why.title), why.description) + '</div>';
    s += '<div class="section--tight" style="padding-top:0"><div class="grid grid-2">' +
      '<div class="card"><div class="card-icon">' + ic('check') + '</div><h3>' + esc(why.expertise.title) + '</h3><p>' + esc(why.expertise.description) + '</p></div>' +
      '<div class="card"><div class="card-icon">' + ic('arrow') + '</div><h3>' + esc(why.tailored.title) + '</h3><p>' + esc(why.tailored.description) + '</p></div>' +
    '</div><div class="mt-16"><div class="card"><div class="card-icon">' + ic('globe') + '</div><h3>' + esc(why.global.title) + '</h3><p>' + esc(why.global.description) + '</p></div></div></div>';

    // Trusted
    s += '<div class="clients section--tight"><p class="center muted" style="font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">' + esc(h.trusted.title) + '</p>' +
      '<div class="clients-track">' + CLIENTS.map(function (c) { return '<img src="' + c + '" alt="client"/>'; }).join('') + '</div>' +
      '<p class="center muted" style="font-size:12.5px;margin-top:8px">' + (h.trusted.description || '').replace(/<[^>]*>/g, '') + '</p></div>';

    // Services carousel
    s += '<div class="section">' + sectionTitle(esc(h.services.title), esc(h.services.subtitle), h.services.description) + '</div>';
    s += '<div class="section--tight" style="padding-top:0"><div class="h-scroll" id="svcScroll">';
    var order = ['transaction', 'risk', 'people', 'it', 'branding', 'events', 'media', 'financial'];
    order.forEach(function (id) {
      var card = svcCard(id);
      s += '<div class="service-card" data-nav="/services/' + id + '">' +
        '<div class="service-card-body"><h3>' + esc(card.name) + '</h3><p>' + esc(card.desc) + '</p></div>' +
        '<img src="' + IMG_BY_ID[id] + '" alt="' + esc(card.name) + '"/>' +
        '<div class="go">' + ic('arrow') + '</div></div>';
    });
    s += '</div></div>';

    // CTA
    var cta = data().services.cta;
    s += '<div class="section section--tight"><div class="banner" style="background-image:url(' + IMG + 'getintouch-DIFl0tPW.png)">' +
      '<h2>' + esc(cta.question) + '</h2><p>' + esc(cta.title) + ' ' + esc(cta.description) + '</p>' +
      '<a class="btn btn--gold" data-nav="/contact">' + esc(cta.button) + '</a></div></div>';

    s += footerHtml();
    return s;
  }

  function btnRoute(i) {
    return [['/services'], ['/about'], ['/services'], ['/insights'], ['/contact']][i][0];
  }

  /* ---------- Page: ABOUT ---------- */
  function aboutPage() {
    var a = data().about;
    var s = '<div class="page-hero">' +
      '<div class="bg" style="background-image:url(' + IMG + 'aboutpage_hero-ITwpi-cf.png)"></div>' +
      '<div class="inner"><span class="eyebrow">' + esc(a.eyebrow) + '</span>' +
      '<h1>' + (a.hero.title1 || '') + '<span style="color:var(--gold)">' + (a.hero.title2 || '') + '</span>' + (a.hero.title3 || '') + '</h1></div></div>';

    s += '<div class="section">' + sectionTitle(null, esc(a.whoWeAre.title), null) +
      '<p class="muted mt-16" style="font-size:15px">' + esc(a.whoWeAre.description) + '</p></div>';

    // Mission / Vision / Promise
    var trio = [
      { t: a.whoWeAre.mission.title, d: a.whoWeAre.mission.description, i: IMG + 'our-mission-DILTye35.jpg' },
      { t: a.whoWeAre.vision.title, d: a.whoWeAre.vision.description, i: IMG + 'our-vision-CyBZ6DBN.jpg' },
      { t: a.whoWeAre.promise.title, d: a.whoWeAre.promise.description, i: IMG + 'our-promise-BkMlqx3q.jpg' }
    ];
    trio.forEach(function (x) {
      s += '<div class="section--tight"><div class="service-card" style="aspect-ratio:16/9">' +
        '<img src="' + x.i + '" alt="' + esc(x.t) + '"/>' +
        '<div class="service-card-body"><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p></div></div></div>';
    });

    // Different
    var d = a.different;
    s += '<div class="section">' + sectionTitle(null, esc(d.title), null) + '<div class="grid mt-16">';
    [
      { t: d.collaboration.title, d: d.collaboration.description },
      { t: d.bespoke.title, d: d.bespoke.description },
      { t: d.global.title, d: d.global.description }
    ].forEach(function (x) {
      s += '<div class="card" style="padding:18px 22px"><h3 style="font-size:16px;margin:0 0 4px">' + esc(x.t) + '</h3><p style="font-size:13.5px">' + esc(x.d) + '</p></div>';
    });
    s += '</div></div>';

    // Values
    var v = a.values;
    s += '<div class="section--tight">' + sectionTitle(null, esc(v.title), null) + '<div class="grid grid-2 mt-16">';
    [
      { t: v.collaboration.title, d: v.collaboration.description },
      { t: v.integrity.title, d: v.integrity.description },
      { t: v.excellence.title, d: v.excellence.description },
      { t: v.innovation.title, d: v.innovation.description }
    ].forEach(function (x) {
      s += '<div class="card"><h3 style="font-size:15px;margin:0 0 4px">' + esc(x.t) + '</h3><p style="font-size:13px">' + esc(x.d) + '</p></div>';
    });
    s += '</div></div>';

    s += '<div class="section section--tight"><a class="btn btn--gold btn--block" data-nav="/contact">' + esc(a.hero.button) + '</a></div>';
    s += footerHtml();
    return s;
  }

  /* ---------- Page: SERVICES ---------- */
  function servicesPage() {
    var ap = data().services;
    var order = ['transaction', 'risk', 'people', 'it', 'branding', 'events', 'media', 'financial'];
    var s = '<div class="page-hero">' +
      '<div class="bg" style="background-image:url(' + IMG + 'Rectangle_4525-C2UqiZDw.png)"></div>' +
      '<div class="inner"><span class="eyebrow">' + esc(ap.eyebrow) + '</span><h1>' + esc(ap.hero.titleLine1) + '<br/><span style="color:var(--gold)">' + esc(ap.hero.titleLine2) + '</span></h1></div></div>';
    s += '<div class="section">' + sectionTitle(null, esc(ap.title), ap.hero.description) + '</div>';

    s += '<div class="section--tight" style="padding-top:0"><div class="grid">';
    order.forEach(function (id) {
      var card = svcCard(id);
      var detail = svcById(id);
      s += '<div class="service-card" style="aspect-ratio:16/11" data-nav="/services/' + id + '">' +
        '<img src="' + IMG_BY_ID[id] + '" alt="' + esc(card.name) + '"/>' +
        '<div class="service-card-body"><h3>' + esc(card.name) + '</h3><p>' + esc(card.desc) + '</p></div>' +
        '<div class="go">' + ic('arrow') + '</div></div>';
    });
    s += '</div></div>';

    var cta = ap.cta;
    s += '<div class="section section--tight"><div class="banner" style="background-image:url(' + IMG + 'building-dCXhNQSh.png)">' +
      '<h2>' + esc(cta.question) + '</h2><p>' + esc(cta.title) + ' ' + esc(cta.description) + '</p>' +
      '<a class="btn btn--gold" data-nav="/contact">' + esc(cta.button) + '</a></div></div>';
    s += footerHtml();
    return s;
  }

  /* ---------- Page: SERVICE DETAIL ---------- */
  function servicePage(id) {
    var svc = svcById(id);
    if (!svc) return notFound(t('insights.articleNotFound'));
    var ap = data().services;
    var meta = svcMeta(id);
    var back = '<a class="back-link" data-nav="/services">' + ic('arrow') + t('services.backToOverview') + '</a>';

    var s = '<div class="page-hero">' +
      '<div class="bg" style="background-image:url(' + meta.img + ')"></div>' +
      '<div class="inner"><span class="eyebrow">' + esc(ap.eyebrow) + '</span>' +
      '<h1>' + esc(svc.name) + '</h1></div></div>';

    s += '<div class="section section--tight">' + back + '<p class="muted" style="font-size:15px">' + esc(svc.intro) + '</p></div>';

    // Sections
    if (svc.sections && svc.sections.length) {
      s += '<div class="section--tight">';
      svc.sections.forEach(function (sec) {
        s += '<h3 style="font-size:19px;margin:18px 0 4px">' + esc(sec.title) + '</h3>';
        if (sec.content) s += '<p class="muted" style="font-size:14px">' + esc(sec.content) + '</p>';
        s += listHtml(sec.list, 'mt-8');
      });
      s += '</div>';
    }

    // Benefits
    if (svc.benefits && svc.benefits.length) {
      s += '<div class="section--tight">' + sectionTitle(null, t('services.benefitsTitle') || 'Benefits', null) + listHtml(svc.benefits, 'mt-16') + '</div>';
    }
    // Features
    if (svc.features && svc.features.length) {
      s += '<div class="section--tight">' + sectionTitle(null, t('services.featuresTitle') || 'Key features', null) + listHtml(svc.features, 'mt-16') + '</div>';
    }
    // Process
    if (svc.process && svc.process.length) {
      s += '<div class="section--tight">' + sectionTitle(null, t('services.processTitle') || 'How we work', null) + '<div class="mt-16">';
      svc.process.forEach(function (st, i) {
        s += '<div class="step"><div class="step-num">' + (i + 1) + '</div><div><h4>' + esc(st.title) + '</h4><p>' + esc(st.description) + '</p></div></div>';
      });
      s += '</div></div>';
    }
    // FAQ
    if (svc.faq && svc.faq.length) {
      s += '<div class="section--tight">' + sectionTitle(null, t('services.faqTitle') || 'FAQ', null) + '<div class="mt-16">';
      svc.faq.forEach(function (f, i) {
        s += '<div class="acc' + (i === 0 ? ' open' : '') + '"><button class="acc-head">' + esc(f.q) + ic('plus') + '</button><div class="acc-body"><p>' + esc(f.a) + '</p></div></div>';
      });
      s += '</div></div>';
    }

    var cta = ap.cta;
    s += '<div class="section section--tight"><div class="banner" style="background-image:url(' + meta.img + ')">' +
      '<h2>' + esc(cta.question) + '</h2><p>' + esc(cta.description) + '</p>' +
      '<a class="btn btn--gold" data-nav="/contact">' + esc(cta.button) + '</a></div></div>';
    s += footerHtml();
    return s;
  }

  /* ---------- Page: INSIGHTS ---------- */
  function insightsPage() {
    var ip = data().insights;
    var order = ['article1', 'article2'];
    var s = '<div class="page-hero">' +
      '<div class="bg" style="background-image:url(' + IMG + 'blocks-DDuR37Oq.png)"></div>' +
      '<div class="inner"><span class="eyebrow">' + esc(ip.eyebrow) + '</span><h1>' + esc(ip.hero.titleLine1) + '<br/><span style="color:var(--gold)">' + esc(ip.hero.titleLine2) + '</span></h1></div></div>';
    s += '<div class="section">' + sectionTitle(null, null, ip.hero.description) + '</div>';

    var images = { article1: IMG + 'article1img-Ck9HHQW5.jpg', article2: IMG + 'article2img-D9cGoPSU.jpg' };
    s += '<div class="section--tight" style="padding-top:0"><div class="grid">';
    order.forEach(function (id) {
      var art = ip.articles[id];
      if (!art) return;
      s += '<div class="card" style="padding:0;overflow:hidden" data-nav="/insights/' + id + '">' +
        '<img src="' + images[id] + '" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover"/>' +
        '<div style="padding:18px 20px"><span class="pill">SIFA Insights</span>' +
        '<h3 style="font-size:18px;margin:10px 0 6px">' + esc(art.title) + '</h3>' +
        '<p style="font-size:13.5px">' + esc(art.metaDescription) + '</p>' +
        '<span class="mt-16" style="display:inline-flex;align-items:center;gap:8px;color:var(--gold);font-size:13.5px;font-weight:700">' + esc(ip.readMore) + ' ' + ic('arrow') + '</span></div></div>';
    });
    s += '</div></div>';
    s += '<div class="section section--tight"><a class="btn btn--outline btn--block" data-nav="/contact">' + esc(t('contact.hero.button')) + '</a></div>';
    s += footerHtml();
    return s;
  }

  /* ---------- Page: ARTICLE ---------- */
  function articlePage(id) {
    var ip = data().insights;
    var art = ip.articles[id];
    if (!art) return notFound(ip.articleNotFound || 'Article not found');
    var back = '<a class="back-link" data-nav="/insights">' + ic('arrow') + esc(ip.backToInsights || 'Back to Insights') + '</a>';
    var images = { article1: IMG + 'article1img-Ck9HHQW5.jpg', article2: IMG + 'article2img-D9cGoPSU.jpg' };
    var s = '<div class="section">' + back + '<span class="pill">SIFA Insights</span>' +
      '<h1 style="font-size:24px;margin:14px 0">' + esc(art.title) + '</h1>' +
      '<img class="article-hero-img" src="' + images[id] + '" alt="' + esc(art.imageAlt || art.title) + '"/>' +
      '<div class="article-body">' + articleBody(art.content) + '</div></div>';
    s += '<div class="section section--tight"><div class="banner" style="background-image:url(' + IMG + 'greenline-Bmxs4R9c.png)">' +
      '<h2>' + esc(t('contact.hero.title')) + '</h2><p>' + esc(t('contact.hero.description')) + '</p>' +
      '<a class="btn btn--gold" data-nav="/contact">' + esc(t('contact.hero.button')) + '</a></div></div>';
    s += footerHtml();
    return s;
  }

  function articleBody(c) {
    if (!c) return '';
    var out = '';
    Object.keys(c).forEach(function (k) {
      var v = c[k];
      if (/^h\d$/.test(k)) out += '<h' + k[1] + '>' + esc(v) + '</h' + k[1] + '>';
      else if (/^li\d+$/.test(k)) out += '<ul><li>' + esc(v) + '</li></ul>';
      else if (/^p\d+$/.test(k)) out += '<p>' + esc(v) + '</p>';
    });
    return out;
  }

  /* ---------- Page: CONTACT ---------- */
  function contactPage() {
    var c = data().contact;
    var common = data().common;
    var wa = c.form.whatsappLink || 'https://wa.me/966531687985';
    var days = c.form.days ? Object.keys(c.form.days) : [];
    var s = '<div class="page-hero">' +
      '<div class="bg" style="background-image:url(' + IMG + 'clocktower-DuY2Bv8y.png)"></div>' +
      '<div class="inner"><span class="eyebrow">' + esc(c.eyebrow) + '</span><h1>' + esc(c.hero.title) + '</h1>' +
      '<p class="muted mt-8" style="font-size:14px">' + esc(c.hero.description) + '</p></div></div>';

    // Form
    s += '<div class="section"><form id="contactForm" novalidate>' +
      '<h2 style="font-size:20px">' + esc(c.form.title) + '</h2>' +
      '<p class="muted mt-8 mb-16" style="font-size:14px">' + esc(c.form.description) + '</p>' +
      '<input class="field" type="text" name="name" placeholder="' + esc(c.form.name) + '" required/>' +
      '<input class="field" type="tel" name="phone" placeholder="' + esc(c.form.phone) + '" required/>' +
      '<input class="field" type="email" name="email" placeholder="' + esc(c.form.email) + '" required/>' +
      '<input class="field" type="text" name="website" placeholder="' + esc(c.form.website) + '"/>' +
      '<label class="muted" style="font-size:13px;display:block;margin-bottom:8px">' + esc(c.form.services) + '</label>' +
      '<div class="chips" id="svcChips"></div>' +
      '<textarea class="field" name="challenges" placeholder="' + esc(c.form.challenges) + '" required></textarea>' +
      '<label class="muted" style="font-size:13px;display:block;margin-bottom:8px">' + esc(c.form.contactDay) + '</label>' +
      '<select class="field" name="day"><option value="">' + esc(c.form.contactDayPlaceholder) + '</option>' +
      days.map(function (d) { return '<option value="' + d + '">' + esc(c.form.days[d]) + '</option>'; }).join('') +
      '</select>' +
      '<button class="btn btn--gold btn--block btn--lg mt-16" type="submit">' + esc(c.form.submit) + '</button>' +
      '<div class="divider"></div>' +
      '<a class="btn btn--block btn--lg whatsapp-btn" href="' + wa + '" target="_blank">' + ic('wa') + esc(c.form.whatsappButton) + '</a>' +
      '</form></div>';

    // Info
    s += '<div class="section section--tight"><div class="contact-info-card">' +
      '<h3>' + ic('pin') + esc(c.info.officeAddress) + '</h3><p>' + esc(common.officeAddress) + '</p>' +
      '<div class="divider"></div>' +
      '<h3>' + ic('mail') + esc(c.info.email) + '</h3><p>' + esc(common.email) + '</p>' +
      '<div class="divider"></div>' +
      '<h3>' + ic('phone') + esc(c.info.phone) + '</h3><p>' + esc(common.phone2) + '</p></div></div>';

    // Map
    s += '<div class="section section--tight"><div class="service-card" style="aspect-ratio:16/10" data-nav="">' +
      '<img src="' + IMG + 'sifamap-ByaAXBHt.png" alt="' + esc(c.images.locationMap) + '"/>' +
      '<div class="service-card-body"><p style="font-size:13px">' + esc(c.mapHeading) + '</p>' +
      '<a class="btn btn--gold" style="margin-top:8px" href="https://maps.google.com/?q=' + encodeURIComponent(common.officeAddress) + '" target="_blank">' + esc(c.clickToViewMap) + '</a></div></div></div>';

    s += footerHtml();
    return s;
  }

  /* ---------- Page: PRICING ---------- */
  function pricingPage() {
    var p = data().pricing;
    var start = p.startingFrom || 'Starting from';
    var s = '<div class="page-hero">' +
      '<div class="bg" style="background-image:url(' + IMG + 'building-dCXhNQSh.png)"></div>' +
      '<div class="inner"><span class="eyebrow">SIFA</span><h1>' + esc(p.title) + '</h1></div></div>';
    s += '<div class="section">' + sectionTitle(null, esc(p.subtitle), null) + '<div class="grid mt-16">';
    var order = ['consulting', 'branding', 'media', 'events'];
    order.forEach(function (k, i) {
      var srv = p.services[k];
      if (!srv) return;
      s += '<div class="price-card' + (i === 0 ? ' featured' : '') + '">' +
        '<span class="name">' + esc(srv.name) + '</span>' +
        '<p class="muted" style="font-size:13.5px">' + esc(srv.description) + '</p>' +
        '<span class="price">' + esc(srv.price) + '</span>' +
        '<span class="note">' + esc(start) + ' ' + esc(srv.priceUpTo) + '</span>' +
        '<ul>' + listHtml([t('contact.hero.description')].slice(0, 1)) + '</ul>' +
        '<a class="btn btn--outline mt-16" data-nav="/contact">' + esc(t('contact.hero.button')) + '</a></div>';
    });
    s += '</div></div>';
    s += '<div class="section section--tight"><div class="banner" style="background-image:url(' + IMG + 'getintouch_building-Cf8GfU05.png)">' +
      '<h2>' + esc(t('contact.hero.title')) + '</h2><p>' + esc(t('contact.hero.description')) + '</p>' +
      '<a class="btn btn--gold" data-nav="/contact">' + esc(t('contact.hero.button')) + '</a></div></div>';
    s += footerHtml();
    return s;
  }

  function notFound(msg) {
    return '<div class="section center" style="padding-top:40vh"><h1 style="font-size:22px">' + esc(msg) + '</h1>' +
      '<a class="btn btn--gold mt-24" data-nav="/home">' + esc(t('nav.home')) + '</a></div>';
  }

  /* ---------- Page interactions ---------- */
  function bindPage() {
    // navigation clicks
    var navEls = view.querySelectorAll('[data-nav]');
    Array.prototype.forEach.call(navEls, function (el) {
      el.addEventListener('click', function (e) {
        var target = el.getAttribute('data-nav');
        if (target && target.charAt(0) === '/') {
          e.preventDefault();
          navTo(target);
        }
      });
    });
    // accordion
    var accs = view.querySelectorAll('.acc-head');
    Array.prototype.forEach.call(accs, function (head) {
      head.addEventListener('click', function () {
        var parent = head.parentElement;
        var body = parent.querySelector('.acc-body');
        var open = parent.classList.toggle('open');
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0';
      });
    });
    // hero slider
    var dots = view.querySelectorAll('[data-dot]');
    var slides = view.querySelectorAll('.hero-slide');
    if (dots.length && slides.length) {
      var cur = 0;
      var go = function (n) {
        cur = (n + slides.length) % slides.length;
        Array.prototype.forEach.call(slides, function (s, i) { s.classList.toggle('active', i === cur); });
        Array.prototype.forEach.call(dots, function (d, i) { d.classList.toggle('active', i === cur); });
      };
      Array.prototype.forEach.call(dots, function (d) {
        d.addEventListener('click', function () { go(parseInt(d.getAttribute('data-dot'), 10)); });
      });
      if (state.timer) clearInterval(state.timer);
      state.timer = setInterval(function () { go(cur + 1); }, 6500);
    }
    // contact form
    var form = view.querySelector('#contactForm');
    if (form) bindForm(form);
    // service chips
    var chips = view.querySelector('#svcChips');
    if (chips) bindChips(chips);
    // showreel modal
    var playBtn = view.querySelector('.play-btn');
    if (playBtn) playBtn.addEventListener('click', openShowreel);
  }

  function openShowreel() {
    var modal = document.getElementById('videoModal');
    var frame = document.getElementById('videoFrame');
    if (!modal || !frame) return;
    frame.innerHTML = '<iframe src="https://youtube.com/embed/MTbUohEeSfw?si=OCDUids2MsdnvraS&autoplay=1&rel=0&modestbranding=1&showinfo=0" title="SIFA Showreel" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeShowreel() {
    var modal = document.getElementById('videoModal');
    var frame = document.getElementById('videoFrame');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (frame) frame.innerHTML = '';
  }

  function bindChips(container) {
    var keys = ['transaction', 'risk', 'people', 'it', 'branding', 'events', 'media', 'financial'];
    keys.forEach(function (k) {
      var label = svcLabel(k);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = label;
      b.addEventListener('click', function () { b.classList.toggle('sel'); });
      container.appendChild(b);
    });
  }

  function bindForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name=name]').value.trim();
      var phone = form.querySelector('[name=phone]').value.trim();
      if (!name || !phone) { toast(t('contact.form.errorRequired') || 'Please fill required fields.'); return; }
      var wa = data().contact.form.whatsappLink || 'https://wa.me/966531687985';
      var day = form.querySelector('[name=day]').value;
      var challenges = form.querySelector('[name=challenges]').value.trim();
      var msg = encodeURIComponent('Hello SIFA, I am ' + name + ' (tel: ' + phone + ').' + (challenges ? ' ' + challenges : '') + (day ? ' Preferred day: ' + day : ''));
      window.open(wa + '?text=' + msg, '_blank');
      toast(t('contact.form.success') || 'Thank you! We will get back to you soon.');
    });
  }

  /* ---------- UI chrome ---------- */
  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(state.toastT);
    state.toastT = setTimeout(function () { el.classList.remove('show'); }, 3200);
  }

  var menuEl = document.getElementById('menu');
  var menuBtn = document.getElementById('menuBtn');
  var header = document.getElementById('header');
  var langBtn = document.getElementById('langBtn');
  var tabbar = document.getElementById('tabbar');

  function closeMenu() {
    menuEl.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', function () {
    var open = menuEl.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuEl.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  langBtn.addEventListener('click', function () {
    state.lang = state.lang === 'en' ? 'ar' : 'en';
    try { localStorage.setItem('sifa_lang', state.lang); } catch (e) {}
    langBtn.textContent = state.lang === 'en' ? 'عربي' : 'English';
    render();
  });

  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
    var h = document.documentElement;
    var pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100;
    document.getElementById('scrollbar').style.width = Math.min(pct, 100) + '%';
  });

  function updateTabbar() {
    var route = state.route;
    var tabs = tabbar.querySelectorAll('.tab');
    Array.prototype.forEach.call(tabs, function (t) {
      var nav = t.getAttribute('data-nav');
      var active = (route === nav) || (route === '/services' && nav === '/services') || (route === '/insights' && nav === '/insights');
      t.classList.toggle('active', active);
    });
    var links = menuEl.querySelectorAll('.menu-link');
    Array.prototype.forEach.call(links, function (l) {
      var nav = l.getAttribute('data-nav');
      l.classList.toggle('active', route === nav || (route === '/services' && nav === '/services'));
    });
  }

  /* ---------- Init ---------- */
  try { state.lang = localStorage.getItem('sifa_lang') || 'en'; } catch (e) {}
  if (state.lang !== 'en' && state.lang !== 'ar') state.lang = 'en';
  langBtn.textContent = state.lang === 'en' ? 'عربي' : 'English';

  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '#/home';
  render();
})();
