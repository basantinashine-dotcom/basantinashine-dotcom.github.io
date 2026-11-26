// My product philosophy (philosophy/creating-products/): the three-circle diagram.
// Scrolling through the five steps lights up the matching circles. Hovering, tapping or focusing
// a circle, the star or a dot between two circles does too, and shows that idea's words under the
// diagram (scrolling hides them again, since the step itself is on screen).
// Without this script every circle stays lit and every step stays readable.
(function () {
  var scrolly = document.querySelector('.ph-scrolly');
  if (!scrolly) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  scrolly.classList.add('ph-live');
  if (!reduce) scrolly.classList.add('ph-animate');

  // The words for each idea come from the page itself: the five steps and the three cards.
  var words = {};
  document.querySelectorAll('.ph-art[data-key], .ph-card[data-key]').forEach(function (el) {
    words[el.getAttribute('data-key')] = {
      step: el.querySelector('.ph-step').textContent,
      title: el.querySelector('h3').textContent,
      body: el.querySelector('h3 + p').textContent
    };
  });

  // Which circles are lit for each idea.
  var LIT = {
    customer: ['customer'], strategy: ['strategy'], market: ['market'],
    center: ['customer', 'strategy', 'market'], loop: ['customer', 'strategy', 'market'],
    cs: ['customer', 'strategy'], cm: ['customer', 'market'], sm: ['strategy', 'market']
  };
  var circles = scrolly.querySelectorAll('.ph-c');
  var pairs = scrolly.querySelectorAll('.ph-pair');
  var star = scrolly.querySelector('.ph-star');
  var loop = scrolly.querySelector('.ph-loop');
  var arts = scrolly.querySelectorAll('.ph-art');
  var cards = document.querySelectorAll('.ph-card');
  var caption = {
    step: scrolly.querySelector('.ph-caption .ph-step'),
    title: scrolly.querySelector('.ph-caption .ph-title'),
    body: scrolly.querySelector('.ph-caption .ph-body')
  };
  var current = null;

  var box = scrolly.querySelector('.ph-caption');
  function show(key, fromDiagram) {
    box.classList.toggle('is-shown', !!fromDiagram);
    if (key === current || !words[key]) return;
    current = key;
    var lit = LIT[key];
    circles.forEach(function (c) { c.classList.toggle('is-dim', lit.indexOf(c.getAttribute('data-k')) < 0); });
    pairs.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-k') === key); });
    star.classList.toggle('is-on', key === 'center');
    loop.classList.toggle('is-on', key === 'loop');
    arts.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('data-key') === key); });
    cards.forEach(function (c) { c.classList.toggle('is-on', c.getAttribute('data-key') === key); });
    caption.step.textContent = words[key].step;
    caption.title.textContent = words[key].title;
    caption.body.textContent = words[key].body;
  }

  // Scrolling: the step crossing the middle of the screen is the current one.
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) show(e.target.getAttribute('data-key')); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    arts.forEach(function (a) { io.observe(a); });
  }

  // Hover, tap, focus or Enter/Space on any part of the diagram.
  scrolly.querySelectorAll('.ph-venn [data-k]').forEach(function (el) {
    var key = el.getAttribute('data-k');
    el.addEventListener('mouseenter', function () { show(key, true); });
    el.addEventListener('focus', function () { show(key, true); });
    el.addEventListener('click', function () { show(key, true); });
    el.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(key, true); }
    });
  });

  show('customer');
})();
