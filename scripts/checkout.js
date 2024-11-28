import { getCart, clearCart } from "./script.js";

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
    const checkoutContainer = document.getElementById("checkoutContainer");
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    checkoutContainer.innerHTML = `
        <h2>Zusammenfassung</h2>
        ${cartItems
            .map(
                (item) => `
                <div class="checkout-item">
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Salon:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                </div>
            `
            )
            .join("")}
        <h3>Gesamtpreis: ${totalPrice.toFixed(2)} €</h3>
        <button id="completePayment" class="btn-primary">Bezahlen</button>
    `;
}

function completePayment(cartItems) {
    const tickets = cartItems.map((item) => ({
        ticketId: Math.random().toString(36).substr(2, 9),
        ...item,
    }));

    clearCart(); // Sepeti temizle
    showTickets(tickets); // Biletleri göster
}

function showTickets(tickets) {
    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.innerHTML = `
        <h2>Ihre Tickets</h2>
        ${tickets
            .map(
                (ticket) => `
                <div class="ticket">
                    <p><strong>Ticket-ID:</strong> ${ticket.ticketId}</p>
                    <p><strong>Kino:</strong> ${ticket.cinema}</p>
                    <p><strong>Salon:</strong> ${ticket.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${ticket.seat}</p>
                    <p><strong>Datum:</strong> ${ticket.date}</p>
                    <p><strong>Uhrzeit:</strong> ${ticket.time}</p>
                    <p><strong>Name:</strong> ${ticket.name} ${ticket.surname}</p>
                </div>
            `
            )
            .join("")}
        <button class="btn-primary" onclick="window.location.href='index.html'">Zurück zur Startseite</button>
    `;
}
