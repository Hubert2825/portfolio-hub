(function () {
  "use strict";

  /* ---- Theme toggle --------------------------------------------------- */
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

  /* ---- Footer year ---------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---- Photo lightbox ------------------------------------------------- */
  var dialog = null;

  function buildDialog() {
    var el = document.createElement("dialog");
    el.className = "lightbox";
    el.setAttribute("aria-label", "Enlarged photo");
    el.innerHTML =
      '<button type="button" class="lightbox__close">Close</button>' +
      "<figure><img alt=\"\"><figcaption></figcaption></figure>";

    el.querySelector(".lightbox__close").addEventListener("click", function () {
      el.close();
    });

    // Clicking the dark backdrop (outside the dialog box) closes it.
    el.addEventListener("click", function (event) {
      if (event.target === el) {
        el.close();
      }
    });

    document.body.appendChild(el);
    return el;
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-lightbox]");
    if (!trigger) {
      return;
    }

    var src = trigger.getAttribute("data-full");
    if (typeof HTMLDialogElement !== "function") {
      // Older browsers: open the photo on its own page instead.
      window.open(src, "_blank", "noopener");
      return;
    }

    if (!dialog) {
      dialog = buildDialog();
    }

    var img = dialog.querySelector("img");
    var caption = dialog.querySelector("figcaption");
    img.src = src;
    img.alt = trigger.getAttribute("data-alt") || "";
    caption.textContent = trigger.getAttribute("data-caption") || "";
    caption.hidden = !caption.textContent;
    dialog.showModal();
  });
})();
