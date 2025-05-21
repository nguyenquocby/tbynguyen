// Banner slider tự động
const bannerWrapper = document.getElementById('bannerWrapper');
let currentBanner = 0;
const bannerCount = bannerWrapper.children.length;

setInterval(() => {
  currentBanner = (currentBanner + 1) % bannerCount;
  bannerWrapper.style.transform = `translateX(-${currentBanner * 100}%)`;
}, 4000);

// Xử lý slider sản phẩm
const sliders = document.querySelectorAll('.slider-container');
const controlButtons = document.querySelectorAll('.control-btn');

function showSlider(sliderNumber) {
  sliders.forEach(slider => slider.classList.remove('active'));
  document.querySelector(`.slider-container[data-slider="${sliderNumber}"]`).classList.add('active');
  controlButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.control-btn[data-slider="${sliderNumber}"]`).classList.add('active');
}

controlButtons.forEach(button => {
  button.addEventListener('click', () => {
    const sliderNumber = button.getAttribute('data-slider');
    showSlider(sliderNumber);
  });
});

showSlider(1);

function setupSlider(sliderContainer) {
  const slider = sliderContainer.querySelector('.slider');
  const prevBtn = sliderContainer.querySelector('.prev-btn');
  const nextBtn = sliderContainer.querySelector('.next-btn');
  let currentIndex = 0;

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 8) % 8;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 8;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  });
}

sliders.forEach(setupSlider);

//banner-slider
document.addEventListener('DOMContentLoaded', function() {
  const bannerWrapper = document.getElementById('bannerWrapper');
  const banners = document.querySelectorAll('.banner');
  const totalBanners = banners.length;
  let currentIndex = 0;
  let intervalId;
  let startX = 0;
  let isDragging = false;
  
  // Create navigation dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'slider-dots';
  bannerWrapper.parentNode.appendChild(dotsContainer);
  
  for (let i = 0; i < totalBanners; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  
  // Create navigation arrows
  const prevArrow = document.createElement('div');
  prevArrow.className = 'slider-arrow prev';
  prevArrow.innerHTML = '❮';
  prevArrow.addEventListener('click', () => prevSlide());
  bannerWrapper.parentNode.appendChild(prevArrow);
  
  const nextArrow = document.createElement('div');
  nextArrow.className = 'slider-arrow next';
  nextArrow.innerHTML = '❯';
  nextArrow.addEventListener('click', () => nextSlide());
  bannerWrapper.parentNode.appendChild(nextArrow);
  
  // Auto slide function
  function startAutoSlide() {
    intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
  }
  
  // Stop auto slide when user interacts
  function stopAutoSlide() {
    clearInterval(intervalId);
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentIndex = (index + totalBanners) % totalBanners;
    updateSlider();
  }
  
  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalBanners;
    updateSlider();
  }
  
  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalBanners) % totalBanners;
    updateSlider();
  }
  
  // Update slider position and active dot
  function updateSlider() {
    bannerWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Restart auto slide timer
    stopAutoSlide();
    startAutoSlide();
  }
  
  // Touch events for mobile
  bannerWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoSlide();
  });
  
  bannerWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    
    // Prevent vertical scrolling
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  });
  
  bannerWrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    
    isDragging = false;
    startAutoSlide();
  });
  
  // Mouse events for desktop drag
  bannerWrapper.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    stopAutoSlide();
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diff = startX - endX;
    
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    
    isDragging = false;
    startAutoSlide();
  });
  
  // Pause on hover
  bannerWrapper.addEventListener('mouseenter', stopAutoSlide);
  bannerWrapper.addEventListener('mouseleave', startAutoSlide);
  
  // Initialize
  startAutoSlide();
});
//PHOTO SLIDER
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('gallerySlider');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const dotsContainer = document.querySelector('.gallery-dots');
  const currentSlideCounter = document.querySelector('.current-slide');
  const totalSlidesCounter = document.querySelector('.total-slides');
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  let intervalId;
  
  // Initialize
  function initSlider() {
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('gallery-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    // Set total slides counter
    totalSlidesCounter.textContent = totalSlides;
    
    // Start auto slide
    startAutoSlide();
  }
  
  // Update slider
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update counter
    currentSlideCounter.textContent = currentIndex + 1;
    
    // Reset auto slide timer
    resetAutoSlide();
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
  }
  
  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }
  
  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
  
  // Auto slide
  function startAutoSlide() {
    intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
  }
  
  function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
  });
  
  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    resetAutoSlide();
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const threshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (difference > threshold) {
      nextSlide();
    } else if (difference < -threshold) {
      prevSlide();
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoSlide();
    }
  });
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  });
  
  slider.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
  
  // Initialize slider
  initSlider();
});
//menu
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("active");
  }