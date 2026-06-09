(function () {
  const supported = ["zh", "en"];
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  let language = supported.includes(requested)
    ? requested
    : localStorage.getItem("shopping-bingli-language") || "zh";

  function apply(nextLanguage, updateUrl = true) {
    language = supported.includes(nextLanguage) ? nextLanguage : "zh";
    localStorage.setItem("shopping-bingli-language", language);
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";

    document.querySelectorAll("[data-zh][data-en]").forEach((node) => {
      node.textContent = node.dataset[language];
    });
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      const active = button.dataset.langSwitch === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const title = document.body.dataset[`title${language === "en" ? "En" : "Zh"}`];
    if (title) document.title = title;
    const description = document.body.dataset[`description${language === "en" ? "En" : "Zh"}`];
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.content = description;

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      window.history.replaceState({}, "", url);
    }
  }

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.langSwitch));
  });

  apply(language, false);
})();
