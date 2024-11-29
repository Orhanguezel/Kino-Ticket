import { getCart, clearCart } from "./checkoutHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = getCart();
    const checkoutContainer = document.getElementById("checkoutContainer");

    if (cartItems.length === 0) {
        checkoutContainer.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        return;
    }

    renderCheckout(cartItems);

    document.getElementById("completePayment").addEventListener("click", () => {
        completePayment(cartItems);
    });
});

function renderCheckout(cartItems) {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const checkoutContainer = document.getElementById("checkoutContainer");

    checkoutContainer.innerHTML = `
        ${cartItems
            .map(
                (item) => `
                <div>
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Preis:</strong> ${item.price} €</p>
                </div>
            `
            )
            .join("")}
        <h3>Gesamtpreis: ${totalPrice} €</h3>
        <button id="completePayment" class="btn-primary">Bezahlen</button>
    `;
}

function completePayment(cartItems) {
    alert("Zahlung erfolgreich! Ihre Tickets sind ausgestellt.");
    clearCart();
    window.location.href = "index.html";
}
