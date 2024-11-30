import { cinemas } from "../data/cinemas.js";
import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadHome(cinema = null) {
    const home = document.getElementById("home");
    home.style.backgroundImage = `url(${cinema ? cinema.backgroundImage : './assets/cinema/default-bg.jpg'})`;
    home.style.transition = "background-image 0.5s ease-in-out";

    home.innerHTML = cinema
        ? `
            <div class="cinema-details">
                <h2>Willkommen bei ${cinema.name}</h2>
                <p>${cinema.description}</p>
                <div class="cinema-actions">
                    <button id="startReservationButton" class="btn-primary">Buchen oder Reservieren</button>
                    <button id="toMainPageButton" class="btn-secondary">Zurück zur Startseite</button>
                </div>
            </div>
        `
        : `
            <div class="group-info">
                <h2>${cineGroupInfo.title}</h2>
                <p>${cineGroupInfo.description}</p>
                <div class="cinema-actions">
                    ${cinemas
                        .map(
                            (cinema) => `<button class="btn-primary cinema-select" data-id="${cinema.id}">${cinema.name}</button>`
                        )
                        .join("")}
                </div>
            </div>
        `;

    // Event Listeners
    if (cinema) {
        document.getElementById("startReservationButton").addEventListener("click", () => {
            // Rezervasyon işlemi
        });

        document.getElementById("toMainPageButton").addEventListener("click", () => {
            loadHome(); // Ana sayfaya dönüş
        });
    } else {
        document.querySelectorAll(".cinema-select").forEach((button) => {
            button.addEventListener("click", (event) => {
                const cinemaId = event.target.getAttribute("data-id");
                const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);

                if (selectedCinema) {
                    loadHome(selectedCinema); // Sinema sayfasını yükle
                } else {
                    console.error("Geçersiz sinema seçimi!");
                }
            });
        });
    }
}
