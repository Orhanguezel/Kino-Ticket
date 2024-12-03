import { cineGroupInfo } from "../data/cinemas.js";
import { updateUI } from "../../controllers/uiController.js";

export function loadFooter(cinema = null) {
  // Eğer sinema seçilmemişse localStorage'dan kontrol et
  cinema = cinema || getSelectedCinema() || cineGroupInfo;

  const footer = document.getElementById("footer");

  if (!footer) {
    console.error("Footer element bulunamadı!");
    return;
  }

  footer.innerHTML = `
        <div class="footer-container grid-footer">
            <!-- Üst Alan -->
            <div class="footer-oben">
                <!-- Sol Kısım -->
                <div class="footer-left">
                    <img id="footerLogo" src="${
                      cinema?.footerLogo || cineGroupInfo.footerLogo
                    }" alt="CineGrup Logo">
                    <p>${cinema?.address || cineGroupInfo.address}</p>
                </div>

                <!-- Orta Menü -->
                <div class="footer-center">
                    <nav class="footer-nav">
                        <ul>
                            <li><a href="#" id="footerHomeLink">Startseite</a></li>
                            <li><a href="#" id="footerCartLink">Warenkorb</a></li>
                            <li><a href="#">Über uns</a></li>
                            <li><a href="#">Filme</a></li>
                        </ul>
                    </nav>
                </div>

                <!-- Sağ Kısım -->
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

            <!-- Alt Alan -->
            <div class="footer-unten">
                <div class="footer-bottom">
                    <p>© 2024 CineGrup, entwickelt von <a href="https://orhanguezel.github.io/personal/" target="_blank" rel="noopener noreferrer">OG</a></p>
                </div>
            </div>
        </div>
    `;

  setupFooterListeners(cinema);
}

function setupFooterListeners(cinema) {
  const footerLogo = document.getElementById("footerLogo");
  const footerHomeLink = document.getElementById("footerHomeLink");
  const footerCartLink = document.getElementById("footerCartLink");

  // Footer logosuna tıklama
  if (footerLogo) {
    footerLogo.addEventListener("click", (e) => {
      e.preventDefault();
      if (cinema) {
        console.log(`Navigating to cinema: ${cinema.name}`);
        updateUI(cinema); // Seçili sinema sayfasını yükle
      } else {
        console.log("Navigating to main page");
        updateUI(null); // Ana sayfayı yükle
      }
    });
  }

  // Ana sayfa linki
  if (footerHomeLink) {
    footerHomeLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Navigating to main page via footer home link");
      localStorage.removeItem("selectedCinema"); // Seçilen sinema bilgisini temizle
      updateUI(null); // Ana sayfayı yükle
    });
  }

  // Sepet linki
  if (footerCartLink) {
    footerCartLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Cart modal opened from footer");
      // Sepet modalı açma kodu buraya gelecek
    });
  }
}

function getSelectedCinema() {
  const storedCinema = localStorage.getItem("selectedCinema");
  return storedCinema ? JSON.parse(storedCinema) : cineGroupInfo;
}
