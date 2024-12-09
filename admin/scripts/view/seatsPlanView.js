import {
  saveCinemasToLocalStorage,
  loadCinemasFromLocalStorage,
} from "./stateManager.js";
import { cinemas as defaultCinemas } from "../data/Cinemas.js";

// Cinemaları LocalStorage'dan yükle
let cinemas = loadCinemasFromLocalStorage();
if (cinemas.length === 0) {
  cinemas = [...defaultCinemas];
  saveCinemasToLocalStorage(cinemas);
}

// Koltuk planı görünümünü oluştur
export function renderSeatPlanView() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
      <h2>Koltuk Yerleşimi</h2>
      <div class="controls">
          <label for="manualPercentage">Manuel Doluluk Oranı (%):</label>
          <input id="manualPercentage" type="number" placeholder="0-100" min="0" max="100">
          <button id="manualAssignButton">Manuel Doluluk</button>
          <button id="optimalAssignButton">Optimum Doluluk</button>
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
                        (seat) => seat.status === "dolu"
                      ).length;
                      const availableSeats = totalSeats - occupiedSeats;

                      return `
                              <div class="salon-container">
                                  <h4>${salon.name} (${totalSeats} Koltuk)</h4>
                                  <p>Dolu Koltuk: ${occupiedSeats}</p>
                                  <p>Boş Koltuk: ${availableSeats}</p>
                                  <div class="stage">Sahne</div>
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

  // Butonlara Event Listener ekleyin
  document.getElementById("manualAssignButton").onclick = () =>
    assignManualSeats();
  document.getElementById("optimalAssignButton").onclick = () =>
    assignOptimalSeats();
}

// Manuel doluluk atama// Manuel doluluk
export function assignManualSeats() {
  const manualPercentageInput = document.getElementById("manualPercentage");
  const manualPercentage = parseInt(manualPercentageInput.value, 10);

  // Kullanıcıdan alınan değeri kontrol edin
  if (
    isNaN(manualPercentage) ||
    manualPercentage < 0 ||
    manualPercentage > 100
  ) {
    alert("Lütfen 0 ile 100 arasında bir oran girin.");
    return;
  }

  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.showTimesSeats = salon.showTimesSeats || {}; // Eğer yoksa oluştur
      salon.showTimes.forEach((showTime) => {
        if (!salon.showTimesSeats[showTime]) {
          salon.showTimesSeats[showTime] = generateSeatsLayout(salon); // Koltuk yerleşimi oluştur
        }

        const seatsList = salon.showTimesSeats[showTime];
        const targetOccupiedSeats = Math.floor(
          salon.seats * (manualPercentage / 100)
        ); // Kullanıcı oranı
        let occupiedCount = 0;

        // Koltukları rastgele doldurun
        seatsList.forEach((seat) => {
          if (occupiedCount < targetOccupiedSeats) {
            seat.status = Math.random() < 0.5 ? "dolu" : "boş";
            if (seat.status === "dolu") occupiedCount++;
          } else {
            seat.status = "boş";
          }
        });

        salon.showTimesSeats[showTime] = seatsList; // Gösterim için kaydedin
      });
    });
  });

  saveCinemasToLocalStorage(cinemas);
  renderSeatPlanView();
}

// Optimum doluluk
export function assignOptimalSeats() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.showTimesSeats = salon.showTimesSeats || {}; // Eğer yoksa oluştur
      salon.showTimes.forEach((showTime) => {
        if (!salon.showTimesSeats[showTime]) {
          salon.showTimesSeats[showTime] = generateSeatsLayout(salon); // Koltuk yerleşimi oluştur
        }

        const seatsList = salon.showTimesSeats[showTime];
        const targetOccupiedSeats = Math.floor(salon.seats * 0.7); // %70 doluluk hedefi
        let occupiedCount = 0;

        // Koltukları rastgele şekilde doldur
        seatsList.forEach((seat) => {
          if (occupiedCount < targetOccupiedSeats) {
            seat.status = Math.random() < 0.7 ? "dolu" : "boş"; // %70 doluluk şansı
            if (seat.status === "dolu") occupiedCount++;
          }
        });

        salon.showTimesSeats[showTime] = seatsList; // Her gösterim için kaydet
      });
    });
  });
  saveCinemasToLocalStorage(cinemas);
  renderSeatPlanView();
}

export function generateSeatsLayout(salon) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Satır etiketleri
  const rows = Math.ceil(salon.seats / 10); // Her satırda 10 koltuk
  const seatsList = [];
  let seatIndex = 0;

  for (let i = 0; i < rows; i++) {
    const rowLabel = alphabet[i % alphabet.length]; // A, B, C...

    for (let j = 0; j < 10 && seatIndex < salon.seats; j++) {
      seatsList.push({
        row: rowLabel,
        number: j + 1,
        status: "boş", // Varsayılan olarak boş
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
          (seat) => seat.status === "dolu"
        ).length;
        totalSales += occupiedSeats * salon.price; // Dolu koltuk * fiyat
      });
    });
  });

  return totalSales;
}

// Global fonksiyonları tanımlayın
window.renderSeatPlanView = renderSeatPlanView;
window.assignManualSeats = assignManualSeats;
window.assignOptimalSeats = assignOptimalSeats;
window.generateSeatsLayout = generateSeatsLayout;
window.calculateDailySales = calculateDailySales;
