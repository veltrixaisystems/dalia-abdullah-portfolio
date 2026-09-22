const spotlight = document.querySelector('.spotlight');
window.addEventListener('pointermove', (event) => {
  if (!spotlight) return;
  spotlight.style.left = `${event.clientX}px`;
  spotlight.style.top = `${event.clientY}px`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Make in-page navigation feel more intentional on devices that support it.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
