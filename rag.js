// RAG Evals: the retrieval-metrics calculator. Mark chunks relevant and move K to see
// Precision@K, Recall@K, reciprocal rank and NDCG@K. Animations come from agentic-evals.js.
(function () {
  var fig = document.querySelector('.rg-calc');
  if (!fig) return;
  var items = fig.querySelectorAll('.rg-chunks li');
  var buttons = fig.querySelectorAll('.rg-chunks button');
  var input = fig.querySelector('input[type=range]');
  var output = fig.querySelector('output');
  var kLabels = fig.querySelectorAll('[data-k]');
  var out = {};
  Array.prototype.forEach.call(fig.querySelectorAll('[data-out]'), function (el) { out[el.getAttribute('data-out')] = el; });
  var MISSED = 1;  // relevant chunks the retriever didn't return (shown under the list)

  var pct = function (x) { return Math.round(x * 100) + '%'; };
  var log2 = function (x) { return Math.log(x) / Math.LN2; };

  var calc = function () {
    var k = Number(input.value);
    var relevant = Array.prototype.map.call(buttons, function (b) { return b.getAttribute('aria-pressed') === 'true'; });
    var total = relevant.filter(Boolean).length + MISSED;
    var hits = relevant.slice(0, k).filter(Boolean).length;
    var first = relevant.indexOf(true);
    var rr = first >= 0 && first < k ? 1 / (first + 1) : 0;
    var dcg = 0, ideal = 0;
    for (var i = 0; i < k; i++) { if (relevant[i]) dcg += 1 / log2(i + 2); }
    for (var j = 0; j < Math.min(k, total); j++) { ideal += 1 / log2(j + 2); }

    out.p.textContent = pct(hits / k);
    out.r.textContent = pct(hits / total);
    out.rr.textContent = rr.toFixed(2);
    out.ndcg.textContent = (ideal ? dcg / ideal : 0).toFixed(2);
    Array.prototype.forEach.call(kLabels, function (el) { el.textContent = String(k); });
    output.textContent = String(k);
    input.setAttribute('aria-valuetext', 'top ' + k);
    Array.prototype.forEach.call(items, function (li, n) { li.classList.toggle('out-k', n >= k); });
  };

  Array.prototype.forEach.call(buttons, function (b, n) {
    var label = function () {
      var on = b.getAttribute('aria-pressed') === 'true';
      b.setAttribute('aria-label', 'Rank ' + (n + 1) + ': ' + b.querySelector('.rg-text').textContent + (on ? ', relevant' : ', not relevant'));
    };
    label();
    b.addEventListener('click', function () {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      label();
      calc();
    });
  });
  input.addEventListener('input', calc);
  calc();
})();
