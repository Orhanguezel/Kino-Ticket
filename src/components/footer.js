import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadFooter(cinema = null) {
    const footer = document.getElementById("footer");
    const ogUrl = "https://orhanguezel.github.io/personal/";

    if (!footer) {
        console.error("Footer element not found!");
        return;
    }

    footer.innerHTML = `
        <div class="footer-container">
    
    <div class="footer-oben">
    <!-- Sol Bölüm -->
    <div class="footer-left">
        <img src="${cinema ? cinema.footerLogo : cineGroupInfo.footerLogo}" alt="CineGrup Logo">
        <p>${cinema ? cinema.address : cineGroupInfo.address}</p>
    </div>
    
    <!-- Orta Menü -->
    <div class="footer-center">
        <nav class="footer-nav">
            <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Movie</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#" class="buy-now">Buy Now</a></li>
            </ul>
        </nav>
    </div>
    <!-- Sağ Bölüm -->
    <div class="footer-right">
        <div class="payment-icons">
            <img src="./assets/icons/paypal.png" alt="PayPal">
            <img src="./assets/icons/ebay.png" alt="eBay">
            <img src="./assets/icons/cirrus.png" alt="Cirrus">
            <img src="./assets/icons/visa.png" alt="Visa">
            <img src="./assets/icons/discover.png" alt="Discover">
            <img src="./assets/icons/mastercard.png" alt="MasterCard">
        </div>
    </div>
</div>
<div class="footer-unten">
    <!-- Alt Bilgi -->
    <div class="footer-bottom">
        <p>© 2024 CineGrup, entwickelt von <a href="${ogUrl}" target="_blank" rel="noopener noreferrer">OG</a></p>
    </div>
</div>
</div>

    `;
}
