/* Advance Dental Clinic – shared JavaScript */
(function () {
  'use strict';
  var WA_NUMBER = '918677000360';
  var CLINIC = 'Advance Dental Clinic';
  var DOCTOR = 'Dr. Binod Kumar Singh';

  function waLink(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function defaultMessage(service) {
    return 'Hello ' + CLINIC + ', I would like to book a dental appointment with ' + DOCTOR + '.\n\n' +
      'Name:\nPreferred Date:\nPreferred Time:\nReason for Visit: ' + (service || '');
  }

  /* Book Appointment buttons -> WhatsApp */
  document.querySelectorAll('.js-book').forEach(function (el) {
    el.setAttribute('href', waLink(defaultMessage(el.getAttribute('data-service'))));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setMenu(false); });
  }

  /* Footer year */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Appointment form */
  var form = document.getElementById('appointment-form');
  if (!form) return;
  var f = form.elements;

  var t = new Date();
  f['date'].min = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');

  function setError(name, msg) {
    var field = f[name].closest('.field');
    field.classList.toggle('invalid', !!msg);
    field.querySelector('.error').textContent = msg || '';
    f[name].setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function validate() {
    var name = f['name'].value.trim();
    var phone = f['phone'].value.replace(/[\s-]/g, '');
    var email = f['email'].value.trim();
    var date = f['date'].value;
    var ok = true, firstBad = null;

    function check(fieldName, msg) {
      var good = setError(fieldName, msg);
      if (!good && !firstBad) firstBad = f[fieldName];
      ok = ok && good;
    }

    check('name', !name ? 'Enter the patient name.' : (name.length < 2 ? 'Enter at least 2 characters.' : ''));
    var digits = phone.replace(/^(\+?91|0)/, '');
    check('phone', !phone ? 'Enter a mobile number.' :
      (!/^[6-9]\d{9}$/.test(digits) ? 'Enter a valid 10-digit Indian mobile number, for example 98765 43210.' : ''));
    check('email', email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email address or leave this blank.' : '');
    check('date', date && date < f['date'].min ? 'Choose today or a future date.' : '');

    if (firstBad) firstBad.focus();
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var lines = [
      'Hello ' + CLINIC + ', I would like to book a dental appointment with ' + DOCTOR + '.',
      '',
      'Name: ' + f['name'].value.trim(),
      'Mobile: ' + f['phone'].value.trim()
    ];
    if (f['email'].value.trim()) lines.push('Email: ' + f['email'].value.trim());
    lines.push('Preferred Date: ' + (f['date'].value || 'Not specified'));
    lines.push('Preferred Time: ' + (f['time'].value || 'Not specified'));
    lines.push('Reason for Visit: ' + (f['message'].value.trim() || 'Not specified'));
    var url = waLink(lines.join('\n'));
    var win = window.open(url, '_blank', 'noopener');
    var box = document.getElementById('form-success');
    box.innerHTML = 'Your appointment request is ready in WhatsApp. Send the message to reach the clinic. ' +
      'This is a request only; the clinic will confirm your appointment time.' +
      (win ? '' : ' <a href="' + url + '" target="_blank" rel="noopener noreferrer">Open WhatsApp</a>');
    box.classList.add('show');
    box.focus();
  });

  form.querySelectorAll('input,select,textarea').forEach(function (el) {
    el.addEventListener('input', function () {
      var field = el.closest('.field');
      if (field && field.classList.contains('invalid')) validate();
    });
  });
})();
