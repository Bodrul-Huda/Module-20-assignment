document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCartSummary() {
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
        <div>
          <strong>${item.name}</strong> x ${item.quantity}
        </div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
  }

  document.getElementById("submit").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to the cart.");
      return;
    }
    alert("Thank you for your purchase! Your order has been submitted.");
    localStorage.removeItem("cart");
    displayCartSummary();
    window.location.href = "index.html";
  });

  displayCartSummary();
});
