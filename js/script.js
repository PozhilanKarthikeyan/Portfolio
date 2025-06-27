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
        if (card.classList.contains("image-left")) {
          card.style.display = "flex";
          card.style.flexDirection = "row";
        } else if (card.classList.contains("image-right")) {
          card.style.display = "flex";
          card.style.flexDirection = "row-reverse";
        } else {
          card.style.display = "flex";
        }
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Initialize EmailJS
function initializeEmailJS() {
  try {
    // Initialize EmailJS with your public key
    emailjs.init("5ZpqVzBXmfNDK6vTj"); // Replace with your actual public key
    window.emailjsConfigured = true;
    console.log("EmailJS initialized successfully");
  } catch (error) {
    console.warn("EmailJS initialization failed:", error);
    window.emailjsConfigured = false;
  }
}

// Initialize EmailJS when the page loads
window.addEventListener("load", () => {
  if (typeof emailjs !== "undefined") {
    initializeEmailJS();
  }
});

// Contact form submission
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values and trim whitespace
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Enhanced form validation
    if (!validateForm(name, email, subject, message)) {
      return;
    }

    // Check if EmailJS is configured
    if (typeof emailjs !== "undefined" && window.emailjsConfigured) {
      // Use EmailJS if configured
      await sendEmailWithEmailJS(name, email, subject, message);
    } else {
      // Fallback to mailto
      sendEmailWithMailto(name, email, subject, message);
    }
  });
}

// Enhanced form validation
function validateForm(name, email, subject, message) {
  // Check for empty fields
  if (!name || !email || !subject || !message) {
    showNotification("Please fill out all fields", "error");
    return false;
  }

  // Validate name (at least 2 characters, no numbers at start)
  if (name.length < 2) {
    showNotification(
      "Please enter a valid name (at least 2 characters)",
      "error"
    );
    return false;
  }

  // Enhanced email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }

  // Validate subject length
  if (subject.length < 3) {
    showNotification("Subject must be at least 3 characters long", "error");
    return false;
  }

  // Validate message length
  if (message.length < 10) {
    showNotification("Message must be at least 10 characters long", "error");
    return false;
  }

  // Check for spam-like content
  const spamKeywords = [
    "click here",
    "buy now",
    "limited time",
    "act now",
    "free money",
  ];
  const messageToCheck = (subject + " " + message).toLowerCase();
  for (const keyword of spamKeywords) {
    if (messageToCheck.includes(keyword)) {
      showNotification(
        "Message appears to contain spam content. Please revise your message.",
        "error"
      );
      return false;
    }
  }

  return true;
}

// Enhanced EmailJS implementation
async function sendEmailWithEmailJS(name, email, subject, message) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Update UI to show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  contactForm.style.opacity = "0.7";

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: "pozhilankarthikeyan2005@gmail.com",
    reply_to: email,
    // Add timestamp for tracking
    timestamp: new Date().toLocaleString(),
  };

  try {
    // Show initial sending notification
    showNotification("Sending your message...", "info");

    const response = await emailjs.send(
      "service_portfolio", // Replace with your actual service ID
      "template_contact", // Replace with your actual template ID
      templateParams
    );

    console.log("Email sent successfully:", response);

    // Success feedback
    showNotification(
      "✅ Message sent successfully! I'll get back to you within 24 hours.",
      "success"
    );

    // Reset form and add success animation
    contactForm.reset();
    contactForm.classList.add("form-success");
    setTimeout(() => contactForm.classList.remove("form-success"), 3000);

    // Track successful submission (for analytics)
    if (typeof gtag !== "undefined") {
      gtag("event", "contact_form_success", {
        event_category: "engagement",
        event_label: "email_sent",
      });
    }
  } catch (error) {
    console.error("Email sending failed:", error);

    // Detailed error handling
    let errorMessage = "Failed to send message. ";

    if (error.text) {
      if (error.text.includes("rate limit")) {
        errorMessage +=
          "Too many requests. Please wait a moment and try again.";
      } else if (error.text.includes("invalid")) {
        errorMessage +=
          "Invalid email configuration. Please try the contact methods below.";
      } else {
        errorMessage += "Opening your email client as backup...";
      }
    } else {
      errorMessage += "Opening your email client as backup...";
    }

    showNotification(errorMessage, "error");

    // Fallback to mailto after a short delay
    setTimeout(() => {
      sendEmailWithMailto(name, email, subject, message);
    }, 2000);

    // Track failed submission (for analytics)
    if (typeof gtag !== "undefined") {
      gtag("event", "contact_form_error", {
        event_category: "engagement",
        event_label: "email_failed",
        value: error.text || "unknown_error",
      });
    }
  } finally {
    // Reset UI state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    contactForm.style.opacity = "1";
  }
}

