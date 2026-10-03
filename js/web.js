/* ============================================================
   WEB.JS — эмулятор браузера (10 категорий)
   ============================================================ */

const WEB_DATA = [
  {
    key: "wcat_ecommerce",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    color: "#A855F7",
    url: "shop.nmdebug.com",
    title: "Интернет-магазин",
    stats: [
      ["Заказы сегодня", "384", "+22%"],
      ["Средний чек", "3,450 c", "+9%"],
      ["Конверсия", "4.8%", "+1.1%"],
    ],
  },
  {
    key: "wcat_crm",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    color: "#00E5FF",
    url: "crm.nmdebug.com",
    title: "CRM & Аналитика",
    stats: [
      ["Активные лиды", "1,248", "+15%"],
      ["Сделки в работе", "87", "+6%"],
      ["Конверсия", "31%", "+4%"],
    ],
  },
  {
    key: "wcat_delivery",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
    color: "#FB923C",
    url: "food.nmdebug.com",
    title: "Доставка & Еда",
    stats: [
      ["Заказы в работе", "156", "+18%"],
      ["Среднее время", "28 min", "-12%"],
      ["Рейтинг курьеров", "4.9", "+0.2"],
    ],
  },
  {
    key: "wcat_taxi",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>',
    color: "#FBBF24",
    url: "taxi.nmdebug.com",
    title: "Такси & Логистика",
    stats: [
      ["Активные поездки", "412", "+27%"],
      ["Водители онлайн", "89", "+11%"],
      ["Средний чек", "280 c", "+8%"],
    ],
  },
  {
    key: "wcat_fintech",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/></svg>',
    color: "#22C55E",
    url: "bank.nmdebug.com",
    title: "Финтех & Платёжка",
    stats: [
      ["Транзакций", "8,940", "+31%"],
      ["Оборот", "2.4M c", "+19%"],
      ["Успешных платежей", "99.2%", "+0.4%"],
    ],
  },
  {
    key: "wcat_education",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10L12 5 2 10l10 5 10-5z"/></svg>',
    color: "#14B8A6",
    url: "edu.nmdebug.com",
    title: "Онлайн-Обучение",
    stats: [
      ["Активных студентов", "3,120", "+14%"],
      ["Завершённых уроков", "18,450", "+23%"],
      ["Средний прогресс", "67%", "+5%"],
    ],
  },
  {
    key: "wcat_realty",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    color: "#F97316",
    url: "realty.nmdebug.com",
    title: "Недвижимость",
    stats: [
      ["Объектов в базе", "1,870", "+9%"],
      ["Заявок сегодня", "94", "+17%"],
      ["Средняя цена", "$85k", "+3%"],
    ],
  },
  {
    key: "wcat_medicine",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6"/><path d="M9 5h6"/><rect x="4" y="8" width="16" height="14" rx="2"/></svg>',
    color: "#EF4444",
    url: "clinic.nmdebug.com",
    title: "Медицина & Запись",
    stats: [
      ["Записей сегодня", "218", "+12%"],
      ["Врачей онлайн", "34", "+5%"],
      ["Среднее ожидание", "12 min", "-8%"],
    ],
  },
  {
    key: "wcat_hotels",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/></svg>',
    color: "#3B82F6",
    url: "hotel.nmdebug.com",
    title: "Отели & Бронирование",
    stats: [
      ["Бронирований", "167", "+21%"],
      ["Загрузка номеров", "78%", "+6%"],
      ["Средний чек", "6,800 c", "+11%"],
    ],
  },
  {
    key: "wcat_saas",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>',
    color: "#EC4899",
    url: "app.nmdebug.com",
    title: "SaaS & Соцсеть",
    stats: [
      ["Активных пользователей", "24.8k", "+16%"],
      ["Сообщений сегодня", "58k", "+29%"],
      ["Новых регистраций", "1,240", "+18%"],
    ],
  },
];

let currentWebIndex = 0;

function renderWebChips() {
  const container = document.getElementById("webChips");
  if (!container) return;

  container.innerHTML = WEB_DATA.map(
    (item, i) => `
    <button class="chip ${i === currentWebIndex ? "is-active" : ""}"
            data-index="${i}"
            style="--chip-accent: ${item.color}; --chip-accent-rgb: ${hexToRgb(item.color)}">
      ${item.icon}
      <span>${t(item.key)}</span>
    </button>
  `,
  ).join("");

  container.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      currentWebIndex = +chip.dataset.index;
      renderWebChips();
      renderBrowser();
    });
  });
}

function renderBrowser() {
  const urlEl = document.getElementById("browserUrl");
  const bodyEl = document.getElementById("browserBody");
  if (!urlEl || !bodyEl) return;

  const data = WEB_DATA[currentWebIndex];

  urlEl.textContent = `https://${data.url}`;
  urlEl.style.color = "#6B6B75";

  bodyEl.innerHTML = `
    <div style="background:linear-gradient(135deg,${data.color}33,transparent);padding:24px;border-radius:12px;border:1px solid ${data.color}55;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;">
        <div style="flex:1;min-width:220px;">
          <div style="color:${data.color};font-weight:700;font-size:12px;letter-spacing:1px;margin-bottom:6px;">WEB PLATFORM</div>
          <div style="color:#fff;font-size:24px;font-weight:700;margin-bottom:8px;">${t(data.key)}</div>
          <div style="color:#B0B0B8;font-size:13px;">${data.title} — современное веб-решение под ключ.</div>
        </div>
        <div style="color:${data.color};opacity:0.8;width:60px;height:60px;">${data.icon}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
      ${data.stats
        .map(
          ([title, value, change]) => `
        <div style="background:#22222E;border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:14px;">
          <div style="color:#6B6B75;font-size:11px;margin-bottom:6px;">${title}</div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#fff;font-size:18px;font-weight:700;">${value}</span>
            <span style="background:${data.color}22;color:${data.color};font-size:11px;font-weight:600;padding:2px 6px;border-radius:6px;">${change}</span>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

function initWeb() {
  if (!document.getElementById("webChips")) return;
  renderWebChips();
  renderBrowser();
}

/* ----- Утилита: HEX → RGB ----- */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 229, 255";
}


window.addEventListener('nm:lang-changed', () => {
  if (!document.getElementById('webChips')) return;
  renderWebChips();
  renderBrowser();
});