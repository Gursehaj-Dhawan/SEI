(() => {
  const form = document.querySelector("#quote-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const emailButton = form.querySelector("[data-send-email]");
  const whatsappButton = form.querySelector("[data-send-whatsapp]");
  const emailRecipient = "steelexpertsindia@gmail.com";
  const whatsappNumber = "919217492174";
  const productField = form.elements.product;
  const requestedProduct = new URLSearchParams(location.search).get("product");

  if (requestedProduct && productField) {
    const option = [...productField.options].find((item) => item.value === requestedProduct);
    if (option) productField.value = requestedProduct;
  }

  const validate = () => {
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const parent = field.closest(".form-field");
      const hasValue = field.value.trim().length > 0;
      const emailValid =
        field.type !== "email" ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      const fieldValid = hasValue && emailValid;
      parent?.classList.toggle("is-error", !fieldValid);
      if (!fieldValid) valid = false;
    });
    return valid;
  };

  const details = () => {
    const data = new FormData(form);
    return [
      "Quotation Request — Steel Experts India",
      "",
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Country: ${data.get("country")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Product: ${data.get("product")}`,
      `Quantity: ${data.get("quantity") || "To be discussed"}`,
      "",
      `Message: ${data.get("message") || "Please share product availability, pricing, and delivery details."}`
    ].join("\n");
  };

  const prepare = () => {
    if (validate()) return true;
    status.textContent = "Please complete the required fields before sending your request.";
    status.className = "form-status is-visible";
    form.querySelector(".form-field.is-error input, .form-field.is-error select, .form-field.is-error textarea")?.focus();
    return false;
  };

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.closest(".form-field")?.classList.remove("is-error"));
  });

  emailButton?.addEventListener("click", () => {
    if (!prepare()) return;
    const subject = `Quote request: ${form.elements.product.value}`;
    status.textContent = "Your email application is opening with the quotation details filled in.";
    status.className = "form-status is-visible is-success";
    location.href = `mailto:${emailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details())}`;
  });

  whatsappButton?.addEventListener("click", () => {
    if (!prepare()) return;
    status.textContent = "WhatsApp is opening with your complete quotation request.";
    status.className = "form-status is-visible is-success";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details())}`, "_blank", "noopener,noreferrer");
  });

  form.addEventListener("submit", (event) => event.preventDefault());
})();
