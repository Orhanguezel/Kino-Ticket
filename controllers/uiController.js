import { loadHeader } from "../src/components/header.js";
import { loadFooter } from "../src/components/footer.js";
import { selectCinema } from "../src/reservation/cinemaSelection.js"; // Sinema seçim fonksiyonunu import ediyoruz.

export function updateUI(cinema = null) {
    // Header ve Footer yükleniyor
    loadHeader(cinema);
    loadFooter(cinema);

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
    }, 100); // DOM tam yüklenmeden çağrı yapıldığında hatayı önlemek için bekleme
}

function goToMainPage() {
    localStorage.removeItem("selectedCinema"); // Seçilen sinema bilgisini temizle
    updateUI(null); // Varsayılan duruma dön
}
