let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function getCart() {
    return cart;
}

export function setCart(newCart) {
    cart = newCart;
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
}

export function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Sepet boş!");
        return;
    }

    const incompleteItems = cart.filter((item) => !item.name || !item.surname || !item.category);
    if (incompleteItems.length > 0) {
        alert("Bazı ürünler için kullanıcı bilgileri eksik. Lütfen bilgileri doldurun.");
        return;
    }

    const confirmation = confirm("Tüm biletler hazır, görmek ister misiniz?");
    if (confirmation) {
        showTickets(cart); // Merkezi hale getirilen showTickets fonksiyonu
    }

    window.location.href = "checkout.html";
}

export function showTickets(cart) {
    const checkoutContainer = document.getElementById("checkoutContainer");

    if (!checkoutContainer) {
        console.error("Checkout container bulunamadı! Lütfen HTML dosyanızı kontrol edin.");
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
        <button class="btn-primary" onclick="window.location.href='index.html'">Zurück zur Startseite</button>
    `;
}
