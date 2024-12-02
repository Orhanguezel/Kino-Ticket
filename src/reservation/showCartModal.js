import { getCart } from "./checkoutHandler.js";
import { showModal } from "./modal.js";
import { processPayment } from "./paymentHandler.js";

export function showCartModal() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    const cartContent = cart
        .map(
            (item) => `
            <div class="ticket">
                <h3>Kino Ticket</h3>
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Salon:</strong> ${item.salon}</p>
                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                <p><strong>Kategori:</strong> ${
                    item.category === "child" ? "Kind" : "Erwachsener"
                }</p>
                <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
            </div>
        `
        )
        .join("");

    const modalContent = `
        <h2>Sepetiniz</h2>
        ${cartContent}
        <button id="processPayment" class="btn-primary">Ödeme Yap</button>
    `;

    showModal(modalContent);

    document
        .getElementById("processPayment")
        .addEventListener("click", processPayment);
}
