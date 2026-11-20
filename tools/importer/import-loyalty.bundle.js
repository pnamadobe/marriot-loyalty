/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-loyalty.js
  var import_loyalty_exports = {};
  __export(import_loyalty_exports, {
    default: () => import_loyalty_default
  });

  // tools/importer/parsers/hero-overlay.js
  function parse(element, { document }) {
    const cells = [];
    const img = element.querySelector(".hb-item picture img, .hb-item img.hb__img");
    if (img) {
      const image = document.createElement("img");
      image.src = img.getAttribute("src");
      image.alt = img.getAttribute("alt") || "";
      cells.push([image]);
    } else {
      cells.push([""]);
    }
    const content = [];
    const srcHeading = element.querySelector(".hb__heading");
    if (srcHeading) {
      const level = element.querySelector(".hero-3x1") ? "h1" : "h2";
      const h = document.createElement(level);
      h.textContent = srcHeading.textContent.trim();
      content.push(h);
    }
    const sub = element.querySelector(".hb__subheading");
    if (sub) {
      const p = document.createElement("p");
      p.textContent = sub.textContent.trim();
      content.push(p);
    }
    const buttons = [...element.querySelectorAll(".flexLayout a")];
    if (buttons.length) {
      const p = document.createElement("p");
      buttons.forEach((btn, i) => {
        const a = document.createElement("a");
        a.href = btn.getAttribute("href");
        a.textContent = btn.textContent.trim();
        const isPrimary = /primary/.test(btn.className) || i === 0 && !/secondary/.test(btn.className);
        const wrap = document.createElement(isPrimary ? "strong" : "em");
        wrap.append(a);
        if (i > 0) p.append(" ");
        p.append(wrap);
      });
      content.push(p);
    }
    const caption = [...element.querySelectorAll(".hb__cnt-sec > a")].find((a) => a.textContent.trim());
    if (caption) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = caption.getAttribute("href");
      a.textContent = caption.textContent.trim();
      p.append(a);
      content.push(p);
    }
    cells.push([content]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-icon-panel.js
  var FALLBACK_PANELS = {
    "Member": {
      eyebrow: "0-9 nights per year",
      title: "Member",
      tagline: "The possibilities (and points) are endless",
      features: [
        ["wifi", "Complimentary Wi-Fi", "Stay connected. Members enjoy complimentary Wi-Fi. Gold Elite members and above enjoy our fastest Internet connection for free."],
        ["member-rates1x", "Exclusive Member Rates", "Enjoy exclusive discounted rates for Marriott Bonvoy Members."],
        ["keyless-entry", "Mobile Check-in & Mobile Key", "Use our app to check in and out, then use your phone as your room key."]
      ]
    },
    "Silver Elite": {
      eyebrow: "10 nights per year",
      title: "Silver Elite",
      tagline: "Make the most of your stay",
      features: [
        ["more-points-on-stays", "10% Bonus Points", "Earn bonus points on eligible hotel purchases."],
        ["late-check-out", "Priority Late Checkout", "Request Late Checkout and spend more time exploring the sites or relaxing. Exceptions apply."],
        ["member-rates1x", "Exclusive Member Rates", "Enjoy exclusive discounted rates for Marriott Bonvoy Members."]
      ]
    },
    "Gold Elite": {
      eyebrow: "25 nights per year",
      title: "Gold Elite",
      tagline: "Do more of what you love",
      features: [
        ["more-points-on-stays", "25% Bonus Points", "Earn bonus points on eligible hotel purchases."],
        ["all-suites", "Enhanced Room Upgrade", "Enjoy a room upgrade for the entire length of your stay. For Platinum Elite members and above this includes select suites."],
        ["late-check-out", "2 p.m. Late Checkout", "Request Late Checkout and spend more time exploring the sites or relaxing. Exceptions apply."]
      ]
    },
    "Platinum Elite": {
      eyebrow: "50 nights per year",
      title: "Platinum Elite",
      tagline: "More room to spread out",
      features: [
        ["more-points-on-stays", "50% Bonus Points", "Earn bonus points on eligible hotel purchases."],
        ["all-suites", "Enhanced Room Upgrade", "Enjoy a room upgrade for the entire length of your stay. For Platinum Elite members and above this includes select suites."],
        ["gift", "Welcome Gift", "Receive a special gift upon arrival at participating hotels. Gifts vary by brand and region."]
      ]
    },
    "Titanium Elite": {
      eyebrow: "75 nights per year",
      title: "Titanium Elite",
      tagline: "Elevate your experience",
      features: [
        ["more-points-on-stays", "75% Bonus Points", "Earn bonus points on eligible hotel purchases."],
        ["all-suites", "Enhanced Room Upgrade", "Enjoy a room upgrade for the entire length of your stay. For Platinum Elite members and above this includes select suites."],
        ["gift", "Welcome Gift", "Receive a special gift upon arrival at participating hotels. Gifts vary by brand and region."]
      ]
    },
    "Ambassador Elite": {
      eyebrow: "100 nights per year + $23,000 USD",
      title: "Ambassador Elite",
      tagline: "Seize the whole day",
      features: [
        ["ambassador", "Ambassador Service", "Dedicated Personal Ambassador to assist you with all of your travel needs."],
        ["your-24", "Your24\u2122", "Choose your check-in time and keep your room until the same time on the day of departure. Request via Ambassador Service 2 days prior to arrival."],
        ["more-points-on-stays", "75% Bonus Points", "Earn bonus points on eligible hotel purchases."]
      ]
    }
  };
  function readPanel(panel) {
    const text6 = (sel) => {
      var _a;
      return (((_a = panel.querySelector(sel)) == null ? void 0 : _a.textContent) || "").trim();
    };
    return {
      eyebrow: text6(".tier-hero__eyebrow"),
      title: text6(".tier-hero__title"),
      tagline: text6(".tier-hero__tagline"),
      features: [...panel.querySelectorAll(".benefit-card")].map((card) => {
        var _a, _b;
        const iconClass = [...card.querySelectorAll("[class]")].flatMap((el) => [...el.classList]).find((c) => /^icon-[a-z0-9]/.test(c) && c !== "icon-decorative") || "";
        return [
          (iconClass || "").replace(/^icon-/, ""),
          (((_a = card.querySelector(".benefit-card__title")) == null ? void 0 : _a.textContent) || "").trim(),
          (((_b = card.querySelector(".benefit-card__description")) == null ? void 0 : _b.textContent) || "").trim()
        ];
      })
    };
  }
  function buildPanel(document, data) {
    const content = [];
    const add = (tag, text6) => {
      if (!text6) return;
      const n = document.createElement(tag);
      n.textContent = text6;
      content.push(n);
    };
    add("p", data.eyebrow);
    add("h3", data.title);
    add("p", data.tagline);
    data.features.forEach(([icon, title, desc]) => {
      if (icon) add("p", `:${icon}:`);
      add("h4", title);
      add("p", desc);
    });
    return content;
  }
  function parse2(element, { document }) {
    const cells = [];
    const labels = [...element.querySelectorAll(".tier-tab-button")].map((b) => b.textContent.trim()).filter(Boolean);
    const live = {};
    element.querySelectorAll(".membership-tiers__panel").forEach((panel) => {
      const data = readPanel(panel);
      const active = element.querySelector(".tier-tab-button--active");
      const key = labels.find((l) => l === data.title) || active && active.textContent.trim();
      if (key) live[key] = data;
    });
    const tabs = labels.length ? labels : Object.keys(FALLBACK_PANELS);
    tabs.forEach((label) => {
      const data = live[label] || FALLBACK_PANELS[label];
      if (!data) return;
      cells.push([label, buildPanel(document, data)]);
    });
    const heading = element.querySelector(":scope > .membership-tiers__heading");
    if (heading) element.before(heading);
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-icon-panel", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/card-link-banner.js
  function parse3(element, { document }) {
    const anchor = element.matches("a") ? element : element.querySelector("a.minicardlink, a");
    const href = anchor ? anchor.getAttribute("href") : "";
    const iconEl = element.querySelector('.miniCardImage [class*="icon-"]');
    const iconName = iconEl ? ([...iconEl.classList].find((c) => c.startsWith("icon-")) || "").replace(/^icon-/, "") : "";
    const img = element.querySelector(".miniCardImage img");
    let media = "";
    if (img) {
      media = document.createElement("img");
      media.src = img.getAttribute("src");
      media.alt = img.getAttribute("alt") || "";
    } else if (iconName) {
      media = document.createElement("p");
      media.textContent = `:${iconName}:`;
    }
    const body = [];
    const title = element.querySelector(".miniCardBody h2, .miniCardBody h3, .miniCardBody h4");
    if (title) {
      const h = document.createElement(title.tagName.toLowerCase());
      const text6 = title.textContent.trim();
      if (href) {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = text6;
        h.append(a);
      } else {
        h.textContent = text6;
      }
      body.push(h);
    }
    element.querySelectorAll('[id$="-DescriptionText"] p').forEach((p) => {
      const np = document.createElement("p");
      np.textContent = p.textContent.trim();
      if (np.textContent) body.push(np);
    });
    const cells = [[media, body]];
    const block = WebImporter.Blocks.createBlock(document, { name: "card-link-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-comparison.js
  var text = (el) => el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  function para(document, value, wrapTag) {
    const p = document.createElement("p");
    if (wrapTag) {
      const w = document.createElement(wrapTag);
      w.textContent = value;
      p.append(w);
    } else {
      p.textContent = value;
    }
    return p;
  }
  function parse4(element, { document }) {
    const cells = [];
    const table = element.querySelector("table");
    if (!table) return;
    const tierRow = table.querySelector("thead tr.elite-header");
    const tierCells = tierRow ? [...tierRow.children] : [];
    const corner = text(tierCells[0]);
    const tiers = tierCells.slice(1).map(text);
    const nightsRow = [...table.querySelectorAll("thead tr")].find((tr) => tr !== tierRow && !tr.classList.contains("row-header-inline"));
    const nights = nightsRow ? [...nightsRow.children].map(text) : [];
    const cols = tiers.length;
    cells.push([
      corner,
      ...tiers.map((tier, i) => {
        const c = [para(document, tier, "strong")];
        if (nights[i]) c.push(para(document, nights[i]));
        return c;
      })
    ]);
    const bodyRows = [...table.querySelectorAll("tbody tr")].filter((tr) => !tr.classList.contains("row-header-inline")).filter((tr) => tr.children.length > 1);
    bodyRows.forEach((tr) => {
      const [head, ...values] = [...tr.children];
      const benefit = [];
      const name = text(head.querySelector('[id="body-row-header"]'));
      const desc = text(head.querySelector('[id="body-row-sub-header"]'));
      if (name) benefit.push(para(document, name, "strong"));
      if (desc) benefit.push(para(document, desc));
      head.querySelectorAll("a[href]").forEach((link) => {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        a.textContent = text(link);
        p.append(a);
        benefit.push(p);
      });
      const row = [benefit];
      for (let i = 0; i < cols; i += 1) {
        const td = values[i];
        const value = text(td);
        if (value) row.push(value);
        else if (td && td.querySelector(".icon-check")) row.push("Included");
        else row.push("");
      }
      cells.push(row);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "table-comparison", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-image-link.js
  var text2 = (el) => el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  function parse5(element, { document }) {
    const cells = [];
    element.querySelectorAll(".pointswrapper__card").forEach((card) => {
      const link = card.querySelector("a[href]");
      const href = link ? link.getAttribute("href") : "";
      const srcImg = card.querySelector("picture img, img");
      let image = "";
      if (srcImg) {
        image = document.createElement("img");
        image.src = srcImg.getAttribute("src");
        image.alt = srcImg.getAttribute("alt") || "";
      }
      const body = [];
      const title = text2(card.querySelector(".card-vertical_heading"));
      if (title) {
        const h = document.createElement("h3");
        if (href) {
          const a = document.createElement("a");
          a.href = href;
          a.textContent = title;
          h.append(a);
        } else {
          h.textContent = title;
        }
        body.push(h);
      }
      const desc = text2(card.querySelector(".card-vertical_description"));
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc;
        body.push(p);
      }
      cells.push([image, body]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-image-link", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-overlay.js
  var text3 = (el) => el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  function parse6(element, { document }) {
    const cells = [];
    const cards = [...element.querySelectorAll(".glide__slides > li:not(.glide__slide--clone) .card-layered-wrapper")];
    cards.forEach((card) => {
      const link = card.querySelector("a[href]");
      const href = link ? link.getAttribute("href") : "";
      const srcImg = card.querySelector("picture img, img");
      let image = "";
      if (srcImg) {
        image = document.createElement("img");
        image.src = srcImg.getAttribute("src");
        image.alt = srcImg.getAttribute("alt") || "";
      }
      const body = [];
      const eyebrow = text3(card.querySelector(".t-overline-overlay"));
      if (eyebrow) {
        const p = document.createElement("p");
        p.textContent = eyebrow;
        body.push(p);
      }
      const title = text3(card.querySelector(".card-layered-header"));
      if (title) {
        const h = document.createElement("h3");
        if (href) {
          const a = document.createElement("a");
          a.href = href;
          a.textContent = title;
          h.append(a);
        } else {
          h.textContent = title;
        }
        body.push(h);
      }
      cells.push([image, body]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  var text4 = (el) => el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  function parse7(element, { document }) {
    const cells = [];
    element.querySelectorAll(".datablock-container").forEach((card) => {
      const iconEl = card.querySelector('.data-block-large-icon, [class*="icon-"]');
      const iconName = iconEl ? ([...iconEl.classList].find((c) => c.startsWith("icon-") && c !== "icon-decorative") || "").replace(/^icon-/, "") : "";
      let media = "";
      const srcImg = card.querySelector("img");
      if (srcImg) {
        media = document.createElement("img");
        media.src = srcImg.getAttribute("src");
        media.alt = srcImg.getAttribute("alt") || "";
      } else if (iconName) {
        media = document.createElement("p");
        media.textContent = `:${iconName}:`;
      }
      const body = [];
      const title = text4(card.querySelector(".data-block-heading"));
      if (title) {
        const h = document.createElement("h3");
        h.textContent = title;
        body.push(h);
      }
      card.querySelectorAll(".data-block-text-content p").forEach((p) => {
        const t = text4(p);
        if (!t) return;
        const np = document.createElement("p");
        np.textContent = t;
        body.push(np);
      });
      card.querySelectorAll("a[href]").forEach((link) => {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        a.textContent = text4(link);
        p.append(a);
        body.push(p);
      });
      cells.push([media, body]);
    });
    const heading = element.querySelector(".add-gutter-space-top > div > h2, .add-gutter-space-top > div > h3");
    if (heading) element.before(heading);
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-icon", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-logo-grid.js
  var text5 = (el) => el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  function brandName(link) {
    const aria = (link.getAttribute("aria-label") || "").trim();
    if (aria) return aria;
    const href = link.getAttribute("href") || "";
    try {
      const u = new URL(href, "https://www.marriott.com");
      const slug = u.pathname.match(/\/brands\/([^/.]+)/);
      const base = slug ? slug[1] : u.hostname.replace(/^www\./, "").split(".")[0];
      return base.split("-").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
    } catch (e) {
      return "Brand logo";
    }
  }
  var SITE_ORIGIN = "https://main--marriot-loyalty--pnamadobe.aem.page";
  var brandSlug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  function svgToDataUri(svg) {
    const markup = svg.outerHTML;
    const b64 = typeof btoa === "function" ? btoa(unescape(encodeURIComponent(markup))) : Buffer.from(markup, "utf8").toString("base64");
    return `data:image/svg+xml;base64,${b64}`;
  }
  function parse8(element, { document }) {
    const cells = [];
    const cards = [...element.querySelectorAll(".brand-ribbon-category-label")].map((label) => label.closest(".brand-ribbon-category-container > div") || label.parentElement.parentElement);
    cards.forEach((card) => {
      const body = [];
      const title = text5(card.querySelector(".brand-ribbon-category-label"));
      if (title) {
        const h = document.createElement("h3");
        h.textContent = title;
        body.push(h);
      }
      const desc = text5(card.querySelector(".brand-ribbon-category-description"));
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc;
        body.push(p);
      }
      card.querySelectorAll(".brand-ribbon-category-list-item a[href]").forEach((link) => {
        const srcImg = link.querySelector("img");
        const svg = link.querySelector("svg");
        let src = "";
        if (srcImg) src = srcImg.getAttribute("src") || "";
        else if (svg) src = svgToDataUri(svg);
        const name = brandName(link);
        if (src.startsWith("data:image/svg+xml")) src = `${SITE_ORIGIN}/img/brands/${brandSlug(name)}.svg`;
        const newWindow = link.getAttribute("target") === "_blank" || /new window/i.test(text5(link.querySelector(".sr-only")));
        const a = document.createElement("a");
        const href = link.getAttribute("href");
        a.href = newWindow && !href.includes("#") ? `${href}#_blank` : href;
        if (src) {
          const img = document.createElement("img");
          img.src = src;
          img.alt = name;
          a.append(img);
        } else {
          a.textContent = name;
        }
        const p = document.createElement("p");
        p.append(a);
        body.push(p);
      });
      cells.push(["", body]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-logo-grid", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/marriott-cleanup.js
  var WRAPPER = ".account-page-wrapper";
  var NTH_ATTR = "data-excat-nth";
  var EXCLUDED_NTH = [1, 2, 4, 11, 15, 16];
  function stampWrapperChildren(document) {
    const wrapper = document.querySelector(WRAPPER);
    if (!wrapper || wrapper.querySelector(`:scope > [${NTH_ATTR}]`)) return wrapper;
    [...wrapper.children].forEach((child, i) => child.setAttribute(NTH_ATTR, String(i + 1)));
    return wrapper;
  }
  var SITE_ORIGIN2 = "https://main--marriot-loyalty--pnamadobe.aem.page";
  function fixBrandLogo(document) {
    document.querySelectorAll('.brand-ribbon-logo-container :is(svg, img[src^="data:image/svg"])').forEach((logo) => {
      const img = document.createElement("img");
      img.setAttribute("src", `${SITE_ORIGIN2}/img/brands/marriott-bonvoy.svg`);
      img.setAttribute("alt", "Marriott Bonvoy");
      logo.replaceWith(img);
    });
  }
  function normalizeSectionHeadings(element) {
    const document = element.ownerDocument;
    element.querySelectorAll("h3, .t-title-s").forEach((el) => {
      if (el.closest("table")) return;
      const h2 = document.createElement("h2");
      h2.innerHTML = el.innerHTML;
      el.replaceWith(h2);
    });
  }
  function stripMiLinks(element) {
    element.querySelectorAll('a[href^="/"]').forEach((a) => {
      const href = a.getAttribute("href");
      if (/^\/default\.mi([?#]|$)/.test(href)) a.setAttribute("href", href.replace("/default.mi", "/"));
      else a.setAttribute("href", href.replace(/\.mi(?=[?#]|$)/, ""));
    });
  }
  function removeAll(root, selectors) {
    selectors.forEach((sel) => {
      root.querySelectorAll(sel).forEach((el) => el.remove());
    });
  }
  function transform(hookName, element, payload) {
    const document = element.ownerDocument || payload.document;
    if (hookName === "beforeTransform") {
      const wrapper = stampWrapperChildren(document);
      if (wrapper) {
        const excluded = EXCLUDED_NTH.map((n) => wrapper.querySelector(`:scope > [${NTH_ATTR}="${n}"]`)).filter(Boolean);
        excluded.forEach((el) => el.remove());
      }
      removeAll(document, [
        "#onetrust-consent-sdk",
        "#notice-popup",
        ".notice-popup-container",
        "#notice-privacy-policy",
        "#teconsent",
        ".modal-popup-container",
        "a.skip-links",
        "next-route-announcer",
        "#a11y-status-message",
        "body > img",
        // Tracking beacons / survey containers (#ZN_*, #batBeacon*) beside the app root.
        "body > div:not(.modal-content)"
      ]);
      fixBrandLogo(document);
      removeAll(element, [".sr-only"]);
      removeAll(document, ["script", "style", "noscript", "iframe", "link", "template"]);
    }
    if (hookName === "afterTransform") {
      removeAll(document, ["script", "style", "noscript", "iframe", "link"]);
      normalizeSectionHeadings(element);
      stripMiLinks(element);
      element.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach(({ name }) => {
          if (name === NTH_ATTR || name.startsWith("data-track") || name.startsWith("data-analytics") || name.startsWith("data-gtm") || name === "data-custom_click_track_value" || name.startsWith("on")) {
            el.removeAttribute(name);
          }
        });
      });
    }
  }

  // tools/importer/transformers/marriott-sections.js
  var WRAPPER2 = ".account-page-wrapper";
  var NTH_ATTR2 = "data-excat-nth";
  var MARKER_ATTR = "data-excat-section-id";
  function stampWrapperChildren2(document) {
    const wrapper = document.querySelector(WRAPPER2);
    if (!wrapper || wrapper.querySelector(`:scope > [${NTH_ATTR2}]`)) return;
    [...wrapper.children].forEach((child, i) => child.setAttribute(NTH_ATTR2, String(i + 1)));
  }
  function toStampSelector(selector) {
    return selector.replace(/>\s*div:nth-child\((\d+)\)/g, `> div[${NTH_ATTR2}="$1"]`);
  }
  function findSectionElement(document, section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (const sel of selectors) {
      if (!sel) continue;
      const candidates = /:nth-child\(/.test(sel) ? [toStampSelector(sel), sel] : [sel];
      for (const candidate of candidates) {
        try {
          const el = document.querySelector(candidate);
          if (el) return el;
        } catch (e) {
        }
      }
    }
    return null;
  }
  function createHr(document, sectionId) {
    const hr = document.createElement("hr");
    if (sectionId) hr.setAttribute(MARKER_ATTR, sectionId);
    return hr;
  }
  function transform2(hookName, element, payload) {
    const document = element.ownerDocument || payload.document;
    const sections = payload && payload.template && payload.template.sections || [];
    if (sections.length < 2) return;
    if (hookName === "beforeTransform") {
      stampWrapperChildren2(document);
      const resolved = sections.map((section) => findSectionElement(document, section));
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const el = resolved[i];
        if (!el || !el.parentNode) continue;
        if (i > 0) {
          el.before(createHr(document, section.style ? section.id : null));
        } else if (section.style) {
          el.before(createHr(document, section.id));
        }
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const marker = document.querySelector(`hr[${MARKER_ATTR}="${section.id}"]`);
        if (section.style) {
          const metadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (marker) {
            let next = marker.nextElementSibling;
            while (next && next.tagName !== "HR") next = next.nextElementSibling;
            if (next) next.before(metadata);
            else marker.parentNode.append(metadata);
          } else {
            const el = findSectionElement(document, section);
            if (el && el.parentNode) el.after(metadata);
          }
        }
        if (marker) {
          if (i === 0) marker.remove();
          else marker.removeAttribute(MARKER_ATTR);
        }
      }
    }
  }

  // tools/importer/transformers/marriott-dm-images.js
  var EMPTY_ALT_SENTINEL = "Image without alt text";
  function detectDynamicMediaUrl(urlStr) {
    if (!/^(https?:\/\/|\/\/)/i.test(urlStr || "")) return false;
    let u;
    try {
      u = new URL(urlStr, "https://x/");
    } catch (e) {
      return false;
    }
    if (u.pathname.startsWith("/is/image/")) return "scene7";
    if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname) && u.pathname.startsWith("/adobe/assets/urn:")) {
      return "dm-openapi";
    }
    return false;
  }
  function getDmSrc(img) {
    const candidates = [
      img.getAttribute("src"),
      img.getAttribute("data-src"),
      (img.getAttribute("srcset") || "").split(",")[0].trim().split(/\s+/)[0]
    ];
    const found = candidates.find((c) => c && detectDynamicMediaUrl(c));
    if (!found) return null;
    return found.startsWith("//") ? `https:${found}` : found;
  }
  function isSoleMeaningfulChild(anchor, img) {
    if (anchor.querySelectorAll("img").length !== 1 || anchor.querySelector("svg, video")) return false;
    const clone = anchor.cloneNode(true);
    clone.querySelectorAll("img, picture, source").forEach((n) => n.remove());
    return clone.textContent.trim() === "" && anchor.contains(img);
  }
  function transform3(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const document = element.ownerDocument;
    [...element.querySelectorAll("img")].forEach((img) => {
      if (!img.isConnected) return;
      const dmUrl = getDmSrc(img);
      if (!dmUrl) return;
      const alt = (img.getAttribute("alt") || "").trim() || EMPTY_ALT_SENTINEL;
      const anchor = img.closest("a");
      const picture = img.parentElement && img.parentElement.tagName === "PICTURE" ? img.parentElement : null;
      if (anchor) {
        if (!isSoleMeaningfulChild(anchor, img)) {
          console.warn(`[marriott-dm-images] skipping DM image in mixed-content anchor: ${dmUrl}`);
          return;
        }
        anchor.setAttribute("title", dmUrl);
        anchor.textContent = alt;
        return;
      }
      const a = document.createElement("a");
      a.setAttribute("href", dmUrl);
      a.textContent = alt;
      (picture || img).replaceWith(a);
    });
  }

  // tools/importer/import-loyalty.js
  var PAGE_TEMPLATE = {
    "name": "loyalty",
    "urls": [
      "https://www.marriott.com/loyalty/member-benefits.mi"
    ],
    "representativeUrl": "https://www.marriott.com/loyalty/member-benefits.mi",
    "description": "Marriott Bonvoy loyalty landing pages: photo hero, tier tabs, comparison tables, card grids and brand portfolio",
    "blocks": [
      {
        "name": "hero-overlay",
        "instances": [
          ".hero-banner"
        ]
      },
      {
        "name": "tabs-icon-panel",
        "instances": [
          "section:has(> .membership-tiers__panel)"
        ]
      },
      {
        "name": "card-link-banner",
        "instances": [
          ".minicardlink"
        ]
      },
      {
        "name": "table-comparison",
        "instances": [
          ".table-container"
        ]
      },
      {
        "name": "cards-image-link",
        "instances": [
          ".pointswrapper__cards"
        ]
      },
      {
        "name": "cards-overlay",
        "instances": [
          ".glide:has(.card-layered-wrapper)"
        ]
      },
      {
        "name": "cards-icon",
        "instances": [
          "div:has(> .row.add-gutter-space-top)"
        ]
      },
      {
        "name": "cards-logo-grid",
        "instances": [
          ".brand-ribbon-category-container"
        ]
      }
    ],
    "urlPattern": "/loyalty/*",
    "sections": [
      {
        "id": "s1",
        "name": "hero",
        "selector": [
          ".account-page-wrapper > div:has(.hero-3x1)",
          ".account-page-wrapper > div:nth-child(3)"
        ],
        "style": null,
        "blocks": [
          "hero-overlay"
        ],
        "defaultContent": []
      },
      {
        "id": "s2",
        "name": "membership-tiers",
        "selector": [
          ".account-page-wrapper > div:has(.membership-tiers__heading)",
          ".account-page-wrapper > div:nth-child(5)"
        ],
        "style": "card, centered",
        "blocks": [
          "tabs-icon-panel"
        ],
        "defaultContent": [
          ".membership-tiers__heading"
        ]
      },
      {
        "id": "s3",
        "name": "lifetime-benefits",
        "selector": [
          ".account-page-wrapper > div:has(.minicardlink)",
          ".account-page-wrapper > div:nth-child(6)"
        ],
        "style": null,
        "blocks": [
          "card-link-banner"
        ],
        "defaultContent": []
      },
      {
        "id": "s4",
        "name": "compare-program-benefits",
        "selector": [
          ".account-page-wrapper > div:has(.table-container):has(.disclaimerText)",
          ".account-page-wrapper > div:nth-child(7)"
        ],
        "style": null,
        "blocks": [
          "table-comparison"
        ],
        "defaultContent": [
          ".px-0.mt-md-3 .t-title-s",
          ".disclaimerText"
        ]
      },
      {
        "id": "s5",
        "name": "compare-partner-benefits",
        "selector": [
          ".account-page-wrapper > div:has(.table-container):not(:has(.disclaimerText))",
          ".account-page-wrapper > div:nth-child(8)"
        ],
        "style": null,
        "blocks": [
          "table-comparison"
        ],
        "defaultContent": [
          ".px-0.mt-md-3 .t-title-s"
        ]
      },
      {
        "id": "s6",
        "name": "points",
        "selector": [
          ".account-page-wrapper > div:has(.pointswrapper)",
          ".account-page-wrapper > div:nth-child(9)"
        ],
        "style": "split",
        "blocks": [
          "cards-image-link"
        ],
        "defaultContent": [
          ".pointswrapper__header",
          ".pointswrapper__description",
          ".pointswrapper__list"
        ]
      },
      {
        "id": "s7",
        "name": "join-hero",
        "selector": [
          ".account-page-wrapper > div:has(.hero-2x1)",
          ".account-page-wrapper > div:nth-child(10)"
        ],
        "style": null,
        "blocks": [
          "hero-overlay"
        ],
        "defaultContent": []
      },
      {
        "id": "s8",
        "name": "more-ways-to-explore",
        "selector": [
          ".account-page-wrapper > div:has(.card-layered-wrapper)",
          ".account-page-wrapper > div:nth-child(12)"
        ],
        "style": null,
        "blocks": [
          "cards-overlay"
        ],
        "defaultContent": [
          ".carousal_header"
        ]
      },
      {
        "id": "s9",
        "name": "unlock-more-with-points",
        "selector": [
          ".account-page-wrapper > div:has(.datablock-container)",
          ".account-page-wrapper > div:nth-child(13)"
        ],
        "style": null,
        "blocks": [
          "cards-icon"
        ],
        "defaultContent": [
          ".add-gutter-space-top h2, .add-gutter-space-top h3"
        ]
      },
      {
        "id": "s10",
        "name": "brand-portfolio",
        "selector": [
          ".account-page-wrapper > div:has(.brand-ribbon-full-container)",
          ".account-page-wrapper > div:nth-child(14)"
        ],
        "style": "white, centered",
        "blocks": [
          "cards-logo-grid"
        ],
        "defaultContent": [
          ".brand-ribbon-logo-container",
          ".brand-ribbon-header"
        ]
      }
    ]
  };
  var TEMPLATE_METADATA = { Subnav: "/fragments/nav/loyalty" };
  var parsers = {
    "hero-overlay": parse,
    "tabs-icon-panel": parse2,
    "card-link-banner": parse3,
    "table-comparison": parse4,
    "cards-image-link": parse5,
    "cards-overlay": parse6,
    "cards-icon": parse7,
    "cards-logo-grid": parse8
  };
  var sectionTransformers = [transform2];
  var fragmentTransformers = [];
  var lateTransformers = [...sectionTransformers, ...fragmentTransformers];
  var correctionTransformers = [];
  var transformers = [transform, transform3, ...lateTransformers, ...correctionTransformers];
  var earlyTransformers = transformers.filter((fn) => !lateTransformers.includes(fn));
  var CATALOG = Boolean(PAGE_TEMPLATE.pageCleanup || PAGE_TEMPLATE.blocks.some((b) => b.pageInstances));
  function executeTransformers(hookName, element, payload, list = transformers) {
    var _a, _b;
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: ((_b = (_a = payload.params) == null ? void 0 : _a.targets) == null ? void 0 : _b.template) || PAGE_TEMPLATE });
    list.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template, url) {
    const pageBlocks = [];
    const pageKey = (u) => {
      try {
        const { origin, pathname } = new URL(u);
        return `${origin}${pathname.replace(/\/$/, "")}`;
      } catch (e) {
        return u;
      }
    };
    const key = pageKey(url);
    const claim = (blockDef, selector) => {
      let matches = [];
      try {
        matches = document.querySelectorAll(selector);
      } catch (e) {
        return;
      }
      matches.forEach((element) => {
        if (pageBlocks.some((b) => b.element === element || b.element.contains(element) || element.contains(b.element))) return;
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    };
    template.blocks.forEach((blockDef) => {
      const entry = Object.entries(blockDef.pageInstances || {}).find(([u]) => pageKey(u) === key);
      (entry ? entry[1] : []).forEach((selector) => claim(blockDef, selector));
    });
    template.blocks.forEach((blockDef) => (blockDef.instances || []).forEach((selector) => claim(blockDef, selector)));
    return pageBlocks;
  }
  function markPageTargets(payload) {
    const { document, params } = payload;
    executeTransformers("beforeTransform", document.body, payload, earlyTransformers);
    const blocks = findBlocksOnPage(document, PAGE_TEMPLATE, params.originalURL).map(({ name, selector, element }, i) => {
      element.setAttribute("data-excat-block", String(i));
      return { name, selector };
    });
    const sections = (PAGE_TEMPLATE.sections || []).map((section, i) => {
      const target = (section.selector || []).map((s) => {
        try {
          return document.querySelector(s);
        } catch (e) {
          return null;
        }
      }).find(Boolean);
      if (!target) return section;
      target.setAttribute("data-excat-section", String(i));
      return __spreadProps(__spreadValues({}, section), { selector: [`[data-excat-section="${i}"]`] });
    });
    params.targets = { blocks, template: __spreadProps(__spreadValues({}, PAGE_TEMPLATE), { sections }) };
  }
  var import_loyalty_default = {
    preprocess: (payload) => {
      if (CATALOG) markPageTargets(payload);
    },
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      params.fragments = [];
      if (!params.targets) markPageTargets(payload);
      const pageBlocks = params.targets.blocks.map((block, i) => __spreadProps(__spreadValues({}, block), { element: document.querySelector(`[data-excat-block="${i}"]`) })).filter((block) => block.element);
      executeTransformers("beforeTransform", main, __spreadProps(__spreadValues({}, payload), { pageBlocks }), lateTransformers);
      pageBlocks.forEach((block) => {
        if (!main.contains(block.element)) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      main.appendChild(document.createElement("hr"));
      const metadata = __spreadValues(__spreadValues({}, WebImporter.Blocks.getMetadata(document)), TEMPLATE_METADATA);
      main.append(WebImporter.Blocks.getMetadataBlock(document, metadata));
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      params.fragments.forEach(({ element }) => {
        executeTransformers("afterTransform", element, payload, earlyTransformers);
        WebImporter.rules.transformBackgroundImages(element, document);
        WebImporter.rules.adjustImageUrls(element, url, params.originalURL);
      });
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.(html?|mi)$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }, ...params.fragments];
    }
  };
  return __toCommonJS(import_loyalty_exports);
})();
