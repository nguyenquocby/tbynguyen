// Toggle mobile menu
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Xử lý scroll: thu gọn thanh điều hướng
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('collapsed');
  } else {
    navbar.classList.remove('collapsed');
  }
});



// Banner slideshow
const banners = document.querySelectorAll('.banner img');
let currentBanner = 0;

function showBanner(index) {
  banners.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) img.classList.add('active');
  });
}

document.getElementById('next').addEventListener('click', () => {
  currentBanner = (currentBanner + 1) % banners.length;
  showBanner(currentBanner);
});

document.getElementById('prev').addEventListener('click', () => {
  currentBanner = (currentBanner - 1 + banners.length) % banners.length;
  showBanner(currentBanner);
});

setInterval(() => {
  currentBanner = (currentBanner + 1) % banners.length;
  showBanner(currentBanner);
}, 5000);

showBanner(currentBanner); // Initial load

// Fade in gallery items on scroll
const galleryItems = document.querySelectorAll('.gallery-item');

// Gallery IntersectionObserver
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

galleryItems.forEach(item => {
  galleryObserver.observe(item);
});

// Filter functionality for products
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

// Add event listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle active class on buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');

    productItems.forEach(item => {
      if (filterValue === 'all') {
        item.style.display = 'block';
      } else if (item.classList.contains(filterValue)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Trigger animation for visible product items
const productObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

productItems.forEach(item => {
  productObserver.observe(item);
});

