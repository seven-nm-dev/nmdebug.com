/* ============================================================
   HOME.JS — анимация печатной машинки и интерактив главной
   ============================================================ */

/* ----- Печатная машинка "NM DEV" ----- */
function initTypewriter() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const fullText = "NM DEV";
  let index = 0;
  let timer = null;

  function type() {
    el.textContent = "";
    index = 0;
    clearInterval(timer);
    timer = setInterval(() => {
      if (index < fullText.length) {
        el.textContent += fullText[index];
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
  }

  // Первый запуск
  type();

  // Повтор каждые 10 сек
  setInterval(type, 10000);
}

/* ----- Плавное появление карточек при загрузке ----- */
function initTilesEntrance() {
  const tiles = document.querySelectorAll(".tile");
  if (!tiles.length) return;

  tiles.forEach((tile, i) => {
    tile.style.opacity = "0";
    tile.style.transform = "translateY(20px)";
    tile.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tiles.forEach((tile) => {
        tile.style.opacity = "1";
        tile.style.transform = "translateY(0)";
      });
    });
  });
}

/* ----- Инициализация ----- */
document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initTilesEntrance();
});
