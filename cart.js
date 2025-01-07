document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("total-price");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "0.00";
      return;
    }

    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
      const cartItem = document.createElement("li");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: <input type="number" min="1" value="${
            item.quantity
          }" data-id="${item.id}" /></p>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll(".cart-item input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const newQuantity = parseInt(e.target.value);
        const itemId = e.target.dataset.id;
        if (newQuantity > 0) {
          const cartItem = cart.find((item) => item.id == itemId);
          cartItem.quantity = newQuantity;
          updateCart();
        } else {
          alert("Quantity must be at least 1.");
          e.target.value = 1;
        }
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemId = e.target.dataset.id;
        const itemIndex = cart.findIndex((item) => item.id == itemId);
        if (itemIndex > -1) {
          cart.splice(itemIndex, 1);
          updateCart();
        }
      });
    });
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartItems();
  }

  document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      localStorage.removeItem("cart");
      cart.length = 0;
      displayCartItems();
    }
  });

  document.getElementById("checkout").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to the cart.");
      return;
    }

    alert("Proceeding to checkout...");

    localStorage.removeItem("cart");
    cart.length = 0;
    displayCartItems();
  });

  displayCartItems();
});
