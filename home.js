// Counts the Home stat numbers up from zero, and shrinks the "2 hrs" bar,
// once each is on screen. Skipped entirely when the visitor prefers reduced
// motion, so the final numbers simply show.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-anim');

  function show(el, value) {
    var decimals = Number(el.getAttribute('data-decimals') || 0);
    el.textContent = (el.getAttribute('data-prefix') || '') + value.toFixed(decimals) + (el.getAttribute('data-suffix') || '');
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-to'));
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / 1400, 1);
      show(el, target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var numbers = document.querySelectorAll('.stat-num[data-to]');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (entry.target.classList.contains('stat-time')) entry.target.classList.add('is-in');
      else countUp(entry.target);
    });
  }, { threshold: 0.5 });

  numbers.forEach(function (el) { show(el, 0); observer.observe(el); });
  var bar = document.querySelector('.stat-time');
  if (bar) observer.observe(bar);
})();
