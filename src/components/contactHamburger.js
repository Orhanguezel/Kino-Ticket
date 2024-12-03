import { cinemas, cineGroupInfo } from "../data/cinemas.js";

export function setupContactHamburgerMenu() {
  if (document.querySelector(".contact-overlay")) return; // Zaten varsa yeniden oluşturma

  const gridHamburgerMenu = document.querySelector(".grid-hamburger-menu");
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

  gridHamburgerMenu.addEventListener("click", () => {
    contactOverlay.classList.add("active");
  });

  document.getElementById("closeContactOverlay").addEventListener("click", () => {
    contactOverlay.classList.remove("active");
  });

  contactOverlay.addEventListener("click", (e) => {
    if (e.target === contactOverlay) {
      contactOverlay.classList.remove("active");
    }
  });
}

// Seçili sinema bilgisini al
function getSelectedCinema() {
  const storedCinema = localStorage.getItem("selectedCinema");
  if (storedCinema) {
    return JSON.parse(storedCinema);
  }
  return cineGroupInfo; // Varsayılan olarak grup bilgisi döndür
}
