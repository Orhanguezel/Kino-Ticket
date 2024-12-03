import { getCart, clearCart } from "./checkoutHandler.js";
import { processPayment } from "./paymentHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    const mainContent = document.getElementById("mainContent");

    if (!mainContent) {
        console.error("Hauptinhalt-Container wurde nicht gefunden!");
        return;
    }

    // Wenn der Warenkorb leer ist, zeige die Startnachricht
    if (cart.length === 0) {
        mainContent.innerHTML = `
            <h2>Willkommen!</h2>
            <p>Erleben Sie das beste Kinoerlebnis mit CineGrup.</p>
            <p>Ihr Warenkorb ist derzeit leer.</p>
        `;
        return;
    }

    // Tickets im Warenkorb anzeigen
    const ticketContainer = document.createElement("div");
    ticketContainer.className = "ticket-container";
    ticketContainer.innerHTML = cart
        .map(
            (item) => `
            <div class="ticket">
                <h3>Kino-Ticket</h3>
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Saal:</strong> ${item.salon}</p>
                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                <p><strong>Kategorie:</strong> ${item.category === "child" ? "Kind" : "Erwachsener"}</p>
                <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
            </div>
        `
        )
        .join("");

    mainContent.innerHTML = `
        <h2>Ihr Warenkorb</h2>
    `;
    mainContent.appendChild(ticketContainer);

    // Abschnitt für Zahlungsaktionen
    const paymentSection = document.createElement("div");
    paymentSection.className = "payment-actions";
    paymentSection.innerHTML = `
        <p><strong>Gesamtbetrag:</strong> ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €</p>
        <button class="btn-primary" id="paymentButton">Jetzt bezahlen</button>
    `;

    mainContent.appendChild(paymentSection);

    // Klick-Event für den Zahlungsbutton
    document.getElementById("paymentButton").addEventListener("click", () => {
        processPayment(); // Neue Zahlungsfunktion aufrufen
    });
});
