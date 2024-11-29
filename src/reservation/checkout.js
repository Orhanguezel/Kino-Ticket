import { getCart, showTickets } from "./checkoutHandler.js";
import { processPayment } from "./paymentHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    const checkoutContainer = document.getElementById("checkoutContainer");

    if (cart.length === 0) {
        alert("Sepet boş! Lütfen bilet ekleyin.");
        checkoutContainer.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        return;
    }

    // Biletleri checkout sayfasında göster
    showTickets(cart);

    // Dinamik olarak Ödeme Yap Butonu Ekle
    const paymentButton = document.createElement("button");
    paymentButton.textContent = "Ödeme Yap";
    paymentButton.className = "btn-primary";
    paymentButton.addEventListener("click", () => {
        processPayment(); // Ödeme işlemini başlat
    });

    // Butonu checkout container'a ekle
    checkoutContainer.appendChild(paymentButton);
});
