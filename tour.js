// Guided tour of the mock-up.
// Start it with the "Take the tour" button, or open any page with ?tour=1.
// The current step travels between pages in the URL (?tour=N).
(function () {
  var STEPS = [
    { page: 'index.html', sel: '.hero h1', title: 'Welcome to the new site',
      text: 'This short tour shows how the redesigned Bhekani Abantu website works. It opens with what makes you different: armed and medical response, staffed around the clock.' },
    { page: 'index.html', sel: '.call-btn', title: 'One-tap calling',
      text: 'The red call button stays at the top of every page. On a phone, one tap dials 011 760 6669.' },
    { page: 'index.html', sel: '#site-nav', menu: true, title: 'Simple menu',
      text: 'Every section has its own page: Home, Services, About us, Our team and Contact. On phones this opens as a dropdown, and the page you are on is marked in red.' },
    { page: 'index.html', sel: '.board', title: 'Your 24/7 control room',
      text: 'Visitors see straight away that armed response, medical assist, monitoring and vehicle recovery are always on standby.' },
    { page: 'index.html', sel: '.trust', title: 'Trust and accreditation',
      text: 'Your PSIRA registration and SAIDSA membership are shown on the home page, where new clients look for them.' },
    { page: 'index.html', sel: '.links', title: 'What we do',
      text: 'The four service groups are listed here. Each one opens its own page, so a client only reads about the service they need.' },
    { page: 'services.html', sel: '.links', title: 'Services page',
      text: 'The Services page in the menu gives the same four choices in one place.' },
    { page: 'service-guarding.html', sel: '.svc-main', title: 'A page for each service',
      text: 'This is the Guarding and response page. It only covers guarding, response, the strike team, VIP protection and events, with nothing about CCTV or maintenance.' },
    { page: 'service-guarding.html', sel: '.svc-quote', title: 'Quote box',
      text: 'Every service page has a quote button that goes straight to the right form, plus a call button.' },
    { page: 'service-guarding.html', sel: '.other', title: 'Other services',
      text: 'At the bottom, the other services are linked, so clients can keep browsing without going back.' },
    { page: 'quote-guarding.html', sel: '.qform .chip-set', title: 'Forms built for each service',
      text: 'Each service has its own quote form with questions that fit it. Here that means guards, shifts and event size. Options are large buttons that are easy to tap on a phone.' },
    { page: 'quote-guarding.html', sel: '.qform button[type="submit"]', title: 'Checks before sending',
      text: 'If something important is missing, the form says exactly what to fill in. When it is complete, the client sees a confirmation. In this mock-up nothing is actually sent.' },
    { page: 'about.html', sel: '.about', title: 'About us',
      text: 'Your story, vision and mission, then your values and accreditation, each in their own section instead of one long scroll.' },
    { page: 'team.html', sel: '.people', title: 'Your management team',
      text: 'Landus, Portia, Jacques and Michael are shown with their photos and roles, which helps new clients put faces to the company.' },
    { page: 'contact.html', sel: '.contact-list', title: 'Contact details',
      text: 'Phone, email, address and hours in one place. The phone number and email open directly on a phone.' },
    { page: 'contact.html', sel: '.pick', title: 'Shortcuts to each form',
      text: 'Clients who know what they need can jump to the right quote form. There is also a general enquiry form and a line for job seekers.' },
    { page: 'contact.html', sel: '.call-btn', title: 'That is the tour',
      text: 'Thanks for taking a look. Built by Pablo Lebelo: WhatsApp 060 452 1037 or Paballo.a.lebelo@gmail.com.', last: true }
  ];

  // Cloudflare can serve /services instead of /services.html, so compare names without ".html".
  function norm(p) { p = (p || '').replace(/\.html$/, ''); return p === '' ? 'index' : p; }
  function currentPage() {
    return norm(location.pathname.split('/').pop()) + '.html';
  }
  function samePage(page) { return norm(page) === norm(location.pathname.split('/').pop()); }
  function stepFromUrl() {
    var m = location.search.match(/[?&]tour=(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }
  function go(n) {
    if (n < 1 || n > STEPS.length) return end();
    var s = STEPS[n - 1];
    if (!samePage(s.page)) { location.href = s.page + '?tour=' + n; return; }
    show(n);
  }

  // ---- UI ----
  var card, target, startBtn;
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  function build() {
    startBtn = el('button', 'tour-start', 'Take the tour');
    startBtn.type = 'button';
    startBtn.addEventListener('click', function () { go(1); });
    document.body.appendChild(startBtn);

    card = el('div', 'tour-card');
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-live', 'polite');
    card.setAttribute('aria-label', 'Website tour');
    card.tabIndex = -1;
    card.hidden = true;
    card.innerHTML =
      '<div class="tour-top"><span class="tour-count"></span>' +
      '<button type="button" class="tour-x" aria-label="End tour">&times;</button></div>' +
      '<div class="tour-bar"><i></i></div>' +
      '<h2 class="tour-title"></h2><p class="tour-text"></p>' +
      '<div class="tour-nav"><button type="button" class="btn tour-back">Back</button>' +
      '<button type="button" class="btn btn-primary tour-next">Next</button></div>';
    document.body.appendChild(card);
    card.querySelector('.tour-x').addEventListener('click', end);
    document.addEventListener('keydown', function (e) {
      if (card.hidden) return;
      if (e.key === 'Escape') end();
    });
  }

  function setMenu(open) {
    var btn = document.querySelector('.menu-btn');
    var nav = document.getElementById('site-nav');
    if (!btn || !nav || getComputedStyle(btn).display === 'none') return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  function clear() {
    if (target) target.classList.remove('tour-target');
    target = null;
    setMenu(false);
  }

  function show(n) {
    var s = STEPS[n - 1];
    clear();
    if (s.menu) setMenu(true);
    target = document.querySelector(s.sel);
    if (!target) { return n < STEPS.length ? go(n + 1) : end(); }
    target.classList.add('tour-target');
    document.documentElement.classList.add('touring');
    startBtn.hidden = true;

    if (!s.menu && !target.closest('.site-header')) {
      target.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }

    card.hidden = false;
    card.querySelector('.tour-count').textContent = 'Step ' + n + ' of ' + STEPS.length;
    card.querySelector('.tour-bar i').style.width = (n / STEPS.length * 100) + '%';
    card.querySelector('.tour-title').textContent = s.title;
    card.querySelector('.tour-text').textContent = s.text;
    var back = card.querySelector('.tour-back');
    var next = card.querySelector('.tour-next');
    back.hidden = n === 1;
    back.onclick = function () { go(n - 1); };
    next.textContent = s.last ? 'Finish' : (STEPS[n] && !samePage(STEPS[n].page) ? 'Next page' : 'Next');
    next.onclick = function () { s.last ? end() : go(n + 1); };
    card.focus({ preventScroll: true });
    history.replaceState(null, '', location.pathname + '?tour=' + n + location.hash);
  }

  function end() {
    clear();
    card.hidden = true;
    startBtn.hidden = false;
    document.documentElement.classList.remove('touring');
    history.replaceState(null, '', location.pathname + location.hash);
  }

  build();
  var n = stepFromUrl();
  if (n) go(n);
})();
