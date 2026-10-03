/* ============================================================
   CALCULATOR.JS — универсальный калькулятор v2.1 (i18n)
   ============================================================ */

/* Базовая цена всегда в USD.
   rate = сколько ЕДИНИЦ этой валюты за 1 USD */
const CURRENCY = {
  KGS: { rate: 89, symbol: "сом", position: "after" },
  USD: { rate: 1, symbol: "$", position: "before" },
  EUR: { rate: 0.92, symbol: "€", position: "before" },
};

let currentCurrency = "KGS";

/* ----- Данные по типам (тексты через ключи i18n) ----- */
const CALC_DATA = {
  mobile: {
    titleKey: "calc_title_mobile",
    minBudget: 15000,
    baseDays: 14,
    platforms: [
      { id: "ios", labelKey: "calc_opt_ios", price: 250, days: 3 },
      { id: "android", labelKey: "calc_opt_android", price: 250, days: 3 },
    ],
    design: [
      {
        labelKey: "calc_design_basic",
        subKey: "calc_design_basic_sub",
        price: 200,
        days: 3,
      },
      {
        labelKey: "calc_design_unique",
        subKey: "calc_design_unique_sub",
        price: 500,
        days: 7,
      },
      {
        labelKey: "calc_design_premium",
        subKey: "calc_design_premium_sub",
        price: 900,
        days: 14,
      },
    ],
    features: [
      { id: "auth", labelKey: "calc_feat_auth", price: 150, days: 2 },
      { id: "catalog", labelKey: "calc_feat_catalog", price: 250, days: 3 },
      { id: "cart", labelKey: "calc_feat_cart", price: 300, days: 4 },
      { id: "push", labelKey: "calc_feat_push", price: 200, days: 3 },
      { id: "geo", labelKey: "calc_feat_geo", price: 350, days: 4 },
      { id: "admin", labelKey: "calc_feat_admin", price: 400, days: 5 },
      { id: "crm", labelKey: "calc_feat_crm", price: 450, days: 5 },
      { id: "lang", labelKey: "calc_feat_lang", price: 180, days: 2 },
      { id: "theme", labelKey: "calc_feat_theme", price: 120, days: 2 },
      { id: "reviews", labelKey: "calc_feat_reviews", price: 160, days: 2 },
    ],
  },
  bots: {
    titleKey: "calc_title_bots",
    minBudget: 5000,
    baseDays: 5,
    platforms: [
      { id: "telegram", labelKey: "calc_opt_telegram", price: 180, days: 3 },
      { id: "whatsapp", labelKey: "calc_opt_whatsapp", price: 220, days: 4 },
      { id: "ai", labelKey: "calc_opt_ai", price: 300, days: 5 },
      { id: "multi", labelKey: "calc_opt_multi", price: 350, days: 6 },
    ],
    design: [
      {
        labelKey: "calc_design_simple",
        subKey: "calc_design_simple_sub",
        price: 80,
        days: 2,
      },
      {
        labelKey: "calc_design_medium",
        subKey: "calc_design_medium_sub",
        price: 200,
        days: 5,
      },
      {
        labelKey: "calc_design_hard",
        subKey: "calc_design_hard_sub",
        price: 400,
        days: 10,
      },
    ],
    features: [
      { id: "admin", labelKey: "calc_feat_admin", price: 120, days: 2 },
      { id: "payment", labelKey: "calc_feat_payment", price: 150, days: 3 },
      { id: "crm", labelKey: "calc_feat_crm1c", price: 180, days: 3 },
      { id: "ai", labelKey: "calc_feat_aichat", price: 250, days: 4 },
      { id: "broadcast", labelKey: "calc_feat_broadcast", price: 90, days: 2 },
      { id: "booking", labelKey: "calc_feat_booking", price: 140, days: 3 },
      { id: "catalog", labelKey: "calc_feat_catalog2", price: 130, days: 2 },
      { id: "analytics", labelKey: "calc_feat_analytics", price: 100, days: 2 },
    ],
  },
  web: {
    titleKey: "calc_title_web",
    minBudget: 10000,
    baseDays: 7,
    platforms: [
      { id: "landing", labelKey: "calc_opt_landing", price: 150, days: 5 },
      { id: "corporate", labelKey: "calc_opt_corporate", price: 350, days: 10 },
      { id: "ecommerce", labelKey: "calc_opt_ecommerce", price: 500, days: 14 },
    ],
    design: [
      {
        labelKey: "calc_design_template",
        subKey: "calc_design_template_sub",
        price: 100,
        days: 2,
      },
      {
        labelKey: "calc_design_custom",
        subKey: "calc_design_custom_sub",
        price: 300,
        days: 7,
      },
      {
        labelKey: "calc_design_3d",
        subKey: "calc_design_3d_sub",
        price: 600,
        days: 14,
      },
    ],
    features: [
      { id: "admin", labelKey: "calc_feat_admin", price: 250, days: 4 },
      { id: "payment", labelKey: "calc_feat_payment", price: 200, days: 3 },
      { id: "seo", labelKey: "calc_feat_seo", price: 150, days: 2 },
      { id: "lang", labelKey: "calc_feat_lang", price: 120, days: 2 },
      { id: "catalog", labelKey: "calc_feat_catalog_f", price: 200, days: 3 },
      { id: "crm", labelKey: "calc_feat_crm1c", price: 300, days: 4 },
      { id: "forms", labelKey: "calc_feat_forms", price: 80, days: 1 },
      { id: "profile", labelKey: "calc_feat_profile", price: 220, days: 3 },
    ],
  },
};

