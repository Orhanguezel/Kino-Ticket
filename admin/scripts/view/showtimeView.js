import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { films as defaultFilms } from "../data/Film.js";

import {
  loadCinemasFromLocalStorage,
  saveCinemasToLocalStorage,
  loadFilmsFromLocalStorage,
  saveFilmsToLocalStorage,
} from "./stateManager.js";

import { assignRandomFilms, assignOptimalFilms } from "./filmAssignment.js";

let showtimes = JSON.parse(localStorage.getItem("showtimes")) || [];

// Wenn keine Kinos in LocalStorage, Standardkinos laden
let cinemas = loadCinemasFromLocalStorage();
if (cinemas.length === 0) {
  cinemas = [...defaultCinemas];
  saveCinemasToLocalStorage(cinemas);
}

// Wenn keine Filme in LocalStorage, Standardfilme laden
let films = loadFilmsFromLocalStorage();
if (films.length === 0) {
  films = [...defaultFilms];
  saveFilmsToLocalStorage(films);
}

// Zeigt die Vorstellung-Ansicht
export function renderShowtimeView() {
  const container = document.getElementById("main-content");

  // Grundstruktur der Seite
  container.innerHTML = `
    <h2>Vorstellungen</h2>

    <div class="showtime-controls">
      <h3>Massenzuweisung von Vorstellungen</h3>
      <button onclick="assignRandomFilms()">Zufällige Zuweisung</button>
      <button onclick="assignOptimalFilms()">Optimale Zuweisung</button>
    </div>
    <div class="current-showtimes-section">
      <h3>Aktuelle Vorstellungen</h3>
      <div id="current-showtimes">
        ${renderGroupedShowtimes()}
      </div>
    </div>

    <div class="add-showtime-section">
      <h3>Neue Vorstellung hinzufügen</h3>
      <form id="add-showtime-form">
        <label for="cinema-select">Kino:</label>
        <select id="cinema-select" required>
          ${cinemas
            .map(
              (cinema) => `<option value="${cinema.id}">${cinema.name}</option>`
            )
            .join("")}
        </select>
        
        <label for="salon-select">Salon:</label>
        <select id="salon-select" required>
          <option value="">Wählen Sie zuerst ein Kino aus</option>
        </select>
        
        <label for="film-select">Film:</label>
        <select id="film-select" required>
          ${films
            .map((film) => `<option value="${film.id}">${film.name}</option>`)
            .join("")}
        </select>
        
        <label for="showtime-input">Vorstellungszeiten:</label>
        <div id="showtime-list"></div>
        <input type="time" id="showtime-input">
        <button type="button" id="add-showtime-button">Zeit hinzufügen</button>
        
        <button type="button" onclick="addShowtime()">Speichern</button>
      </form>
    </div>
  `;

  // Aktualisiert Salons dynamisch
  const cinemaSelect = document.getElementById("cinema-select");
  const salonSelect = document.getElementById("salon-select");

  cinemaSelect.addEventListener("change", () => {
    const selectedCinemaId = parseInt(cinemaSelect.value, 10);
    const selectedCinema = cinemas.find(
      (cinema) => cinema.id === selectedCinemaId
    );

    if (selectedCinema) {
      salonSelect.innerHTML = selectedCinema.salons
        .map((salon) => `<option value="${salon.type}">${salon.name}</option>`)
        .join("");
    }
  });

  // Vorstellung Zeit hinzufügen
  const addShowtimeButton = document.getElementById("add-showtime-button");
  const showtimeList = document.getElementById("showtime-list");

  addShowtimeButton.addEventListener("click", () => {
    const showtimeInput = document.getElementById("showtime-input");
    const time = showtimeInput.value;

    if (time) {
      const timeDiv = document.createElement("div");
      timeDiv.className = "showtime-item";
      timeDiv.innerHTML = `
        <span>${time}</span>
        <button type="button" class="remove-showtime-button">Entfernen</button>
      `;

      // Entfernen der Zeit
      timeDiv
        .querySelector(".remove-showtime-button")
        .addEventListener("click", () => {
          timeDiv.remove();
        });

      showtimeList.appendChild(timeDiv);
      showtimeInput.value = ""; // Eingabe löschen
    } else {
      alert("Bitte wählen Sie eine Zeit aus!");
    }
  });

  // Standardmäßig die ersten Salons laden
  cinemaSelect.dispatchEvent(new Event("change"));
}

// Gruppierte Vorstellungen rendern
function renderGroupedShowtimes() {
  const cinemaGroups = {};
  showtimes.forEach((showtime) => {
    if (!cinemaGroups[showtime.cinemaName]) {
      cinemaGroups[showtime.cinemaName] = [];
    }
    cinemaGroups[showtime.cinemaName].push(showtime);
  });

  return Object.keys(cinemaGroups)
    .map((cinemaName) => {
      const cinemaShowtimes = cinemaGroups[cinemaName];
      return `
        <h3>${cinemaName}</h3>
        <table>
          <thead>
            <tr>
              <th>Salon</th>
              <th>Film</th>
              <th>Vorstellungszeiten</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            ${cinemaShowtimes
              .map(
                (showtime) => `
                <tr>
                  <td>${showtime.salonName}</td>
                  <td>${showtime.filmName}</td>
                  <td>${showtime.times.join(", ")}</td>
                  <td>
                    <button onclick="editShowtime(${showtimes.indexOf(
                      showtime
                    )})">Bearbeiten</button>
                    <button onclick="removeShowtime(${showtimes.indexOf(
                      showtime
                    )})">Löschen</button>
                  </td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      `;
    })
    .join("");
}

// Funktion fügt eine Vorstellung hinzu
export function addShowtime() {
  const cinemaId = parseInt(document.getElementById("cinema-select").value, 10);
  const salonType = parseInt(document.getElementById("salon-select").value, 10);
  const filmId = parseInt(document.getElementById("film-select").value, 10);

  const cinema = cinemas.find((cinema) => cinema.id === cinemaId);
  const salon = cinema?.salons.find((salon) => salon.type === salonType);
  const film = films.find((film) => film.id === filmId);

  const times = Array.from(
    document.querySelectorAll("#showtime-list .showtime-item span")
  ).map((span) => span.textContent);

  if (!cinema || !salon || !film || times.length === 0) {
    alert("Bitte füllen Sie alle Felder aus und fügen Sie mindestens eine Zeit hinzu!");
    return;
  }

  const newShowtime = {
    cinemaId,
    cinemaName: cinema.name,
    salonType,
    salonName: salon.name,
    filmId,
    filmName: film.name,
    times,
  };

  showtimes.push(newShowtime);
  localStorage.setItem("showtimes", JSON.stringify(showtimes));

  alert("Vorstellung erfolgreich hinzugefügt!");
  renderShowtimeView();
}

// Weitere Funktionen (editShowtime, saveShowtimeChanges) ebenfalls Almanca angepasst.
