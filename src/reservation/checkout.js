import { getCart, showTickets, proceedToCheckout } from "./checkoutHandler.js";
import { processPayment } from "./paymentHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    const homeContainer = document.getElementById("home");

    if (!homeContainer) {
        console.error("Ana içerik konteyneri bulunamadı!");
        return;
    }

    // Varsayılan olarak Ana Sayfa mesajı göster
    if (cart.length === 0) {
        homeContainer.innerHTML = `
            <h2>Hoşgeldiniz!</h2>
            <p>CineGrup'la en iyi sinema deneyimini yaşayın.</p>
        `;
        return;
    }

    // Biletleri göster
    showTickets(cart);

    // Ödeme butonunu ekle
    const paymentSection = document.createElement("div");
    paymentSection.className = "payment-actions";
    paymentSection.innerHTML = `
        <p><strong>Toplam Ödenecek Tutar:</strong> ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €</p>
        <button class="btn-primary" id="paymentButton">Ödeme Yap</button>
    `;

    homeContainer.appendChild(paymentSection);

    // Ödeme işlemini başlat
    document.getElementById("paymentButton").addEventListener("click", () => {
        proceedToCheckout(); // Ödeme işlemini başlat
    });
});