/* ----- Состояние ----- */
let calcType = "mobile";
let calcState = {
  platforms: {},
  design: -1,
  features: {},
  urgent: false,
};

/* ----- Сброс ----- */
function resetCalcState() {
  calcState = { platforms: {}, design: -1, features: {}, urgent: false };
}

/* ----- Подсчёт USD ----- */
function calcUSD() {
  const data = CALC_DATA[calcType];
  let total = 0;

  data.platforms.forEach((p) => {
    if (calcState.platforms[p.id]) total += p.price;
  });
  if (calcState.design >= 0) total += data.design[calcState.design].price;

  let featuresSum = 0;
  let featuresCount = 0;
  data.features.forEach((f) => {
    if (calcState.features[f.id]) {
      featuresSum += f.price;
      featuresCount++;
    }
  });

  // Скидка за комплекс: 3+ функций → -10%
  if (featuresCount >= 3) featuresSum *= 0.9;

  total += featuresSum;

  // Срочность: +30%
  if (calcState.urgent && total > 0) total *= 1.3;

  return Math.round(total);
}

/* ----- Подсчёт дней ----- */
function calcDays() {
  const data = CALC_DATA[calcType];
  let days = data.baseDays;

  data.platforms.forEach((p) => {
    if (calcState.platforms[p.id]) days += p.days;
  });
  if (calcState.design >= 0) days += data.design[calcState.design].days;
  data.features.forEach((f) => {
    if (calcState.features[f.id]) days += f.days;
  });

  if (calcState.urgent && days > 0) days = Math.ceil(days / 2);

  return days;
}

/* ----- Форматирование цены ----- */
function formatPrice(usd) {
  const cfg = CURRENCY[currentCurrency];
  const value = Math.round(usd * cfg.rate);
  const formatted = value.toLocaleString("ru-RU");
  return cfg.position === "before"
    ? `${cfg.symbol}${formatted}`
    : `${formatted} ${cfg.symbol}`;
}

/* ----- Текст бюджета ----- */
function calcBudgetText() {
  const usd = calcUSD();
  if (usd === 0) {
    const minUSD = CALC_DATA[calcType].minBudget / 89;
    return `от ${formatPrice(minUSD)}`;
  }
  return `~ ${formatPrice(usd)}`;
}

/* ----- Текст срока ----- */
function calcDeadlineText() {
  const days = calcDays();
  if (days < 7) return `Срок: ~ ${days} дней`;
  if (days < 14) return `Срок: ~ ${Math.ceil(days / 7)} недели`;
  return `Срок: ~ ${Math.ceil(days / 7)} недель`;
}

/* ----- Разбивка бюджета ----- */
function calcBreakdown() {
  const data = CALC_DATA[calcType];
  let platformSum = 0;
  data.platforms.forEach((p) => {
    if (calcState.platforms[p.id]) platformSum += p.price;
  });

  let designSum =
    calcState.design >= 0 ? data.design[calcState.design].price : 0;

  let featuresSum = 0;
  let featuresCount = 0;
  data.features.forEach((f) => {
    if (calcState.features[f.id]) {
      featuresSum += f.price;
      featuresCount++;
    }
  });
  const discount = featuresCount >= 3 ? featuresSum * 0.1 : 0;
  featuresSum -= discount;

  let total = platformSum + designSum + featuresSum;
  const urgentFee = calcState.urgent ? total * 0.3 : 0;
  total += urgentFee;

  return { platformSum, designSum, featuresSum, discount, urgentFee, total };
}

/* ============================================================
   Отрисовка
   ============================================================ */
