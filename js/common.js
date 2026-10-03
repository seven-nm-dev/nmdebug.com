/* ============================================================
   COMMON.JS — константы, утилиты, компоненты шапки/футера
   ============================================================ */

const NM = {
  phone: "+996551771108",
  phoneDigits: "996551771108",
  telegram: "https://t.me/996551771108",
  whatsapp: "https://wa.me/996551771108",
  instagram: "https://instagram.com/seve_seven.dev",
};

const PAGES = {
  home: "index.html",
  about: "about.html",
  mobile: "mobile.html",
  bots: "bots.html",
  web: "web.html",
  calculator: "calculator.html",
};

/* SVG-иконки */
const ICONS = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
};

/* Утилиты */
function openLink(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function getTelegramLink(text = "") {
  return text
    ? `https://t.me/996551771108?text=${encodeURIComponent(text)}`
    : NM.telegram;
}

function getWhatsAppLink(text = "") {
  return text
    ? `https://wa.me/996551771108?text=${encodeURIComponent(text)}`
    : NM.whatsapp;
}

/* ----- Утилита: HEX → RGB (для CSS-переменных) ----- */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 229, 255";
}

/* Компонент: ШАПКА */
function renderHeader(opts = {}) {
  const { typed = false } = opts;

  const brandHTML = typed
    ? `<span class="site-header__typed" id="typedText"></span><span class="site-header__cursor">_</span>`
    : `<span class="site-header__static">NM DEV</span>`;

  return `
    <header class="site-header">
      <div class="container site-header__inner">
        <a href="${PAGES.home}" class="site-header__logo-link" aria-label="NM DEV — на главную">
          <img src="assets/logo.png" alt="NM DEV logo" class="site-header__logo"
               onerror="this.style.display='none'">
        </a>

        <div class="site-header__title-wrap">
          ${brandHTML}
        </div>

        <div class="site-header__actions">
          <button class="lang-btn" id="langBtn" aria-label="Сменить язык">
            ${ICONS.globe}
          </button>
        </div>
      </div>

      <div class="lang-menu" id="langMenu" role="menu">
        <button class="lang-menu__item" data-lang="ru" role="menuitem">
          <span class="lang-menu__check">${ICONS.check}</span>
          <span>Русский 🇷🇺</span>
        </button>
        <button class="lang-menu__item" data-lang="kg" role="menuitem">
          <span class="lang-menu__check">${ICONS.check}</span>
          <span>Кыргызча 🇰🇬</span>
        </button>
        <button class="lang-menu__item" data-lang="en" role="menuitem">
          <span class="lang-menu__check">${ICONS.check}</span>
          <span>English 🇬🇧</span>
        </button>
      </div>
    </header>
  `;
}

/* Компонент: ФУТЕР */
function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__inner">
          <span class="site-footer__copy">NM DEV STUDIO</span>
          <nav class="site-footer__socials" aria-label="Соцсети">
            <a href="${NM.instagram}" target="_blank" rel="noopener"
               class="site-footer__link site-footer__link--instagram"
               aria-label="Instagram" title="Instagram">
              ${ICONS.instagram}
            </a>
            <a href="${NM.telegram}" target="_blank" rel="noopener"
               class="site-footer__link site-footer__link--telegram"
               aria-label="Telegram" title="Telegram">
              ${ICONS.telegram}
            </a>
            <a href="${NM.whatsapp}" target="_blank" rel="noopener"
               class="site-footer__link site-footer__link--whatsapp"
               aria-label="WhatsApp" title="WhatsApp">
              ${ICONS.whatsapp}
            </a>
            <a href="tel:${NM.phone}" class="site-footer__link site-footer__link--phone"
               aria-label="Позвонить" title="${NM.phone}">
              ${ICONS.phone}
            </a>
          </nav>
        </div>
        <div class="site-footer__bottom">
          © ${year} NM DEV — Crafted with precision
        </div>
      </div>
    </footer>
  `;
}

/* Инициализация шапки и футера */
function initLayout(opts = {}) {
  const headerSlot = document.getElementById("header-slot");
  if (headerSlot) headerSlot.innerHTML = renderHeader(opts);

  const footerSlot = document.getElementById("footer-slot");
  if (footerSlot) footerSlot.innerHTML = renderFooter();
}
