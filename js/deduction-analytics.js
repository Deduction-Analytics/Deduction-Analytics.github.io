// ─── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ─── Smooth marquee (duplicate if needed)
const track = document.querySelector('.marquee-track');
if (track) {
  const partnerLogos = Array.from(track.children).filter(
    (child) => !child.classList.contains('client-dot')
  );

  if (partnerLogos.length < 10) {
    track.style.animation = 'none';
    track.classList.add('marquee-static');
  } else {
    track.classList.remove('marquee-static');
    track.style.animation = '';
  }
}

// ─── Circular case carousel
const caseCarousel = document.querySelector('[data-case-carousel]');
if (caseCarousel) {
  const caseSlides = Array.from(caseCarousel.querySelectorAll('.case-slide'));
  const casePrev = caseCarousel.querySelector('.case-nav-prev');
  const caseNext = caseCarousel.querySelector('.case-nav-next');
  const caseCount = caseSlides.length;
  let activeCase = 0;

  const syncCaseCarousel = () => {
    caseCarousel.dataset.caseActive = String(activeCase);

    caseSlides.forEach((slide, index) => {
      const isActive = index === activeCase;
      const isPrev = index === (activeCase - 1 + caseCount) % caseCount;
      const isNext = index === (activeCase + 1) % caseCount;
      slide.classList.toggle('is-active', isActive);
      slide.classList.toggle('is-prev', isPrev);
      slide.classList.toggle('is-next', isNext);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
  };

  const moveCaseCarousel = (direction) => {
    activeCase = (activeCase + direction + caseCount) % caseCount;
    syncCaseCarousel();
  };

  casePrev?.addEventListener('click', () => moveCaseCarousel(-1));
  caseNext?.addEventListener('click', () => moveCaseCarousel(1));

  caseCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveCaseCarousel(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveCaseCarousel(1);
    }
  });

  syncCaseCarousel();
}

// ─── Portfolio card hover light effect
document.querySelectorAll('.portfolio-card, .service-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});
