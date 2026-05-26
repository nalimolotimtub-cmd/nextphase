// ============================================
// NEXT PHASE - Language Switch
// ============================================

const LANG_KEY = "nextphase_lang";

// โหลดภาษาที่บันทึกไว้ หรือใช้ภาษาไทยเป็น default
function getSavedLang() {
  return localStorage.getItem(LANG_KEY) || "th";
}

// บันทึกภาษา
function saveLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

// render ปุ่ม toggle (TH | EN)
function renderToggle(lang) {
  const toggleBtn = document.getElementById("lang-toggle");
  if (!toggleBtn) return;

  toggleBtn.innerHTML =
    lang === "th"
      ? `<span class="lang-flag active">TH</span> <span class="lang-sep">|</span> <span class="lang-flag">EN</span>`
      : `<span class="lang-flag">TH</span> <span class="lang-sep">|</span> <span class="lang-flag active">EN</span>`;
}

// อัปเดต element ที่มี data-i18n
function applyTranslations(lang) {
  const t = translations?.[lang];
  if (!t) return;

  // อัปเดต text ทั่วไป
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // อัปเดต placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // อัปเดตปุ่ม toggle
  renderToggle(lang);

  // อัปเดต html lang attribute
  document.documentElement.lang = lang === "th" ? "th" : "en";
}

// สลับภาษา
function toggleLang() {
  const current = getSavedLang();
  const next = current === "th" ? "en" : "th";
  saveLang(next);
  applyTranslations(next);
}

// เริ่มต้นเมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", () => {
  const lang = getSavedLang();
  applyTranslations(lang);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) toggleBtn.addEventListener("click", toggleLang);
});