/* =====================================================================
   SAF Logistics — static build interactivity
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Inline SVG icon set (ported from components/ui/Icon.tsx) ---------- */
  var ICONS = {
    Truck: '<path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    Shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    Tag: '<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.5"/>',
    Headset: '<path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v4a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2z"/><path d="M20 13v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2z"/>',
    Globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
    Cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    Phone: '<path d="M5 4h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    Mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/>',
    MapPin: '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    Clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    Moon: '<path d="M21 13A9 9 0 0 1 11 3a7 7 0 1 0 10 10z"/>',
    Check: '<path d="M4 12l5 5L20 6"/>',
    X: '<path d="M6 6l12 12M18 6L6 18"/>',
    ArrowRight: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    ChevronDown: '<path d="M6 9l6 6 6-6"/>',
    Plane: '<path d="M10 13L3 10l2-2 6 1 4-5 2 1-2 6 5 4-1 2-6-2-3 7-2-1z"/>',
    Ship: '<path d="M3 17l3-6h12l3 6"/><path d="M5 17s2 3 7 3 7-3 7-3"/><path d="M12 3v8"/><path d="M8 7h8"/>',
    Sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
    Lightning: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    Plus: '<path d="M12 5v14M5 12h14"/>',
    Star: '<path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.1 21.9l1.1-6.5L2.5 10.7l6.5-.9z"/>'
  };

  function svgIcon(name, size) {
    size = size || 20;
    return (
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || "") +
      "</svg>"
    );
  }

  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      if (el.dataset.done) return;
      el.innerHTML = svgIcon(el.dataset.icon, parseInt(el.dataset.size || "20", 10));
      el.dataset.done = "1";
    });
  }

  /* ---------- Flags ---------- */
  var PNG_FLAGS = { ae:1, de:1, gb:1, in:1, jp:1, kr:1, kz:1, ru:1, tr:1, us:1, uz:1, cn:1 };
  function flagMarkup(code, w, square) {
    var lc = (code || "").toLowerCase();
    var h = square ? w : Math.round(w * 0.66);
    if (PNG_FLAGS[lc]) {
      return '<img class="flag" src="images/' + lc + '.png" alt="' + code + '" width="' + w + '" height="' + h + '" style="width:' + w + 'px;height:' + h + 'px;border-radius:' + (square ? "0.4rem" : "3px") + '">';
    }
    return '<span aria-label="' + code + '" style="font-size:' + w + 'px;line-height:1">🌐</span>';
  }
  function hydrateFlags(root) {
    (root || document).querySelectorAll("[data-flag]").forEach(function (el) {
      if (el.dataset.done) return;
      el.innerHTML = flagMarkup(el.dataset.flag, parseInt(el.dataset.w || "24", 10), el.dataset.square === "1");
      el.dataset.done = "1";
    });
  }

  /* ---------- i18n ---------- */
  var LOCALES = ["uz", "ru", "en"];
  var LOCALE_NAMES = { uz: "O‘zbekcha", ru: "Русский", en: "English" };
  var LOCALE_FLAG = { uz: "uz", ru: "ru", en: "gb" };
  var HTML_LANG = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };
  var I18N = window.SAF_I18N || {};
  var SITE = window.SAF_SITE || {};

  function getLocale() {
    var url = new URLSearchParams(location.search).get("lang");
    if (url && LOCALES.indexOf(url) >= 0) return url;
    try {
      var s = localStorage.getItem("saf-lang");
      if (s && LOCALES.indexOf(s) >= 0) return s;
    } catch (e) {}
    return "uz";
  }
  function resolve(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? undefined : o[k];
    }, obj);
  }
  function t(path) {
    var v = resolve(I18N[currentLocale], path);
    return v == null ? "" : v;
  }

  var currentLocale = getLocale();

  function applyI18n() {
    var dict = I18N[currentLocale];
    if (!dict) return;
    document.documentElement.lang = HTML_LANG[currentLocale];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = resolve(dict, el.getAttribute("data-i18n"));
      if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = resolve(dict, el.getAttribute("data-i18n-html"));
      if (typeof val === "string") el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var kv = pair.split(":");
        var attr = kv[0].trim();
        var val = resolve(dict, kv[1].trim());
        if (typeof val === "string") el.setAttribute(attr, val);
      });
    });

    // Update locale switcher button label + flag
    document.querySelectorAll(".locale-btn").forEach(function (btn) {
      var codeEl = btn.querySelector(".code");
      if (codeEl) codeEl.textContent = currentLocale;
      var fl = btn.querySelector("[data-flag]");
      if (fl) {
        fl.dataset.flag = LOCALE_FLAG[currentLocale];
        fl.dataset.done = "";
        hydrateFlags(btn);
      }
    });
    document.querySelectorAll(".locale-menu button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.locale === currentLocale);
    });

    // Re-render dynamic collections that depend on language
    renderDynamic();
  }

  function setLocale(loc) {
    if (LOCALES.indexOf(loc) < 0) return;
    currentLocale = loc;
    try { localStorage.setItem("saf-lang", loc); } catch (e) {}
    applyI18n();
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    var r = document.documentElement;
    r.classList.toggle("dark", theme === "dark");
    r.style.colorScheme = theme;
  }
  function initTheme() {
    var stored = "light";
    try { stored = localStorage.getItem("saf-theme") || "light"; } catch (e) {}
    applyTheme(stored);
    updateThemeIcons(stored);
  }
  function updateThemeIcons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.innerHTML = svgIcon(theme === "dark" ? "Sun" : "Moon", 18);
    });
  }
  function toggleTheme() {
    var isDark = document.documentElement.classList.contains("dark");
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("saf-theme", next); } catch (e) {}
    updateThemeIcons(next);
  }

  /* ---------- Dynamic collections (flags, network, testimonials, faq) ---------- */
  function renderDynamic() {
    renderNetwork();
    renderCountryCards();
    renderTestimonials();
    renderFaq();
    hydrateIcons();
    hydrateFlags();
  }

  /* Country cards (featured 4 + others tags) */
  function renderCountryCards() {
    var grid = document.getElementById("country-grid");
    if (!grid) return;
    var featuredCodes = ["CN", "UZ", "RU", "TR"];
    var countries = SITE.partnerCountries || [];
    var g = t("globe");
    var featured = featuredCodes.map(function (c) {
      return countries.filter(function (x) { return x.code === c; })[0];
    }).filter(Boolean);
    grid.innerHTML = featured.map(function (c) {
      var isHub = !!c.hub;
      return (
        '<div class="country-card' + (isHub ? " hub" : "") + '">' +
          '<div class="top">' +
            '<span data-flag="' + c.code.toLowerCase() + '" data-w="32"></span>' +
            (isHub
              ? '<span class="hub-tag"><span data-icon="MapPin" data-size="10"></span>' + (g.hubTag || "HUB") + "</span>"
              : '<span class="arrow-btn"><span data-icon="ArrowRight" data-size="11"></span></span>') +
          "</div>" +
          '<div class="cname">' + c.name + "</div>" +
          '<div class="ccode">' + c.code + "</div>" +
        "</div>"
      );
    }).join("");

    var tagsWrap = document.getElementById("country-tags");
    if (tagsWrap) {
      var others = countries.filter(function (c) {
        return featuredCodes.indexOf(c.code) < 0 && !c.hub;
      });
      tagsWrap.innerHTML = others.map(function (c) {
        return '<span class="country-tag"><span data-flag="' + c.code.toLowerCase() + '" data-w="16"></span>' + c.name + "</span>";
      }).join("");
    }
    hydrateIcons(grid);
    hydrateFlags(grid);
  }

  /* Network diagram (SVG arcs + nodes) */
  var VBW = 900, VBH = 560, CX = 450, CY = 280, RX = 320, RY = 200;
  function renderNetwork() {
    var host = document.getElementById("network-diagram");
    if (!host) return;
    var countries = SITE.partnerCountries || [];
    var hub = countries.filter(function (c) { return c.hub; })[0];
    var partners = countries.filter(function (c) { return !c.hub; });
    var g = t("globe");

    var positions = partners.map(function (p, i) {
      var angle = (i / partners.length) * Math.PI * 2 - Math.PI / 2;
      var x = CX + Math.cos(angle) * RX;
      var y = CY + Math.sin(angle) * RY;
      return { code: p.code, name: p.name, x: x, y: y, leftPct: (x / VBW) * 100, topPct: (y / VBH) * 100 };
    });

    var arcs = positions.map(function (p, i) {
      var dx = p.x - CX, dy = p.y - CY;
      var len = Math.hypot(dx, dy) || 1;
      var lift = 80;
      var midX = CX + dx * 0.5 - (dy / len) * lift * 0.3;
      var midY = CY + dy * 0.5 + (dx / len) * lift * 0.3 - lift;
      return '<path d="M ' + CX + " " + CY + " Q " + midX + " " + midY + " " + p.x + " " + p.y + '" fill="none" stroke="url(#arc-grad)" stroke-width="1.5" stroke-linecap="round" class="route-line" style="animation-delay:' + (i * 0.12) + 's"/>';
    }).join("");

    var dots = positions.map(function (p) {
      return (
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="14" fill="none" stroke="var(--brand-500)" stroke-opacity="0.35" stroke-width="1"><animate attributeName="r" values="14;22;14" dur="2.6s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="2.6s" repeatCount="indefinite"/></circle>' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="9" fill="var(--brand-700)"/>' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="3" fill="#fff"/>'
      );
    }).join("");

    var svg =
      '<svg viewBox="0 0 ' + VBW + " " + VBH + '" aria-hidden="true">' +
        "<defs>" +
          '<radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0%" stop-color="var(--brand-500)" stop-opacity="0.55"/>' +
            '<stop offset="60%" stop-color="var(--brand-500)" stop-opacity="0.15"/>' +
            '<stop offset="100%" stop-color="var(--brand-500)" stop-opacity="0"/>' +
          "</radialGradient>" +
          '<linearGradient id="arc-grad" gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="var(--brand-500)" stop-opacity="0.85"/>' +
            '<stop offset="100%" stop-color="var(--brand-500)" stop-opacity="0.25"/>' +
          "</linearGradient>" +
        "</defs>" +
        '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + (RX + 40) + '" ry="' + (RY + 28) + '" fill="none" stroke="var(--brand-500)" stroke-opacity="0.12"/>' +
        '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + RX + '" ry="' + RY + '" fill="none" stroke="var(--brand-500)" stroke-opacity="0.22" stroke-dasharray="2 8"/>' +
        '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + (RX - 90) + '" ry="' + (RY - 56) + '" fill="none" stroke="var(--brand-500)" stroke-opacity="0.14"/>' +
        '<circle cx="' + CX + '" cy="' + CY + '" r="160" fill="url(#hub-glow)"/>' +
        arcs +
        '<circle cx="' + CX + '" cy="' + CY + '" r="36" fill="var(--brand-700)"/>' +
        '<circle cx="' + CX + '" cy="' + CY + '" r="36" fill="none" stroke="var(--brand-500)" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="3 5"><animateTransform attributeName="transform" type="rotate" from="0 ' + CX + " " + CY + '" to="360 ' + CX + " " + CY + '" dur="20s" repeatCount="indefinite"/></circle>' +
        '<circle cx="' + CX + '" cy="' + CY + '" r="36" fill="none" stroke="var(--brand-500)" stroke-opacity="0.4"><animate attributeName="r" values="36;52;36" dur="2.4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite"/></circle>' +
        dots +
      "</svg>";

    var labels =
      '<div class="net-labels">' +
        '<div class="hub-label">' +
          '<div class="hub-flag"><span data-flag="' + (hub ? hub.code.toLowerCase() : "cn") + '" data-w="40" data-square="1"></span></div>' +
          '<div class="hub-pill">' + (hub ? hub.name : "China") + " · " + (g.hubTag || "HUB") + "</div>" +
        "</div>" +
        positions.map(function (p) {
          return (
            '<div class="net-node" style="left:' + p.leftPct + "%;top:" + p.topPct + '%">' +
              '<span class="net-chip"><span data-flag="' + p.code.toLowerCase() + '" data-w="14"></span>' + p.code + "</span>" +
            "</div>"
          );
        }).join("") +
      "</div>";

    host.innerHTML = svg + labels;
    hydrateFlags(host);
    hydrateIcons(host);
  }

  /* Testimonials (enhancement — data exists in dictionary) */
  function renderTestimonials() {
    var wrap = document.getElementById("testimonials-grid");
    if (!wrap) return;
    var items = t("testimonials.items") || [];
    wrap.innerHTML = items.map(function (it) {
      var stars = "";
      var full = Math.round(parseFloat(it.rating));
      for (var i = 0; i < 5; i++) {
        var filled = i < full;
        stars +=
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="' + (filled ? "#f5b301" : "none") +
          '" stroke="' + (filled ? "#f5b301" : "var(--border-strong)") +
          '" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true">' + ICONS.Star + "</svg>";
      }
      return (
        '<figure class="why-card" style="padding:1.75rem">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">' +
            '<span class="tier-badge" style="position:static">' + it.badge + "</span>" +
            '<div style="display:flex;gap:2px">' + stars + "</div>" +
          "</div>" +
          '<blockquote style="margin-top:1.25rem;font-size:1rem;line-height:1.7;color:var(--foreground)">“' + it.quote + '”</blockquote>' +
          '<figcaption style="margin-top:1.5rem;display:flex;align-items:center;gap:0.75rem">' +
            '<span class="icon-badge" style="height:2.75rem;width:2.75rem;font-weight:600">' + it.name.charAt(0) + "</span>" +
            "<span><strong style=\"display:block;color:var(--foreground)\">" + it.name + "</strong><span style=\"font-size:0.8rem;color:var(--muted)\">" + it.role + "</span></span>" +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");
    hydrateIcons(wrap);
  }

  /* FAQ accordion (enhancement — data exists in dictionary) */
  function renderFaq() {
    var wrap = document.getElementById("faq-list");
    if (!wrap) return;
    var items = t("faq.items") || [];
    wrap.innerHTML = items.map(function (it, i) {
      return (
        '<div class="faq-item card" style="overflow:hidden;box-shadow:none">' +
          '<button class="faq-q" aria-expanded="false" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 1.5rem;text-align:left;font-weight:600;color:var(--foreground)">' +
            "<span>" + it.q + "</span>" +
            '<span class="faq-ico" style="flex-shrink:0;color:var(--brand-600);transition:transform 0.3s">' + svgIcon("Plus", 18) + "</span>" +
          "</button>" +
          '<div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.35s ease"><p style="padding:0 1.5rem 1.25rem;color:var(--muted);line-height:1.7">' + it.a + "</p></div>" +
        "</div>"
      );
    }).join("");
    wrap.querySelectorAll(".faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = btn.nextElementSibling;
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.querySelector(".faq-ico").style.transform = open ? "rotate(0deg)" : "rotate(135deg)";
        panel.style.maxHeight = open ? "0" : panel.scrollHeight + "px";
      });
    });
  }

  /* ---------- Hero particles ---------- */
  function renderParticles() {
    var host = document.getElementById("hero-particles");
    if (!host) return;
    var COUNT = 36, html = "";
    for (var i = 0; i < COUNT; i++) {
      var seed = i * 9301 + 49297;
      var r1 = ((seed * 233280 + 1) % 1000) / 1000;
      var r2 = ((seed * 16807 + 1) % 1000) / 1000;
      var r3 = ((seed * 65539 + 1) % 1000) / 1000;
      var r4 = ((seed * 1103515245 + 12345) % 1000) / 1000;
      var r5 = ((seed * 22695477 + 1) % 1000) / 1000;
      var size = 1 + r3 * 2;
      html +=
        '<span class="particle" style="left:' + r1 * 100 + "%;top:" + r2 * 100 + "%;width:" + size + "px;height:" + size +
        "px;animation-duration:" + (6 + r3 * 9) + "s;animation-delay:" + r5 * 9 + "s;--dx:" + (r4 - 0.5) * 80 + 'px"></span>';
    }
    host.innerHTML = html;
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(function (e) { io.observe(e); });

    // Animate about progress bar when visible
    var prog = document.querySelector(".progress span");
    if (prog) {
      var pio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { prog.style.width = "92%"; pio.disconnect(); }
        });
      }, { threshold: 0.4 });
      pio.observe(prog);
    }
  }

  /* ---------- Navbar scroll ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 16); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var burger = document.querySelector(".nav-burger");
    var menu = document.querySelector(".mobile-menu");
    if (!burger || !menu) return;
    function close() { document.body.classList.remove("menu-open"); }
    burger.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
    });
    menu.querySelectorAll("a, [data-menu-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
  }

  /* ---------- Locale dropdown ---------- */
  function initLocale() {
    document.querySelectorAll(".locale").forEach(function (root) {
      var btn = root.querySelector(".locale-btn");
      var menu = root.querySelector(".locale-menu");
      if (!btn || !menu) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("open");
      });
      menu.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          setLocale(b.dataset.locale);
          menu.classList.remove("open");
        });
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll(".locale-menu.open").forEach(function (m) { m.classList.remove("open"); });
    });
  }

  /* ---------- Quote modal ---------- */
  function initModal() {
    var modal = document.getElementById("quote-modal");
    if (!modal) return;
    function open() { modal.classList.add("open"); document.body.style.overflow = "hidden"; }
    function close() { modal.classList.remove("open"); document.body.style.overflow = ""; }
    document.querySelectorAll("[data-open-quote]").forEach(function (b) {
      b.addEventListener("click", function () { document.body.classList.remove("menu-open"); open(); });
    });
    modal.querySelectorAll("[data-close-quote]").forEach(function (b) {
      b.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Forms → POST /api/lead (Telegram), graceful fallback ---------- */
  function digits(s) { return (s || "").replace(/\D/g, ""); }

  function leadSource(form) {
    if (form.hasAttribute("data-modal-close")) return "quote";
    if (form.querySelector('textarea[name="message"]')) return "contact";
    return "newsletter";
  }

  function submitLead(form) {
    var nameEl = form.querySelector('input[name="name"]');
    var phoneEl = form.querySelector('input[name="phone"]');
    var dialEl = form.querySelector('select[name="dialcode"]');
    var msgEl = form.querySelector('textarea[name="message"]');
    var dial = dialEl ? dialEl.value : "+998";
    var phone = dial + " " + (phoneEl ? phoneEl.value : "");
    var payload = {
      source: leadSource(form),
      name: nameEl ? nameEl.value.trim() : "",
      phone: phone.trim(),
      message: msgEl ? msgEl.value.trim() : undefined,
      locale: currentLocale,
      page: location.pathname
    };
    // Fire-and-forget: delivers the lead when the API is reachable, and never
    // blocks the visitor's success UX when the site is served purely static.
    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      }).then(function (r) {
        if (!r.ok) console.warn("[SAF] lead API responded", r.status);
      }).catch(function (err) {
        console.warn("[SAF] lead API unreachable (static mode):", err && err.message);
      });
    } catch (e) { /* older browsers: ignore, still show success */ }
  }

  function initForms() {
    document.querySelectorAll("form[data-lead]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var phoneInput = form.querySelector('input[name="phone"]');
        var errEl = form.querySelector(".phone-error");
        if (phoneInput && digits(phoneInput.value).length < 7) {
          if (errEl) errEl.style.display = "block";
          phoneInput.focus();
          return;
        }
        if (errEl) errEl.style.display = "none";
        var ok = form.querySelector(".form-alert.ok");
        var err = form.querySelector(".form-alert.err");
        if (err) err.classList.remove("show");
        var submit = form.querySelector('[type="submit"]');
        if (submit) submit.setAttribute("disabled", "true");

        submitLead(form);

        // Confirm to the visitor after a short beat (matches original UX).
        setTimeout(function () {
          if (submit) submit.removeAttribute("disabled");
          if (ok) {
            ok.classList.add("show");
            setTimeout(function () { ok.classList.remove("show"); }, 4000);
          }
          form.reset();
          // reset phone country prefix default
          var sel = form.querySelector(".phone select");
          if (sel) sel.value = "+998";
          if (form.hasAttribute("data-modal-close")) {
            setTimeout(function () {
              var m = document.getElementById("quote-modal");
              if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
            }, 1600);
          }
        }, 700);
      });
    });
  }

  /* ---------- Background hero/CTA video (all viewports, lazy) ---------- */
  function initVideos() {
    // Respect data-saver and reduced-motion: keep the poster image only.
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    var saveData = !!(conn && conn.saveData);
    if (reduce || saveData) return;

    var desktopMq = window.matchMedia("(min-width: 640px)");

    function load(v) {
      if (v.dataset.loaded) return;
      // Pick a lighter source on small screens when one is provided.
      var mobileSrc = v.getAttribute("data-src-mobile");
      var src = (!desktopMq.matches && mobileSrc) ? mobileSrc : v.getAttribute("data-src");
      if (!src) return;
      var s = document.createElement("source");
      s.src = src; s.type = "video/mp4";
      v.appendChild(s);
      v.load();
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {}); // ignore autoplay rejection; poster stays
      v.dataset.loaded = "1";
      v.style.display = "block";
    }

    var vids = document.querySelectorAll("video[data-bg-video]");
    // Load lazily so the poster paints first and heavy CTA video waits until near view.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { load(en.target); io.unobserve(en.target); }
        });
      }, { rootMargin: "200px 0px" });
      vids.forEach(function (v) { io.observe(v); });
    } else {
      vids.forEach(load);
    }
  }

  /* ---------- Misc ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    // Screenshot/preview mode: force reveals visible + natural hero height (?ss=1)
    if (new URLSearchParams(location.search).get("ss") === "1") {
      document.documentElement.classList.add("ss");
    }
    initTheme();
    var themeQ = new URLSearchParams(location.search).get("theme");
    if (themeQ === "dark" || themeQ === "light") { applyTheme(themeQ); updateThemeIcons(themeQ); }
    hydrateIcons();
    hydrateFlags();
    renderParticles();
    applyI18n(); // also triggers renderDynamic()
    initNav();
    initMenu();
    initLocale();
    initModal();
    initForms();
    initVideos();
    initReveal();
    initYear();

    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.addEventListener("click", toggleTheme);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
