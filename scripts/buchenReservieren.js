import { cinemas } from './script.js';

export function startReservation(cinemaId) {
    const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);

    if (!selectedCinema) {
        console.error("Sinema bulunamadı.");
        return;
    }

    const home = document.getElementById("home");

    home.innerHTML = `
        <h2>Buchung oder Reservierung - ${selectedCinema.name}</h2>
        <p>Bitte treffen Sie Ihre Auswahl:</p>
        <form id="reservationForm">
            <div>
                <label for="filmSelect">Film wählen:</label>
                <select id="filmSelect">
                    <option value="">Film auswählen...</option>
                    ${selectedCinema.shows
                        .map(
                            (show) => `
                        <option value="${show.film.id}">
                            ${show.film.name} (${show.time})
                        </option>`
                        )
                        .join("")}
                </select>
            </div>
            <div>
                <label for="seatCount">Anzahl der Sitze:</label>
                <input type="number" id="seatCount" min="1" max="10" placeholder="1-10" required>
            </div>
            <div>
                <label for="customerType">Kundentyp:</label>
                <select id="customerType">
                    <option value="adult">Erwachsener</option>
                    <option value="student">Student</option>
                </select>
            </div>
            <button type="button" id="confirmReservationButton">Weiter</button>
            <button type="button" id="cancelReservationButton">Abbrechen</button>
        </form>
    `;

    document
        .getElementById("confirmReservationButton")
        .addEventListener("click", () => confirmReservation(cinemaId));

    document
        .getElementById("cancelReservationButton")
        .addEventListener("click", () => import("./script.js").then(module => module.selectCinema(cinemaId)));
}

function confirmReservation(cinemaId) {
    const filmId = document.getElementById("filmSelect").value;
    const seatCount = document.getElementById("seatCount").value;
    const customerType = document.getElementById("customerType").value;

    if (!filmId || !seatCount || !customerType) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
    }

    console.log("Reservation Confirmed!", { cinemaId, filmId, seatCount, customerType });
}
