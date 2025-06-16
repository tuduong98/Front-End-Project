// Enhanced Navigation Bar Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Collapsible menu functionality
  document.querySelectorAll(".collapsible").forEach((item) => {
    const toggler = item.querySelector(".nav__toggler");
    const content = item.querySelector(".collapsible__content");

    if (toggler) {
      toggler.addEventListener("click", (e) => {
        e.preventDefault();
        item.classList.toggle("collapsible--expanded");

        // Add smooth animation
        if (item.classList.contains("collapsible--expanded")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0";
        }
      });
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav__item a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu after clicking
        const nav = document.querySelector(".nav");
        if (nav.classList.contains("collapsible--expanded")) {
          nav.classList.remove("collapsible--expanded");
          const content = nav.querySelector(".collapsible__content");
          content.style.maxHeight = "0";
        }
      }
    });
  });

  // Add scroll effect to navigation bar
  let lastScrollTop = 0;
  const nav = document.querySelector(".nav");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove shadow based on scroll position
    if (scrollTop > 10) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    const nav = document.querySelector(".nav");
    const isClickInside = nav.contains(e.target);

    if (!isClickInside && nav.classList.contains("collapsible--expanded")) {
      nav.classList.remove("collapsible--expanded");
      const content = nav.querySelector(".collapsible__content");
      content.style.maxHeight = "0";
    }
  });

  // Add active state to current page navigation item
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll(".nav__item a");

  navLinks.forEach((link) => {
    if (link.href.includes(currentLocation)) {
      link.parentElement.classList.add("nav__item--active");
    }
  });

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const nav = document.querySelector(".nav");
      if (nav.classList.contains("collapsible--expanded")) {
        nav.classList.remove("collapsible--expanded");
        const content = nav.querySelector(".collapsible__content");
        content.style.maxHeight = "0";
      }
    }
  });

  // Domain Section Enhancements
  const domainInput = document.querySelector(".block--domain .input");
  const domainButton = document.querySelector(".block--domain .btn");
  const domainPrices = document.querySelectorAll(".block__domain-prices li");

  // Enhanced search functionality
  if (domainInput && domainButton) {
    // Add search functionality
    function performDomainSearch() {
      const domain = domainInput.value.trim();
      if (domain) {
        // Add loading state
        domainButton.innerHTML = `
          <svg class="icon icon--white">
            <use xlink:href="icons/sprite.svg#settings"></use>
          </svg>
          Searching...
        `;
        domainButton.disabled = true;

        // Simulate search delay
        setTimeout(() => {
          domainButton.innerHTML = `
            <svg class="icon icon--white">
              <use xlink:href="icons/sprite.svg#search"></use>
            </svg>
            Search
          `;
          domainButton.disabled = false; // Show results (you can implement actual search logic here)
        }, 2000);
      }
    }

    domainButton.addEventListener("click", performDomainSearch);

    domainInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performDomainSearch();
      }
    });

    // Input focus effects
    domainInput.addEventListener("focus", function () {
      this.parentElement.classList.add("input-group--focused");
    });

    domainInput.addEventListener("blur", function () {
      this.parentElement.classList.remove("input-group--focused");
    });
  }

  // Domain price items interaction
  domainPrices.forEach((item, index) => {
    // Add staggered animation delay
    item.style.animationDelay = `${0.8 + index * 0.1}s`;

    // Add click interaction
    item.addEventListener("click", function () {
      const domain = this.textContent.trim();
      if (domainInput) {
        // Extract domain extension
        const extension = domain.split(" ")[0];
        const currentValue = domainInput.value.trim();

        // If input is empty or doesn't end with an extension, add this extension
        if (!currentValue || !currentValue.includes(".")) {
          domainInput.value = currentValue
            ? currentValue + extension
            : "example" + extension;
        } else {
          // Replace existing extension
          const baseDomain = currentValue.split(".")[0];
          domainInput.value = baseDomain + extension;
        }

        // Focus input and trigger search
        domainInput.focus();
      }

      // Visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });

    // Add hover sound effect (optional)
    item.addEventListener("mouseenter", function () {
      // You can add sound effects here if needed
      this.style.setProperty("--hover-scale", "1.05");
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const domainObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe domain section elements
  const domainSection = document.querySelector(".block--domain");
  if (domainSection) {
    domainObserver.observe(domainSection);
  }

  // Plans Section Enhancements
  const planCards = document.querySelectorAll(".block--plans .card");
  const planButtons = document.querySelectorAll(".block--plans .btn");

  // Add interactive effects to plan cards
  planCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${0.2 + index * 0.2}s`;

    // Add click effects
    card.addEventListener("click", function (e) {
      // Don't trigger if clicking on button
      if (!e.target.closest(".btn")) {
        const button = this.querySelector(".btn");
        if (button) {
          // Highlight the card temporarily
          this.style.transform = "translateY(-15px) scale(1.02)";
          this.style.boxShadow = "0 35px 90px rgba(0, 0, 0, 0.2)";

          // Flash the button
          button.style.background = "var(--color-primary)";
          button.style.color = "white";
          button.style.transform = "scale(1.1)";

          setTimeout(() => {
            button.style.background = "";
            button.style.color = "";
            button.style.transform = "";
          }, 200);
        }
      }
    });

    // Add hover sound effect (visual feedback)
    card.addEventListener("mouseenter", function () {
      this.style.setProperty("--hover-scale", "1.02");
    });

    card.addEventListener("mouseleave", function () {
      // Reset transform if not permanently changed
      if (!this.classList.contains("plan--selected")) {
        this.style.transform = "";
        this.style.boxShadow = "";
      }
    });
  });

  // Enhanced button interactions
  planButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Add loading state
      const originalText = this.innerHTML;
      this.innerHTML = "Processing...";
      this.disabled = true;
      this.style.opacity = "0.7";

      // Simulate processing
      setTimeout(() => {
        this.innerHTML = "✓ Selected";
        this.style.background = "#10b981";
        this.style.color = "white";
        this.style.borderColor = "#10b981";

        // Mark parent card as selected
        const parentCard = this.closest(".card");
        parentCard.classList.add("plan--selected");

        // Reset other cards
        planCards.forEach((card) => {
          if (card !== parentCard) {
            card.classList.remove("plan--selected");
            const btn = card.querySelector(".btn");
            if (btn) {
              btn.innerHTML = "Buy Now";
              btn.disabled = false;
              btn.style.opacity = "";
              btn.style.background = "";
              btn.style.color = "";
              btn.style.borderColor = "";
            }
          }
        });

        // Reset after 3 seconds
        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
          this.style.opacity = "";
          this.style.background = "";
          this.style.color = "";
          this.style.borderColor = "";
          parentCard.classList.remove("plan--selected");
        }, 3000);
      }, 1500);
    });
  });

  // Price toggle functionality (monthly/yearly)
  const priceToggle = document.createElement("div");
  priceToggle.className = "price-toggle";
  priceToggle.innerHTML = `
    <div class="toggle-container">
      <span class="toggle-label">Monthly</span>
      <label class="toggle-switch">
        <input type="checkbox" id="priceToggle">
        <span class="toggle-slider"></span>
      </label>
      <span class="toggle-label">Yearly <span class="save-badge">Save 20%</span></span>
    </div>
  `;

  // Insert price toggle before the grid
  const plansGrid = document.querySelector(".block--plans .grid");
  if (plansGrid) {
    plansGrid.parentNode.insertBefore(priceToggle, plansGrid);

    // Add toggle functionality
    const toggleInput = document.getElementById("priceToggle");
    const prices = [14, 24, 39]; // Monthly prices

    toggleInput.addEventListener("change", function () {
      const isYearly = this.checked;
      const planPrices = document.querySelectorAll(".plan__price");

      planPrices.forEach((priceEl, index) => {
        const monthlyPrice = prices[index];
        const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
        const displayPrice = isYearly ? yearlyPrice : monthlyPrice;

        // Animate price change
        priceEl.style.transform = "scale(0.8)";
        priceEl.style.opacity = "0.5";

        setTimeout(() => {
          priceEl.textContent = `$${displayPrice}`;
          priceEl.style.transform = "scale(1)";
          priceEl.style.opacity = "1";
        }, 150);

        // Update billing cycle
        const billingCycle = priceEl.nextElementSibling;
        if (
          billingCycle &&
          billingCycle.classList.contains("plan__billing-cycle")
        ) {
          setTimeout(() => {
            billingCycle.textContent = isYearly ? "/year" : "/month";
          }, 150);
        }
      });
    });
  }

  // Intersection Observer for plans section
  const plansObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Trigger card animations
          const cards = entry.target.querySelectorAll(".card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `slideInUp 0.8s ease-out both`;
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Observe plans section
  const plansSection = document.querySelector(".block--plans");
  if (plansSection) {
    plansObserver.observe(plansSection);
  }

  // Enhanced Feature Section Functionality
  function initializeFeatureSection() {
    // Feature cards interaction observer
    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
              entry.target.classList.add("animate-in");
              entry.target.style.opacity = "1";
            }, index * 200);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Observe all feature articles
    const features = document.querySelectorAll(".feature");
    features.forEach((feature) => {
      feature.style.opacity = "0";
      featureObserver.observe(feature);
    });

    // Enhanced link arrow interactions
    const featureLinks = document.querySelectorAll(
      ".feature__content .link-arrow"
    );

    featureLinks.forEach((link) => {
      // Add click analytics tracking
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const featureTitle =
          this.closest(".feature__content").querySelector(
            ".feature__heading"
          ).textContent;

        // Add loading state
        this.style.pointerEvents = "none";
        this.innerHTML = `
          <span>Loading</span>
          <div class="loading-spinner"></div>
        `;

        // Simulate navigation delay
        setTimeout(() => {
          this.style.pointerEvents = "auto";
          this.innerHTML = `Learn more <span>→</span>`;

          // Here you would normally navigate to the actual page
          window.location.href = this.href || "#";
        }, 1500);
      });

      // Enhanced hover effects with performance optimization
      let hoverTimeout;

      link.addEventListener("mouseenter", function () {
        clearTimeout(hoverTimeout);
        const iconContainer =
          this.closest(".feature__content").querySelector(".icon-container");

        if (iconContainer) {
          iconContainer.style.transform = "scale(1.15) rotate(8deg)";
        }
      });

      link.addEventListener("mouseleave", function () {
        hoverTimeout = setTimeout(() => {
          const iconContainer =
            this.closest(".feature__content").querySelector(".icon-container");

          if (iconContainer) {
            iconContainer.style.transform = "";
          }
        }, 100);
      });
    });

    // Icon container click interaction
    const iconContainers = document.querySelectorAll(
      ".feature__content .icon-container"
    );

    iconContainers.forEach((container) => {
      container.addEventListener("click", function () {
        // Add click ripple effect
        const ripple = document.createElement("div");
        ripple.className = "click-ripple";
        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);

        // Trigger associated link
        const link =
          this.closest(".feature__content").querySelector(".link-arrow");
        if (link) {
          link.click();
        }
      });

      // Add keyboard support
      container.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });

      // Make focusable for accessibility
      container.setAttribute("tabindex", "0");
      container.setAttribute("role", "button");
      container.setAttribute("aria-label", "Learn more about this feature");
    });

    // Parallax effect for feature images (performance optimized)
    let ticking = false;

    function updateParallax() {
      const features = document.querySelectorAll(".feature__image");
      const scrolled = window.pageYOffset;

      features.forEach((image) => {
        const rate = scrolled * -0.3;
        const rect = image.getBoundingClientRect();

        // Only apply parallax if element is in viewport
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          image.style.transform = `translateY(${rate}px)`;
        }
      });

      ticking = false;
    }

    function requestParallaxUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Only enable parallax on larger screens and if motion is not reduced
    if (
      window.innerWidth > 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      window.addEventListener("scroll", requestParallaxUpdate, {
        passive: true,
      });
    }

    // Feature section background animation control
    const featuresSection = document.querySelector(".block--features");
    if (featuresSection) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("section-visible");
            } else {
              entry.target.classList.remove("section-visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      sectionObserver.observe(featuresSection);
    }
  }

  // Initialize feature section when DOM is ready
  initializeFeatureSection();

  // Add CSS for loading spinner and click ripple
  const featureStyles = document.createElement("style");
  featureStyles.textContent = `
    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .click-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .section-visible .block--features::before {
      animation-play-state: running;
    }
    
    .feature[style*="opacity: 0"] {
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .feature.animate-in {
      transform: translateY(0);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;

  document.head.appendChild(featureStyles);

  // Enhanced Showcase Section Functionality
  function initializeShowcaseSection() {
    // Showcase section intersection observer
    const showcaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showcase-visible");

            // Trigger media item animations
            const mediaItems = entry.target.querySelectorAll(".media");
            mediaItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
              }, index * 200 + 500);
            });

            // Trigger image animation
            const showcaseImage = entry.target.querySelector(
              ".block-showcase__image"
            );
            if (showcaseImage) {
              setTimeout(() => {
                showcaseImage.style.opacity = "1";
                showcaseImage.style.transform = "translateY(0)";
              }, 200);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Initialize showcase section
    const showcaseSection = document.querySelector(".block-showcase");
    if (showcaseSection) {
      // Set initial states
      const mediaItems = showcaseSection.querySelectorAll(".media");
      const showcaseImage = showcaseSection.querySelector(
        ".block-showcase__image"
      );

      mediaItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-50px)";
        item.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      });

      if (showcaseImage) {
        showcaseImage.style.opacity = "0";
        showcaseImage.style.transform = "translateY(30px)";
        showcaseImage.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
      }

      // Observe section
      showcaseObserver.observe(showcaseSection);
    }

    // Enhanced media interactions
    const mediaElements = document.querySelectorAll(".block-showcase .media");

    mediaElements.forEach((media, index) => {
      // Add click tracking
      media.addEventListener("click", function () {
        const title = this.querySelector(".media__title").textContent;

        // Add pulse effect
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });

      // Enhanced keyboard navigation
      media.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });

      // Make focusable
      media.setAttribute("tabindex", "0");
      media.setAttribute("role", "button");
      media.setAttribute(
        "aria-label",
        `Learn more about ${media.querySelector(".media__title").textContent}`
      ); // Icon interaction effects
      const icon = media.querySelector(".icon");
      if (icon) {
        media.addEventListener("mouseenter", function () {
          icon.style.transform = "scale(1.15) rotate(5deg)";
        });

        media.addEventListener("mouseleave", function () {
          icon.style.transform = "";
        });
      }
    }); // Note: Parallax effect for showcase image has been removed to prevent
    // unwanted image movement during scroll interactions

    // Performance monitoring for showcase animations
    const showcasePerformanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes("showcase") && entry.duration > 16) {
          // Performance monitoring (can be logged if needed)
        }
      });
    });

    // Start performance monitoring
    if ("PerformanceObserver" in window) {
      showcasePerformanceObserver.observe({ entryTypes: ["measure"] });
    }
  }

  // Initialize showcase section
  initializeShowcaseSection();

  // Add showcase-specific styles
  const showcaseStyles = document.createElement("style");
  showcaseStyles.textContent = `
    .showcase-visible .block-showcase__image {
      animation: showcaseImageEntry 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .showcase-visible .media {
      animation: showcaseMediaEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes showcaseImageEntry {
      0% {
        opacity: 0;
        transform: translateY(50px) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes showcaseMediaEntry {
      0% {
        opacity: 0;
        transform: translateX(-50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .block-showcase .media:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6);
      outline-offset: 3px;
    }
    
    .block-showcase .media[aria-expanded="true"] {
      background: rgba(255, 255, 255, 0.15);
      transform: scale(1.02);
    }
    
    /* Loading states for media interactions */
    .block-showcase .media[data-loading="true"] {
      pointer-events: none;
      opacity: 0.7;
    }
    
    .block-showcase .media[data-loading="true"]::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      transform: translate(-50%, -50%);
    }
  `;

  document.head.appendChild(showcaseStyles);

  // Enhanced Testimonials Section Functionality
  function initializeTestimonialsSection() {
    // Testimonials intersection observer
    const testimonialsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("testimonials-visible");

            // Staggered animation for testimonials
            const testimonials = entry.target.querySelectorAll(".testimonial");
            testimonials.forEach((testimonial, index) => {
              setTimeout(() => {
                testimonial.style.opacity = "1";
                testimonial.style.transform = "translateY(0)";
              }, index * 300 + 200);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Initialize testimonials section
    const testimonialsSection = document.querySelector(".block--testimonials");
    if (testimonialsSection) {
      // Set initial states
      const testimonials = testimonialsSection.querySelectorAll(".testimonial");

      testimonials.forEach((testimonial) => {
        testimonial.style.opacity = "0";
        testimonial.style.transform = "translateY(50px)";
        testimonial.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      });

      // Observe section
      testimonialsObserver.observe(testimonialsSection);
    }

    // Enhanced testimonial interactions
    const testimonialCards = document.querySelectorAll(".testimonial");

    testimonialCards.forEach((card, index) => {
      // Add click tracking
      card.addEventListener("click", function () {
        const author = this.querySelector(".quote__author").textContent;
        const organization = this.querySelector(
          ".quote__organization"
        ).textContent;

        // Add pulse effect
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });

      // Enhanced keyboard navigation
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });

      // Make focusable
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "article");
      const author = card.querySelector(".quote__author").textContent;
      card.setAttribute("aria-label", `Testimonial from ${author}`);

      // Quote icon interaction
      const quoteIcon = card.querySelector(".icon-container");
      if (quoteIcon) {
        quoteIcon.addEventListener("click", function (e) {
          e.stopPropagation();

          // Add quote expansion effect
          const quoteText = card.querySelector(".quote__text");
          if (quoteText) {
            quoteText.style.fontSize = "3.2rem";
            quoteText.style.color = "var(--color-primary)";

            setTimeout(() => {
              quoteText.style.fontSize = "";
              quoteText.style.color = "";
            }, 2000);
          }

          // Add icon spin effect
          this.style.transform = "scale(1.2) rotate(360deg)";
          setTimeout(() => {
            this.style.transform = "";
          }, 600);
        });

        // Make quote icon focusable
        quoteIcon.setAttribute("tabindex", "0");
        quoteIcon.setAttribute("role", "button");
        quoteIcon.setAttribute("aria-label", "Highlight this testimonial");
      }

      // Author section interaction
      const authorSection = card.querySelector(".media");
      if (authorSection) {
        authorSection.addEventListener("mouseenter", function () {
          const authorName = this.querySelector(".quote__author");
          const organization = this.querySelector(".quote__organization");

          if (authorName) {
            authorName.style.transform = "translateX(5px)";
            authorName.style.color = "var(--color-primary)";
          }

          if (organization) {
            organization.style.transform = "translateX(5px)";
            organization.style.color = "var(--color-secondary)";
          }
        });

        authorSection.addEventListener("mouseleave", function () {
          const authorName = this.querySelector(".quote__author");
          const organization = this.querySelector(".quote__organization");

          if (authorName) {
            authorName.style.transform = "";
            authorName.style.color = "";
          }

          if (organization) {
            organization.style.transform = "";
            organization.style.color = "";
          }
        });
      }
    });

    // Auto-rotation effect for testimonials (if multiple exist)
    const testimonialContainer = document.querySelector(".testimonials-grid");
    if (testimonialContainer && testimonialContainer.children.length > 1) {
      let currentTestimonial = 0;
      const totalTestimonials = testimonialContainer.children.length;

      function rotateTestimonials() {
        const testimonials = testimonialContainer.children;

        // Reset all testimonials
        Array.from(testimonials).forEach((testimonial, index) => {
          testimonial.style.opacity = "0.6";
          testimonial.style.transform = "scale(0.95)";
        });

        // Highlight current testimonial
        if (testimonials[currentTestimonial]) {
          testimonials[currentTestimonial].style.opacity = "1";
          testimonials[currentTestimonial].style.transform = "scale(1)";
        }

        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      }

      // Start rotation only if user hasn't interacted
      let userInteracted = false;
      let rotationInterval;

      testimonialCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          userInteracted = true;
          clearInterval(rotationInterval);
        });
      });

      // Start auto-rotation after 5 seconds if no interaction
      setTimeout(() => {
        if (!userInteracted) {
          rotationInterval = setInterval(rotateTestimonials, 4000);
        }
      }, 5000);
    }

    // Performance monitoring for testimonials
    const testimonialsPerformanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes("testimonial") && entry.duration > 16) {
          console.warn(
            `Testimonials animation performance issue: ${entry.name} took ${entry.duration}ms`
          );
        }
      });
    });

    // Start performance monitoring
    if ("PerformanceObserver" in window) {
      testimonialsPerformanceObserver.observe({ entryTypes: ["measure"] });
    }
  }

  // Initialize testimonials section
  initializeTestimonialsSection();

  // Add testimonials-specific styles
  const testimonialsStyles = document.createElement("style");
  testimonialsStyles.textContent = `
    .testimonials-visible .testimonial {
      animation: testimonialsEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes testimonialsEntry {
      0% {
        opacity: 0;
        transform: translateY(50px) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .testimonial:focus-visible {
      outline: 3px solid rgba(37, 132, 240, 0.5);
      outline-offset: 5px;
    }
    
    .testimonial .icon-container:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.8);
      outline-offset: 3px;
    }
    
    /* Loading states for testimonial interactions */
    .testimonial[data-loading="true"] {
      pointer-events: none;
      opacity: 0.7;
    }
    
    .testimonial[data-expanded="true"] .quote__text {
      font-size: 3.2rem !important;
      color: var(--color-primary) !important;
      transition: all 0.3s ease;
    }
    
    /* Enhanced hover states */
    .testimonial[data-highlighted="true"] {
      transform: translateY(-20px) scale(1.03);
      box-shadow: 
        0 60px 140px rgba(0, 0, 0, 0.15),
        0 30px 70px rgba(37, 132, 240, 0.15);
    }
    
    /* Accessibility improvements */
    @media (prefers-reduced-motion: reduce) {
      .testimonial {
        animation: none !important;
      }
      
      .testimonials-visible .testimonial {
        animation: none !important;
      }
    }
  `;

  document.head.appendChild(testimonialsStyles);

  // Enhanced Footer Section Functionality
  function initializeFooterSection() {
    // Footer intersection observer for scroll animations
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-visible");

            // Trigger section animations
            const sections = entry.target.querySelectorAll(".footer__section");
            sections.forEach((section, index) => {
              setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
              }, index * 150);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Initialize footer section
    const footerSection = document.querySelector(".footer");
    if (footerSection) {
      // Set initial states for footer sections
      const sections = footerSection.querySelectorAll(".footer__section");
      sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";
        section.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      });

      // Observe footer section
      footerObserver.observe(footerSection);
    }

    // Enhanced collapsible functionality for footer
    const footerCollapsibles = document.querySelectorAll(
      ".footer__section.collapsible"
    );

    footerCollapsibles.forEach((item) => {
      const header = item.querySelector(".collapsible__header");
      const content = item.querySelector(".collapsible__content");
      const chevron = item.querySelector(".collapsible__chevron");

      if (header && content) {
        // Set initial max-height for smooth animation
        if (item.classList.contains("collapsible--expanded")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0px";
        }

        header.addEventListener("click", (e) => {
          e.preventDefault();

          // Toggle expanded state
          item.classList.toggle("collapsible--expanded");

          // Analytics tracking          const sectionTitle =
          item.querySelector(".footer__heading").textContent;

          // Animate content
          if (item.classList.contains("collapsible--expanded")) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
          } else {
            content.style.maxHeight = "0px";
            content.style.opacity = "0";
            content.style.transform = "translateY(-10px)";
          }

          // Animate chevron
          if (chevron) {
            if (item.classList.contains("collapsible--expanded")) {
              chevron.style.transform = "rotate(180deg)";
            } else {
              chevron.style.transform = "rotate(0deg)";
            }
          }
        });

        // Keyboard navigation support
        header.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            header.click();
          }
        });

        // Make header focusable
        header.setAttribute("tabindex", "0");
        header.setAttribute("role", "button");
        header.setAttribute(
          "aria-expanded",
          item.classList.contains("collapsible--expanded") ? "true" : "false"
        );
        header.setAttribute(
          "aria-controls",
          `footer-content-${Math.random().toString(36).substr(2, 9)}`
        );
      }
    });

    // Enhanced footer links interaction
    const footerLinks = document.querySelectorAll(".footer__section .list a");

    footerLinks.forEach((link) => {
      // Add click analytics
      link.addEventListener("click", (e) => {
        const linkText = link.textContent.trim();
        const sectionTitle = link
          .closest(".footer__section")
          .querySelector(".footer__heading").textContent;

        console.log(
          `Footer link clicked: ${linkText} in ${sectionTitle} section`
        );

        // Add click feedback
        link.style.transform = "translateX(12px) scale(0.98)";
        setTimeout(() => {
          link.style.transform = "";
        }, 150);
      });

      // Enhanced hover effects
      link.addEventListener("mouseenter", () => {
        // Highlight parent section
        const parentSection = link.closest(".footer__section");
        if (parentSection) {
          parentSection.style.borderColor = "rgba(37, 132, 240, 0.4)";
        }
      });

      link.addEventListener("mouseleave", () => {
        // Reset parent section
        const parentSection = link.closest(".footer__section");
        if (parentSection && !parentSection.matches(":hover")) {
          parentSection.style.borderColor = "";
        }
      });

      // Add focus management
      link.addEventListener("focus", () => {
        link.style.background = "rgba(37, 132, 240, 0.15)";
        link.style.borderRadius = "8px";
        link.style.padding = "0.8rem 1.2rem";
      });

      link.addEventListener("blur", () => {
        link.style.background = "";
        link.style.borderRadius = "";
        link.style.padding = "0.8rem 0";
      });
    });

    // Footer brand interaction
    const footerBrand = document.querySelector(".footer__brand");
    const footerLogo = document.querySelector(".footer__brand img");

    if (footerBrand && footerLogo) {
      footerLogo.addEventListener("click", () => {
        console.log("Footer logo clicked");

        // Add pulse effect
        footerLogo.style.transform = "scale(0.95)";
        setTimeout(() => {
          footerLogo.style.transform = "";
        }, 150);
      });

      // Add easter egg on logo hover
      let hoverCount = 0;
      footerLogo.addEventListener("mouseenter", () => {
        hoverCount++;
        if (hoverCount >= 5) {
          footerBrand.style.background =
            "linear-gradient(45deg, rgba(37, 132, 240, 0.2), rgba(0, 217, 245, 0.2), rgba(243, 64, 64, 0.2))";
          footerBrand.style.backgroundSize = "400% 400%";
          footerBrand.style.animation = "gradientShift 2s ease infinite";

          setTimeout(() => {
            footerBrand.style.background = "";
            footerBrand.style.animation = "";
            hoverCount = 0;
          }, 3000);
        }
      });
    }

    // Responsive behavior for mobile
    function handleFooterResponsive() {
      const isMobile = window.innerWidth < 768;

      footerCollapsibles.forEach((item) => {
        const content = item.querySelector(".collapsible__content");
        const chevron = item.querySelector(".collapsible__chevron");

        if (isMobile) {
          // Mobile: Enable collapsible behavior
          if (chevron) chevron.style.display = "block";

          // Close all sections by default on mobile
          if (!item.classList.contains("collapsible--expanded")) {
            content.style.maxHeight = "0px";
            content.style.opacity = "0";
          }
        } else {
          // Desktop: Always show content
          if (chevron) chevron.style.display = "none";
          content.style.maxHeight = "none";
          content.style.opacity = "1";
          content.style.transform = "translateY(0)";
        }
      });
    }

    // Initialize responsive behavior
    handleFooterResponsive();

    // Handle window resize
    window.addEventListener("resize", handleFooterResponsive);

    // Performance monitoring for footer animations
    const footerPerformanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes("footer") && entry.duration > 16) {
          console.warn(
            `Footer animation performance issue: ${entry.name} took ${entry.duration}ms`
          );
        }
      });
    });

    // Start performance monitoring
    if ("PerformanceObserver" in window) {
      footerPerformanceObserver.observe({ entryTypes: ["measure"] });
    }
  }

  // Initialize footer section
  initializeFooterSection();

  // Add footer-specific styles
  const footerStyles = document.createElement("style");
  footerStyles.textContent = `
    .footer-visible .footer__section {
      animation: footerSectionVisible 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes footerSectionVisible {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .footer__section .collapsible__content {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .footer__section:focus-within .footer__heading::after {
      width: 80px;
      box-shadow: 0 0 10px rgba(37, 132, 240, 0.5);
    }
    
    /* Loading states for footer interactions */
    .footer__section[data-loading="true"] {
      pointer-events: none;
      opacity: 0.7;
    }
    
    .footer__section[data-loading="true"]::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;
  document.head.appendChild(footerStyles);
});