function renderCalc() {
  const main = document.getElementById("calcMain");
  const titleEl = document.getElementById("calcTitle");
  const priceEl = document.getElementById("calcPrice");
  const deadlineEl = document.getElementById("calcDeadline");
  if (!main) return;

  const data = CALC_DATA[calcType];

  if (titleEl) titleEl.textContent = t(data.titleKey);
  if (priceEl) priceEl.textContent = calcBudgetText();
  if (deadlineEl) deadlineEl.textContent = calcDeadlineText();

  const bd = calcBreakdown();
  const hasAny = bd.total > 0;

  main.innerHTML = `
    <!-- Платформы -->
    <h3 class="section-title">${t("calc_platforms")}</h3>
    <div class="calc-options">
      ${data.platforms
        .map(
          (p) => `
        <div class="calc-option ${calcState.platforms[p.id] ? "is-active" : ""}" data-platform="${p.id}">
          <span class="calc-option__check">${calcState.platforms[p.id] ? "✓" : ""}</span>
          <span class="calc-option__label">${t(p.labelKey)}</span>
          <span class="calc-option__price">+$${p.price}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <!-- Дизайн -->
    <h3 class="section-title" style="margin-top:24px;">${t("calc_design")}</h3>
    <div class="calc-options">
      ${data.design
        .map(
          (d, i) => `
        <div class="calc-option ${calcState.design === i ? "is-active" : ""}" data-design="${i}">
          <span class="calc-option__check">${calcState.design === i ? "●" : ""}</span>
          <span class="calc-option__label">
            <strong>${t(d.labelKey)}</strong>
            <small>${t(d.subKey)}</small>
          </span>
          <span class="calc-option__price">+$${d.price}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <!-- Функции -->
    <h3 class="section-title" style="margin-top:24px;">${t("calc_features")}</h3>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:12px;">${t("calc_discount_hint")}</p>
    <div class="calc-features">
      ${data.features
        .map(
          (f) => `
        <div class="calc-feature ${calcState.features[f.id] ? "is-active" : ""}" data-feature="${f.id}">
          <span class="calc-feature__check">${calcState.features[f.id] ? "✓" : ""}</span>
          <span class="calc-feature__label">${t(f.labelKey)}</span>
          <span class="calc-feature__price">+$${f.price}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <!-- Срочность -->
    <div class="calc-urgent ${calcState.urgent ? "is-active" : ""}" data-urgent="1" style="margin-top:24px;">
      <div class="calc-urgent__icon">⚡</div>
      <div class="calc-urgent__text">
        <strong>${t("calc_urgent_title")}</strong>
        <small>${t("calc_urgent_sub")}</small>
      </div>
      <div class="calc-urgent__toggle">
        <span class="calc-urgent__slider"></span>
      </div>
    </div>

    <!-- Разбивка бюджета -->
    ${
      hasAny
        ? `
      <div class="calc-breakdown">
        <h4>${t("calc_breakdown_title")}</h4>
        ${bd.platformSum > 0 ? `<div class="calc-breakdown__row"><span>${t("calc_breakdown_platforms")}</span><span>~ ${formatPrice(bd.platformSum)}</span></div>` : ""}
        ${bd.designSum > 0 ? `<div class="calc-breakdown__row"><span>${t("calc_breakdown_design")}</span><span>~ ${formatPrice(bd.designSum)}</span></div>` : ""}
        ${bd.featuresSum > 0 ? `<div class="calc-breakdown__row"><span>${t("calc_breakdown_features")} ${bd.discount > 0 ? `(${t("calc_breakdown_discount")} −${formatPrice(bd.discount)})` : ""}</span><span>~ ${formatPrice(bd.featuresSum)}</span></div>` : ""}
        ${bd.urgentFee > 0 ? `<div class="calc-breakdown__row calc-breakdown__row--accent"><span>${t("calc_breakdown_urgent")}</span><span>+ ${formatPrice(bd.urgentFee)}</span></div>` : ""}
      </div>
    `
        : ""
    }
  `;

  /* Обработчики */
  main.querySelectorAll("[data-platform]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.platform;
      calcState.platforms[id] = !calcState.platforms[id];
      renderCalc();
    });
  });

  main.querySelectorAll("[data-design]").forEach((el) => {
    el.addEventListener("click", () => {
      const i = +el.dataset.design;
      calcState.design = calcState.design === i ? -1 : i;
      renderCalc();
    });
  });

  main.querySelectorAll("[data-feature]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.feature;
      calcState.features[id] = !calcState.features[id];
      renderCalc();
    });
  });

  const urgentEl = main.querySelector("[data-urgent]");
  if (urgentEl) {
    urgentEl.addEventListener("click", () => {
      calcState.urgent = !calcState.urgent;
      renderCalc();
    });
  }
}

/* ----- Переключатель валют ----- */
function renderCurrencySwitcher() {
  const container = document.getElementById("currencySwitcher");
  if (!container) return;

  container.innerHTML = Object.keys(CURRENCY)
    .map(
      (cur) => `
    <button class="currency-btn ${cur === currentCurrency ? "is-active" : ""}" data-currency="${cur}">
      ${cur}
    </button>
  `,
    )
    .join("");

  container.querySelectorAll(".currency-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCurrency = btn.dataset.currency;
      renderCurrencySwitcher();
      renderCalc();
    });
  });
}

/* ----- Валидация ----- */
function validateCalcForm(form) {
  let valid = true;
  const name = form.querySelector('[name="name"]');
  const phone = form.querySelector('[name="phone"]');
  const nameErr = form.querySelector('[data-error-for="name"]');
  const phoneErr = form.querySelector('[data-error-for="phone"]');

  if (!name.value.trim() || name.value.trim().length < 2) {
    name.classList.add("is-invalid");
    if (nameErr) nameErr.textContent = t("calc_err_name_required");
    valid = false;
  } else {
    name.classList.remove("is-invalid");
    if (nameErr) nameErr.textContent = "";
  }

  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
    phone.classList.add("is-invalid");
    if (phoneErr) phoneErr.textContent = t("calc_err_phone_invalid");
    valid = false;
  } else {
    phone.classList.remove("is-invalid");
    if (phoneErr) phoneErr.textContent = "";
  }

  return valid;
}

/* ----- Отправка формы ----- */
function submitCalcForm(method) {
  const form = document.getElementById("calcForm");
  if (!form || !validateCalcForm(form)) return;

  const name = form.querySelector('[name="name"]').value.trim();
  const company = form.querySelector('[name="company"]').value.trim() || "—";
  const phone = form.querySelector('[name="phone"]').value.trim();
  const comment = form.querySelector('[name="comment"]')?.value.trim() || "—";

  const data = CALC_DATA[calcType];
  const platforms =
    data.platforms
      .filter((p) => calcState.platforms[p.id])
      .map((p) => t(p.labelKey))
      .join(", ") || "—";
  const design =
    calcState.design >= 0 ? t(data.design[calcState.design].labelKey) : "—";
  const features =
    data.features
      .filter((f) => calcState.features[f.id])
      .map((f) => "• " + t(f.labelKey))
      .join("\n") || "—";

  const urgent = calcState.urgent ? "⚡ ДА (+30%)" : "Нет";

  const msg = `🚀 ЗАЯВКА НА РАЗРАБОТКУ

👤 Клиент: ${name}
🏢 Компания: ${company}
📞 Телефон: ${phone}

📱 Проект: ${t(data.titleKey)}
💰 Бюджет: ${calcBudgetText()}
⏱ Срок: ${calcDeadlineText().replace("Срок: ", "")}
⚡ Срочность: ${urgent}

🎯 Платформы: ${platforms}
🎨 Дизайн: ${design}

⚙️ Функции:
${features}

📝 Комментарий:
${comment}`;

  const url =
    method === "telegram" ? getTelegramLink(msg) : getWhatsAppLink(msg);
  window.open(url, "_blank");

  const modal = document.getElementById("calcModal");
  if (modal) modal.classList.remove("is-open");
}

/* ----- Инициализация ----- */
function initCalculator() {
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get("type");
  if (["mobile", "bots", "web"].includes(typeParam)) calcType = typeParam;

  document.querySelectorAll(".calc-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.type === calcType);
    tab.addEventListener("click", () => {
      calcType = tab.dataset.type;
      resetCalcState();
      document
        .querySelectorAll(".calc-tab")
        .forEach((tb) =>
          tb.classList.toggle("is-active", tb.dataset.type === calcType),
        );
      renderCalc();
    });
  });

  renderCurrencySwitcher();
  renderCalc();

  const modal = document.getElementById("calcModal");
  const sendBtn = document.getElementById("calcSendBtn");
  const closeBtn = document.getElementById("modalClose");

  if (sendBtn && modal) {
    sendBtn.addEventListener("click", () => {
      if (calcUSD() === 0) {
        alert(t("calc_select_alert"));
        return;
      }
      modal.classList.add("is-open");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("is-open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("is-open");
    });
  }

  const form = document.getElementById("calcForm");
  if (form) {
    const sendTg = document.getElementById("sendTelegram");
    const sendWa = document.getElementById("sendWhatsApp");
    if (sendTg)
      sendTg.addEventListener("click", () => submitCalcForm("telegram"));
    if (sendWa)
      sendWa.addEventListener("click", () => submitCalcForm("whatsapp"));
  }
}
