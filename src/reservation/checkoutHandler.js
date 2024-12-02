import { showModal } from "./modal.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sepeti alma
export function getCart() {
    return cart;
}

// Sepeti güncelleme
export function setCart(newCart) {
    cart = newCart;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Sepeti temizleme
export function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
}

// Sepeti Göster
export function showCart() {
    const cart = getCart();

    if (cart.length === 0) {
        showModal("<p>Sepetiniz boş.</p>");
        return;
    }

    const cartContent = cart.map(item => `
        <div class="ticket">
            <h3>Kino Ticket</h3>
            <p><strong>Kino:</strong> ${item.cinema}</p>
            <p><strong>Salon:</strong> ${item.salon}</p>
            <p><strong>Koltuk:</strong> ${item.seat}</p>
            <p><strong>Ad:</strong> ${item.name}</p>
            <p><strong>Kategori:</strong> ${item.category === "child" ? "Çocuk" : "Yetişkin"}</p>
            <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
        </div>
    `).join("");

    const modalContent = `
        <h2>Sepetiniz</h2>
        ${cartContent}
        <button id="proceedToCheckout" class="btn-primary">Ödeme Yap</button>
    `;

    showModal(modalContent);

    document.getElementById("proceedToCheckout").addEventListener("click", () => {
        import("./paymentHandler.js").then(({ processPayment }) => processPayment());
    });
}
