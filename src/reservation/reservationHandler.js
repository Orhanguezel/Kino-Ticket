import { cinemas } from "../data/cinemas.js";
import { getCinemaShows } from "../data/filmsData.js";
import { showModal } from "./modal.js";
import { showDateSelection } from "./dateSelection.js";

export function startReservation(cinemaId) {
  // Sinema seçimini bul
  const selectedCinema = cinemas.find((c) => c.id === cinemaId);
  if (!selectedCinema) {
    alert("Seçilen sinema bulunamadı!");
    console.error(`Geçersiz cinemaId: ${cinemaId}`);
    return;
  }

  // Gösterim verilerini al
  const cinemaShows = getCinemaShows(cinemaId);
  if (!cinemaShows || cinemaShows.length === 0) {
    alert("Bu sinema için gösterim bulunamadı!");
    return;
  }

  // Tekrarlanan film ID'lerini takip etmek için bir Set kullanıyoruz
  const uniqueFilms = new Set();
  const home = document.getElementById("home");

  // Ana içerik
  home.innerHTML = `
    <h2>Buchung oder Reservierung - ${selectedCinema.name}</h2>
    <p>Film wählen:</p>
    <div id="filmOptions" class="film-options">
        ${cinemaShows
          .filter((show) => {
            if (uniqueFilms.has(show.film.id)) {
              return false;
            }
            uniqueFilms.add(show.film.id);
            return true;
          })
          .map(
            (show) => `
                <div class="film-card">
                    <img src="${show.film.image}" alt="${show.film.name}" class="film-image" data-id="${show.film.id}">
                    <div class="film-name">${show.film.name}</div>
                </div>
            `
          )
          .join("")}
    </div>
  `;

  // Film kartlarına tıklama olayları ekle
  const filmCards = document.querySelectorAll(".film-image");
  filmCards.forEach((filmCard) => {
    filmCard.addEventListener("click", (e) => {
      const filmId = parseInt(e.target.dataset.id, 10);
      if (!filmId) {
        alert("Geçersiz film seçimi!");
        return;
      }

      // Seçilen filmin gösterimlerini bul
      const selectedFilmShows = cinemaShows.filter(
        (show) => show.film.id === filmId
      );

      // Modal içeriği oluştur
      const modalContent = `
        <h3>Salons für den Film: ${selectedFilmShows[0].film.name}</h3>
        <div class="salon-cards">
            ${selectedFilmShows
              .map(
                (show) => `
                  <div class="salon-card">
                    <img src="./assets/salons/${show.salon.image}" alt="${show.salon.name}" class="salon-image">
                    <div class="salon-details">
                      <h4>${show.salon.name}</h4>
                      <p>Uhrzeit: ${show.time}</p>
                      <button class="btn-primary select-salon" data-id="${show.salon.id}" data-time="${show.time}">Auswählen</button>
                    </div>
                  </div>
                `
              )
              .join("")}
        </div>
      `;

      // Modalı göster
      showModal(modalContent);

      // Salon seçim butonlarına tıklama olayları ekle
      document.querySelectorAll(".select-salon").forEach((button) => {
        button.addEventListener("click", (e) => {
          const salonId = e.target.dataset.id;
          const time = e.target.dataset.time;
          console.log(`Salon ID: ${salonId}, Zeit: ${time}`);

          // Modalı kapat
          document.querySelector(".overlay").remove();
          document.querySelector(".modal").remove();

          // Tarih seçimi ekranına yönlendirme
          showDateSelection(cinemaId, salonId);
        });
      });
    });
  });
}
