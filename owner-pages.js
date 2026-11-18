const languageButtons = [...document.querySelectorAll("[data-language]")];
const translatedElements = [...document.querySelectorAll("[data-lang]")];
const portrait = document.querySelector("[data-portrait]");
const description = document.querySelector('meta[name="description"]');

const supportedLanguages = new Set(["en", "es"]);

function preferredLanguage() {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  if (supportedLanguages.has(urlLanguage)) return urlLanguage;

  try {
    const storedLanguage = window.localStorage.getItem("hola-mundo-profile-language");
    if (supportedLanguages.has(storedLanguage)) return storedLanguage;
  } catch {
    // Local storage can be unavailable in privacy-restricted browsers.
  }

  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function applyLanguage(language, updateUrl = false) {
  const selectedLanguage = supportedLanguages.has(language) ? language : "en";
  document.documentElement.lang = selectedLanguage;

  translatedElements.forEach((element) => {
    element.hidden = element.dataset.lang !== selectedLanguage;
  });

  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === selectedLanguage;
    button.setAttribute("aria-pressed", String(isSelected));
  });

  const title = document.body.dataset[`title${selectedLanguage.toUpperCase()}`];
  const pageDescription = document.body.dataset[`description${selectedLanguage.toUpperCase()}`];
  if (title) document.title = title;
  if (description && pageDescription) description.content = pageDescription;

  if (portrait) {
    const alt = portrait.dataset[`alt${selectedLanguage.toUpperCase()}`];
    if (alt) portrait.alt = alt;
  }

  try {
    window.localStorage.setItem("hola-mundo-profile-language", selectedLanguage);
  } catch {
    // The switcher remains fully functional without persistence.
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", selectedLanguage);
    window.history.replaceState({}, "", url);
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language, true));
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

applyLanguage(preferredLanguage());
