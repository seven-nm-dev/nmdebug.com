/* ============================================================
   MOBILE.JS — эмулятор телефона (10 категорий)
   ============================================================ */

const MOBILE_DATA = [
  {
    key: "mcat_food",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    accent: "orange",
    color: "#FB923C",
    content: "food",
  },
  {
    key: "mcat_taxi",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>',
    accent: "amber",
    color: "#FBBF24",
    content: "taxi",
  },
  {
    key: "mcat_fintech",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    accent: "cyan",
    color: "#00E5FF",
    content: "fintech",
  },
  {
    key: "mcat_marketplace",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>',
    accent: "purple",
    color: "#A855F7",
    content: "marketplace",
  },
  {
    key: "mcat_fitness",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 6.5h11v11h-11z"/><line x1="3" y1="9" x2="3" y2="15"/><line x1="21" y1="9" x2="21" y2="15"/></svg>',
    accent: "green",
    color: "#22C55E",
    content: "fitness",
  },
  {
    key: "mcat_medical",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6"/><path d="M9 5h6"/><rect x="4" y="8" width="16" height="14" rx="2"/></svg>',
    accent: "red",
    color: "#EF4444",
    content: "medical",
  },
  {
    key: "mcat_tourism",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21l1-1v-9l-1-1V9l4-2 4 2v1l-1 1v9l1 1"/><path d="M15 21l1-1v-6l-1-1V9l4-2 4 2v1l-1 1v6l1 1"/></svg>',
    accent: "blue",
    color: "#3B82F6",
    content: "tourism",
  },
  {
    key: "mcat_education",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg>',
    accent: "teal",
    color: "#14B8A6",
    content: "education",
  },
  {
    key: "mcat_realty",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    accent: "deepOrange",
    color: "#F97316",
    content: "realty",
  },
  {
    key: "mcat_chat",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    accent: "pink",
    color: "#EC4899",
    content: "chat",
  },
];

let currentMobileIndex = 0;

/* ----- Отрисовка чипов ----- */
function renderMobileChips() {
  const container = document.getElementById("mobileChips");
  if (!container) return;

  container.innerHTML = MOBILE_DATA.map(
    (item, i) => `
    <button class="chip ${i === currentMobileIndex ? "is-active" : ""}"
            data-index="${i}"
            style="--chip-accent: ${item.color}; --chip-accent-rgb: ${hexToRgb(item.color)}">
      ${item.icon}
      <span>${t(item.key)}</span>
    </button>
  `,
  ).join("");

  container.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      currentMobileIndex = +chip.dataset.index;
      renderMobileChips();
      renderPhoneContent();
    });
  });
}

/* ----- Отрисовка контента телефона ----- */
function renderPhoneContent() {
  const container = document.getElementById("phoneContent");
  if (!container) return;

  const data = MOBILE_DATA[currentMobileIndex];
  const content = renderPhoneScreen(data.content, data.color);

  container.innerHTML = content;
}

