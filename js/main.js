/* ==========================================================================
   main.js — small glue: footer year, remove no-js flag
   ========================================================================== */
(function () {
  document.body.classList.remove('no-js');

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
