// Adds a label and a Copy button to each code block on the build guides.
// The code itself stays read-only; the button only copies it.
(function () {
  var blocks = document.querySelectorAll('.guide pre');
  if (!blocks.length) return;

  var status = document.createElement('p');
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  document.body.appendChild(status);

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    area.remove();
    return ok;
  }

  blocks.forEach(function (pre) {
    var name = pre.getAttribute('data-label') || 'Code';
    var wrap = document.createElement('div');
    wrap.className = 'codeblock';
    var bar = document.createElement('div');
    bar.className = 'code-bar';
    var label = document.createElement('span');
    label.textContent = name;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy ' + name.toLowerCase() + ' code');

    pre.parentNode.insertBefore(wrap, pre);
    bar.append(label, button);
    wrap.append(bar, pre);

    var timer;
    button.addEventListener('click', function () {
      var text = pre.textContent;
      var done = function (ok) {
        button.textContent = ok ? 'Copied' : 'Press Ctrl+C';
        status.textContent = ok ? 'Copied to clipboard' : 'Copy failed. Select the code and press Ctrl+C.';
        if (!ok) window.getSelection().selectAllChildren(pre);
        clearTimeout(timer);
        timer = setTimeout(function () { button.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
      } else {
        done(fallbackCopy(text));
      }
    });
  });
})();
