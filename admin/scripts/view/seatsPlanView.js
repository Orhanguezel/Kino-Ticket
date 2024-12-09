import {
  saveCinemasToLocalStorage,
  loadCinemasFromLocalStorage,
} from "./stateManager.js";
import { cinemas as defaultCinemas } from "../data/Cinemas.js";

// Kinos aus LocalStorage laden
let cinemas = loadCinemasFromLocalStorage();
if (cinemas.length === 0) {
  cinemas = [...defaultCinemas];
  saveCinemasToLocalStorage(cinemas);
}

// Sitzplan-Ansicht rendern
export function renderSeatPlanView() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
      <h2>Sitzplatzanordnung</h2>
      <div class="controls">
          <label for="manualPercentage">Manuelle Auslastung (%) :</label>
          <input id="manualPercentage" type="number" placeholder="0-100" min="0" max="100">
          <button id="manualAssignButton">Manuelle Zuweisung</button>
          <button id="optimalAssignButton">Optimale Auslastung</button>
      </div>
      ${cinemas
        .map(
          (cinema) => `
              <div class="cinema-container">
                  <h3>${cinema.name}</h3>
                  ${cinema.salons
                    .map((salon) => {
                      if (
                        !Array.isArray(salon.showTimesSeats[salon.showTimes[0]])
                      ) {
                        salon.showTimesSeats[salon.showTimes[0]] =
                          generateSeatsLayout(salon);
                      }

                      const seatsList =
                        salon.showTimesSeats[salon.showTimes[0]];
                      const totalSeats = salon.seats;
                      const occupiedSeats = seatsList.filter(
                        (seat) => seat.status === "besetzt"
                      ).length;
                      const availableSeats = totalSeats - occupiedSeats;

                      return `
                              <div class="salon-container">
                                  <h4>${salon.name} (${totalSeats} Plätze)</h4>
                                  <p>Besetzte Plätze: ${occupiedSeats}</p>
                                  <p>Freie Plätze: ${availableSeats}</p>
                                  <div class="stage">Bühne</div>
                                  <div class="seats-grid">
                                      ${seatsList
                                        .map(
                                          (seat) => `
                                              <span class="seat ${seat.status}" title="${seat.row}${seat.number}">
                                                  ${seat.row}${seat.number}
                                              </span>
                                          `
                                        )
                                        .join("")}
                                  </div>
                              </div>
                          `;
                    })
                    .join("")}
              </div>
          `
        )
        .join("")}
  `;

  // Event Listeners hinzufügen
  document.getElementById("manualAssignButton").onclick = () =>
    assignManualSeats();
  document.getElementById("optimalAssignButton").onclick = () =>
    assignOptimalSeats();
}

// Manuelle Zuweisung
export function assignManualSeats() {
  const manualPercentageInput = document.getElementById("manualPercentage");
  const manualPercentage = parseInt(manualPercentageInput.value, 10);

  // Überprüfen Sie den Benutzerwert
  if (
    isNaN(manualPercentage) ||
    manualPercentage < 0 ||
    manualPercentage > 100
  ) {
    alert("Bitte geben Sie einen Wert zwischen 0 und 100 ein.");
    return;
  }

  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.showTimesSeats = salon.showTimesSeats || {}; // Falls nicht vorhanden, erstellen
      salon.showTimes.forEach((showTime) => {
        if (!salon.showTimesSeats[showTime]) {
          salon.showTimesSeats[showTime] = generateSeatsLayout(salon); // Sitzlayout erstellen
        }

        const seatsList = salon.showTimesSeats[showTime];
        const targetOccupiedSeats = Math.floor(
          salon.seats * (manualPercentage / 100)
        ); // Benutzeranteil
        let occupiedCount = 0;

        // Sitzplätze zufällig belegen
        seatsList.forEach((seat) => {
          if (occupiedCount < targetOccupiedSeats) {
            seat.status = Math.random() < 0.5 ? "besetzt" : "frei";
            if (seat.status === "besetzt") occupiedCount++;
          } else {
            seat.status = "frei";
          }
        });

        salon.showTimesSeats[showTime] = seatsList; // Speichern
      });
    });
  });

  saveCinemasToLocalStorage(cinemas);
  renderSeatPlanView();
}

// Optimale Zuweisung
export function assignOptimalSeats() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.showTimesSeats = salon.showTimesSeats || {}; // Falls nicht vorhanden, erstellen
      salon.showTimes.forEach((showTime) => {
        if (!salon.showTimesSeats[showTime]) {
          salon.showTimesSeats[showTime] = generateSeatsLayout(salon); // Sitzlayout erstellen
        }

        const seatsList = salon.showTimesSeats[showTime];
        const targetOccupiedSeats = Math.floor(salon.seats * 0.7); // 70% Belegung
        let occupiedCount = 0;

        // Sitzplätze zufällig belegen
        seatsList.forEach((seat) => {
          if (occupiedCount < targetOccupiedSeats) {
            seat.status = Math.random() < 0.7 ? "besetzt" : "frei"; // 70% Wahrscheinlichkeit
            if (seat.status === "besetzt") occupiedCount++;
          }
        });

        salon.showTimesSeats[showTime] = seatsList; // Speichern
      });
    });
  });
  saveCinemasToLocalStorage(cinemas);
  renderSeatPlanView();
}

export function generateSeatsLayout(salon) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Reihenbeschriftung
  const rows = Math.ceil(salon.seats / 10); // 10 Sitzplätze pro Reihe
  const seatsList = [];
  let seatIndex = 0;

  for (let i = 0; i < rows; i++) {
    const rowLabel = alphabet[i % alphabet.length]; // A, B, C...

    for (let j = 0; j < 10 && seatIndex < salon.seats; j++) {
      seatsList.push({
        row: rowLabel,
        number: j + 1,
        status: "frei", // Standardmäßig frei
      });
      seatIndex++;
    }
  }

  return seatsList;
}

export function calculateDailySales() {
  let totalSales = 0;

  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.showTimes.forEach((showTime) => {
        const seatsList = salon.showTimesSeats[showTime];
        const occupiedSeats = seatsList.filter(
          (seat) => seat.status === "besetzt"
        ).length;
        totalSales += occupiedSeats * salon.price; // Besetzte Sitzplätze * Preis
      });
    });
  });

  return totalSales;
}

// Globale Funktionen definieren
window.renderSeatPlanView = renderSeatPlanView;
window.assignManualSeats = assignManualSeats;
window.assignOptimalSeats = assignOptimalSeats;
window.generateSeatsLayout = generateSeatsLayout;
window.calculateDailySales = calculateDailySales;