// Enhanced mailto fallback implementation
function sendEmailWithMailto(name, email, subject, message) {
  // Enhanced email body with better formatting
  const emailBody = encodeURIComponent(`Dear Pozhilan,

I hope this message finds you well. I'm reaching out through your portfolio website.

CONTACT DETAILS:
Name: ${name}
Email: ${email}

SUBJECT: ${subject}

MESSAGE:
${message}

---
This message was sent through your portfolio contact form.
Best regards,
${name}`);

  const mailtoLink = `mailto:pozhilankarthikeyan2005@gmail.com?subject=${encodeURIComponent(
    `Portfolio Contact: ${subject}`
  )}&body=${emailBody}`;

  // Open default email client
  try {
    window.open(mailtoLink, "_self");

    // Show success message with instructions
    showNotification(
      "📧 Opening your email client. Please send the pre-filled email to complete your message.",
      "success"
    );

    // Track mailto usage (for analytics)
    if (typeof gtag !== "undefined") {
      gtag("event", "contact_form_mailto", {
        event_category: "engagement",
        event_label: "mailto_used",
      });
    }
  } catch (error) {
    console.error("Failed to open email client:", error);

    // Show manual contact information as last resort
    showNotification(
      "Please manually send an email to: pozhilankarthikeyan2005@gmail.com",
      "info"
    );

    // Copy email to clipboard as additional help
    copyToClipboard(
      "pozhilankarthikeyan2005@gmail.com",
      "Email address copied to clipboard!"
    );
  }

  // Reset form after a delay
  setTimeout(() => {
    contactForm.reset();
    contactForm.classList.add("form-reset");
    setTimeout(() => contactForm.classList.remove("form-reset"), 1000);
  }, 1500);
}

