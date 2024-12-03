import { loadHeader } from "../src/components/header.js";
import { loadFooter } from "../src/components/footer.js";
import { selectCinema } from "../src/reservation/cinemaSelection.js";
import { setupContactHamburgerMenu } from "../src/components/contactHamburger.js";
import { startReservation } from "../src/reservation/reservationHandler.js";


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

        if (cinema && startReservationButton) {
            startReservationButton.addEventListener("click", () => {
                if (typeof startReservation === "function") {
                    startReservation(cinema.id); // Doğru cinema ID'sini gönder
                } else {
                    console.error("startReservation function is not defined!");
                }
            });
        }

        if (toMainPageButton) {
            toMainPageButton.addEventListener("click", goToMainPage);
        }

        cinemaSelectButtons.forEach((button) =>
            button.addEventListener("click", (e) => {
                const cinemaId = parseInt(e.target.dataset.id);
                if (cinemaId) {
                    selectCinema(cinemaId);
                    updateUI(); // UI'yi tekrar güncelle
                }
            })
        );
    }, 100);
}

function goToMainPage() {
    const selectedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
    if (selectedCinema) {
        updateUI(selectedCinema); // Seçili sinema sayfasına dön
    } else {
        updateUI(null); // Varsayılan ana sayfaya dön
    }
}

