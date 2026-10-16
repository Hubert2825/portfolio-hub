(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var COLORS = { light: "#f2f4ef", dark: "#0e1713" };

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
    if (themeMeta) {
      themeMeta.setAttribute("content", COLORS[theme]);
    }
  }

  // Sync the button and browser chrome with the theme chosen in <head>.
  applyTheme(currentTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* Storage can be blocked; the choice just won't persist. */
      }
    });
  }

  // Follow system changes until the visitor picks a theme themselves.
  try {
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (event) {
      if (!localStorage.getItem("theme")) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };
    if (media.addEventListener) {
      media.addEventListener("change", onChange);
    }
  } catch (e) {}

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
