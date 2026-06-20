'use strict';

/* ── State ── */
let current = 0;
const TOTAL = 8;
let isAnimating = false;
let balloonsPopped = 0;
const BALLOON_COUNT = 8;

/* ── Elements ── */
const track       = document.getElementById('track');
const verses      = document.querySelectorAll('.verse');
const swipeHint   = document.getElementById('swipe-hint');

/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */
function goTo(n) {
  if (n < 0 || n >= TOTAL || isAnimating) return;
  isAnimating = true;

  leaveScreen(current);
  current = n;
  track.style.transform = `translateX(${-n * 100}vw)`;
  track.addEventListener('transitionend', onTransitionEnd, { once: true });
}

function onTransitionEnd() {
  isAnimating = false;
  enterScreen(current);
}

/* ── Touch swipe ── */
let touchStartX = 0;
let touchStartY = 0;
let touchMoved  = false;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchMoved  = false;
}, { passive: true });

document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 0.8) return;
  if (dx < 0) goTo(current + 1);
  else         goTo(current - 1);
}, { passive: true });

/* ── Keyboard (desktop preview) ── */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft')  goTo(current - 1);
});

/* ════════════════════════════════════════
   SCREEN ENTER / LEAVE
════════════════════════════════════════ */
function enterScreen(n) {
  /* show verse */
  verses[n].classList.add('visible');

  switch (n) {
    case 0: initScreen1(); break;
    case 1: initScreen2(); break;
    case 2: initScreen3(); break;
    case 3: initScreen4(); break;
    case 4: initScreen5(); break;
    case 5: initScreen6(); break;
    case 6: initScreen7(); break;
    case 7: initScreen8(); break;
  }
}

function leaveScreen(n) {
  verses[n].classList.remove('visible');

  /* pause/reset screen-specific things */
  if (n === 0) resetScreen1();
  if (n === 6) resetScreen7();
}

/* ════════════════════════════════════════
   SCREEN 1 — stars & shooting star
════════════════════════════════════════ */
function initScreen1() {
  const star = document.getElementById('shooting-star');
  const settled = document.getElementById('settled-star');
  star.classList.add('animate');
  settled.classList.add('visible');
}
function resetScreen1() {
  const star = document.getElementById('shooting-star');
  const settled = document.getElementById('settled-star');
  star.classList.remove('animate');
  settled.classList.remove('visible');
}

/* Build random static stars (runs once) */
(function buildStars() {
  const container = document.getElementById('stars');
  const sizes = [2, 2, 2, 4, 4, 6];
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('div');
    s.className = 'star twinkle';
    const sz = sizes[Math.floor(Math.random() * sizes.length)];
    const dur = (1.5 + Math.random() * 3).toFixed(2);
    const del = (Math.random() * 4).toFixed(2);
    s.style.cssText = `
      width:${sz}px; height:${sz}px;
      top:${(Math.random() * 80).toFixed(1)}%;
      left:${(Math.random() * 100).toFixed(1)}%;
      --tw-dur:${dur}s;
      --tw-delay:${del}s;
      opacity:${(0.4 + Math.random() * 0.6).toFixed(2)};
    `;
    container.appendChild(s);
  }
})();

/* ════════════════════════════════════════
   SCREEN 2 — flowers (CSS handles it)
════════════════════════════════════════ */
function initScreen2() { /* animations are CSS-driven */ }

/* ════════════════════════════════════════
   SCREEN 3 — eyes meet
════════════════════════════════════════ */
function initScreen3() {
  const left  = document.getElementById('sticker-eye-left');
  const right = document.getElementById('sticker-eye-right');
  /* stagger so they orbit in */
  setTimeout(() => { left.classList.add('meet'); }, 100);
  setTimeout(() => { right.classList.add('meet'); }, 220);
}

/* ════════════════════════════════════════
   SCREEN 4 — blah → laugh
════════════════════════════════════════ */
function initScreen4() {
  buildBubbles();
  setTimeout(startLaughing, 800);
}

function buildBubbles() {
  const c = document.getElementById('bubble-container');
  c.innerHTML = '';
  const words = ['bla', 'bla', '..', 'bla'];
  words.forEach((w, i) => {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.textContent = w;
    b.style.setProperty('--bubble-delay', `${i * 0.5}s`);
    b.style.cssText += `top:${10 + i * 12}%; left:60%;`;
    c.appendChild(b);
  });
}

function startLaughing() {
  const face = document.getElementById('laugh-face');
  face.classList.add('shaking');

  const container = document.getElementById('laugh-stars');
  container.innerHTML = '';
  const positions = [
    { sx: '-25px', sy: '-25px' }, { sx: '25px', sy: '-30px' },
    { sx: '-30px', sy: '10px'  }, { sx: '30px', sy: '5px'   },
    { sx: '-10px', sy: '-35px' }, { sx: '15px', sy: '-35px' },
  ];
  positions.forEach((p, i) => {
    const s = document.createElement('div');
    s.className = 'laugh-star pop';
    s.style.cssText = `
      top:50%; left:50%;
      --sx:${p.sx}; --sy:${p.sy};
      --star-delay:${i * 0.12}s;
    `;
    container.appendChild(s);
  });
}

/* ════════════════════════════════════════
   SCREEN 5 — her sparkles
════════════════════════════════════════ */
function initScreen5() { buildSparkles('sparkles-her', '#c9ada7'); }

