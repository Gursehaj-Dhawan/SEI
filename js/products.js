(() => {
  const products = [
    {
      name: "Mild Steel Hexagon Bar",
      category: "mild",
      tag: "Mild Steel",
      image: "https://images.pexels.com/photos/386236/pexels-photo-386236.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Precision-drawn six-sided bars with clean edges, dependable tolerances, and consistent machinability.",
      grade: "MS / Custom grades",
      shape: "Hexagonal",
      finish: "Bright / Cold drawn",
      use: "Fasteners, tools, precision parts"
    },
    {
      name: "MS Square Bars",
      category: "mild",
      tag: "Mild Steel",
      image: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Uniform mild steel square sections manufactured for fabrication, machining, and structural applications.",
      grade: "Mild steel",
      shape: "Square",
      finish: "Bright / Mill",
      use: "Fabrication, frames, machinery"
    },
    {
      name: "SAE 1018 Round Bright Bars",
      category: "bright",
      tag: "Bright Bar",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82",
      description: "Low-carbon bright bars valued for weldability, surface finish, dimensional accuracy, and machinability.",
      grade: "SAE 1018",
      shape: "Round",
      finish: "Bright / Cold drawn",
      use: "Shafts, pins, components"
    },
    {
      name: "Alloy Steel Bright Round Bar",
      category: "alloy",
      tag: "Alloy Steel",
      image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "High-performance alloy bars designed for strength, wear resistance, and demanding engineered parts.",
      grade: "Custom alloy grades",
      shape: "Round",
      finish: "Bright",
      use: "Automotive, tooling, heavy engineering"
    },
    {
      name: "Mild Steel Flat Bar",
      category: "mild",
      tag: "Mild Steel",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=82",
      description: "Straight, flat steel sections with dependable width and thickness control for diverse industrial work.",
      grade: "Mild steel",
      shape: "Flat",
      finish: "Bright / Mill",
      use: "Brackets, frames, general fabrication"
    },
    {
      name: "16mm CR5 Round Steel Bright Bar",
      category: "bright",
      tag: "Bright Bar",
      image: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "A 16 mm bright round bar offering controlled dimensions and a clean surface for precision production.",
      grade: "CR5",
      shape: "Round · 16 mm",
      finish: "Bright",
      use: "Machined parts, pins, shafts"
    },
    {
      name: "EN1A Bright Hex Bar",
      category: "bright",
      tag: "Free Cutting",
      image: "https://images.pexels.com/photos/386236/pexels-photo-386236.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Free-machining EN1A hexagonal bars ideal for efficient, repeatable production of precision components.",
      grade: "EN1A",
      shape: "Hexagonal",
      finish: "Bright",
      use: "CNC parts, fasteners, fittings"
    },
    {
      name: "Cold Drawn Bright Bar",
      category: "bright",
      tag: "Cold Drawn",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=82",
      description: "Cold-drawn sections with improved surface finish, dimensional accuracy, straightness, and consistency.",
      grade: "Multiple grades",
      shape: "Round / Square / Hex",
      finish: "Cold drawn bright",
      use: "Precision engineering components"
    },
    {
      name: "Carbon Steel Round Bars",
      category: "carbon",
      tag: "Carbon Steel",
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Robust carbon steel rounds developed for reliable strength across manufacturing and engineering use.",
      grade: "Carbon steel",
      shape: "Round",
      finish: "Bright / Peeled",
      use: "Machine parts, axles, industrial equipment"
    },
    {
      name: "Round Bars",
      category: "specialty",
      tag: "General Purpose",
      image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Versatile round steel bars supplied in selected grades, sizes, and finishes to match project needs.",
      grade: "As specified",
      shape: "Round",
      finish: "Custom",
      use: "Engineering, construction, fabrication"
    },
    {
      name: "Mild Steel Square Bright Bar",
      category: "bright",
      tag: "Bright Bar",
      image: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description: "Bright-finished square bars combining smooth surfaces with accurate corners and cross-sections.",
      grade: "Mild steel",
      shape: "Square",
      finish: "Bright",
      use: "Precision frames, components, fixtures"
    },
    {
      name: "Half Round Bar",
      category: "specialty",
      tag: "Special Profile",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82",
      description: "Special half-round profiles manufactured for close fit, aesthetic detail, and custom applications.",
      grade: "As specified",
      shape: "Half round",
      finish: "Bright / Custom",
      use: "Trim, guides, custom engineering"
    }
  ];

  const grid = document.querySelector("#product-grid");
  const search = document.querySelector("#product-search");
  const filterButtons = [...document.querySelectorAll("[data-product-filter]")];
  const modal = document.querySelector("#product-modal");
  const modalClose = modal?.querySelector(".modal__close");
  const emptyState = document.querySelector(".empty-state");
  let activeCategory = "all";

  if (!grid) return;

  const productCard = (product, index) => `
    <article class="product-card reveal" data-category="${product.category}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name} manufactured by Steel Experts India" loading="${index < 3 ? "eager" : "lazy"}" width="640" height="440">
        <span class="product-card__tag">${product.tag}</span>
      </div>
      <div class="product-card__body">
        <h3>${product.name}</h3>
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
