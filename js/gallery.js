(() => {
  const items = [...document.querySelectorAll(".gallery-item")];
  const lightbox = document.querySelector(".lightbox");
  const image = lightbox?.querySelector(".lightbox__figure img");
  const caption = lightbox?.querySelector("figcaption");
  const closeButton = lightbox?.querySelector(".lightbox__close");
  const previousButton = lightbox?.querySelector(".lightbox__prev");
  const nextButton = lightbox?.querySelector(".lightbox__next");
  let activeIndex = 0;

  if (!lightbox || !items.length || !image || !caption) return;

  const show = (index) => {
    activeIndex = (index + items.length) % items.length;
    const selected = items[activeIndex];
    const selectedImage = selected.querySelector("img");
    image.src = selectedImage.currentSrc || selectedImage.src;
    image.alt = selectedImage.alt;
    caption.textContent = selected.dataset.caption || selectedImage.alt;
  };

  const open = (index) => {
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton?.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    items[activeIndex]?.focus();
  };

  items.forEach((item, index) => item.addEventListener("click", () => open(index)));
  closeButton?.addEventListener("click", close);
  previousButton?.addEventListener("click", () => show(activeIndex - 1));
  nextButton?.addEventListener("click", () => show(activeIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(activeIndex - 1);
    if (event.key === "ArrowRight") show(activeIndex + 1);
  });
})();