/* ════════════════════════════════════════
   SCREEN 6 — his sparkles (hearts)
════════════════════════════════════════ */
function initScreen6() { buildSparkles('sparkles-him', '#a8c5da'); }

function buildSparkles(containerId, color) {
  const c = document.getElementById(containerId);
  if (c.children.length) return; /* already built */
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle float';
    const dur   = (1.5 + Math.random() * 2).toFixed(2);
    const delay = (Math.random() * 3).toFixed(2);
    const sx    = ((Math.random() - 0.5) * 80).toFixed(0);
    const sy    = (-(30 + Math.random() * 80)).toFixed(0);
    s.style.cssText = `
      top:${40 + Math.random() * 30}%;
      left:${25 + Math.random() * 50}%;
      background:${color};
      --sp-dur:${dur}s;
      --sp-delay:${delay}s;
      --sx:${sx}px;
      --sy:${sy}px;
    `;
    c.appendChild(s);
  }
}

/* ════════════════════════════════════════
   SCREEN 7 — RAWR
════════════════════════════════════════ */
function initScreen7() {
  const t = document.getElementById('rawr-text');
  const s = document.getElementById('rawr-sticker');
  t.classList.remove('rawr-pop');
  if (s) s.classList.remove('rawr-pop');
  void t.offsetWidth;
  t.classList.add('rawr-pop');
  if (s) s.classList.add('rawr-pop');
}
function resetScreen7() {
  const t = document.getElementById('rawr-text');
  const s = document.getElementById('rawr-sticker');
  t.classList.remove('rawr-pop');
  t.style.opacity = '0';
  t.style.transform = 'translateX(-50%) scale(0.3)';
  if (s) { s.classList.remove('rawr-pop'); s.style.opacity = '0'; }
}

/* ════════════════════════════════════════
   SCREEN 8 — balloon pop
════════════════════════════════════════ */
const BALLOON_COLORS = [
  '#ff69b4', '#ff85c2', '#c084fc',
  '#fb923c', '#f472b6', '#a78bfa',
  '#34d399', '#60a5fa',
];

function initScreen8() {
  if (document.getElementById('balloons-container').children.length) return;
  buildBalloons();
}

function buildBalloons() {
  const container = document.getElementById('balloons-container');
  container.innerHTML = '';
  balloonsPopped = 0;

  BALLOON_COLORS.forEach((color, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'balloon-wrap';
    wrap.dataset.index = i;

    const leftPct = 5 + (i / (BALLOON_COUNT - 1)) * 85;
    const dur     = 3.5 + Math.random() * 2;
    const delay   = Math.random() * 1.5;
    const tilt    = ((Math.random() - 0.5) * 10).toFixed(1);
    const bottomPct = 8 + Math.random() * 12;

    wrap.style.cssText = `
      left:${leftPct.toFixed(1)}%;
      bottom:${bottomPct.toFixed(1)}%;
      --b-dur:${dur.toFixed(2)}s;
      --b-delay:${delay.toFixed(2)}s;
      --b-tilt:${tilt}deg;
      --balloon-color:${color};
    `;

    wrap.innerHTML = `
      <div class="balloon-body" style="background:${color}">
        <div class="balloon-shine"></div>
      </div>
      <div class="balloon-knot"></div>
      <div class="balloon-string"></div>
    `;

    wrap.addEventListener('click',  () => popBalloon(wrap, color));
    wrap.addEventListener('touchend', e => { e.preventDefault(); popBalloon(wrap, color); });

    container.appendChild(wrap);
  });
}

function popBalloon(wrap, color) {
  if (wrap.classList.contains('popped') || wrap.classList.contains('popping')) return;
  wrap.classList.add('popping');

  /* pixel burst */
  const rect = wrap.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;
  spawnPopPixels(cx, cy, color);

  setTimeout(() => {
    wrap.classList.remove('popping');
    wrap.classList.add('popped');
    wrap.style.visibility = 'hidden';

    balloonsPopped++;
    if (balloonsPopped >= BALLOON_COUNT) onAllPopped();
  }, 300);
}

function spawnPopPixels(cx, cy, color) {
  const count = 8;
  for (let i = 0; i < count; i++) {
    const px = document.createElement('div');
    px.className = 'pop-pixel';
    const angle = (i / count) * Math.PI * 2;
    const dist  = 30 + Math.random() * 40;
    px.style.cssText = `
      background:${color};
      left:${cx}px; top:${cy}px;
      --px:${(Math.cos(angle) * dist).toFixed(0)}px;
      --py:${(Math.sin(angle) * dist).toFixed(0)}px;
      --pf-delay:0s;
    `;
    document.body.appendChild(px);
    setTimeout(() => px.remove(), 600);
  }
}

function onAllPopped() {
  const hint = document.getElementById('balloon-hint');
  if (hint) hint.style.opacity = '0';

  const msg = document.getElementById('final-message');
  setTimeout(() => msg.classList.add('revealed'), 300);
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
/* Hide swipe hint after first navigation */
function hideHint() {
  swipeHint.style.display = 'none';
  document.removeEventListener('touchend', hideHint);
  document.removeEventListener('keydown', hideHint);
}
document.addEventListener('touchend', hideHint, { once: true });
document.addEventListener('keydown',  hideHint, { once: true });

/* Enter first screen */
enterScreen(0);
