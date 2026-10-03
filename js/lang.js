/* ============================================================
   LANG.JS — переключение языка, localStorage, авто-перевод
   ============================================================ */

const LANG_KEY = "nm_dev_lang";
const SUPPORTED_LANGS = ["ru", "kg", "en"];
const DEFAULT_LANG = "ru";

let currentLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
if (!SUPPORTED_LANGS.includes(currentLang)) currentLang = DEFAULT_LANG;

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS[DEFAULT_LANG];
  return dict[key] || TRANSLATIONS[DEFAULT_LANG][key] || key;
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "kg" ? "ky" : lang;
  window.dispatchEvent(new CustomEvent('nm:lang-changed', { detail: { lang } }));
  applyTranslations();
  updateLangMenu();
}

function applyTranslations() {
  // Обычные тексты (data-i18n)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // HTML-тексты с переносами (data-i18n-html)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key).replace(/\n/g, "<br>");
  });

  // Плейсхолдеры
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });

  // Title страницы
  const titleKey = document.documentElement.getAttribute("data-title-key");
  if (titleKey) document.title = t(titleKey);
}

function updateLangMenu() {
  document.querySelectorAll(".lang-menu__item").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
  });
}

function initLangSwitcher() {
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  if (!langBtn || !langMenu) return;

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.classList.toggle("is-open");
  });

  langMenu.querySelectorAll(".lang-menu__item").forEach((item) => {
    item.addEventListener("click", () => {
      setLang(item.dataset.lang);
      langMenu.classList.remove("is-open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
      langMenu.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") langMenu.classList.remove("is-open");
  });

  updateLangMenu();
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = currentLang === "kg" ? "ky" : currentLang;
  initLangSwitcher();
  applyTranslations();
});

window.NM_LANG = {
  get current() {
    return currentLang;
  },
  t,
  set: setLang,
  apply: applyTranslations,
};
