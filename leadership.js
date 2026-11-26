// Leading Product Teams (philosophy/leading-product-teams/): each picture plays once when it
// scrolls into view, and again when tapped. With reduced motion, or without this script, every
// picture shows its final frame.
(function () {
  var root = document.documentElement;
  root.classList.add('ld-ready');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) { root.classList.remove('js-ld'); return; }
  function play(fig) {
    fig.classList.remove('is-in');
    void fig.getBoundingClientRect();  // restart the animations
    fig.classList.add('is-in');
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { play(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.ld-fig').forEach(function (fig) {
    io.observe(fig);
    fig.title = 'Tap to play again';
    fig.addEventListener('click', function () { play(fig); });
  });
})();
