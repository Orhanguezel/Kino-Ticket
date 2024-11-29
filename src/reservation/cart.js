
document.addEventListener("DOMContentLoaded", () => {
    const cartItems = getCart() || []; // Sepet boşsa varsayılan olarak boş array atanır.
    const cartContainer = document.getElementById("cartContainer");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
        return;
    }

    renderCart(cartItems);

    document.getElementById("proceedToCheckout")?.addEventListener("click", () => {
        if (cartItems.length > 0) {
            window.location.href = "checkout.html";
        } else {
            alert("Bitte fügen Sie Artikel in den Warenkorb hinzu, bevor Sie zur Kasse gehen.");
        }
    });
});

function renderCart(cartItems) {
    const cartContainer = document.getElementById("cartContainer");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    cartContainer.innerHTML = `
        <div class="cart-summary">
            <h2>Warenkorb</h2>
            <p><strong>Gesamtpreis:</strong> ${totalPrice.toFixed(2)} €</p>
        </div>
        ${cartItems
            .map(
                (item, index) => `
                <div class="cart-item">
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Salon:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                    <p><strong>Kategorie:</strong> ${
                        item.ageCategory === "child" ? "Kind" : "Erwachsener"
                    }</p>
                    <p><strong>Datum:</strong> ${item.date}</p>
                    <p><strong>Uhrzeit:</strong> ${item.time}</p>
                    <p><strong>Preis:</strong> ${item.price.toFixed(2)} €</p>
                    <button class="remove-item btn-secondary" data-index="${index}">Entfernen</button>
                </div>
            `
            )
            .join("")}
        <div class="cart-actions">
            <button id="proceedToCheckout" class="btn-primary">Weiter zur Kasse</button>
            <button id="clearCart" class="btn-danger">Warenkorb Leeren</button>
        </div>
    `;

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.dataset.index);
            removeItemFromCart(index);
        });
    });

    document.getElementById("clearCart")?.addEventListener("click", () => {
        if (confirm("Sind Sie sicher, dass Sie den Warenkorb leeren möchten?")) {
            clearCartContents();
        }
    });
}

function removeItemFromCart(index) {
    const cartItems = getCart() || [];
    if (index < 0 || index >= cartItems.length) {
        console.error("Ungültiger Index:", index);
        return;
    }

    cartItems.splice(index, 1);
    try {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Warenkorbs:", error);
        alert("Fehler beim Aktualisieren des Warenkorbs.");
    }
    renderCart(cartItems);
}

function clearCartContents() {
    try {
        localStorage.removeItem("cart");
    } catch (error) {
        console.error("Fehler beim Leeren des Warenkorbs:", error);
        alert("Fehler beim Leeren des Warenkorbs.");
        return;
    }

    const cartContainer = document.getElementById("cartContainer");
    cartContainer.innerHTML = "<p>Ihr Warenkorb ist leer.</p>";
}
