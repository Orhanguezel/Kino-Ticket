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

// Sepeti Göster (Modal ile)
export function showCart() {
    const cart = getCart();

    if (cart.length === 0) {
        showModal("<p>Sepetiniz boş.</p>");
        return;
    }

    const cartContent = cart
        .map(
            (item) => `
            <div class="cart-item">
                <p><strong>Kino:</strong> ${item.cinema}</p>
                <p><strong>Salon:</strong> ${item.salon}</p>
                <p><strong>Koltuk:</strong> ${item.seat}</p>
                <p><strong>Ad:</strong> ${item.name}</p>
                <p><strong>Kategori:</strong> ${item.category === "child" ? "Çocuk" : "Yetişkin"}</p>
                <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
            </div>
        `
        )
        .join("");

    showModal(`
        <h2>Sepetiniz</h2>
        ${cartContent}
        <button id="proceedToCheckout" class="btn-primary">Ödeme Yap</button>
    `);

    document.getElementById("proceedToCheckout").addEventListener("click", proceedToCheckout);
}

// Checkout İşlemi
export function proceedToCheckout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepet boş!");
        return;
    }

    // Eksik bilgi kontrolü
    const incompleteItems = cart.filter((item) => !item.name || !item.surname || !item.category);
    if (incompleteItems.length > 0) {
        alert("Bazı ürünler için kullanıcı bilgileri eksik. Lütfen bilgileri doldurun.");
        return;
    }

    // Toplam fiyat hesaplama
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    // Modal içeriği
    const modalContent = `
        <h2>Ödeme İşlemi</h2>
        <div class="ticket-container">
            <h3>Biletleriniz</h3>
            ${cart
                .map(
                    (item) => `
                    <div class="ticket">
                        <p><strong>Kino:</strong> ${item.cinema}</p>
                        <p><strong>Salon:</strong> ${item.salon}</p>
                        <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                        <p><strong>Ad:</strong> ${item.name} ${item.surname}</p>
                        <p><strong>Kategori:</strong> ${item.category === "child" ? "Çocuk" : "Yetişkin"}</p>
                        <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
                    </div>
                `
                )
                .join("")}
        </div>
        <div class="payment-section">
            <form id="paymentForm">
                <label for="cardNumber">Kart Numarası:</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                
                <label for="expiryDate">Son Kullanma Tarihi (MM/YY):</label>
                <input type="text" id="expiryDate" placeholder="12/34" required>
                
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="123" required>
                
                <p><strong>Ödenecek Tutar:</strong> ${totalPrice} €</p>
                <button type="button" id="confirmPayment" class="btn-primary">Ödeme Yap</button>
            </form>
        </div>
    `;

    // Modal göster
    showModal(modalContent);

    // Ödeme formunu işleme
    document.getElementById("confirmPayment").addEventListener("click", () => {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Test kart bilgileriyle kontrol
        if (cardNumber === "1234 5678 9012 3456" && expiryDate === "12/34" && cvv === "123") {
            alert("Ödeme başarılı! Biletleriniz hazırlanıyor...");
            clearCart(); // Sepeti temizle

            const successContent = `
                <h2>Ödeme Onayı</h2>
                <p>Ödemeniz başarıyla alınmıştır. Biletleriniz aşağıda listelenmiştir:</p>
                <div class="ticket-container">
                    ${cart
                        .map(
                            (item) => `
                            <div class="ticket">
                                <p><strong>Kino:</strong> ${item.cinema}</p>
                                <p><strong>Salon:</strong> ${item.salon}</p>
                                <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                                <p><strong>Ad:</strong> ${item.name} ${item.surname}</p>
                                <p><strong>Kategori:</strong> ${item.category === "child" ? "Çocuk" : "Yetişkin"}</p>
                                <p><strong>Fiyat:</strong> ${item.price.toFixed(2)} €</p>
                            </div>
                        `
                        )
                        .join("")}
                </div>
                <button class="btn-primary" onclick="window.location.href='index.html'">Ana Sayfaya Dön</button>
            `;
            showModal(successContent);
        } else {
            alert("Geçersiz ödeme bilgileri. Lütfen tekrar deneyin.");
        }
    });
}









// Biletleri gösterme
export function showTickets(cart) {
    const checkoutContainer = document.getElementById("home");

    if (!checkoutContainer) {
        console.error("Ana içerik konteyneri bulunamadı!");
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
    `;
}
