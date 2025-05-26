document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("fade-out");
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 1000);
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const bars = document.querySelectorAll(".bar");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");

    // Change menu icon color when scrolled
    if (window.scrollY > 100) {
      bars.forEach((bar) => {
        bar.style.backgroundColor = this.classList.contains("active")
          ? "white"
          : "var(--dark-color)";
      });
    }
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mainNav.classList.contains("active")) {
        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector(".main-header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight =
          document.querySelector(".main-header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Product Category Filtering
  const tabButtons = document.querySelectorAll(".tab-btn");
  const productCards = document.querySelectorAll(".product-card");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get the category to filter
      const category = this.getAttribute("data-category");

      // Filter product cards
      productCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Promotions Slider
  const promotionsSlider = document.querySelector(".promotions-slider");
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  promotionsSlider.addEventListener("mousedown", dragStart);
  promotionsSlider.addEventListener("touchstart", dragStart);

  promotionsSlider.addEventListener("mousemove", drag);
  promotionsSlider.addEventListener("touchmove", drag);

  promotionsSlider.addEventListener("mouseup", dragEnd);
  promotionsSlider.addEventListener("mouseleave", dragEnd);
  promotionsSlider.addEventListener("touchend", dragEnd);

  function dragStart(e) {
    if (e.type === "touchstart") {
      startPos = e.touches[0].clientX;
    } else {
      startPos = e.clientX;
      e.preventDefault();
    }

    isDragging = true;
    promotionsSlider.style.cursor = "grabbing";
    promotionsSlider.style.scrollSnapType = "none";
  }

  function drag(e) {
    if (!isDragging) return;

    let currentPos;
    if (e.type === "touchmove") {
      currentPos = e.touches[0].clientX;
    } else {
      currentPos = e.clientX;
    }

    const diff = currentPos - startPos;
    promotionsSlider.scrollLeft = prevTranslate - diff;
  }

  function dragEnd() {
    isDragging = false;
    promotionsSlider.style.cursor = "grab";
    promotionsSlider.style.scrollSnapType = "x mandatory";
    prevTranslate = promotionsSlider.scrollLeft;
  }
});
