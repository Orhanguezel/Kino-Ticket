import { getCart, clearCart } from "./checkoutHandler.js";
import { processPayment } from "./paymentHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    const mainContent = document.getElementById("mainContent");

    if (!mainContent) {
        console.error("Ana içerik konteyneri bulunamadı!");
        return;
    }

    // Sepet boşsa ana sayfa mesajını göster
    if (cart.length === 0) {
        mainContent.innerHTML = `
            <h2>Hoşgeldiniz!</h2>
            <p>CineGrup'la en iyi sinema deneyimini yaşayın.</p>
            <p>Sepetiniz şu anda boş.</p>
        `;
        return;
    }

    // Sepet biletlerini göster
    const ticketContainer = document.createElement("div");
    ticketContainer.className = "ticket-container";
    ticketContainer.innerHTML = cart
        .map(
            (item) => `
            <div class="ticket">
                <h3>Kino Ticket</h3>
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Salon:</strong> ${item.salon}</p>
                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                <p><strong>Ad:</strong> ${item.name} ${item.surname}</p>
                <p><strong>Kategori:</strong> ${item.category === "child" ? "Çocuk" : "Yetişkin"}</p>
                <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
            </div>
        `
        )
        .join("");

    mainContent.innerHTML = `
        <h2>Sepetiniz</h2>
    `;
    mainContent.appendChild(ticketContainer);

    // Ödeme işlemleri için bölüm
    const paymentSection = document.createElement("div");
    paymentSection.className = "payment-actions";
    paymentSection.innerHTML = `
        <p><strong>Toplam Ödenecek Tutar:</strong> ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €</p>
        <button class="btn-primary" id="paymentButton">Ödeme Yap</button>
    `;

    mainContent.appendChild(paymentSection);

    // Ödeme butonuna tıklama işlemi
    document.getElementById("paymentButton").addEventListener("click", () => {
        processPayment(); // Yeni ödeme işlemi fonksiyonunu çağır
    });
});
