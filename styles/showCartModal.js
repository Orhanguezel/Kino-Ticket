import { getCart } from "./checkoutHandler.js";
import { showModal } from "./modal.js";
import { processPayment } from "./paymentHandler.js";

export function showCartModal() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    const cartContent = `
        <div class="modal-header">
            <span>Sepetiniz</span>
        </div>
        <div class="ticket-container">
            ${cart
                .map(
                    (item) => `
                    <div class="ticket">
                        <h3>Kino Ticket</h3>
                        <p><strong>Kino:</strong> ${item.cinema}</p>
                        <p><strong>Salon:</strong> ${item.salon}</p>
                        <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                        <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                        <p><strong>Kategorie:</strong> ${
                            item.category === "child" ? "Kind" : "Erwachsener"
                        }</p>
                        <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                    </div>
                `
                )
                .join("")}
        </div>
        <div class="modal-footer">
            <button id="processPayment" class="btn-primary">Ödeme Yap</button>
        </div>
    `;

    showModal(cartContent);

    // Sepet modalındaki ödeme düğmesi
    document.getElementById("processPayment").addEventListener("click", () => {
        processPayment();
    });

    // Modalı kapatma
    document.getElementById("closeModal").addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
        modal.classList.remove("active");
    });
}
