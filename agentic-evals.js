// Agentic Evals 101: scroll-triggered animations, the two interactive figures,
// the scroll-linked loop and the flashcard deck. Without this script (or with
// reduced motion) every figure shows its end frame and the deck is a plain list.
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('ev-ready');
  if (reduce) root.classList.add('ev-reduce');

  // -- Scroll-triggered animations (A1, A4, A5, A6, A8) -----------------------
  var anims = Array.prototype.slice.call(document.querySelectorAll('.ev-anim'));
  function play(el) {
    if (el.classList.contains('ev-play')) return;
    el.classList.add('ev-play');
    var count = el.querySelector('.ev-count');
    if (count && !reduce) countUp(count);
  }
  if (reduce || !('IntersectionObserver' in window)) {
    anims.forEach(play);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { play(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.35 });
    anims.forEach(function (el) { io.observe(el); });
  }

  function countUp(el) {
    var to = Number(el.getAttribute('data-to')), start = null;
    el.textContent = '0';
    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / 2200, 1);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // -- A2: compounding error slider ---------------------------------------------
  var compound = document.querySelector('.ev-compound');
  if (compound) {
    var blocks = compound.querySelector('.ev-blocks');
    var input = compound.querySelector('input[type=range]');
    var output = compound.querySelector('output');
    var big = compound.querySelector('.ev-big');
    var nLabel = compound.querySelector('.ev-n');
    for (var i = 0; i < 20; i++) {
      var b = document.createElement('span');
      b.className = 'ev-block';
      b.textContent = '95%';
      blocks.appendChild(b);
    }
    var all = blocks.children;
    var render = function () {
      var n = Number(input.value);
      var chance = Math.pow(0.95, n);
      var pct = Math.round(chance * 100) + '%';
      for (var j = 0; j < all.length; j++) {
        all[j].hidden = j >= n;
        // Each block fades with the chance that the task is still on track by then.
        all[j].style.opacity = String(Math.max(0.28, Math.pow(0.95, j + 1)));
      }
      big.textContent = pct;
      nLabel.textContent = String(n);
      output.textContent = String(n);
      input.setAttribute('aria-valuetext', n + (n === 1 ? ' step, ' : ' steps, ') + pct + ' chance of success');
    };
    input.addEventListener('input', render);
    render();
  }

  // -- A3: pass@k vs. pass^k ------------------------------------------------------
  var runsFig = document.querySelector('.ev-runs');
  if (runsFig) {
    var dotList = runsFig.querySelector('.ev-dots');
    var verdict = runsFig.querySelector('.ev-verdict');
    var modeButtons = runsFig.querySelectorAll('.ev-toggle button');
    var mode = 'once';
    var results = [true, true, false, true, true, true, false, true];
    var dots = [];
    for (var d = 0; d < 8; d++) {
      var li = document.createElement('li');
      li.className = 'ev-dot';
      li.textContent = String(d + 1);
      dotList.appendChild(li);
      dots.push(li);
    }
    var paint = function (showAll) {
      var passes = results.filter(Boolean).length;
      dots.forEach(function (dot, k) {
        dot.classList.toggle('ok', results[k]);
        dot.classList.toggle('bad', !results[k]);
        dot.classList.toggle('lit', mode === 'once' ? results[k] : !results[k]);
        dot.setAttribute('aria-label', 'Run ' + (k + 1) + ': ' + (results[k] ? 'passed' : 'failed'));
        if (showAll) dot.classList.add('shown');
      });
      if (mode === 'once') {
        verdict.innerHTML = passes > 0
          ? '<code>pass@8</code>: <b class="yes">yes</b>. It succeeded at least once (' + passes + ' of 8).'
          : '<code>pass@8</code>: <b class="no">no</b>. It never succeeded.';
      } else {
        verdict.innerHTML = passes === 8
          ? '<code>pass^8</code>: <b class="yes">yes</b>. It succeeded every time.'
          : '<code>pass^8</code>: <b class="no">no</b>. It failed ' + (8 - passes) + ' of 8 runs.';
      }
    };
    var reveal = function () {
      if (reduce) { paint(true); return; }
      dots.forEach(function (dot) { dot.classList.remove('shown'); });
      paint(false);
      dots.forEach(function (dot, k) { setTimeout(function () { dot.classList.add('shown'); }, 120 * k); });
    };
    Array.prototype.forEach.call(modeButtons, function (btn) {
      btn.addEventListener('click', function () {
        mode = btn.getAttribute('data-mode');
        Array.prototype.forEach.call(modeButtons, function (b2) { b2.setAttribute('aria-pressed', String(b2 === btn)); });
        paint(true);
      });
    });
    runsFig.querySelector('.ev-replay').addEventListener('click', function () {
      results = results.map(function () { return Math.random() < 0.75; });
      reveal();
    });
    paint(true);
    if (!reduce && 'IntersectionObserver' in window) {
      dots.forEach(function (dot) { dot.classList.remove('shown'); });
      var io3 = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { reveal(); io3.disconnect(); }
      }, { threshold: 0.4 });
      io3.observe(runsFig);
    }
  }

  // -- A7: the loop turns as you scroll ---------------------------------------------
  var wheel = document.querySelector('.ev-wheel');
  if (wheel) {
    var ring = wheel.querySelector('.ev-ring');
    var nodes = wheel.querySelectorAll('.ev-node');
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = wheel.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      // 0 when the figure enters at the bottom, 1 when it leaves at the top.
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      var turn = reduce ? 0 : p * 300;
      ring.style.setProperty('--rot', (-turn) + 'deg');
      var active = reduce ? -1 : Math.round(turn / 60) % 6;
      Array.prototype.forEach.call(nodes, function (node, k) { node.classList.toggle('on', k === active); });
    };
    if (!reduce) {
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener('resize', update);
    }
    update();
  }

  // -- Flashcard deck -----------------------------------------------------------------
  var deck = document.querySelector('[data-deck]');
  if (deck) {
    var items = Array.prototype.slice.call(deck.querySelectorAll('.ev-qa > li'));
    var cards = items.map(function (li) {
      return { q: li.querySelector('.ev-q').textContent, a: li.querySelector('ul').innerHTML };
    });
    deck.querySelector('.ev-qa').hidden = true;

    var ui = document.createElement('div');
    ui.className = 'ev-deck-ui';
    ui.innerHTML =
      '<div class="ev-card" role="button" tabindex="0" aria-pressed="false">' +
        '<div class="ev-card-inner">' +
          '<div class="ev-face ev-front"><span class="mono ev-qn"></span><p class="ev-qtext"></p><span class="ev-hint">Tap or press Enter to see a strong answer</span></div>' +
          '<div class="ev-face ev-back" aria-hidden="true"><span class="mono ev-qn-back">What a strong answer covers</span><ul class="points"></ul></div>' +
        '</div>' +
      '</div>' +
      '<div class="ev-deck-nav">' +
        '<button type="button" class="ev-prev" aria-label="Previous question">←</button>' +
        '<div class="ev-pips" role="group" aria-label="Choose a question"></div>' +
        '<button type="button" class="ev-next" aria-label="Next question">→</button>' +
      '</div>' +
      '<p class="sr-only" aria-live="polite"></p>';
    deck.appendChild(ui);

    var card = ui.querySelector('.ev-card');
    var front = ui.querySelector('.ev-front');
    var back = ui.querySelector('.ev-back');
    var qn = ui.querySelector('.ev-qn');
    var qtext = ui.querySelector('.ev-qtext');
    var alist = ui.querySelector('.ev-back ul');
    var pips = ui.querySelector('.ev-pips');
    var live = ui.querySelector('[aria-live]');
    var index = 0, flipped = false;

    cards.forEach(function (_, k) {
      var pip = document.createElement('button');
      pip.type = 'button';
      pip.className = 'ev-pip';
      pip.setAttribute('aria-label', 'Question ' + (k + 1));
      pip.addEventListener('click', function () { show(k); });
      pips.appendChild(pip);
    });

    var setFlip = function (value) {
      flipped = value;
      card.classList.toggle('flipped', flipped);
      card.setAttribute('aria-pressed', String(flipped));
      front.setAttribute('aria-hidden', String(flipped));
      back.setAttribute('aria-hidden', String(!flipped));
      card.setAttribute('aria-label', flipped
        ? 'Question ' + (index + 1) + ' of 10, answer side. Press to flip back.'
        : 'Question ' + (index + 1) + ' of 10: ' + cards[index].q + ' Press to see a strong answer.');
      if (flipped) {
        var points = Array.prototype.map.call(alist.querySelectorAll('li'), function (li) { return li.textContent; });
        live.textContent = 'What a strong answer covers: ' + points.join(' ');
      }
    };
    var show = function (k) {
      index = (k + cards.length) % cards.length;
      card.classList.add('no-anim');  // a new card always opens on its front, without spinning
      setFlip(false);
      qn.textContent = 'Question ' + (index + 1) + ' of 10';
      qtext.textContent = cards[index].q;
      alist.innerHTML = cards[index].a;
      Array.prototype.forEach.call(pips.children, function (p, j) {
        p.setAttribute('aria-current', j === index ? 'true' : 'false');
      });
      live.textContent = 'Question ' + (index + 1) + ' of 10';
      void card.offsetWidth;
      card.classList.remove('no-anim');
    };
    card.addEventListener('click', function () { setFlip(!flipped); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlip(!flipped); }
    });
    deck.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });
    ui.querySelector('.ev-prev').addEventListener('click', function () { show(index - 1); });
    ui.querySelector('.ev-next').addEventListener('click', function () { show(index + 1); });
    show(0);
  }
})();
