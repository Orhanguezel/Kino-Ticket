import { loadHeader } from "../src/components/header.js";
import { loadFooter } from "../src/components/footer.js";
import { startReservation } from "../src/reservation/reservationHandler.js";
import { cinemas } from "../src/data/cinemas.js";

export function updateUI(cinema = null) {
    // Header ve Footer yükleniyor
    loadHeader(cinema);
    loadFooter(cinema);

    // Butonlara ve dinamik içeriklere event listener eklemek için bir süre bekleniyor
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
            button.addEventListener("click", (e) => selectCinema(parseInt(e.target.dataset.id)))
        );
    }, 100); // 100ms timeout süresi, DOM'un tamamen yüklenmesi için artırılabilir
}

// Ana sayfaya dönüş fonksiyonu
function goToMainPage() {
    localStorage.removeItem("selectedCinema");
    updateUI(null);
}

// Sinema seçimi ve UI güncellemesi
export function selectCinema(cinemaId) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    if (!cinema) {
        console.error(`Cinema with ID ${cinemaId} not found.`);
        return;
    }
    localStorage.setItem("selectedCinema", JSON.stringify(cinema));
    updateUI(cinema);
}
