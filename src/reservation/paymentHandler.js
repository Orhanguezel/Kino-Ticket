import { getCart, setCart, clearCart } from "./checkoutHandler.js";
import { showModal, closeModal } from "./modal.js";

// Sepet modalını gösterme
export function showCartModal() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Ihr Warenkorb ist leer!");
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const cartContent = cart
        .map(
            (item, index) => `
            <div class="ticket">
                <h3>Kino Ticket</h3>
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Saal:</strong> ${item.salon}</p>
                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                <p><strong>Kategorie:</strong> ${
                    item.category === "child" ? "Kind" : "Erwachsener"
                }</p>
                <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                <button class="btn-secondary remove-ticket" data-index="${index}">Entfernen</button>
            </div>
        `
        )
        .join("");

    const modalContent = `
        <h2>Ihr Warenkorb</h2>
        ${cartContent}
        <p><strong>Gesamtbetrag:</strong> ${totalPrice} €</p>
        <div class="modal-actions">
            <button id="processPayment" class="btn-primary">Jetzt bezahlen</button>
            <button id="clearCart" class="btn-danger">Alles löschen</button>
        </div>
    `;

    showModal(modalContent);

    // Ödeme işlemini başlat
    document.getElementById("processPayment").addEventListener("click", () => {
        processPayment(cart, totalPrice);
    });

    // Tüm sepeti temizleme
    document.getElementById("clearCart").addEventListener("click", () => {
        if (confirm("Möchten Sie den gesamten Warenkorb wirklich löschen?")) {
            clearCart();
            closeModal();
            alert("Ihr Warenkorb wurde geleert.");
        }
    });

    // Sepetten belirli bir bilet silme
    document.querySelectorAll(".remove-ticket").forEach((button) => {
        button.addEventListener("click", (e) => {
            const ticketIndex = parseInt(e.target.dataset.index, 10);
            removeTicketFromCart(ticketIndex);
        });
    });
}

// Sepetten belirli bir ürünü kaldırma
function removeTicketFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
    alert("Das Ticket wurde erfolgreich entfernt!");
    showCartModal(); // Sepeti yeniden render et
}

// Ödeme işlemini başlatma
export function processPayment(cart, totalPrice) {
    const modalContent = `
        <div class="payment-form">
            <div class="card-form">
                <form id="paymentForm">
                    <label for="cardNumberInput">Kartennummer:</label>
                    <input type="text" id="cardNumberInput" placeholder="123456789" required>
                    <label for="expiryDateInput">Ablaufdatum (MM/YY):</label>
                    <input type="text" id="expiryDateInput" placeholder="1234" required>
                    <label for="cvvInput">CVV:</label>
                    <input type="text" id="cvvInput" placeholder="123" required>
                    <p><strong>Gesamtbetrag:</strong> ${totalPrice} €</p>
                    <div class="payment-actions">
                        <button type="button" id="confirmPayment" class="btn-primary">Bezahlen</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    closeModal();
    showModal(modalContent);

    // Ödeme onaylama
    document.getElementById("confirmPayment").addEventListener("click", () => {
        const cardNumber = document.getElementById("cardNumberInput").value.trim();
        const expiryDate = document.getElementById("expiryDateInput").value.trim();
        const cvv = document.getElementById("cvvInput").value.trim();

        if (validatePayment(cardNumber, expiryDate, cvv)) {
            alert("Zahlung erfolgreich! Ihre Tickets werden vorbereitet...");
            clearCart();
            closeModal();
            showModal(generateSuccessMessage(cart));
        } else {
            alert("Ungültige Zahlungsinformationen. Bitte versuchen Sie es erneut.");
        }
    });
}

// Ödeme doğrulama
function validatePayment(cardNumber, expiryDate, cvv) {
    const validCard = "123456789";
    const validExpiry = "1234";
    const validCvv = "123";

    return cardNumber === validCard && expiryDate === validExpiry && cvv === validCvv;
}

// Başarılı ödeme mesajı
function generateSuccessMessage(cart) {
    return `
        <h2>Zahlungsbestätigung</h2>
        <p>Ihre Zahlung wurde erfolgreich abgeschlossen. Ihre Tickets sind unten aufgeführt:</p>
        <div class="ticket-container">
            ${cart.map((item) => `
                <div class="ticket">
                    <h3>Kino Ticket</h3>
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Saal:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                    <p><strong>Kategorie:</strong> ${item.category === "child" ? "Kind" : "Erwachsener"}</p>
                    <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                </div>
            `).join("")}
        </div>
        <button class="btn-primary" onclick="window.location.href='index.html'">Zur Startseite</button>
    `;
}
