import { cinemas } from "./Cinema.js";
import { getCinemaShows, getCinemaSalons } from "./filmsData.js";

export function startReservation(cinemaId) {
    const selectedCinema = cinemas.find((c) => c.id === cinemaId);
    const cinemaShows = getCinemaShows(cinemaId);
    const home = document.getElementById("home");

    // Tekrarlanan film ID'lerini takip etmek için bir Set kullanıyoruz
    const uniqueFilms = new Set();

    home.innerHTML = `
        <h2>Buchung oder Reservierung - ${selectedCinema.name}</h2>
        <p>Film wählen:</p>
        <div id="filmOptions" style="display: flex; flex-wrap: wrap; gap: 20px;">
            ${cinemaShows
                .filter((show) => {
                    // Eğer film zaten eklendiyse, false döner ve onu listeye eklemez
                    if (uniqueFilms.has(show.film.id)) {
                        return false;
                    }
                    uniqueFilms.add(show.film.id);
                    return true;
                })
                .map(
                    (show) => `
                    <label style="text-align: center; max-width: 150px;">
                        <input type="radio" name="film" value="${show.film.id}" style="display: none;">
                        <img src="${show.film.image}" alt="${show.film.name}" style="width: 100%; cursor: pointer; border: 1px solid #ccc; border-radius: 5px;">
                        <div>${show.film.name}</div>
                    </label>
                `
                )
                .join("")}
        </div>
        <div id="salonSelection" style="margin-top: 20px;"></div>
    `;

    // Radyo butonlarına olay dinleyicileri ekle
    const filmRadios = document.querySelectorAll("#filmOptions input[type='radio']");
    filmRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const filmId = parseInt(e.target.value, 10);
            showSalonSelection(cinemaId, filmId);
        });
    });
}


function showSalonSelection(cinemaId, filmId) {
    const cinemaShows = getCinemaShows(cinemaId).filter((show) => show.film.id === filmId);
    const salonContainer = document.getElementById("salonSelection");

    if (!cinemaShows || cinemaShows.length === 0) {
        salonContainer.innerHTML = `<p>Keine Salons für diesen Film verfügbar.</p>`;
        return;
    }

    salonContainer.innerHTML = `
        <h3>Salons für den Film:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
            ${cinemaShows
                .map((show) => {
                    if (!show.salon) {
                        console.error("Salon-Daten fehlen:", show);
                        return `<p>Fehler: Salon-Daten nicht verfügbar.</p>`;
                    }
                    return `
                        <label style="text-align: center; max-width: 150px; cursor: pointer;">
                            <input type="radio" name="salon" value="${show.salon.id}" style="display: none;">
                            <div class="salon-option">
                                <img src="./assets/salons/${show.salon.image}" alt="${show.salon.name}" style="width: 100%; cursor: pointer; border: 1px solid #ccc; border-radius: 5px;">
                                <div>${show.salon.name} - ${show.time}</div>
                                <p>Kapasität: ${show.salon.seats}, Preis: ${show.salon.price}€</p>
                            </div>
                        </label>`;
                })
                .join("")}
        </div>
        <button id="confirmSalon" class="btn-primary" style="margin-top: 20px;">Weiter</button>
    `;

    document.querySelectorAll("input[name='salon']").forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const selectedLabel = e.target.closest("label");
            document.querySelectorAll(".salon-option").forEach((option) =>
                option.classList.remove("selected")
            );
            selectedLabel.querySelector(".salon-option").classList.add("selected");
        });
    });

    document.getElementById("confirmSalon").addEventListener("click", () => {
        const selectedSalon = document.querySelector("input[name='salon']:checked");
        if (selectedSalon) {
            alert(`Salon ${selectedSalon.value} wurde ausgewählt!`);
        } else {
            alert("Bitte wählen Sie einen Salon aus.");
        }
    });
}



function showSessionSelection(cinemaId, salonId) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    const salon = getCinemaSalons(cinemaId).find((s) => s.id === salonId);
    const home = document.getElementById("home");

    home.innerHTML = `
        <h2>${cinema.name} - ${salon.name}</h2>
        <p>Wählen Sie ein Datum und eine Uhrzeit für die Sitzung:</p>
        <form id="sessionForm">
            <label for="dateSelect">Datum:</label>
            <input type="date" id="dateSelect" required>
            
            <label for="timeSelect">Uhrzeit:</label>
            <select id="timeSelect" required>
                <option value="">Uhrzeit wählen...</option>
                ${salon.shows
                    .map(
                        (show) =>
                            `<option value="${show.time}">${show.time}</option>`
                    )
                    .join("")}
            </select>
            <button type="button" id="proceedToSeats" class="btn-primary">Weiter</button>
        </form>
    `;

    document.getElementById("proceedToSeats").addEventListener("click", () => {
        const selectedDate = document.getElementById("dateSelect").value;
        const selectedTime = document.getElementById("timeSelect").value;

        if (!selectedDate || !selectedTime) {
            alert("Bitte wählen Sie ein gültiges Datum und eine Uhrzeit.");
            return;
        }

        showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
    });
}

