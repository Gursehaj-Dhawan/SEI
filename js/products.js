(() => {
  const products = window.SEI_PRODUCTS || [];

  const grid = document.querySelector("#product-grid");
  const search = document.querySelector("#product-search");
  const filterButtons = [...document.querySelectorAll("[data-product-filter]")];
  const modal = document.querySelector("#product-modal");
  const modalClose = modal?.querySelector(".modal__close");
  const emptyState = document.querySelector(".empty-state");
  let activeCategory = "all";

  if (!grid || !products.length) return;

  const productCard = (product, index) => `
    <article class="product-card reveal" data-category="${product.category}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name} manufactured by Steel Experts India" loading="${index < 3 ? "eager" : "lazy"}" width="640" height="440">
        <span class="product-card__tag">${product.tag}</span>
      </div>
      <div class="product-card__body">
        <h3><a href="${product.url}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-card__actions">
          <button class="btn btn--dark btn--small" type="button" data-product-index="${index}">View Details</button>
          <a class="btn btn--primary btn--small" href="contact.html?product=${encodeURIComponent(product.name)}#quote-form">Request Quote</a>
        </div>
      </div>
    </article>
  `;

  const render = () => {
    const term = search?.value.trim().toLowerCase() || "";
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = `${product.name} ${product.description} ${product.grade}`
        .toLowerCase()
        .includes(term);
      return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filtered.map((product) => productCard(product, products.indexOf(product))).join("");
    emptyState?.classList.toggle("is-visible", filtered.length === 0);
    grid.querySelectorAll("[data-product-index]").forEach((button) => {
      button.addEventListener("click", () => openModal(products[Number(button.dataset.productIndex)]));
    });

    requestAnimationFrame(() => {
      grid.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
    });
  };

  const openModal = (product) => {
    if (!modal || !product) return;
    modal.querySelector(".modal__image").src = product.image;
    modal.querySelector(".modal__image").alt = product.name;
    modal.querySelector("[data-modal-tag]").textContent = product.tag;
    modal.querySelector("[data-modal-title]").textContent = product.name;
    modal.querySelector("[data-modal-description]").textContent = product.description;
    modal.querySelector("[data-modal-grade]").textContent = product.grade;
    modal.querySelector("[data-modal-shape]").textContent = product.shape;
    modal.querySelector("[data-modal-finish]").textContent = product.finish;
    modal.querySelector("[data-modal-use]").textContent = product.use;
    modal.querySelector("[data-modal-quote]").href = `contact.html?product=${encodeURIComponent(product.name)}#quote-form`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose?.focus();
  };

  const closeModal = () => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  search?.addEventListener("input", render);
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.productFilter || "all";
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
  });

  render();
})();
