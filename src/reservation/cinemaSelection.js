import { cineGroupInfo, cinemas } from "../data/cinemas.js";
import { loadHeader } from "../components/header.js";
import { startReservation } from "./reservationHandler.js";

export function selectCinema(cinemaId) {
  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    console.error(`Cinema with ID ${cinemaId} not found.`);
    return;
  }

  // Seçilen sinemayı kaydet
  localStorage.setItem("selectedCinema", JSON.stringify(cinema));

  // Header ve Main Content güncelle
  loadHeader(cinema);
  setupMainContent(cinema);
}

export function getSelectedCinema() {
  const storedCinema = localStorage.getItem("selectedCinema");
  return storedCinema ? JSON.parse(storedCinema) : cineGroupInfo;
}

export function setupMainContent(cinema) {
  const mainContent = document.getElementById("mainContent");

  if (!mainContent) return;

  // Varsayılan sinema bilgisi kullan
  cinema = cinema || getSelectedCinema();

  mainContent.innerHTML = `
    ${
      cinema.name
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
                  (cinema) =>
                    `<button class="btn-primary cinema-select" data-id="${cinema.id}">${cinema.name}</button>`
                )
                .join("")}
          </div>
        </div>
      `
    }
  `;

  mainContent.style.backgroundImage = `url('${
    cinema.backgroundImage || "./assets/cinema/default-bg.jpg"
  }')`;
  mainContent.style.backgroundSize = "cover";
  mainContent.style.backgroundPosition = "center";
  mainContent.style.backgroundAttachment = "fixed";
  mainContent.style.transition = "background-image 0.5s ease-in-out";

  // Dinamik sinema seçimi için butonları bağla
  setupCinemaSelection();

  // Geri dönüş butonuna event listener ekle
  const toMainPageButton = document.getElementById("toMainPageButton");
  if (toMainPageButton) {
    toMainPageButton.addEventListener("click", () => {
      localStorage.removeItem("selectedCinema");
      loadHeader(); // Varsayılan header
      setupMainContent(cineGroupInfo); // Varsayılan içerik
    });
  }

  // Rezervasyon başlatma butonuna event listener ekle
  const startReservationButton = document.getElementById("startReservationButton");
  if (startReservationButton) {
    startReservationButton.addEventListener("click", () => {
      if (cinema) {
        console.log(`Reservation started for cinema: ${cinema.name}`);
        startReservation(cinema.id); // Rezervasyonu başlat
      } else {
        console.error("No cinema selected for reservation.");
      }
    });
  }
}

// Sinema seçimi için butonları ayarla
function setupCinemaSelection() {
  document.querySelectorAll(".cinema-select").forEach((button) =>
    button.addEventListener("click", (e) => {
      const cinemaId = e.target.dataset.id; 
      if (cinemaId) {
        selectCinema(parseInt(cinemaId)); // Sadece sinema seçimi
      }
    })
  );
}
