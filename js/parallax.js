/* ==========================================================================
   parallax.js — subtle mouse-move parallax for hero background shapes
   ========================================================================== */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (reduceMotion || isTouch) return;

  var layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length) return;

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var ticking = false;
  var mouseX = 0, mouseY = 0;

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2);
    mouseY = (e.clientY - rect.top - rect.height / 2);

    if (!ticking) {
      window.requestAnimationFrame(function () {
        layers.forEach(function (layer) {
          var strength = parseFloat(layer.getAttribute('data-parallax')) || 0.02;
          var x = mouseX * strength;
          var y = mouseY * strength;
          layer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  hero.addEventListener('mouseleave', function () {
    layers.forEach(function (layer) {
      layer.style.transform = 'translate3d(0, 0, 0)';
    });
  });
})();
