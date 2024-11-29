import { getCart, clearCart, showTickets } from "./checkoutHandler.js";
import { processPayment } from "./paymentHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepet boş! Lütfen bilet ekleyin.");
        document.getElementById("checkoutContainer").innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        return;
    }

    // Biletleri checkout sayfasında göster
    showTickets(cart);

    // Ödeme Tamamla Butonuna Olay Ekleyelim
    document.getElementById("completePayment").addEventListener("click", () => {
        processPayment(); // Ödeme işlemini başlat
        alert("Zahlung erfolgreich! Ihre Tickets sind ausgestellt."); // Ödeme başarılı mesajı
        clearCart(); // Sepeti temizle
        window.location.href = "index.html"; // Ana sayfaya dön
    });
});
