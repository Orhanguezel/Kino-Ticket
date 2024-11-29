import { getCinemaShows } from "../data/filmsData.js";
import { showDateSelection } from "./dateSelection.js";

export function showSalonSelection(cinemaId, filmId) {
  // Gösterimleri al
  if (!cinemaId || !filmId) {
    console.error("Geçersiz cinemaId veya filmId:", { cinemaId, filmId });
    alert("Salon seçimi için geçersiz parametreler!");
    return;
  }

  const cinemaShows = getCinemaShows(cinemaId).filter(
    (show) => show.film.id === filmId
  );
  const salonContainer = document.getElementById("salonSelection");

  // Gösterim yoksa kullanıcıyı bilgilendir
  if (!cinemaShows || cinemaShows.length === 0) {
    salonContainer.innerHTML = `<p>Keine Salons für diesen Film verfügbar.</p>`;
    return;
  }

  // Salon seçeneklerini oluştur
  salonContainer.innerHTML = `
    <h3>Salons für den Film:</h3>
    <div class="salon-list" style="display: flex; flex-wrap: wrap; gap: 20px;">
        ${cinemaShows
          .map((show) => {
            if (!show.salon) {
              console.error("Eksik salon verisi:", show);
              return `<p>Fehler: Salon-Daten nicht verfügbar.</p>`;
            }
            return `
                <label class="salon-label" style="text-align: center; max-width: 150px; cursor: pointer;">
                    <input type="radio" name="salon" value="${show.salon.id}" style="display: none;">
                    <div class="salon-option">
                        <img src="./assets/salons/${show.salon.image}" alt="${show.salon.name}" class="salon-image" style="width: 100%; cursor: pointer; border: 1px solid #ccc; border-radius: 5px;">
                        <div>${show.salon.name} - ${show.time}</div>
                        <p>Kapasität: ${show.salon.seats}, Preis: ${show.salon.price}€</p>
                    </div>
                </label>`;
          })
          .join("")}
    </div>
    <button id="confirmSalon" class="btn-primary" style="margin-top: 20px;">Weiter</button>  //// WEITER BUTTON
  `;

  // Radio butonlarına olay dinleyicileri ekle
  document.querySelectorAll("input[name='salon']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const selectedLabel = e.target.closest("label");
      document
        .querySelectorAll(".salon-option")
        .forEach((option) => option.classList.remove("selected"));
      selectedLabel.querySelector(".salon-option").classList.add("selected");
    });
  });

  // Salon seçimini onayla
  document.getElementById("confirmSalon").addEventListener("click", () => {
    const selectedSalon = document.querySelector("input[name='salon']:checked");
    if (selectedSalon) {
        showDateSelection(cinemaId, selectedSalon.value);
    } else {
        alert("Bitte wählen Sie einen Salon aus.");
    }
});

}
