// Hola Mundo LLC — helloworld.ar

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal for sections and cards
const revealTargets = document.querySelectorAll('.section .container, .stat, .card');
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('visible'));
}
