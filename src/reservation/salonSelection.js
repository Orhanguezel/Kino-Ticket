import { getCinemaShows } from "../data/filmsData.js";
import { showDateSelection } from "./dateSelection.js";
import { showModal, closeModal } from "./modal.js";

export function showSalonSelection(cinemaId, filmId) {
    if (!cinemaId || !filmId) {
       // console.error("Ungültige cinemaId oder filmId:", { cinemaId, filmId });
        alert("Ungültige Parameter für die Salonauswahl!");
        return;
    }

    const cinemaShows = getCinemaShows(cinemaId).filter(
        (show) => show.film.id === filmId
    );

    if (!cinemaShows || cinemaShows.length === 0) {
        showModal("<p>Keine Salons für diesen Film verfügbar.</p>");
        return;
    }

    const content = `
        <h3>Salons für den Film:</h3>
        <div class="salon-list" style="display: flex; flex-wrap: wrap; gap: 20px;">
            ${cinemaShows
                .map((show) => {
                    if (!show.salon) {
                        console.error("Fehlende Salon-Daten:", show);
                        return `<p>Fehler: Salon-Daten nicht verfügbar.</p>`;
                    }
                    return `
                        <label class="salon-label" style="text-align: center; max-width: 150px; cursor: pointer;">
                            <input type="radio" name="salon" value="${show.salon.id}" style="display: none;">
                            <div class="salon-option">
                                <img src="./assets/salons/${show.salon.image}" alt="${show.salon.name}" class="salon-image" style="width: 100%; cursor: pointer; border: 1px solid #ccc; border-radius: 5px;">
                                <div>${show.salon.name} - ${show.time}</div>
                                <p>Kapazität: ${show.salon.seats}, Preis: ${show.salon.price}€</p>
                            </div>
                        </label>`;
                })
                .join("")}
        </div>
        <button id="confirmSalon" class="btn-primary" style="margin-top: 20px;">Weiter</button>
    `;

    showModal(content);

    // Radio-Buttons mit Event Listenern versehen
    document.querySelectorAll("input[name='salon']").forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const selectedLabel = e.target.closest("label");
            document
                .querySelectorAll(".salon-option")
                .forEach((option) => option.classList.remove("selected"));
            selectedLabel.querySelector(".salon-option").classList.add("selected");
        });
    });

    // Salonauswahl bestätigen
    document.getElementById("confirmSalon").addEventListener("click", () => {
        const selectedSalon = document.querySelector("input[name='salon']:checked");
        if (selectedSalon) {
            showDateSelection(cinemaId, selectedSalon.value);
        } else {
            alert("Bitte wählen Sie einen Salon aus.");
        }
    });
}
