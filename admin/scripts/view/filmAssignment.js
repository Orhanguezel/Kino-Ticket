import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { films as defaultFilms } from "../data/Film.js";

import {
  loadCinemasFromLocalStorage,
  loadFilmsFromLocalStorage,
} from "./stateManager.js";

// LocalStorage'dan Vorführungen yükleyin veya boş bir dizi oluşturun
let showtimes = JSON.parse(localStorage.getItem("showtimes")) || [];

// Kinos ve Filme LocalStorage'dan yükleyin
let cinemas = loadCinemasFromLocalStorage();
let films = loadFilmsFromLocalStorage();

// Eğer LocalStorage'da veri yoksa, varsayılan değerlere dön
if (!cinemas.length) {
  const { cinemas: defaultCinemas } = require("../data/Cinemas.js");
  cinemas = [...defaultCinemas];
}

if (!films.length) {
  const { films: defaultFilms } = require("../data/Film.js");
  films = [...defaultFilms];
}

// Zufällige Filme zuweisen
export function assignRandomFilms() {
  showtimes = [];
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      const randomShowTimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];

      showtimes.push({
        cinemaId: cinema.id,
        cinemaName: cinema.name,
        salonName: salon.name,
        filmId: randomFilm.id,
        filmName: randomFilm.name,
        times: randomShowTimes,
      });
    });
  });

  localStorage.setItem("showtimes", JSON.stringify(showtimes));
  renderShowtimeView();
}

export function assignOptimalFilms() {
  showtimes = [];
  const sortedFilms = [...films].sort((a, b) => b.duration - a.duration);

  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon, index) => {
      const film = sortedFilms[index % sortedFilms.length];
      const optimalShowTimes = ["11:00", "14:00", "17:00", "20:00"];

      showtimes.push({
        cinemaId: cinema.id,
        cinemaName: cinema.name,
        salonName: salon.name,
        filmId: film.id,
        filmName: film.name,
        times: optimalShowTimes,
      });
    });
  });

  localStorage.setItem("showtimes", JSON.stringify(showtimes));
  renderShowtimeView();
}

// Vorführungsreihen rendern
function renderShowtimeRows() {
  return showtimes
    .map(
      (showtime, index) => `
      <tr>
        <td>${showtime.cinemaName}</td>
        <td>${showtime.salonName}</td>
        <td>${showtime.filmName}</td>
        <td>${showtime.times.join(", ")}</td>
        <td>
          <button onclick="editShowtime(${index})">Bearbeiten</button>
          <button onclick="removeShowtime(${index})">Löschen</button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Vorführungsansicht rendern
export function renderShowtimeView() {
  const container = document.getElementById("main-content");

  container.innerHTML = `
    <h2>Vorführungen</h2>
    <div class="add-showtime-section">
      <h3>Neue Vorführung Hinzufügen</h3>
      <form id="add-showtime-form">
        <label for="cinema-select">Kino:</label>
        <select id="cinema-select" required>
          ${cinemas
            .map(
              (cinema) => `<option value="${cinema.id}">${cinema.name}</option>`
            )
            .join("")}
        </select>
        
        <label for="salon-select">Saal:</label>
        <select id="salon-select" required>
          <option value="">Wählen Sie zuerst ein Kino</option>
        </select>
        
        <label for="film-select">Film:</label>
        <select id="film-select" required>
          ${films
            .map((film) => `<option value="${film.id}">${film.name}</option>`)
            .join("")}
        </select>
        
        <label for="showtime-input">Vorführungszeiten:</label>
        <div id="showtime-list"></div>
        <input type="time" id="showtime-input">
        <button type="button" id="add-showtime-button">Zeit Hinzufügen</button>
        
        <button type="button" onclick="addShowtime()">Speichern</button>
      </form>
    </div>
    <div class="showtime-bulk-actions">
      <h3>Vorführungen Massenweise Zuweisen</h3>
      <button onclick="assignRandomFilms()">Zufällige Zuweisung</button>
      <button onclick="assignOptimalFilms()">Optimale Zuweisung</button>
    </div>
    <div class="current-showtimes-section">
      <h3>Aktuelle Vorführungen</h3>
      <table>
        <thead>
          <tr>
            <th>Kino</th>
            <th>Saal</th>
            <th>Film</th>
            <th>Vorführungszeiten</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody id="showtime-table">
          ${renderShowtimeRows()}
        </tbody>
      </table>
    </div>
  `;

  // Standardmäßig die Säle des ersten Kinos laden
  const cinemaSelect = document.getElementById("cinema-select");
  cinemaSelect.dispatchEvent(new Event("change"));
}

// Global machen
window.assignRandomFilms = assignRandomFilms;
window.assignOptimalFilms = assignOptimalFilms;
window.renderShowtimeView = renderShowtimeView;