// Enhanced notification function with better UX
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Create notification element with improved styling
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Add appropriate icon based on type
  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle"></i>';
      break;
    case "error":
      icon = '<i class="fas fa-exclamation-triangle"></i>';
      break;
    case "info":
      icon = '<i class="fas fa-info-circle"></i>';
      break;
    default:
      icon = '<i class="fas fa-bell"></i>';
  }

  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">${icon}</div>
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close notification">&times;</button>
    </div>
  `;

  // Enhanced notification styles
  const baseStyles = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    z-index: 10000;
    max-width: 400px;
    min-width: 300px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
  `;

  let typeStyles = "";
  switch (type) {
    case "success":
      typeStyles =
        "background: linear-gradient(135deg, #28a745 0%, #20c997 100%);";
      break;
    case "error":
      typeStyles =
        "background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);";
      break;
    case "info":
      typeStyles =
        "background: linear-gradient(135deg, #17a2b8 0%, #3498db 100%);";
      break;
    default:
      typeStyles =
        "background: linear-gradient(135deg, #6c757d 0%, #495057 100%);";
  }

  notification.style.cssText = baseStyles + typeStyles;

  // Style the notification content
  const content = notification.querySelector(".notification-content");
  content.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  // Style the icon
  const iconElement = notification.querySelector(".notification-icon");
  iconElement.style.cssText = `
    font-size: 18px;
    opacity: 0.9;
  `;

  // Style the message
  const messageElement = notification.querySelector(".notification-message");
  messageElement.style.cssText = `
    flex: 1;
    line-height: 1.4;
  `;

  // Style the close button
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  `;

  closeBtn.addEventListener("mouseenter", () => (closeBtn.style.opacity = "1"));
  closeBtn.addEventListener(
    "mouseleave",
    () => (closeBtn.style.opacity = "0.8")
  );

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  });

  // Auto remove based on message length and type
  const autoRemoveDelay =
    type === "error" ? 8000 : type === "success" ? 6000 : 5000;
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, autoRemoveDelay);
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
// Enhanced Back to Top Button
function addBackToTopButton() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  backToTopBtn.title = "Back to top";
  document.body.appendChild(backToTopBtn);

  // Add inline styles for better positioning and appearance
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;

  // Hover effect
  backToTopBtn.addEventListener("mouseenter", () => {
    backToTopBtn.style.transform = backToTopBtn.classList.contains("visible")
      ? "translateY(0) scale(1.1)"
      : "translateY(20px) scale(1.1)";
    backToTopBtn.style.boxShadow = "0 12px 40px rgba(59, 130, 246, 0.4)";
  });

  backToTopBtn.addEventListener("mouseleave", () => {
    backToTopBtn.style.transform = backToTopBtn.classList.contains("visible")
      ? "translateY(0) scale(1)"
      : "translateY(20px) scale(1)";
    backToTopBtn.style.boxShadow = "0 8px 32px rgba(59, 130, 246, 0.3)";
  });

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
      backToTopBtn.style.transform = "translateY(0)";
    } else {
      backToTopBtn.classList.remove("visible");
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
      backToTopBtn.style.transform = "translateY(20px)";
    }
  });

  // Smooth scroll to top with enhanced animation
  backToTopBtn.addEventListener("click", () => {
    // Add click animation
    backToTopBtn.style.transform = "translateY(0) scale(0.95)";
    setTimeout(() => {
      backToTopBtn.style.transform = backToTopBtn.classList.contains("visible")
        ? "translateY(0) scale(1)"
        : "translateY(20px) scale(1)";
    }, 150);

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

      // Determine optimal styling based on aspect ratio - ALL IMAGES USE CONTAIN
      if (aspectRatio > 1.5) {
        // Wide images (landscape)
        imageContainer.style.height = "240px";
        imageContainer.classList.add("wide-image");
        img.style.objectFit = "contain"; // Changed from cover to contain
        img.style.width = "100%";
        img.style.height = "100%";
      } else if (aspectRatio < 0.8) {
        // Tall images (portrait)
        imageContainer.style.height = "300px";
        imageContainer.classList.add("tall-image");
        img.style.objectFit = "contain"; // Changed from cover to contain
        img.style.width = "100%";
        img.style.height = "100%";
      } else {
        // Square or moderate rectangular images
        imageContainer.style.height = "280px";
        imageContainer.classList.add("square-image");
        img.style.objectFit = "contain"; // Changed from cover to contain
        img.style.width = "100%";
        img.style.height = "100%";
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
      imageContainer.style.height = "280px";
      imageContainer.style.display = "flex";
      imageContainer.style.alignItems = "center";
      imageContainer.style.justifyContent = "center";
      imageContainer.style.backgroundColor = "#f0f0f0";
      imageContainer.classList.add("error-image");

      // Set fallback to contain for error images too
      img.style.objectFit = "contain";
      img.style.width = "100%";
      img.style.height = "100%";
    };

    // Set the source to trigger loading
    tempImg.src = img.src;
  });
}

// Real-time form validation
function setupRealTimeValidation() {
  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach((input) => {
    // Add validation on blur (when user leaves the field)
    input.addEventListener("blur", function () {
      validateField(this);
    });

    // Add validation on input for immediate feedback
    input.addEventListener("input", function () {
      // Clear any previous error styling
      this.classList.remove("error");

      // Validate email in real-time
      if (this.type === "email" && this.value) {
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(this.value)) {
          this.style.borderColor = "rgba(220, 53, 69, 0.5)";
        } else {
          this.style.borderColor = "rgba(40, 167, 69, 0.5)";
        }
      }
    });
  });
}

// Individual field validation
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  switch (field.type || field.tagName.toLowerCase()) {
    case "email":
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;
    case "text":
      if (field.name === "name" && value && value.length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters";
      }
      if (field.name === "subject" && value && value.length < 3) {
        isValid = false;
        errorMessage = "Subject must be at least 3 characters";
      }
      break;
    case "textarea":
      if (value && value.length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters";
      }
      break;
  }

  // Apply visual feedback
  if (!isValid && value) {
    field.style.borderColor = "rgba(220, 53, 69, 0.5)";
    showFieldError(field, errorMessage);
  } else if (value) {
    field.style.borderColor = "rgba(40, 167, 69, 0.5)";
    hideFieldError(field);
  } else {
    field.style.borderColor = "var(--glass-border)";
    hideFieldError(field);
  }

  return isValid;
}

// Show field-specific error
function showFieldError(field, message) {
  hideFieldError(field); // Remove any existing error

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;

  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

  field.parentNode.appendChild(errorDiv);

  // Animate in
  setTimeout(() => {
    errorDiv.style.opacity = "1";
  }, 10);
}

// Hide field-specific error
function hideFieldError(field) {
  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.style.opacity = "0";
    setTimeout(() => {
      if (existingError.parentNode) {
        existingError.remove();
      }
    }, 300);
  }
}

// Character counter for textarea
function addCharacterCounter() {
  const messageTextarea = document.getElementById("message");
  if (!messageTextarea) return;

  const counter = document.createElement("div");
  counter.className = "character-counter";
  counter.style.cssText = `
    text-align: right;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  `;

  messageTextarea.parentNode.appendChild(counter);

  function updateCounter() {
    const current = messageTextarea.value.length;
    const min = 10;
    const recommended = 50;

    let message = `${current} characters`;
    if (current < min) {
      message += ` (${min - current} more needed)`;
      counter.style.color = "#dc3545";
    } else if (current < recommended) {
      message += " (minimum reached)";
      counter.style.color = "#ffc107";
    } else {
      message += " (good length)";
      counter.style.color = "#28a745";
    }

    counter.textContent = message;
  }

  messageTextarea.addEventListener("input", updateCounter);
  updateCounter(); // Initial count
}

// Scroll Progress Indicator
function createScrollProgressIndicator() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress(); // Initial call
}

// Enhanced smooth scrolling for navigation links
function enhanceSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Fix scroll position on page load/refresh
function fixScrollPosition() {
  // Scroll to top on page load to prevent white patches
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
  });

  // Ensure proper scroll position on load
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;
          window.scrollTo({
            top: target.offsetTop - headerHeight - 20,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  });
}

// Enhanced gradient theme effects
function initializeGradientEffects() {
  // Add parallax effect to sections
  const sections = document.querySelectorAll(
    ".hero, .about, .projects, .skills, .contact"
  );
  sections.forEach((section) => {
    section.classList.add("parallax-bg");
  });

  // Add gradient text effects to key elements
  const titles = document.querySelectorAll("h1, h2.section-title");
  titles.forEach((title, index) => {
    if (index % 2 === 0) {
      title.classList.add("gradient-text");
    } else {
      title.classList.add("gradient-text-accent");
    }
  });

  // Enhanced glass morphism for cards
  const cards = document.querySelectorAll(
    ".project-card, .contact-item, .contact-form, .about-intro-card, .achievement-card, .skills-category"
  );
  cards.forEach((card) => {
    card.classList.add("glass-card");
  });

  // Mouse movement gradient effect
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const hero = document.querySelector(".hero");
    if (hero) {
      const gradientX = 50 + (mouseX - 0.5) * 20;
      const gradientY = 50 + (mouseY - 0.5) * 20;
      hero.style.backgroundPosition = `${gradientX}% ${gradientY}%`;
    }
  });

  // Scroll-based gradient animation
  let ticking = false;
  function updateGradientOnScroll() {
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);
    const sections = document.querySelectorAll(
      ".about, .projects, .skills, .contact"
    );

    sections.forEach((section, index) => {
      const offsetPercent = (scrollPercent * 100 + index * 25) % 100;
      section.style.backgroundPosition = `${offsetPercent}% 50%`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateGradientOnScroll);
      ticking = true;
    }
  });

  console.log("Enhanced gradient theme effects initialized!");
}

// Initialize enhanced form features
if (contactForm) {
  setupRealTimeValidation();
  addCharacterCounter();
}

// Initialize all features
document.addEventListener("DOMContentLoaded", () => {
  addLoadingScreen();
  addScrollAnimations();
  addBackToTopButton();
  setupDynamicImageSizing();
  createScrollProgressIndicator();
  enhanceSmoothScrolling();
  fixScrollPosition();
  initializeGradientEffects();
});
