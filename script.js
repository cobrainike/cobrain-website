// Mobile Navigation Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScrollTop = scrollTop;
});

// Active navigation link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".about-card, .service-card, .contact-card, .team-card, .stat-item"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Uncomment the line below if you want the typing effect
    // typeWriter(heroTitle, originalText, 50);
  }
});

// Parallax effect for floating cards
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  document.querySelectorAll(".floating-card").forEach((card, index) => {
    const speed = 0.5 + index * 0.2;
    card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent =
        Math.floor(start) +
        (element.textContent.includes("+") ? "+" : "") +
        (element.textContent.includes("%") ? "%" : "");
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent =
        target +
        (element.textContent.includes("+") ? "+" : "") +
        (element.textContent.includes("%") ? "%" : "");
    }
  }

  updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const text = statNumber.textContent;
        const number = parseInt(text.replace(/\D/g, ""));

        if (number) {
          animateCounter(statNumber, number);
          statsObserver.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", () => {
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => statsObserver.observe(item));
});

// Add hover effects to cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".service-card, .about-card, .contact-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Smooth reveal animations
const revealElements = document.querySelectorAll(
  ".hero-content, .section-header"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }
);

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(50px)";
  element.style.transition = "all 0.8s ease";
  revealObserver.observe(element);
});

// Add click ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", createRipple);
    button.style.position = "relative";
    button.style.overflow = "hidden";
  });
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement("style");
style.textContent = rippleCSS;
document.head.appendChild(style);

// Preloader
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
        <div class="preloader-content">
            <img src="logos/cobrain-logo.webp" alt="CoBrain Logo" class="preloader-logo">
            <div class="preloader-spinner"></div>
        </div>
    `;

  const preloaderCSS = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .preloader.hide {
            opacity: 0;
            visibility: hidden;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            height: 60px;
            margin-bottom: 2rem;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .preloader-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--accent-blue);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

  const preloaderStyle = document.createElement("style");
  preloaderStyle.textContent = preloaderCSS;
  document.head.appendChild(preloaderStyle);
  document.body.appendChild(preloader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });
});

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none";
      console.warn(`Image failed to load: ${this.src}`);
    });
  });
});
