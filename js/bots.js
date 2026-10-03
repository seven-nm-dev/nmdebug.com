/* ============================================================
   BOTS.JS — эмулятор Telegram-чата (5 категорий)
   ============================================================ */

const BOTS_DATA = [
  {
    key: "bcat_ecommerce",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>',
    color: "#FB923C",
    botName: "FoodOrder_Bot",
    welcome: "👋 Привет! Я бот для заказа еды.\nВыберите категорию меню:",
    buttons: ["🍕 Пицца", "🍔 Бургеры", "🥤 Напитки", "🛒 Корзина (0)"],
  },
  {
    key: "bcat_booking",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    color: "#EF4444",
    botName: "ClinicBooking_Bot",
    welcome: "🏥 Запись к врачу за 1 минуту.\nВыберите направление:",
    buttons: ["👨‍⚕️ Терапевт", "🦷 Стоматолог", "📅 Мои записи"],
  },
  {
    key: "bcat_crm",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/><path d="M12 7v5l3 3"/></svg>',
    color: "#00E5FF",
    botName: "Support24_Bot",
    welcome: "🤖 Автоматическая поддержка 24/7.\nЧем могу помочь?",
    buttons: ["❓ FAQ", "👨‍💻 Оператор", "📊 Статус заявки"],
  },
  {
    key: "bcat_ai",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    color: "#A855F7",
    botName: "AiAssistant_Bot",
    welcome:
      "⚡ Я нейросетевой ассистент.\nГотов обработать ваш запрос или сгенерировать текст.",
    buttons: ["✍️ Написать пост", "🔍 Анализ данных", "⚙️ Настройки ИИ"],
  },
  {
    key: "bcat_courses",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10L12 5 2 10l10 5 10-5z"/></svg>',
    color: "#14B8A6",
    botName: "Academy_Bot",
    welcome: "🎓 Добро пожаловать в онлайн-школу!\nВыберите курс для старта:",
    buttons: ["🚀 Урок 1: Введение", "📚 Материалы", "🏆 Сертификат"],
  },
];

let currentBotIndex = 0;

function renderBotsChips() {
  const container = document.getElementById("botsChips");
  if (!container) return;

  container.innerHTML = BOTS_DATA.map(
    (item, i) => `
    <button class="chip ${i === currentBotIndex ? "is-active" : ""}"
            data-index="${i}"
            style="--chip-accent: ${item.color}; --chip-accent-rgb: ${hexToRgb(item.color)}">
      ${item.icon}
      <span>${t(item.key)}</span>
    </button>
  `,
  ).join("");

  container.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      currentBotIndex = +chip.dataset.index;
      renderBotsChips();
      renderTelegramChat();
    });
  });
}

function renderTelegramChat() {
  const header = document.getElementById("tgHeader");
  const body = document.getElementById("tgBody");
  if (!header || !body) return;

  const bot = BOTS_DATA[currentBotIndex];

  header.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,${bot.color}aa,${bot.color}55);display:flex;align-items:center;justify-content:center;color:#fff;">
        ${bot.icon}
      </div>
      <div style="flex:1;">
        <div style="color:#fff;font-weight:600;font-size:15px;">${bot.botName}</div>
        <div style="display:flex;align-items:center;gap:5px;font-size:12px;color:#64B5F6;">
          <span style="width:7px;height:7px;background:#4CAF50;border-radius:50%;display:inline-block;"></span>
          ${t("bots_online")}
        </div>
      </div>
      <span style="color:rgba(255,255,255,0.5);font-size:20px;">⋮</span>
    </div>
  `;

  body.innerHTML = `
    <div style="max-width:78%;padding:11px 14px;background:#182533;border-radius:4px 16px 16px 16px;color:#fff;font-size:14px;line-height:1.4;white-space:pre-line;margin-bottom:18px;">
      ${bot.welcome}
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;">
      ${bot.buttons
        .map(
          (btn) => `
        <button class="tg-btn"
                style="padding:10px 14px;background:rgba(43,82,120,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#fff;font-size:13px;font-weight:500;cursor:pointer;transition:transform 0.15s ease;"
                onmouseover="this.style.transform='translateY(-2px)'"
                onmouseout="this.style.transform='translateY(0)'">
          ${btn}
        </button>
      `,
        )
        .join("")}
    </div>
  `;

  body.querySelectorAll(".tg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Clicked:", btn.textContent.trim());
    });
  });
}

function initBots() {
  if (!document.getElementById("botsChips")) return;
  renderBotsChips();
  renderTelegramChat();
}

/* ----- Утилита: HEX → RGB ----- */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 229, 255";
}

window.addEventListener('nm:lang-changed', () => {
  if (!document.getElementById('botsChips')) return;
  renderBotsChips();
  renderTelegramChat();
});
