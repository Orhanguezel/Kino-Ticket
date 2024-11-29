import { getCart, clearCart } from "./checkoutHandler.js";

// Ödeme İşlemleri
export function processPayment() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepet boş! Ödeme yapılamaz.");
        return;
    }

    // Ödeme formunu oluştur
    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.innerHTML = `
        <h2>Ödeme İşlemi</h2>
        <form id="paymentForm">
            <label for="cardNumber">Kart Numarası:</label>
            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>

            <label for="expiryDate">Son Kullanma Tarihi:</label>
            <input type="text" id="expiryDate" placeholder="12/34" required>

            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" placeholder="123" required>

            <button type="button" id="confirmPayment" class="btn-primary">Ödeme Yap</button>
        </form>
    `;

    document.getElementById("confirmPayment").addEventListener("click", () => {
        // Kullanıcı girişlerini al
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;

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

// Biletleri Göster
function showTickets(cart) {
    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.innerHTML = `
        <h2>Ödeme Başarılı! İşte Biletleriniz:</h2>
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
        <button class="btn-primary" onclick="window.location.href='index.html'">Ana Sayfaya Dön</button>
    `;
}
