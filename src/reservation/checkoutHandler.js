import { showModal } from "./modal.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Warenkorb abrufen
export function getCart() {
    return cart;
}

// Warenkorb aktualisieren
export function setCart(newCart) {
    cart = newCart;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Warenkorb leeren
export function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount(); 
}

// Warenkorb anzeigen
export function showCart() {
    const cart = getCart();

    if (cart.length === 0) {
        showModal("<p>Ihr Warenkorb ist leer.</p>");
        return;
    }

    const cartContent = cart.map((item, index) => `
        <div class="ticket">
            <h3>Kino-Ticket</h3>
            <p><strong>Kino:</strong> ${item.cinema}</p>
            <p><strong>Saal:</strong> ${item.salon}</p>
            <p><strong>Sitzplatz:</strong> ${item.seat}</p>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Kategorie:</strong> ${item.category === "child" ? "Kind" : "Erwachsener"}</p>
            <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
            <button class="btn-secondary remove-ticket" data-index="${index}">Entfernen</button>
        </div>
    `).join("");

    const modalContent = `
        <h2>Ihr Warenkorb</h2>
        ${cartContent}
        <button id="proceedToCheckout" class="btn-primary">Zur Kasse</button>
    `;

    showModal(modalContent);

    // Sepet öğesini kaldırma işlemi
    document.querySelectorAll(".remove-ticket").forEach((button) => {
        button.addEventListener("click", (e) => {
            const ticketIndex = parseInt(e.target.dataset.index, 10);
            removeTicketFromCart(ticketIndex);
        });
    });

    document.getElementById("proceedToCheckout").addEventListener("click", () => {
        import("./paymentHandler.js").then(({ processPayment }) => processPayment());
    });
}

// Sepetten belirli bir ürünü kaldırma
export function removeTicketFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
    updateCartCount(); 
    alert("Das Ticket wurde erfolgreich entfernt!");
    showCart();
}

// Warenkorb-Symbol aktualisieren

export function updateCartCount() {
    const cart = getCart();
    const cartCount = cart.length;
    const cartIcon = document.querySelector(".sidebar-cart");
    const cartCountElement = document.getElementById("cartCount");
  
    if (cartIcon && cartCountElement) {
      if (cartCount > 0) {
        cartIcon.setAttribute("data-count", cartCount);
        cartCountElement.textContent = cartCount;
  
        // Animasyon tetikleyici
        cartCountElement.classList.add("bounce");
        setTimeout(() => {
          cartCountElement.classList.remove("bounce");
        }, 500);
      } else {
        cartIcon.removeAttribute("data-count");
        cartCountElement.textContent = "";
      }
    }
  }
  

