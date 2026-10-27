// Mobile menu toggle
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }
  btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();

// Quote forms: check required answers, then show a confirmation.
// This is a mock-up, so nothing is sent. Connect a form backend before going live.
(function () {
  document.querySelectorAll('form.qform').forEach(function (form) {
    var error = form.querySelector('.form-error');
    var sent = form.parentElement.querySelector('.sent');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var missing = [];
      form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });

      form.querySelectorAll('fieldset[data-required]').forEach(function (fs) {
        if (!fs.querySelector('input:checked')) {
          fs.classList.add('invalid');
          missing.push({ el: fs.querySelector('input'), name: fs.querySelector('legend').firstChild.textContent.trim() });
        }
      });
      form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
        if (!input.checkValidity()) {
          input.classList.add('invalid');
          var label = form.querySelector('label[for="' + input.id + '"]');
          missing.push({ el: input, name: label ? label.textContent : input.name });
        }
      });

      if (missing.length) {
        error.textContent = 'Please complete: ' + missing.map(function (m) { return m.name; }).join(', ') + '.';
        error.hidden = false;
        missing[0].el.focus();
        return;
      }

      error.hidden = true;
      form.hidden = true;
      if (sent) { sent.hidden = false; sent.focus(); sent.scrollIntoView({ block: 'start' }); }
    });
  });
})();
