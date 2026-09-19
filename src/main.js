const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-mobile-menu]');

const closeMenu = () => {
  toggle?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('open');
  document.body.classList.remove('menu-open');
};

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

let previousY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 24);
  header?.classList.toggle('hidden', y > previousY && y > 300 && !menu?.classList.contains('open'));
  previousY = y;
}, { passive: true });

document.querySelectorAll('.system-item').forEach((item, index) => {
  const top = item.querySelector('.system-top');
  top?.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.system-item').forEach((entry) => entry.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
  if (index === 0) item.classList.add('active');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
