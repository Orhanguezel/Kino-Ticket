import { getCart, clearCart } from "./checkoutHandler.js";
import { showModal, closeModal } from "./modal.js";

export function showCartModal() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const cartContent = cart
        .map(
            (item) => `
            <div class="ticket">
                <h3>Kino Ticket</h3>
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Salon:</strong> ${item.salon}</p>
                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                <p><strong>Ad:</strong> ${item.name} ${item.surname}</p>
                <p><strong>Kategori:</strong> ${
                    item.category === "child" ? "Çocuk" : "Yetişkin"
                }</p>
                <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
            </div>
        `
        )
        .join("");

    const modalContent = `
        <h2>Sepetiniz</h2>
        ${cartContent}
        <p><strong>Toplam Tutar:</strong> ${totalPrice} €</p>
        <div class="modal-actions">
            <button id="processPayment" class="btn-primary">Ödeme Yap</button>
        </div>
    `;

    showModal(modalContent);

    // Ödeme butonuna tıklanıldığında ödeme işlemini başlat
    document.getElementById("processPayment").addEventListener("click", () => {
        processPayment(cart, totalPrice);
    });
}

export function processPayment(cart, totalPrice) {
    const modalContent = `
        <div class="payment-form">
            <div class="card-form">
                <div class="card-item">
                    <div class="card-item__side -front">
                        <div class="card-item__wrapper">
                            <div class="card-item__top">
                                <img src="/Kino-Ticket/assets/icons/kart.gif" alt="Card" class="card-gif">
                                <div class="card-item__type">
                                    <img id="cardType" src="/Kino-Ticket/assets/icons/visa.png" class="card-item__typeImg" alt="Card Type">
                                </div>
                            </div>
                            <label class="card-item__number" id="cardNumberLabel">1234 5678 9012 3456</label>
                            <div class="card-item__content">
                                <label class="card-item__info">
                                    <div class="card-item__holder">Card Holder</div>
                                    <div class="card-item__name" id="cardHolder">John Doe</div>
                                </label>
                                <div class="card-item__date">
                                    <label class="card-item__dateItem" id="expiryMonth">12</label> /
                                    <label class="card-item__dateItem" id="expiryYear">34</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-item__side -back">
                        <div class="card-item__cvv">
                            <div class="card-item__cvvTitle">CVV</div>
                            <div class="card-item__cvvBand" id="cardCVV">123</div>
                        </div>
                    </div>
                </div>
            </div>
            <form id="paymentForm">
                <label for="cardNumberInput">Kart Numarası:</label>
                <input type="text" id="cardNumberInput" placeholder="1234 5678 9012 3456" required>
                <label for="expiryDateInput">Son Kullanma Tarihi (MM/YY):</label>
                <input type="text" id="expiryDateInput" placeholder="12/34" required>
                <label for="cvvInput">CVV:</label>
                <input type="text" id="cvvInput" placeholder="123" required>
                <p><strong>Toplam Tutar:</strong> ${totalPrice} €</p>
                <div class="payment-actions">
                    <button type="button" id="confirmPayment" class="btn-primary">Ödeme Yap</button>
                </div>
            </form>
        </div>
    `;

    closeModal(); // Önceki modalı kapat
    showModal(modalContent);

    // Dinamik Form Etkileşimi
    document.getElementById("cardNumberInput").addEventListener("input", (e) => {
        document.getElementById("cardNumberLabel").textContent = e.target.value || "1234 5678 9012 3456";
    });

    document.getElementById("expiryDateInput").addEventListener("input", (e) => {
        const [month, year] = e.target.value.split("/");
        document.getElementById("expiryMonth").textContent = month || "MM";
        document.getElementById("expiryYear").textContent = year || "YY";
    });

    document.getElementById("cvvInput").addEventListener("input", (e) => {
        document.getElementById("cardCVV").textContent = e.target.value || "***";
    });

    // Ödeme Onayı
    document.getElementById("confirmPayment").addEventListener("click", () => {
        const cardNumber = document.getElementById("cardNumberInput").value.trim();
        const expiryDate = document.getElementById("expiryDateInput").value.trim();
        const cvv = document.getElementById("cvvInput").value.trim();

        if (cardNumber === "1234 5678 9012 3456" && expiryDate === "12/34" && cvv === "123") {
            alert("Ödeme başarılı! Biletleriniz hazırlanıyor...");
            clearCart();
            closeModal(); // Modalı kapat
            showModal(`
                <h2>Ödeme Onayı</h2>
                <p>Ödemeniz başarıyla alınmıştır. Biletleriniz aşağıda listelenmiştir:</p>
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
                <button class="btn-primary" onclick="window.location.href='index.html'">Ana Sayfaya Dön</button>
            `);
        } else {
            alert("Geçersiz ödeme bilgileri. Lütfen tekrar deneyin.");
        }
    });
}
