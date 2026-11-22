// Agent Guardrails: the human-in-the-loop picker and the fail-hard / fail-soft toggle.
// The page's scroll-triggered animations come from agentic-evals.js. Without this
// script each figure shows the state written in the page.
(function () {
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  // -- HITL thresholds: pick an action to see its risk factors and tier ----------
  var hitl = document.querySelector('.gr-hitl');
  if (hitl) {
    var picks = hitl.querySelectorAll('.gr-picks button');
    var flags = hitl.querySelectorAll('[data-flag]');
    var tiers = hitl.querySelectorAll('.gr-tiers li');
    var why = hitl.querySelector('.gr-why');
    var choose = function (btn) {
      var tier = btn.getAttribute('data-tier');
      var on = (btn.getAttribute('data-flags') || '').split(' ');
      var name = '';
      each(picks, function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      each(flags, function (f) { f.classList.toggle('on', on.indexOf(f.getAttribute('data-flag')) >= 0); });
      each(tiers, function (t) {
        var hit = t.getAttribute('data-tier') === tier;
        t.classList.toggle('on', hit);
        if (hit) name = t.querySelector('b').textContent;
      });
      var label = document.createElement('b');
      label.textContent = name + ': ';
      why.textContent = '';
      why.appendChild(label);
      why.appendChild(document.createTextNode(btn.getAttribute('data-why')));
    };
    each(picks, function (b) { b.addEventListener('click', function () { choose(b); }); });
    var start = hitl.querySelector('.gr-picks [aria-pressed="true"]');
    if (start) choose(start);
  }

  // -- Fail-soft UI: compare a blank error with a progress report ----------------
  var fail = document.querySelector('.gr-fail');
  if (fail) {
    var modes = fail.querySelectorAll('.ev-toggle button');
    each(modes, function (b) {
      b.addEventListener('click', function () {
        fail.setAttribute('data-mode', b.getAttribute('data-mode'));
        each(modes, function (m) { m.setAttribute('aria-pressed', String(m === b)); });
      });
    });
  }
})();
