import { getCart, clearCart, showTickets } from "./checkoutHandler.js";

export function processPayment() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepet boş! Ödeme yapılamaz.");
        return;
    }

    // Ödenecek toplam tutarı hesapla
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    // **checkoutContainer**'a hem biletleri hem de ödeme formunu ekle
    const checkoutContainer = document.getElementById("checkoutContainer");
    if (!checkoutContainer) {
        console.error("Checkout container bulunamadı!");
        return;
    }

    checkoutContainer.innerHTML = `
        <h2>Ihre Tickets</h2>
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
                        <p><strong>Kategorie:</strong> ${item.category === "child" ? "Kind" : "Erwachsener"}</p>
                        <p><strong>Datum:</strong> ${item.date}</p>
                        <p><strong>Uhrzeit:</strong> ${item.time}</p>
                        <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                    </div>
                `
                )
                .join("")}
        </div>
        <h2>Ödeme İşlemi</h2>
        <div class="payment-section">
            <div class="card-example">
                <h3>Örnek Kart</h3>
                <div class="card-design">
                    <div class="card-front">
                        <p class="card-number">Kart Numarası: <strong>1234 5678 9012 3456</strong></p>
                        <p class="card-expiry">Son Kullanma Tarihi: <strong>12/34</strong></p>
                        <p class="card-cvv">CVV: <strong>123</strong></p>
                        <p style="color: red; font-size: 0.9rem;">Bu bilgiler test amaçlıdır.</p>
                    </div>
                </div>
            </div>
            <div class="payment-form">
                <form id="paymentForm">
                    <label for="cardNumber">Kart Numarası:</label>
                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>

                    <label for="expiryDate">Son Kullanma Tarihi (MM/YY):</label>
                    <input type="text" id="expiryDate" placeholder="12/34" required>

                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" placeholder="123" required>

                    <p id="totalAmount"><strong>Ödenecek Tutar:</strong> ${totalPrice} €</p>
                    <button type="button" id="confirmPayment" class="btn-primary">Ödeme Yap</button>
                </form>
            </div>
        </div>
    `;

    // Ödeme işlemini kontrol et
    document.getElementById("confirmPayment").addEventListener("click", () => {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Test kredi kartı bilgileri
        if (cardNumber === "1234 5678 9012 3456" && expiryDate === "12/34" && cvv === "123") {
            alert("Ödeme başarılı! Biletleriniz hazırlanıyor...");
            showTickets(cart); // Biletleri göster
            clearCart(); // Sepeti temizle
        } else {
            alert("Geçersiz ödeme bilgileri. Lütfen tekrar deneyin.");
        }
    });
}
