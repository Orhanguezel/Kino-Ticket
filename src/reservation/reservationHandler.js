import { cinemas } from "../data/cinemas.js";
import { getCinemaShows } from "../data/filmsData.js";
import { showModal, closeModal } from "./modal.js";
import { showDateSelection } from "./dateSelection.js";

export function startReservation(cinemaId) {
    const selectedCinema = cinemas.find((c) => c.id === cinemaId);
    if (!selectedCinema) {
        console.error(`Das ausgewählte Kino wurde nicht gefunden! Kino ID: ${cinemaId}`);
        return;
    }

    const cinemaShows = getCinemaShows(cinemaId);
    if (!cinemaShows || cinemaShows.length === 0) {
        alert("Für dieses Kino sind keine Vorführungen verfügbar!");
        return;
    }

    const uniqueFilms = new Set();
    const mainContent = document.getElementById("mainContent");

    // Dynamisches HTML für den Carousel erstellen
    mainContent.innerHTML = `
        <h2 class="film-title">Buchung oder Reservierung - ${selectedCinema.name}</h2>
        <p class="film-instruction">Film auswählen:</p>
        <section>
          <ul class="carousel">
            ${cinemaShows
                .filter((show) => {
                    if (uniqueFilms.has(show.film.id)) return false;
                    uniqueFilms.add(show.film.id);
                    return true;
                })
                .map((show, index) => `
                    <li class="items ${index === 0 ? "main-pos" : index === 1 ? "right-pos" : index === cinemaShows.length - 1 ? "left-pos" : "back-pos"}" id="${show.film.id}">
                      <img src="${show.film.image}" alt="${show.film.name}" class="film-image">
                      <div class="film-name">${show.film.name}</div>
                    </li>
                `)
                .join("")}
          </ul>
          <div class="carousel-controls">
            <button id="prev" class="carousel-btn">Zurück</button>
            <button id="next" class="carousel-btn">Weiter</button>
          </div>
        </section>
    `;

    setupCarousel(cinemaShows, cinemaId);
}

function setupCarousel(cinemaShows, cinemaId) {
    const items = document.querySelectorAll(".carousel .items");
    let currentItem = 0;

    function updatePositions() {
        items.forEach((item, index) => {
            item.classList.remove("main-pos", "left-pos", "right-pos", "back-pos");
            if (index === currentItem) {
                item.classList.add("main-pos");
            } else if (index === (currentItem + 1) % items.length) {
                item.classList.add("right-pos");
            } else if (index === (currentItem - 1 + items.length) % items.length) {
                item.classList.add("left-pos");
            } else {
                item.classList.add("back-pos");
            }
        });
    }

    function swap(direction) {
        if (direction === "next") {
            currentItem = (currentItem + 1) % items.length;
        } else {
            currentItem = (currentItem - 1 + items.length) % items.length;
        }
        updatePositions();
    }

    document.getElementById("next").addEventListener("click", () => swap("next"));
    document.getElementById("prev").addEventListener("click", () => swap("prev"));

    updatePositions();

    items.forEach((item) => {
        item.addEventListener("click", () => {
            const filmId = parseInt(item.id, 10);
            const selectedFilmShows = cinemaShows.filter((show) => show.film.id === filmId);

            if (selectedFilmShows.length > 0) {
                const modalContent = `
                    <h3>Salons für den Film: ${selectedFilmShows[0].film.name}</h3>
                    <div class="salon-cards">
                        ${selectedFilmShows
                            .map((show) => `
                                <div class="salon-card">
                                    <img src="./assets/salons/${show.salon.image}" alt="${show.salon.name}" class="salon-image">
                                    <div class="salon-details">
                                        <h4>${show.salon.name}</h4>
                                        <p>Uhrzeit: ${show.time}</p>
                                        <button class="btn-primary select-salon" data-id="${show.salon.id}" data-time="${show.time}">Auswählen</button>
                                    </div>
                                </div>
                            `)
                            .join("")}
                    </div>
                `;
                showModal(modalContent);

                document.querySelectorAll(".select-salon").forEach((button) => {
                    button.addEventListener("click", () => {
                        const salonId = button.dataset.id;
                        const time = button.dataset.time;

                        //console.log(`Salon ausgewählt: ID=${salonId}, Uhrzeit=${time}`);
                        closeModal(); // Modal schließen
                        showDateSelection(cinemaId, salonId, time); // Benötigte Informationen weiterleiten
                    });
                });
            }
        });
    });
}
