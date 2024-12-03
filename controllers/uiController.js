import { loadHeader } from "../src/components/header.js";
import { loadFooter } from "../src/components/footer.js";
import { selectCinema } from "../src/reservation/cinemaSelection.js";
import { setupContactHamburgerMenu } from "../src/components/contactHamburger.js"; // Contact menüyü bağlayın

export function updateUI(cinema = null) {
    // Header ve Footer yükleniyor
    loadHeader(cinema);
    loadFooter(cinema);

    // Contact Hamburger Menü ve diğer dinamik fonksiyonları her UI güncellemesinde bağla
    setupContactHamburgerMenu();

    // Event listener'lar için DOM'un tamamen yüklenmesini bekle
    setTimeout(() => {
        const startReservationButton = document.getElementById("startReservationButton");
        const toMainPageButton = document.getElementById("toMainPageButton");
        const cinemaSelectButtons = document.querySelectorAll(".cinema-select");

        // Rezervasyon butonuna event listener ekleniyor
        if (cinema && startReservationButton) {
            startReservationButton.addEventListener("click", () =>
                startReservation(cinema.id)
            );
        }

        // Ana sayfaya dön butonuna event listener ekleniyor
        if (toMainPageButton) {
            toMainPageButton.addEventListener("click", goToMainPage);
        }

        // Dinamik sinema seçim butonlarına event listener ekleniyor
        cinemaSelectButtons.forEach((button) =>
            button.addEventListener("click", (e) => {
                const cinemaId = parseInt(e.target.dataset.id);
                if (cinemaId) {
                    selectCinema(cinemaId); // Sinema seçimi
                    updateUI(); // UI'yi tekrar güncelle
                }
            })
        );
    }, 100); // DOM tam yüklenmeden çağrı yapıldığında hatayı önlemek için bekleme
}

function goToMainPage() {
    localStorage.removeItem("selectedCinema"); // Seçilen sinema bilgisini temizle
    updateUI(null); // Varsayılan duruma dön
}
