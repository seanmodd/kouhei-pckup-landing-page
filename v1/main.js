const video = document.getElementById('hero-video');
const header = document.querySelector('header');
const revealElements = document.querySelectorAll('.reveal');

// Hero Video Scroll Logic (Fade and Blur)
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const heroHeight = window.innerHeight;

  // Header effect
  if (scrollPos > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Video Fade Effect
  // As we scroll through 180vh, fade the video out
  const fadeStart = heroHeight * 0.2;
  const fadeEnd = heroHeight * 1.5;

  if (scrollPos > fadeStart) {
    const opacity = Math.max(0, 1 - (scrollPos - fadeStart) / (fadeEnd - fadeStart));
    const blur = Math.min(20, (scrollPos - fadeStart) / 50);
    const scale = 1 + (scrollPos / 5000);

    video.style.opacity = opacity;
    video.style.filter = `blur(${blur}px)`;
    video.style.transform = `scale(${scale})`;
  } else {
    video.style.opacity = 1;
    video.style.filter = 'blur(0px)';
    video.style.transform = 'scale(1)';
  }
});

// Intersection Observer for Component Reveals
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Once revealed, we can stop observing
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Play video as soon as possible
window.addEventListener('load', () => {
  video.play().catch(error => {
    console.log("Auto-play was prevented, waiting for interaction.");
  });
});
