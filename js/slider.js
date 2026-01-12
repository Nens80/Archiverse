const slides = document.querySelectorAll('.slide-item');
const thumbnails = document.querySelectorAll('.thumbnails img');
let current = 0;
let slideInterval;

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach(slide => {
    slide.classList.remove('active');
    const text = slide.querySelector('.text-group');
    if (text) text.style.animation = 'none';
  });

  thumbnails.forEach(img => img.classList.remove('active'));

  const activeSlide = slides[index];
  activeSlide.classList.add('active');
  thumbnails[index].classList.add('active');

  const text = activeSlide.querySelector('.text-group');
  if (text) {
    void text.offsetWidth;
    text.style.animation = 'fadeUp 1s ease forwards';
  }

  current = index;
}

// Auto slide
function startAutoSlide() {
  slideInterval = setInterval(() => {
    showSlide(current + 1);
  }, 5000);
}

// Thumbnail click
thumbnails.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    clearInterval(slideInterval);
    showSlide(i);
    startAutoSlide();
  });
});

showSlide(0);
startAutoSlide();
