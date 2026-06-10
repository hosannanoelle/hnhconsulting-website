/* ============================================================
   HNH Consulting | main.js
   Nav toggle, FAQ accordion, header scroll behavior
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     SETUP: paste your Formspree form ID between the quotes below.
     Get it at formspree.io. The ID is the last part of your form
     endpoint, e.g. for https://formspree.io/f/abcdwxyz it is "abcdwxyz".
     This is the only line you need to change to turn the form on.
     ============================================================ */
  var HNH_FORMSPREE_ID = "xwvjnpbv";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.setAttribute("data-open", String(!open));
    });

    // Close the menu when a link inside it is chosen
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        links.setAttribute("data-open", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        links.setAttribute("data-open", "false");
        toggle.focus();
      }
    });
  }

  /* ---- FAQ accordion ---- */
  var questions = document.querySelectorAll(".faq__q");

  Array.prototype.forEach.call(questions, function (q) {
    var panel = q.parentNode.nextElementSibling; // .faq__a
    if (!panel) return;

    q.addEventListener("click", function () {
      var isOpen = q.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        panel.style.maxHeight = null;
        q.setAttribute("aria-expanded", "false");
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Keep an open panel sized correctly after a resize
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      Array.prototype.forEach.call(questions, function (q) {
        if (q.getAttribute("aria-expanded") === "true") {
          var panel = q.parentNode.nextElementSibling;
          if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }, 150);
  });

  /* ---- Contact form (Formspree, no page redirect) ---- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var idIsSet = HNH_FORMSPREE_ID && HNH_FORMSPREE_ID !== "YOUR_FORM_ID";

  if (form && status) {
    // Build the endpoint from the single setup line above
    if (idIsSet) {
      form.setAttribute("action", "https://formspree.io/f/" + HNH_FORMSPREE_ID);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!idIsSet) {
        status.style.color = "var(--rose)";
        status.textContent = "This form is not connected yet. Add your Formspree ID at the top of main.js, or email contact@hosannanoelle.com.";
        return;
      }

      status.style.color = "var(--slate)";
      status.textContent = "Sending your note...";

      var data = new FormData(form);
      var request = new XMLHttpRequest();
      request.open("POST", form.action);
      request.setRequestHeader("Accept", "application/json");

      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          form.reset();
          status.style.color = "var(--rose)";
          status.textContent = "Thank you. Your note is on its way and I will reply myself soon.";
        } else {
          status.style.color = "var(--rose)";
          status.textContent = "Something went wrong. Please email contact@hosannanoelle.com directly.";
        }
      };

      request.onerror = function () {
        status.style.color = "var(--rose)";
        status.textContent = "Something went wrong. Please email contact@hosannanoelle.com directly.";
      };

      request.send(data);
    });
  }

})();
