document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let discount = 0;

  const promoCodes = {
    ostad10: 0.1,
    ostad5: 0.05,
  };

  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalPrice = document.getElementById("subtotal-price");
  const discountPrice = document.getElementById("discount-price");
  const totalPrice = document.getElementById("total-price");
  const promoCodeInput = document.getElementById("promo-code");
  const promoMessage = document.getElementById("promo-message");

  function calculateSummary() {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    const discountAmount = subtotal * discount;
    const finalTotal = subtotal - discountAmount;

    subtotalPrice.textContent = subtotal.toFixed(2);
    discountPrice.textContent = discountAmount.toFixed(2);
    totalPrice.textContent = finalTotal.toFixed(2);
  }

  function displayCartSummary() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      subtotalPrice.textContent = "0.00";
      discountPrice.textContent = "0.00";
      totalPrice.textContent = "0.00";
      return;
    }

    cart.forEach((item) => {
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

    calculateSummary();
  }

  document.getElementById("apply-promo").addEventListener("click", () => {
    if (cart.length === 0) {
      promoMessage.textContent =
        "Your cart is empty. Add items to apply a promo code.";
      promoMessage.style.color = "red";
      return;
    }

    const code = promoCodeInput.value.trim().toLowerCase();

    if (promoCodes[code] !== undefined) {
      discount = promoCodes[code];
      promoMessage.textContent = `Promo code applied! You get a ${
        discount * 100
      }% discount.`;
      promoMessage.style.color = "green";
      calculateSummary();
    } else {
      promoMessage.textContent = "Invalid promo code. Please try again.";
      promoMessage.style.color = "red";
    }
  });

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
