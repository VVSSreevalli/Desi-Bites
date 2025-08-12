//----------Welcome------------//


  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("splash").style.display = "none";
    }, 2000); // hides after 2 seconds
  });


//----------Search----------//

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("menuSearch");
  const items = document.querySelectorAll(".items .item");
  const noResults = document.getElementById("noResults");

  searchInput.addEventListener("keyup", function () {
    const input = searchInput.value.toLowerCase();
    let visibleCount = 0;

    items.forEach(function (item) {
      const title = item.querySelector("h4").innerText.toLowerCase();
      if (title.includes(input)) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    // Show or hide "No results" message
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  });
});



//----------Form Validation----------//

document.addEventListener("DOMContentLoaded", function () {

  function validateForm(formId, requiredFields) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function (e) {
    let valid = true;
    let msg = "";

    requiredFields.forEach(selector => {
      const field = form.querySelector(selector);
      if (!field.value.trim()) {
        valid = false;

        // Find label using 'for' attribute
        const label = form.querySelector(`label[for="${field.id}"]`);
        const labelText = label ? label.innerText : 'Field';
        
        msg += `${labelText} is required.\n`;
      }
    });

    if (!valid) {
      e.preventDefault();
      alert(msg);
    }
  });
}

  validateForm("Reservation", ["#firstName", "#reservationEmail", "#guestCount", "#reservationDateTime"]);
  validateForm("Review", ["#reviewName", "#rating"]);
  validateForm("Contact", ["#name", "#email", "#message"]);

});

//-----------Thank You Message-----------//

document.addEventListener("DOMContentLoaded", function () {
  // Reservation Form Thank You
  document.getElementById("Reservation").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("firstName").value.trim();
  document.getElementById("reservationMsg").innerText = "Thank you! Your reservation has been received.";
  if (name) {
    document.getElementById("displayName").innerText = `Reservation under the name: ${name}`;
  }
  this.reset();
});


  // Review Form Thank You
  document.getElementById("Review").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("reviewMsg").innerText = "Thank you for your review!";
    this.reset();
  });
});

// --- Cart State ---
let cart = [];


function toggleCart() {
  const content = document.getElementById("cartContent");
  content.style.display = content.style.display === "block" ? "none" : "block";
}


function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  renderCart();
}


function renderCart() {
  const cartList = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  cartList.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (₹${item.price} x ${item.quantity}) = ₹${subtotal}
      <span class="cart-buttons">
        <button class="minus" onclick="updateQty('${item.name}', -1)">–</button>
        <button class="plus" onclick="updateQty('${item.name}', 1)">+</button>
        <button class="remove" onclick="removeItem('${item.name}')">❌</button>
      </span>
    `;
    cartList.appendChild(li);
  });

  cartTotal.innerText = `Total: ₹${total}`;
}


function updateQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  renderCart();
}


function removeItem(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}
