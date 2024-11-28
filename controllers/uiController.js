import { loadHeader } from "../src/components/header.js";
import { loadFooter } from "../src/components/footer.js";
import { loadHome } from "../src/components/home.js";
import { startReservation } from "../src/reservation/reservationHandler.js";
import { cinemas } from "../src/data/cinemas.js";

export function updateUI(cinema = null) {
    loadHeader(cinema);
    loadHome(cinema);
    loadFooter(cinema);

    setTimeout(() => {
        const startReservationButton = document.getElementById("startReservationButton");
        const toMainPageButton = document.getElementById("toMainPageButton");
        const cinemaSelectButtons = document.querySelectorAll(".cinema-select");

        if (cinema && startReservationButton) {
            startReservationButton.addEventListener("click", () =>
                startReservation(cinema.id)
            );
        }

        if (toMainPageButton) {
            toMainPageButton.addEventListener("click", goToMainPage);
        }

        cinemaSelectButtons.forEach((button) =>
            button.addEventListener("click", (e) => selectCinema(parseInt(e.target.dataset.id)))
        );
    }, 100); // 100ms setTimeout süresi artırılabilir
}

function goToMainPage() {
    localStorage.removeItem("selectedCinema");
    updateUI(null);
}

export function selectCinema(cinemaId) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    if (!cinema) {
        console.error(`Cinema with ID ${cinemaId} not found.`);
        return;
    }
    localStorage.setItem("selectedCinema", JSON.stringify(cinema));
    updateUI(cinema);
}
