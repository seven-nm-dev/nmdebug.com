/* ============================================================
   CONTACT.JS — форма обратной связи
   ============================================================ */

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const sendTg = document.getElementById("contactSendTelegram");
  const sendWa = document.getElementById("contactSendWhatsApp");

  if (sendTg) sendTg.addEventListener("click", () => submitContact("telegram"));
  if (sendWa) sendWa.addEventListener("click", () => submitContact("whatsapp"));
}

function validateContact(form) {
  let valid = true;

  const name = form.querySelector('[name="name"]');
  const phone = form.querySelector('[name="phone"]');
  const message = form.querySelector('[name="message"]');

  // Имя
  const nameErr = form.querySelector('[data-error-for="name"]');
  if (!name.value.trim() || name.value.trim().length < 2) {
    name.classList.add("is-invalid");
    if (nameErr) nameErr.textContent = t("err_contact_name");
    valid = false;
  } else {
    name.classList.remove("is-invalid");
    if (nameErr) nameErr.textContent = "";
  }

  // Телефон
  const phoneErr = form.querySelector('[data-error-for="phone"]');
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
    phone.classList.add("is-invalid");
    if (phoneErr) phoneErr.textContent = t("err_contact_phone");
    valid = false;
  } else {
    phone.classList.remove("is-invalid");
    if (phoneErr) phoneErr.textContent = "";
  }

  // Сообщение
  const msgErr = form.querySelector('[data-error-for="message"]');
  if (!message.value.trim() || message.value.trim().length < 10) {
    message.classList.add("is-invalid");
    if (msgErr) msgErr.textContent = t("err_contact_message");
    valid = false;
  } else {
    message.classList.remove("is-invalid");
    if (msgErr) msgErr.textContent = "";
  }

  return valid;
}

function submitContact(method) {
  const form = document.getElementById("contactForm");
  if (!form) return;

  if (!validateContact(form)) return;

  const name = form.querySelector('[name="name"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const company = form.querySelector('[name="company"]').value.trim() || "—";
  const message = form.querySelector('[name="message"]').value.trim();

  const text = `📩 НОВАЯ ЗАЯВКА С САЙТА

👤 Имя: ${name}
📞 Телефон: ${phone}
🏢 Бизнес: ${company}

💬 О проекте:
${message}`;

  const url =
    method === "telegram" ? getTelegramLink(text) : getWhatsAppLink(text);
  window.open(url, "_blank");

  // Показываем сообщение об успехе
  const success = document.getElementById("contactSuccess");
  if (success) {
    success.hidden = false;
    // Прячем через 5 секунд
    setTimeout(() => {
      success.hidden = true;
    }, 5000);
  }
}
