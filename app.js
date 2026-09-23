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

// Robotics blueprint workbench.
const blueprintTabs = [...document.querySelectorAll('.blueprint-tab')];
const blueprintPanels = [...document.querySelectorAll('.blueprint-panel')];

blueprintTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.blueprint;

    blueprintTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });

    blueprintPanels.forEach((panel) => {
      const selected = panel.dataset.panel === target;
      panel.classList.toggle('active', selected);
      panel.hidden = !selected;
    });
  });
});
