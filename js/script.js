// DOM elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");

// Mobile navigation toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a nav link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Sticky header on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Highlight active nav item based on scroll position
  highlightActiveNavItem();
});

// Highlight active nav item based on scroll position
function highlightActiveNavItem() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
}

// Project filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove("active");
    });

    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // Show/hide projects based on filter
    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Contact form submission
if (contactForm) {
  // Initialize EmailJS (you need to replace with your actual keys)
  // emailjs.init("YOUR_PUBLIC_KEY"); // Uncomment and add your EmailJS public key

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Basic form validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill out all fields", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Check if EmailJS is configured
    if (typeof emailjs !== "undefined" && window.emailjsConfigured) {
      // Use EmailJS if configured
      sendEmailWithEmailJS(name, email, subject, message);
    } else {
      // Fallback to mailto
      sendEmailWithMailto(name, email, subject, message);
    }
  });
}

// EmailJS implementation
function sendEmailWithEmailJS(name, email, subject, message) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: "pozhilankarthikeyan2005@gmail.com",
  };

  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then((response) => {
      console.log("Email sent successfully:", response);
      showNotification(
        "Message sent successfully! I will get back to you soon.",
        "success"
      );
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
      showNotification(
        "Failed to send message. Redirecting to email client...",
        "error"
      );
      // Fallback to mailto if EmailJS fails
      setTimeout(
        () => sendEmailWithMailto(name, email, subject, message),
        2000
      );
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Mailto fallback implementation
function sendEmailWithMailto(name, email, subject, message) {
  const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(
    message
  )}`;
  const mailtoLink = `mailto:pozhilankarthikeyan2005@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${emailBody}`;

  // Open default email client
  window.location.href = mailtoLink;

  // Show success message
  showNotification(
    "Opening your email client. Please send the email to complete your message.",
    "success"
  );

  // Reset form after a delay
  setTimeout(() => {
    contactForm.reset();
  }, 1000);
}

// Notification function
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${
          type === "success"
            ? "background-color: #28a745;"
            : "background-color: #dc3545;"
        }
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Copy to clipboard function
function copyToClipboard(text, message) {
  // Use the modern Clipboard API if available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification(message, "success");
      })
      .catch(() => {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text, message);
      });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(text, message);
  }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, message) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      showNotification(message, "success");
    } else {
      showNotification(
        "Copy failed. Please select and copy manually.",
        "error"
      );
    }
  } catch (err) {
    showNotification(
      "Copy not supported. Please select and copy manually.",
      "error"
    );
  }

  document.body.removeChild(textArea);
}

// Typed.js effect for dynamic text
const typedTextElement = document.querySelector(".typed-text");
if (typedTextElement) {
  const roles = [
    "Embedded Systems Engineer",
    "Firmware Developer",
    "IoT Developer",
    "Hardware Designer",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 200;
  let erasingDelay = 100;
  let newTextDelay = 2000; // Delay after typing a word

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Remove a character
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      // Add a character
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 200;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
      // Start deleting after delay
      isDeleting = true;
      typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      // Word has been deleted
      isDeleting = false;
      // Move to next word
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, typingDelay);
  }

  // Start the typing effect
  setTimeout(type, newTextDelay);
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animation on scroll
window.addEventListener("DOMContentLoaded", () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".project-card, .skill-item, .contact-item, .about-image, .about-text"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in");
      }
    });
  };

  // Add CSS class for animation
  const style = document.createElement("style");
  style.textContent = `
        .project-card, .skill-item, .contact-item, .about-image, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Initial check and add scroll listener
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);
});

// Add placeholder images if not present
window.addEventListener("DOMContentLoaded", () => {
  const placeholderImages = document.querySelectorAll(
    'img[src*="placeholder"]'
  );

  placeholderImages.forEach((img) => {
    if (img.naturalWidth === 0) {
      // Create colored placeholder based on src attribute
      let color;
      if (img.src.includes("profile")) {
        color = "#007bff";
      } else if (img.src.includes("about")) {
        color = "#28a745";
      } else if (img.src.includes("project")) {
        color = "#6610f2";
      } else {
        color = "#fd7e14";
      }

      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set dimensions
      const width = img.width || 300;
      const height = img.height || 200;
      canvas.width = width;
      canvas.height = height;

      // Fill with color
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);

      // Add text if it's a project image
      if (img.src.includes("project")) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Project Image", width / 2, height / 2);
      }

      // Set the image src to the canvas data URL
      img.src = canvas.toDataURL();
    }
  });
});

