document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const controls = carousel.parentElement.querySelector('.carousel-controls');
  const toggle = controls.querySelector('[data-toggle]');
  let active = 0;
  let timer;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === active);
      slide.setAttribute('aria-hidden', String(slideIndex !== active));
    });
  };

  const schedule = () => {
    window.clearInterval(timer);
    if (!paused) timer = window.setInterval(() => show(active + 1), 4500);
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
  };

  controls.querySelector('[data-prev]').addEventListener('click', () => { show(active - 1); schedule(); });
  controls.querySelector('[data-next]').addEventListener('click', () => { show(active + 1); schedule(); });
  toggle.addEventListener('click', () => { paused = !paused; schedule(); });
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', schedule);
  carousel.addEventListener('focusin', () => window.clearInterval(timer));
  carousel.addEventListener('focusout', schedule);
  schedule();
});