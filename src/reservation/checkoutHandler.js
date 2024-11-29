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

    // Kullanıcı bilgilerini kontrol et
    const incompleteItems = cart.filter((item) => !item.name || !item.surname || !item.category);
    if (incompleteItems.length > 0) {
        alert("Bazı ürünler için kullanıcı bilgileri eksik. Lütfen bilgileri doldurun.");
        return;
    }

    // Tüm kontroller tamam, ödeme sayfasına yönlendirme
    window.location.href = "checkout.html";
}
