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
        processPayment(cartItems);
    });
});

function renderCheckout(cartItems) {
    const totalPrice = cartItems.length * 10;
    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.innerHTML = `
        ${cartItems
            .map(
                (item) => `
                <div>
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                </div>
            `
            )
            .join("")}
        <h3>Gesamtpreis: ${totalPrice} €</h3>
        <button id="completePayment">Bezahlen</button>
    `;
}





function processPayment(cart) {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    // Sahte kredi kartı doğrulama
    if (cardNumber === "1234 5678 9012 3456" && expiryDate === "12/34" && cvv === "123") {
        localStorage.removeItem("cart"); // Sepeti temizle
        showTickets(cart); // Biletleri Göster
    } else {
        alert("Ungültige Zahlungsinformationen. Bitte erneut versuchen.");
    }
}

function showTickets(cart) {
    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.innerHTML = `
        <h2>Ihre Tickets</h2>
        ${cart
            .map(
                (item) => `
                <div class="ticket">
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Salon:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Datum:</strong> ${item.date}</p>
                    <p><strong>Uhrzeit:</strong> ${item.time}</p>
                    <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                </div>
            `
            )
            .join("")}
        <button class="btn-primary" onclick="window.location.href='index.html'">Zurück zur Startseite</button>
    `;
}

function completePayment(cartItems) {
    // Her bilet için benzersiz bir ID oluşturuluyor
    const tickets = cartItems.map((item) => ({
        ticketId: Math.random().toString(36).substr(2, 9), // Random bir ID
        ...item, // Sepetteki tüm bilgiler
    }));

    clearCart(); // Sepeti temizle
    showTickets(tickets); // Biletleri göster
}
