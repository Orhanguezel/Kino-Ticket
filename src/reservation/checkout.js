import { getCart, setCart, clearCart } from "./checkoutHandler.js";
import { updateCartCount } from "./checkoutHandler.js"; // Sepet sayısını güncellemek için

document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    const mainContent = document.getElementById("mainContent");

    if (!mainContent) {
        console.error("Hauptinhalt-Container wurde nicht gefunden!");
        return;
    }

    if (cart.length === 0) {
        mainContent.innerHTML = `
            <h2>Willkommen!</h2>
            <p>Erleben Sie das beste Kinoerlebnis mit CineGrup.</p>
            <p>Ihr Warenkorb ist derzeit leer.</p>
        `;
        updateCartCount(); // Sepet sayısını sıfırla
        return;
    }

    const ticketContainer = document.createElement("div");
    ticketContainer.className = "ticket-container";
    ticketContainer.innerHTML = cart
        .map(
            (item, index) => `
            <div class="ticket">
                <h3>Kino-Ticket</h3>
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Saal:</strong> ${item.salon}</p>
                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                <p><strong>Kategorie:</strong> ${item.category === "child" ? "Kind" : "Erwachsener"}</p>
                <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                <button class="btn-secondary remove-ticket" data-index="${index}">Entfernen</button>
            </div>
        `
        )
        .join("");

    mainContent.innerHTML = `<h2>Ihr Warenkorb</h2>`;
    mainContent.appendChild(ticketContainer);

    const actionsSection = document.createElement("div");
    actionsSection.className = "cart-actions";
    actionsSection.innerHTML = `
        <p><strong>Gesamtbetrag:</strong> ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €</p>
        <button class="btn-primary" id="paymentButton">Jetzt bezahlen</button>
        <button class="btn-danger" id="clearCartButton">Alle Tickets stornieren</button>
    `;

    mainContent.appendChild(actionsSection);

    // Bilet silme butonları
    document.querySelectorAll(".remove-ticket").forEach((button) => {
        button.addEventListener("click", (e) => {
            const ticketIndex = parseInt(e.target.dataset.index, 10);
            removeTicketFromCart(ticketIndex);
        });
    });

    // Tüm siparişi iptal etme
    document.getElementById("clearCartButton").addEventListener("click", () => {
        clearCart();
        alert("Ihr Warenkorb wurde geleert!");
        updateCartCount(); // Sepet sayısını sıfırla
        location.reload();
    });

    // Ödeme butonu
    document.getElementById("paymentButton").addEventListener("click", () => {
        processPayment(); // Ödeme işlemini başlat
    });
});

// Bilet silme fonksiyonu
function removeTicketFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart); // Güncellenmiş sepeti kaydet
    alert("Das Ticket wurde erfolgreich entfernt!");
    updateCartCount(); // Sepet sayısını güncelle
    location.reload(); // Sayfayı yeniden yükle
}
