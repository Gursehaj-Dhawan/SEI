(() => {
  const documentRoot = document.documentElement;
  const body = document.body;
  const loader = document.querySelector(".loader");
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  const backToTop = document.querySelector(".back-to-top");

  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 500);
  };

  window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 1800);

  const applyScrollState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 36);
    backToTop?.classList.toggle("is-visible", window.scrollY > 600);
  };

  applyScrollState();
  window.addEventListener("scroll", applyScrollState, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    nav?.classList.toggle("is-open", isOpen);
    body.classList.toggle("menu-open", isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      body.classList.remove("menu-open");
    });
  });

  const currentPage = location.pathname.split("/").pop() || "index.html";
  nav?.querySelectorAll("a").forEach((link) => {
    const hrefPage = link.getAttribute("href")?.split("#")[0] || "";
    const isHomeAnchor = currentPage === "index.html" && hrefPage === "index.html";
    link.classList.toggle("is-active", hrefPage === currentPage || isHomeAnchor);
  });

  const savedTheme = localStorage.getItem("sei-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    documentRoot.dataset.theme = "dark";
  }

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const isDark = documentRoot.dataset.theme === "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("title", `Switch to ${isDark ? "light" : "dark"} mode`);
  };

  updateThemeLabel();
  themeToggle?.addEventListener("click", () => {
    const next = documentRoot.dataset.theme === "dark" ? "light" : "dark";
    documentRoot.dataset.theme = next;
    localStorage.setItem("sei-theme", next);
    updateThemeLabel();
  });

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.querySelector(".ripple")?.remove();
      button.append(ripple);
    });
  });

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.counter || 0);
        const suffix = element.dataset.suffix || "";
        const duration = 1400;
        const startTime = performance.now();

        const tick = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    },
    { threshold: 0.45 }
  );

  document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));

  const typingTarget = document.querySelector("[data-typing]");
  if (typingTarget) {
    const phrases = [
      "Bright bars engineered for demanding applications.",
      "Consistent sections. Dependable delivery.",
      "Manufacturing relationships built to last."
    ];
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      typingTarget.textContent = phrase.slice(0, characterIndex);

      let delay = deleting ? 34 : 48;
      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }
      window.setTimeout(type, delay);
    };

    type();
  }

  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const expanded = question.getAttribute("aria-expanded") === "true";
      const group = question.closest(".faq-list");
      group?.querySelectorAll(".faq-question").forEach((item) => {
        item.setAttribute("aria-expanded", "false");
      });
      if (!expanded) question.setAttribute("aria-expanded", "true");
    });
  });

  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialSlides = [...document.querySelectorAll(".testimonial")];
  const testimonialDots = [...document.querySelectorAll(".slider-dot")];
  let testimonialIndex = 0;
  let testimonialTimer;

  const showTestimonial = (index) => {
    if (!testimonialTrack || !testimonialSlides.length) return;
    testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    testimonialDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === testimonialIndex);
      dot.setAttribute("aria-current", dotIndex === testimonialIndex ? "true" : "false");
    });
  };

  const restartTestimonialTimer = () => {
    clearInterval(testimonialTimer);
    if (testimonialSlides.length > 1) {
      testimonialTimer = setInterval(() => showTestimonial(testimonialIndex + 1), 5200);
    }
  };

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
      restartTestimonialTimer();
    });
  });

  showTestimonial(0);
  restartTestimonialTimer();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("is-open")) {
      menuToggle?.click();
    }
  });
})();
