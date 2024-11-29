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
    window.location.href = "checkout.html";
}
