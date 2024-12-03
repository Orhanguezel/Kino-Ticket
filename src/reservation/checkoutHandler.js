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
}

// Warenkorb anzeigen
export function showCart() {
    const cart = getCart();

    if (cart.length === 0) {
        showModal("<p>Ihr Warenkorb ist leer.</p>");
        return;
    }

    const cartContent = cart.map(item => `
        <div class="ticket">
            <h3>Kino-Ticket</h3>
            <p><strong>Kino:</strong> ${item.cinema}</p>
            <p><strong>Saal:</strong> ${item.salon}</p>
            <p><strong>Sitzplatz:</strong> ${item.seat}</p>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Kategorie:</strong> ${item.category === "child" ? "Kind" : "Erwachsener"}</p>
            <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
        </div>
    `).join("");

    const modalContent = `
        <h2>Ihr Warenkorb</h2>
        ${cartContent}
        <button id="proceedToCheckout" class="btn-primary">Zur Kasse</button>
    `;

    showModal(modalContent);

    document.getElementById("proceedToCheckout").addEventListener("click", () => {
        import("./paymentHandler.js").then(({ processPayment }) => processPayment());
    });
}