// Diğer fonksiyonlar (örneğin `showSeatSelection`) burada devam eder...





// Koltuk Seçimi ve Detaylar
function showSeatSelection(cinemaId, salonId, selectedDate, selectedTime) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    const salon = getCinemaSalons(cinemaId).find((s) => s.id === salonId);
    const home = document.getElementById("home");

    const rows = Math.ceil(salon.seats / 10);
    const seats = Array.from({ length: salon.seats }, (_, i) => ({
        id: i + 1,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        occupied: Math.random() > 0.7,
    }));

    home.innerHTML = `
        <h2>${cinema.name} - ${salon.name}</h2>
        <p>Sitzplätze für den ${selectedDate} um ${selectedTime}:</p>
        <div class="screen">Bühne</div>
        <div class="seat-plan">
            ${seats
                .map(
                    (seat, index) =>
                        (index % 10 === 0
                            ? `<div class="row-label">${seat.row}</div>`
                            : "") +
                        `<button class="seat ${
                            seat.occupied ? "occupied" : "available"
                        }" data-id="${seat.row}${seat.id % 10 || 10}" ${
                            seat.occupied ? "disabled" : ""
                        }></button>`
                )
                .join("")}
        </div>
        <button id="confirmSeats" class="btn-primary">Bestätigen</button>
    `;

    const selectedSeats = new Set();

    document.querySelectorAll(".seat.available").forEach((button) =>
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            if (selectedSeats.has(id)) {
                selectedSeats.delete(id);
                e.target.classList.remove("selected");
            } else {
                selectedSeats.add(id);
                e.target.classList.add("selected");
            }
        })
    );

    document.getElementById("confirmSeats").addEventListener("click", () => {
        if (selectedSeats.size === 0) {
            alert("Bitte wählen Sie mindestens einen Sitzplatz aus.");
            return;
        }

        enterDetails(
            Array.from(selectedSeats),
            cinema,
            salon,
            selectedDate,
            selectedTime
        );
    });
}

// Koltuk Detayları Girişi
function enterDetails(selectedSeats, cinema, salon, selectedDate, selectedTime) {
    const home = document.getElementById("home");
    home.innerHTML = `
        <h2>${cinema.name} - ${salon.name}</h2>
        <p>Geben Sie die Details für die ausgewählten Sitzplätze ein:</p>
        <form id="seatDetailsForm">
            ${selectedSeats
                .map(
                    (seat, index) => `
                    <div>
                        <h3>Sitzplatz ${seat}</h3>
                        <label for="name${index}">Vorname:</label>
                        <input type="text" id="name${index}" required>
                        
                        <label for="surname${index}">Nachname:</label>
                        <input type="text" id="surname${index}" required>
                        
                        <label for="ageCategory${index}">Kategorie:</label>
                        <select id="ageCategory${index}">
                            <option value="adult">Erwachsener</option>
                            <option value="child">Kind</option>
                        </select>
                    </div>
                `
                )
                .join("")}
            <button type="button" id="addToCart">In den Warenkorb legen</button>
        </form>
    `;

    document.getElementById("addToCart").addEventListener("click", () => {
        finalizeReservation(
            selectedSeats,
            cinema,
            salon,
            selectedDate,
            selectedTime
        );
    });
}


// Rezervasyonu Tamamlama

function finalizeReservation(
    selectedSeats,
    cinema,
    salon,
    selectedDate,
    selectedTime
) {
    const reservationDetails = selectedSeats.map((seat, index) => ({
        seat,
        name: document.getElementById(`name${index}`).value,
        surname: document.getElementById(`surname${index}`).value,
        ageCategory: document.getElementById(`ageCategory${index}`).value,
        date: selectedDate,
        time: selectedTime,
    }));

    reservationDetails.forEach((detail) => {
        cart.push({
            cinema: cinema.name,
            salon: salon.name,
            seat: detail.seat,
            name: detail.name,
            surname: detail.surname,
            category: detail.ageCategory,
            date: detail.date,
            time: detail.time,
        });
    });

    showCart();
}

// Sepet İşlemleri
function showCart() {
    const home = document.getElementById("home");
    home.innerHTML = `
        <h2>Warenkorb</h2>
        ${cart
            .map(
                (item) => `
                <div>
                    <p><strong>Kino:</strong> ${item.cinema}</p>
                    <p><strong>Salon:</strong> ${item.salon}</p>
                    <p><strong>Sitzplatz:</strong> ${item.seat}</p>
                    <p><strong>Name:</strong> ${item.name} ${item.surname}</p>
                    <p><strong>Kategorie:</strong> ${
                        item.category === "child" ? "Kind" : "Erwachsener"
                    }</p>
                    <p><strong>Datum:</strong> ${item.date}</p>
                    <p><strong>Uhrzeit:</strong> ${item.time}</p>
                </div>
            `
            )
            .join("")}
        <button class="btn-primary" onclick="proceedToCheckout()">Weiter zur Kasse</button>
    `;
}

