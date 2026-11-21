/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Constants for CDNs
const PLOTLY_URL = "https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js";
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

// Detect OS/browser preference
const browserPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determine the computed theme, which can be "dark" or "light".
function determineComputedTheme() {
  // Determine the expected state of the theme toggle, which can be "dark", "light", or default "system"
  let themeSetting = localStorage.getItem("theme");
  themeSetting = (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;

  // Return the setting if set, or use the browser preference
  if (themeSetting != "system") {
    return themeSetting;
  }
  return browserPref ? "dark" : "light";
}

// Set the theme on page load or when explicitly called. Without an argument the
// theme is the stored preference or, failing that, the OS/browser preference.
function setTheme(theme) {
  const use_theme = theme || determineComputedTheme();

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");

  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");

  }
  const themeAction = use_theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  $(".theme-switch").attr("aria-label", themeAction).attr("title", themeAction);
}

// Toggle the theme manually
function toggleTheme() {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
  redrawPlotly();
}

// Defer the loading of Mermaid to only if there is a field on the page to be rendered
let mermaidElements = document.querySelectorAll("pre>code.language-mermaid");
if (mermaidElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Append the Mermaid module to the DOM
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = `
      import mermaid from '${MERMAID_URL}';
      mermaid.initialize({startOnLoad:true, theme:'default'});
      await mermaid.run({querySelector:'code.language-mermaid'});
    `;
    document.body.appendChild(moduleScript);
  });
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is
// actually present on the page.
//
// NOTE that plotlyDarkLayout and plotlyLightLayout will be exposed in the minimized file
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Return if not ready
    if (document.readyState !== "complete") {
      return;
    }

    // Prepare to load Plotly from the CDN
    const script = document.createElement('script');
    script.src = PLOTLY_URL;
    script.async = true;

    // Once loaded, update the page elements to work with it
    script.onload = function() {
      plotlyElements.forEach(function(elem) {
        // Parse the Plotly JSON data and hide it
        let jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }

    // Add the script to the document
    document.head.appendChild(script);
  });
}

function redrawPlotly() {
  plotlyElements.forEach(function(elem) {
    // Parse the Plotly JSON data
    let jsonData = JSON.parse(elem.textContent);

    // Get the Plotly node
    let chartElement = $(elem).parent().next().get(0);

    // Set the theme for the plot and render it
    const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
    if (jsonData.layout) {
      jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
    } else {
      jsonData.layout = { template: theme };
    }
    Plotly.react(chartElement, jsonData.data, jsonData.layout);
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Enable the theme toggle
  $('.theme-switch').on('click', toggleTheme);

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

});

// Enlarge article images without changing their inline size or captions.
(function () {
  const dialog = document.querySelector(".article-lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const preview = dialog.querySelector(".article-lightbox__image");
  const closeButton = dialog.querySelector(".article-lightbox__close");
  let opener = null;
  let scrollRegion = null;
  let previousOverflow = "";

  function openImage(img) {
    opener = img;
    preview.src = img.currentSrc || img.src;
    preview.alt = img.alt;
    scrollRegion = document.querySelector(".site-content-scroll");
    if (scrollRegion) {
      previousOverflow = scrollRegion.style.overflowY;
      scrollRegion.style.overflowY = "hidden";
    }
    dialog.showModal();
    closeButton.focus();
  }

  document.querySelectorAll(".scicomm-article img").forEach(function (img) {
    // Keep any explicitly linked images working as links.
    if (img.closest("a, button")) return;
    img.setAttribute("role", "button");
    img.setAttribute("tabindex", "0");
    img.setAttribute("aria-haspopup", "dialog");
    img.setAttribute("aria-label", "Enlarge image: " + (img.alt || "article figure"));
    img.addEventListener("click", function () { openImage(img); });
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage(img);
      }
    });
  });

  closeButton.addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
    if (event.target === preview && preview.naturalWidth && preview.naturalHeight) {
      // The image uses contain: clicks on its empty letterboxed area are outside.
      const rect = preview.getBoundingClientRect();
      const scale = Math.min(rect.width / preview.naturalWidth, rect.height / preview.naturalHeight);
      const width = preview.naturalWidth * scale;
      const height = preview.naturalHeight * scale;
      const left = rect.left + (rect.width - width) / 2;
      const top = rect.top + (rect.height - height) / 2;
      if (event.clientX < left || event.clientX > left + width ||
          event.clientY < top || event.clientY > top + height) dialog.close();
    }
  });
  // Native modal dialogs provide Escape dismissal and keyboard focus containment.
  dialog.addEventListener("close", function () {
    if (scrollRegion) scrollRegion.style.overflowY = previousOverflow;
    preview.removeAttribute("src");
    if (opener) opener.focus();
  });
})();
