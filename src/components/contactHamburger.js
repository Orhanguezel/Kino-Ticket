import { cineGroupInfo } from "../data/cinemas.js";

// Seçili sinema bilgisini al
function getSelectedCinema() {
  const storedCinema = localStorage.getItem("selectedCinema");
  return storedCinema ? JSON.parse(storedCinema) : cineGroupInfo;
}

export function setupContactHamburgerMenu() {
  const initializeMenu = () => {
    const gridHamburgerMenu = document.querySelector(".grid-hamburger-menu");

    // Eğer öğe bulunamazsa, bir hata yaz ve çık
    if (!gridHamburgerMenu) {
      console.warn("Grid hamburger menu element not found.");
      return;
    }
    

    // Daha önce eklenmiş bir overlay varsa tekrar oluşturma
    const existingOverlay = document.querySelector(".contact-overlay");
    if (existingOverlay) {
      existingOverlay.remove(); // Eski overlay'i temizle
    }

    const contactOverlay = document.createElement("div");

    // Seçili sinema bilgisi alınıyor
    const selectedCinema = getSelectedCinema();

    contactOverlay.classList.add("contact-overlay");
    contactOverlay.innerHTML = `


        <div class="contact-overlay-content">
            <button id="closeContactOverlay" style="float: right; font-size: 1.5rem; background: none; border: none; color: var(--dark-color); cursor: pointer;">&times;</button>
            <h2>Contact Us</h2>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                    <p>${selectedCinema.phone}</p>
                    <p>${selectedCinema.phone}</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <p>${selectedCinema.email}</p>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>${selectedCinema.address}</p>
            </div>
            <div class="social-icons">
                <a href="${selectedCinema.facebook}"><i class="fab fa-facebook"></i></a>
                <a href="${selectedCinema.twitter}"><i class="fab fa-twitter"></i></a>
                <a href="${selectedCinema.youtube}"><i class="fab fa-youtube"></i></a>
                <a href="${selectedCinema.instagram}"><i class="fab fa-instagram"></i></a>
                <a href="${selectedCinema.telegram}"><i class="fab fa-telegram"></i></a>
                <a href="${selectedCinema.whatsup}"><i class="fab fa-whatsapp"></i></a>
            </div>
            <iframe
                src="${selectedCinema.map}"
                allowfullscreen=""
                loading="lazy"></iframe>
        </div>
    `;

    document.body.appendChild(contactOverlay);

  // Hamburger menu click even
  gridHamburgerMenu.addEventListener("click", () => {
      contactOverlay.classList.add("active");
    });

    // Overlay kapatma butonu
    const closeContactOverlayButton = document.getElementById("closeContactOverlay");
    if (closeContactOverlayButton) {
      closeContactOverlayButton.addEventListener("click", () => {
        contactOverlay.classList.remove("active");
      });
    }

    // Overlay dışına tıklama olayı
    contactOverlay.addEventListener("click", (e) => {
      if (e.target === contactOverlay) {
        contactOverlay.classList.remove("active");
      }
    });
  };

  // Eğer gridHamburgerMenu DOM'da yoksa, MutationObserver ile DOM değişikliklerini dinle
  const gridHamburgerMenu = document.querySelector(".grid-hamburger-menu");
  if (!gridHamburgerMenu) {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
          const menu = document.querySelector(".grid-hamburger-menu");
          if (menu) {
            observer.disconnect(); // Artık gözlemlemeye gerek yok
            initializeMenu(); // Menü'yü başlat
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    initializeMenu(); // Eğer öğe zaten mevcutsa direkt çalıştır
  }
}