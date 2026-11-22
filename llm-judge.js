// LLM-as-a-Judge: the verbosity toggle and the agreement (Cohen's kappa) calculator.
// The page's scroll-triggered animations come from agentic-evals.js.
(function () {
  // -- Verbosity bias: a naive judge vs. one with length controls ---------------
  var verbose = document.querySelector('.jg-verbose');
  if (verbose) {
    var buttons = verbose.querySelectorAll('.ev-toggle button');
    var verdict = verbose.querySelector('.jg-verdict');
    var text = {
      naive: 'Judge picks <b>B</b>: “more thorough and detailed.” Its extra words add nothing.',
      fixed: 'Judge picks <b>A</b>: it answers fully. The highlighted parts of B are padding.'
    };
    var setMode = function (mode) {
      verbose.setAttribute('data-mode', mode);
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === mode));
      });
      verdict.innerHTML = text[mode];
    };
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
    });
    setMode('naive');
  }

  // -- Meta-evaluation: raw agreement vs. Cohen's kappa ---------------------------
  var fig = document.querySelector('.jg-kappa');
  if (fig) {
    var cells = {};
    Array.prototype.forEach.call(fig.querySelectorAll('input[data-cell]'), function (input) {
      cells[input.getAttribute('data-cell')] = input;
    });
    var out = {};
    Array.prototype.forEach.call(fig.querySelectorAll('[data-out]'), function (el) {
      out[el.getAttribute('data-out')] = el;
    });
    var presets = { good: [80, 4, 3, 13], always: [90, 0, 10, 0], strict: [70, 20, 2, 8] };
    var presetButtons = fig.querySelectorAll('.jg-presets button');

    // Landis and Koch's (1977) labels for kappa.
    var band = function (k) {
      k = Math.round(k * 100) / 100;  // band by the value shown, so 0.60 reads "moderate"
      if (k < -0.005) return 'worse than chance';
      if (k <= 0.005) return 'no better than chance';
      if (k <= 0.2) return 'slight';
      if (k <= 0.4) return 'fair';
      if (k <= 0.6) return 'moderate';
      if (k <= 0.8) return 'substantial';
      return 'almost perfect';
    };
    var value = function (name) {
      var n = Math.floor(Number(cells[name].value));
      return isFinite(n) && n > 0 ? n : 0;
    };
    var calc = function () {
      // a: both pass, b: experts pass / judge fails, c: experts fail / judge passes, d: both fail
      var a = value('a'), b = value('b'), c = value('c'), d = value('d');
      var n = a + b + c + d;
      if (n === 0) {
        out.agree.textContent = out.kappa.textContent = out.caught.textContent = '—';
        out.band.textContent = 'add some counts';
        return;
      }
      var observed = (a + d) / n;
      var chance = ((a + b) * (a + c) + (c + d) * (b + d)) / (n * n);
      out.agree.textContent = Math.round(observed * 100) + '%';
      if (chance >= 1) {
        out.kappa.textContent = '—';
        out.band.textContent = 'undefined: only one label used';
      } else {
        var kappa = (observed - chance) / (1 - chance);
        out.kappa.textContent = (Math.abs(kappa) < 0.005 ? 0 : kappa).toFixed(2);
        out.band.textContent = band(kappa);
      }
      out.caught.textContent = c + d > 0 ? Math.round((d / (c + d)) * 100) + '%' : '—';
    };
    Object.keys(cells).forEach(function (name) {
      cells[name].addEventListener('input', function () {
        Array.prototype.forEach.call(presetButtons, function (b) { b.setAttribute('aria-pressed', 'false'); });
        calc();
      });
    });
    Array.prototype.forEach.call(presetButtons, function (btn) {
      btn.addEventListener('click', function () {
        var values = presets[btn.getAttribute('data-preset')];
        ['a', 'b', 'c', 'd'].forEach(function (name, i) { cells[name].value = values[i]; });
        Array.prototype.forEach.call(presetButtons, function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        calc();
      });
    });
    presetButtons[0].setAttribute('aria-pressed', 'true');
    calc();
  }
})();