/* ----- Экраны телефона ----- */
function renderPhoneScreen(type, color) {
  const header = (title, icon) => `
    <div style="padding:14px 12px;background:#22222E;display:flex;justify-content:space-between;align-items:center;">
      <span style="color:${color};font-weight:700;font-size:13px;">${title}</span>
      <span style="color:${color};">${icon}</span>
    </div>
  `;

  const row = (title, sub, icon) => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#22222E;border-radius:10px;margin-bottom:6px;">
      <span style="color:${color};font-size:18px;">${icon}</span>
      <div style="flex:1;min-width:0;">
        <div style="color:#fff;font-size:12px;font-weight:600;">${title}</div>
        <div style="color:${color};font-size:10px;">${sub}</div>
      </div>
    </div>
  `;

  const wrap = (content) => `
    <div style="display:flex;flex-direction:column;height:100%;">
      ${content}
    </div>
  `;

  const body = (inner) => `
    <div style="padding:10px;overflow-y:auto;flex:1;">${inner}</div>
  `;

  switch (type) {
    case "food":
      return wrap(
        header("Доставка еды", "🔍") +
          body(`
          <div style="background:rgba(251,146,60,0.15);padding:10px;border-radius:10px;color:${color};font-size:11px;font-weight:700;margin-bottom:8px;">🔥 Скидка 20% на сет пицц!</div>
          ${row("Пицца Маргарита", "380 c", "🍕")}
          ${row("Чизбургер XXL", "280 c", "🍔")}
          ${row("Филадельфия Сет", "750 c", "🍣")}
        `),
      );
    case "taxi":
      return wrap(
        header("Такси & Карго", "📍") +
          body(`
          <div style="background:#121218;height:180px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#333;font-size:60px;margin-bottom:10px;">🗺️</div>
          ${row("🚕 Eco", "140 c", "🚗")}
          ${row("🚗 Business", "300 c", "🚙")}
        `),
      );
    case "fintech":
      return wrap(
        header("Мой Банк", "🔔") +
          body(`
          <div style="background:linear-gradient(135deg,#00E5FF,#3B82F6);padding:14px;border-radius:14px;margin-bottom:10px;">
            <div style="color:rgba(0,0,0,0.6);font-size:11px;">Баланс карты</div>
            <div style="color:#000;font-size:22px;font-weight:900;">148,250 KGS</div>
          </div>
          ${row("Transfer", "- 1,200 c", "⬆️")}
          ${row("Deposit", "+ 15,000 c", "⬇️")}
        `),
      );
    case "marketplace":
      return wrap(
        header("Маркетплейс", "🛒") +
          body(`
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            ${gridItem("Nike Air Max", "6,500c", color, "👟")}
            ${gridItem("Smart Watch", "3,200c", color, "⌚")}
            ${gridItem("AirPods Pro", "12,000c", color, "🎧")}
            ${gridItem("Urban Pack", "2,400c", color, "🎒")}
          </div>
        `),
      );
    case "fitness":
      return wrap(
        header("Фитнес Трекер", "⚡") +
          body(`
          <div style="background:rgba(34,197,94,0.15);padding:10px;border-radius:10px;color:${color};font-size:11px;font-weight:700;margin-bottom:8px;">⚡ Цель: 10,000 шагов (75%)</div>
          ${row("Running", "4.2 km • 280 kcal", "🏃")}
          ${row("Workout", "45 min • 340 kcal", "💪")}
        `),
      );
    case "medical":
      return wrap(
        header("Запись к врачу", "📅") +
          body(`
          <div style="background:rgba(239,68,68,0.15);padding:10px;border-radius:10px;color:${color};font-size:11px;font-weight:700;margin-bottom:8px;">🏥 Клиника "Здоровье"</div>
          ${row("Dr. Smith", "15:30 Today", "👨‍⚕️")}
          ${row("Dr. Adams", "10:00 Tomorrow", "❤️")}
        `),
      );
    case "tourism":
      return wrap(
        header("Отели & Туры", "✈️") +
          body(`
          <div style="background:rgba(59,130,246,0.15);padding:10px;border-radius:10px;color:${color};font-size:11px;font-weight:700;margin-bottom:8px;">🏝 Озеро Иссык-Куль</div>
          ${row('Hotel "Caprice"', "4,500c / night", "🏨")}
          ${row('Resort "Raduga"', "8,000c / night", "🏝️")}
        `),
      );
    case "education":
      return wrap(
        header("Онлайн Академия", "▶️") +
          body(`
          <div style="background:rgba(20,184,166,0.15);padding:10px;border-radius:10px;color:${color};font-size:11px;font-weight:700;margin-bottom:8px;">🎓 Курс: Flutter</div>
          ${row("Урок 1: Dart", "Пройден", "✅")}
          ${row("Урок 2: Flutter", "15 min", "▶️")}
        `),
      );
    case "realty":
      return wrap(
        header("Недвижимость", "🔍") +
          body(`
          ${row("2-комн. Квартира", "$650 / мес", "🏢")}
          ${row("Пентхаус Центр", "$1,200 / мес", "🏙️")}
        `),
      );
    case "chat":
    default:
      return wrap(
        header("Мессенджер", "✏️") +
          body(`
          ${row("NM DEV Support", "Project launched! 🔥", "💬")}
          ${row("Client", "Thanks for the app!", "👤")}
        `),
      );
  }
}

function gridItem(title, price, color, icon) {
  return `
    <div style="background:#22222E;padding:10px;border-radius:10px;border:1px solid ${color}40;text-align:center;">
      <div style="font-size:22px;margin-bottom:4px;">${icon}</div>
      <div style="color:#fff;font-size:11px;font-weight:700;">${title}</div>
      <div style="color:${color};font-size:10px;">${price}</div>
    </div>
  `;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 229, 255";
}

/* ----- Инициализация ----- */
function initMobile() {
  if (!document.getElementById("mobileChips")) return;
  renderMobileChips();
  renderPhoneContent();
}

window.addEventListener('nm:lang-changed', () => {
  if (!document.getElementById('mobileChips')) return;
  renderMobileChips();
  renderPhoneContent();
});
