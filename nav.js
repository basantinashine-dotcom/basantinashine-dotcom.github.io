// Closes "Evals Playbook" menu on Escape or a click outside it.
// The menu itself is a <details> element, so it opens and closes without this.
(function () {
  function closeAll(except) {
    document.querySelectorAll('details.nav-menu[open]').forEach(function (menu) {
      if (menu !== except) menu.removeAttribute('open');
    });
  }
  document.addEventListener('click', function (event) {
    closeAll(event.target.closest && event.target.closest('details.nav-menu'));
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var open = document.querySelector('details.nav-menu[open]');
    if (!open) return;
    open.removeAttribute('open');
    open.querySelector('summary').focus();
  });
})();