// Add scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  document.querySelectorAll(".skill-item").forEach((item, index) => {
    item.classList.add("fade-in");
    item.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(item);
  });

  document.querySelectorAll(".about-text").forEach((el) => {
    el.classList.add("slide-in-left");
    observer.observe(el);
  });

  document.querySelectorAll(".about-image").forEach((el) => {
    el.classList.add("slide-in-right");
    observer.observe(el);
  });
}

// Back to top button
function addBackToTopButton() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Dark mode toggle
function addDarkModeToggle() {
  const darkModeBtn = document.createElement("button");
  darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeBtn.className = "dark-mode-toggle";
  darkModeBtn.setAttribute("aria-label", "Toggle dark mode");
  document.body.appendChild(darkModeBtn);

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    darkModeBtn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// Loading screen
function addLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loadingScreen);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  });
}

// Dynamic image sizing based on image dimensions
function setupDynamicImageSizing() {
  const projectImages = document.querySelectorAll(".project-image img");

  projectImages.forEach((img, index) => {
    const imageContainer = img.parentElement;

    // Add loading state
    imageContainer.classList.add("loading");

    // Create a new image object to get natural dimensions
    const tempImg = new Image();

    tempImg.onload = function () {
      const naturalWidth = this.naturalWidth;
      const naturalHeight = this.naturalHeight;
      const aspectRatio = naturalWidth / naturalHeight;

      // Remove loading state
      imageContainer.classList.remove("loading");

      // Determine optimal styling based on aspect ratio
      if (aspectRatio > 1.5) {
        // Wide images (landscape)
        imageContainer.style.height = "220px";
        imageContainer.classList.add("wide-image");
        img.style.objectFit = "cover";
        img.style.width = "95%";
        img.style.height = "85%";
      } else if (aspectRatio < 0.8) {
        // Tall images (portrait)
        imageContainer.style.height = "320px";
        imageContainer.classList.add("tall-image");
        img.style.objectFit = "cover";
        img.style.width = "85%";
        img.style.height = "95%";
      } else {
        // Square or moderate rectangular images
        imageContainer.style.height = "280px";
        imageContainer.classList.add("square-image");
        img.style.objectFit = "cover";
        img.style.width = "90%";
        img.style.height = "90%";
      }

      // Apply consistent advanced styling
      img.style.borderRadius = "12px";
      img.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
      img.style.filter = "brightness(1) contrast(1.05) saturate(1.1)";

      // Ensure the image is centered
      imageContainer.style.display = "flex";
      imageContainer.style.alignItems = "center";
      imageContainer.style.justifyContent = "center";

      console.log(
        `Image ${
          index + 1
        }: ${naturalWidth}x${naturalHeight}, aspect ratio: ${aspectRatio.toFixed(
          2
        )}, type: ${
          aspectRatio > 1.5 ? "wide" : aspectRatio < 0.8 ? "tall" : "square"
        }`
      );
    };

    tempImg.onerror = function () {
      console.warn(`Failed to load image: ${img.src}`);
      // Remove loading state and apply fallback styling
      imageContainer.classList.remove("loading");
      imageContainer.style.height = "250px";
      imageContainer.style.display = "flex";
      imageContainer.style.alignItems = "center";
      imageContainer.style.justifyContent = "center";
      imageContainer.style.backgroundColor = "#f0f0f0";
      imageContainer.classList.add("error-image");
    };

    // Set the source to trigger loading
    tempImg.src = img.src;
  });
}

// Initialize all features
document.addEventListener("DOMContentLoaded", () => {
  addLoadingScreen();
  addScrollAnimations();
  addBackToTopButton();
  addDarkModeToggle();
  setupDynamicImageSizing(); // Add dynamic image sizing
});
