import { getCart, clearCart } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = getCart();
    const cartContainer = document.getElementById("cartContainer");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        return;
    }

    renderCart(cartItems);

    document.getElementById("proceedToCheckout").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
});

function renderCart(cartItems) {
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.innerHTML = `
        ${cartItems
            .map(
                (item, index) => `
                <div class="cart-item">
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Salon:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                    <p><strong>Kategorie:</strong> ${
                        item.ageCategory === "child" ? "Kind" : "Erwachsener"
                    }</p>
                    <p><strong>Datum:</strong> ${item.date}</p>
                    <p><strong>Uhrzeit:</strong> ${item.time}</p>
                    <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                    <button class="remove-item" data-index="${index}">Entfernen</button>
                </div>
            `
            )
            .join("")}
        <button id="proceedToCheckout" class="btn-primary">Weiter zur Kasse</button>
    `;

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.dataset.index);
            removeItemFromCart(index);
        });
    });
}

function removeItemFromCart(index) {
    const cartItems = getCart();
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart(cartItems);
}
