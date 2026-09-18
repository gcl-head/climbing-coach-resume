/* ==========================================================================
   route-rail.js — hero entrance route drawing + fixed scroll-progress rail
   ========================================================================== */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Hero decorative route: draw-in on load ---- */
  var heroPath = document.querySelector('[data-route-path]');
  var heroNodes = document.querySelectorAll('.route-svg__nodes circle');
  if (heroPath) {
    if (reduceMotion) {
      heroPath.style.strokeDashoffset = '0';
      heroNodes.forEach(function (n) { n.style.opacity = '1'; });
    } else {
      window.requestAnimationFrame(function () {
        setTimeout(function () {
          heroPath.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1)';
          heroPath.style.strokeDashoffset = '0';
          heroNodes.forEach(function (n, i) {
            n.style.transition = 'opacity 0.4s ease ' + (0.5 + i * 0.18) + 's';
            n.style.opacity = '1';
          });
        }, 150);
      });
    }
  }

  /* ---- Fixed side rail: overall scroll progress + section nodes ---- */
  var fill = document.querySelector('[data-rail-fill]');
  var nodes = document.querySelectorAll('[data-rail-node]');
  if (!fill && !nodes.length) return;

  var sections = Array.prototype.map.call(nodes, function (node) {
    var target = document.querySelector(node.getAttribute('data-target'));
    return { node: node, target: target };
  }).filter(function (s) { return s.target; });

  sections.forEach(function (s) {
    s.node.addEventListener('click', function () {
      s.target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  function update() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    if (fill) fill.style.height = Math.min(100, Math.max(0, progress * 100)) + '%';

    var viewportCenter = window.scrollY + window.innerHeight * 0.5;
    var activeIndex = -1;
    sections.forEach(function (s, i) {
      var top = s.target.offsetTop;
      if (viewportCenter >= top) activeIndex = i;
    });
    sections.forEach(function (s, i) {
      s.node.classList.toggle('is-active', i === activeIndex);
    });
  }

  update();
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', update);
})();
