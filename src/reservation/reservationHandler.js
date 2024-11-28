import { showSalonSelection } from "./salonSelection.js";
import { cinemas } from "../data/cinemas.js";
import { getCinemaShows } from "../data/filmsData.js";

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
            // Eğer film zaten eklendiyse, listeye ekleme
            if (uniqueFilms.has(show.film.id)) {
              return false;
            }
            uniqueFilms.add(show.film.id);
            return true;
          })
          .map(
            (show) => `
                <label class="film-label">
                    <input type="radio" name="film" value="${show.film.id}" class="film-radio">
                    <img src="${show.film.image}" alt="${show.film.name}" class="film-image">
                    <div class="film-name">${show.film.name}</div>
                </label>
            `
          )
          .join("")}
    </div>
    <div id="salonSelection" class="salon-selection"></div>
  `;

  // Radyo butonlarına olay dinleyicileri ekle
  const filmRadios = document.querySelectorAll(".film-radio");
  filmRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const filmId = parseInt(e.target.value, 10);
      if (!filmId) {
        alert("Geçersiz film seçimi!");
        return;
      }
      showSalonSelection(cinemaId, filmId);
    });
  });
}
