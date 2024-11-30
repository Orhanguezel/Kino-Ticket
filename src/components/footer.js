import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadFooter(cinema = null) {
  const footer = document.getElementById("footer");
  const ogUrl = "https://orhanguezel.github.io/personal/";

  if (!footer) {
    console.error("Footer-Element nicht gefunden!");
    return;
  }

  footer.innerHTML = `
        <div class="footer-container">
            <!-- Oberer Bereich -->
            <div class="footer-oben">
                <!-- Linke Seite -->
                <div class="footer-left">
                    <img src="${
                      cinema ? cinema.footerLogo : cineGroupInfo.footerLogo
                    }" alt="CineGrup Logo">
                    <p>${cinema ? cinema.address : cineGroupInfo.address}</p>
                </div>
                
                <!-- Mittleres Menü -->
                <div class="footer-center">
                    <nav class="footer-nav">
                        <ul>
    <li><a href="#" id="homeLink"><i class="fas fa-home"></i> Startseite</a></li>
    <li><a href="#" id="cartLink"><i class="fas fa-shopping-cart"></i> Warenkorb</a></li>
    <li><a href="#"><i class="fas fa-info-circle"></i> Über uns</a></li>
    <li><a href="#"><i class="fas fa-film"></i> Filme</a></li>
    <li><a href="#"><i class="fas fa-envelope"></i> Kontakt</a></li>
    <li><a href="#" class="buy-now"><i class="fas fa-shopping-bag"></i> Jetzt kaufen</a></li>
</ul>

                    </nav>
                </div>
                
                <!-- Rechte Seite -->
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
            
            <!-- Unterer Bereich -->
            <div class="footer-unten">
                <div class="footer-bottom">
                    <p>© 2024 CineGrup, entwickelt von <a href="${ogUrl}" target="_blank" rel="noopener noreferrer">OG</a></p>
                </div>
            </div>
        </div>
    `;
}
