(() => {
  const targets = document.querySelectorAll(".reveal, .stagger");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    }
  );

  targets.forEach((target) => observer.observe(target));
})();
