/* Buck Nekkid Outdoor Living — progressive enhancement only.
   Every page works without this file; it just works better with it. */
(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.setAttribute('data-open', String(!open));
    });

    // Tapping a link closes the menu so the anchor scroll is visible.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Hero slider ---------- */

  var hero = document.querySelector('[data-hero]');

  if (hero) {
    var track = hero.querySelector('[data-hero-track]');
    var dots = Array.prototype.slice.call(hero.querySelectorAll('.hero__dot'));
    var count = track ? track.children.length : 0;
    var index = 0;
    var timer = null;
    var AUTOPLAY_MS = 3000;

    var show = function (i) {
      index = (i + count) % count;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      dots.forEach(function (d, di) {
        d.setAttribute('aria-current', di === index ? 'true' : 'false');
      });
    };

    // Autoplay runs regardless of prefers-reduced-motion: the rotation is a
    // requirement of the page, not decoration. Reduced motion is honoured in
    // CSS instead, where .hero__track drops its transition — so those visitors
    // get the same 3s rotation as a clean cut with no sliding movement.
    var start = function () {
      if (count < 2) return;
      stop();
      timer = setInterval(function () {
        show(index + 1);
      }, AUTOPLAY_MS);
    };

    var stop = function () {
      if (timer) clearInterval(timer);
      timer = null;
    };

    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        show(Number(d.getAttribute('data-slide')));
        start(); // clicking a dot restarts the timer
      });
    });

    // Touch swipe, 40px threshold.
    var startX = null;
    hero.addEventListener(
      'touchstart',
      function (e) {
        startX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
    hero.addEventListener(
      'touchend',
      function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
          show(index + (dx < 0 ? 1 : -1));
          start();
        }
        startX = null;
      },
      { passive: true }
    );

    // Don't burn cycles animating a hidden tab.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });

    if (count > 1) start();
  }

  /* ---------- Lead forms ---------- */

  var forms = document.querySelectorAll('[data-lead-form]');

  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector('[data-form-status]');
    var button = form.querySelector('button[type="submit"]');
    var originalLabel = button ? button.textContent : '';

    var setStatus = function (message, ok) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form__status ' + (ok ? 'form__status--ok' : 'form__status--err');
      status.hidden = false;
    };

    form.addEventListener('submit', function (e) {
      // Let the browser handle validation and the no-JS POST fallback.
      if (!form.checkValidity()) return;
      e.preventDefault();

      var data = new FormData(form);
      // `redirect` is only for the no-JS path; drop it so we get JSON back.
      data.delete('redirect');

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending...';
      }
      if (status) status.hidden = true;

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          return res.json().then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (result.ok && result.body && result.body.success) {
            form.reset();
            setStatus(
              "Thanks — we got it. We'll be in touch shortly. In a hurry? Call 270-202-0245.",
              true
            );
          } else {
            setStatus(
              "That didn't go through. Please call 270-202-0245 or email igetbucknekkid@gmail.com.",
              false
            );
          }
        })
        .catch(function () {
          setStatus(
            "That didn't go through. Please call 270-202-0245 or email igetbucknekkid@gmail.com.",
            false
          );
        })
        .then(function () {
          if (button) {
            button.disabled = false;
            button.textContent = originalLabel;
          }
        });
    });
  });
})();
