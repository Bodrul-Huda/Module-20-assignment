document.addEventListener("DOMContentLoaded", () => {
  let products = [];

  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching products:", error));

  const cart = [];

  // Display products
  function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear any existing products

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });

    document.querySelectorAll(".product button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        addToCart(products.find((p) => p.id == productId));
      });
    });
  }

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCart();
  }

  function updateCart() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Store cart data in localStorage for the next page
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Cart button click - Navigate to cart page
  document.getElementById("view-cart").addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      cart.length = 0;
      updateCart();
    }
  });
});
