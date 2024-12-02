import { getCart, clearCart } from "./checkoutHandler.js";
import { showModal } from "./modal.js";

export function processPayment() {
    const cart = getCart();

    if (cart.length === 0) {
        showModal("<p>Sepetiniz boş. Ödeme işlemi gerçekleştirilemiyor.</p>");
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const modalContent = `
        <h2>Ödeme İşlemi</h2>
        <div class="ticket-container">
            ${cart.map(item => `
                <div class="ticket">
                    <h3>Kino Ticket</h3>
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Salon:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Ad:</strong> ${item.name} ${item.surname}</p>
                    <p><strong>Kategori:</strong> ${item.category === "child" ? "Çocuk" : "Yetişkin"}</p>
                    <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
                </div>
            `).join("")}
        </div>
        <div class="payment-form">
            <form id="paymentForm">
                <label for="cardNumberInput">Kart Numarası:</label>
                <input type="text" id="cardNumberInput" placeholder="1234 5678 9012 3456" required>
                <label for="expiryDateInput">Son Kullanma Tarihi (MM/YY):</label>
                <input type="text" id="expiryDateInput" placeholder="12/34" required>
                <label for="cvvInput">CVV:</label>
                <input type="text" id="cvvInput" placeholder="123" required>
                <p><strong>Toplam Tutar:</strong> ${totalPrice} €</p>
                <button type="button" id="confirmPayment" class="btn-primary">Ödeme Yap</button>
            </form>
        </div>
    `;

    showModal(modalContent);

    // Dinamik Form Etkileşimi
    const cardNumberInput = document.getElementById("cardNumberInput");
    const expiryDateInput = document.getElementById("expiryDateInput");
    const cvvInput = document.getElementById("cvvInput");

    cardNumberInput.addEventListener("input", (e) => {
        document.getElementById("cardNumberLabel").textContent = e.target.value || "1234 5678 9012 3456";
    });

    expiryDateInput.addEventListener("input", (e) => {
        const [month, year] = e.target.value.split("/");
        document.getElementById("expiryMonth").textContent = month || "MM";
        document.getElementById("expiryYear").textContent = year || "YY";
    });

    cvvInput.addEventListener("input", (e) => {
        document.getElementById("cardCVV").textContent = e.target.value || "***";
    });

    document.getElementById("confirmPayment").addEventListener("click", () => {
        if (cardNumberInput.value === "1234 5678 9012 3456" &&
            expiryDateInput.value === "12/34" &&
            cvvInput.value === "123") {
            alert("Ödeme başarılı!");
            clearCart();
            showModal("<h2>Ödeme tamamlandı. Biletleriniz hazırlanıyor!</h2>");
        } else {
            alert("Geçersiz ödeme bilgileri.");
        }
    });
}
