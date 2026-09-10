// Mobile nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mainNav.classList.remove('open'))
);

// Contact form (front-end only)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.hidden = false;
    status.style.color = '#c0392b';
    status.textContent = 'Пожалуйста, заполните имя и корректный email.';
    return;
  }
  status.hidden = false;
  status.style.color = '#1a7a3c';
  status.textContent = 'Спасибо! Ваше сообщение отправлено.';
  form.reset();
});

// Lightbox gallery
const items = Array.from(document.querySelectorAll('#gallery .gallery-item'));
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let current = 0;

function show(i) {
  current = (i + items.length) % items.length;
  lbImg.src = items[current].getAttribute('href');
  lbImg.alt = items[current].querySelector('img').alt;
  lb.hidden = false;
}
function hide() { lb.hidden = true; lbImg.src = ''; }

items.forEach((it, i) =>
  it.addEventListener('click', e => { e.preventDefault(); show(i); })
);
document.getElementById('lbClose').addEventListener('click', hide);
document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
lb.addEventListener('click', e => { if (e.target === lb) hide(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') hide();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});
