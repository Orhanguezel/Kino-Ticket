import { getCinemaSalons } from "../data/filmsData.js";
import { cinemas } from "../data/cinemas.js";
import { showSeatSelection } from "./seatSelection.js";

export function showDateSelection(cinemaId, salonId) {
  //console.log(`showDateSelection aufgerufen. Cinema ID: ${cinemaId}, Salon ID: ${salonId}`);
  const mainContent = document.getElementById("mainContent");
  const selectedCinema = cinemas.find((c) => c.id === cinemaId);
  const selectedSalon = getCinemaSalons(cinemaId)?.find((s) => s.id === parseInt(salonId));

  if (!selectedCinema) {
    //console.error("Kinodaten nicht gefunden:", cinemaId);
    alert("Kinodaten nicht gefunden.");
    return;
  }

  if (!selectedSalon) {
    //console.error("Salondaten nicht gefunden:", { salonId, cinemaId });
    alert("Salondaten nicht gefunden.");
    return;
  }

  //console.log("Gefundener Salon:", selectedSalon);

  mainContent.innerHTML = `
    <h2>${selectedCinema.name} - ${selectedSalon.name}</h2>
    <form id="dateForm">
        <label for="dateSelect">Datum:</label>
        <input type="date" id="dateSelect" required>
        <label for="timeSelect">Uhrzeit:</label>
        <select id="timeSelect" required>
            <option value="">Bitte wählen Sie eine Uhrzeit...</option>
            ${selectedSalon.shows.map(show => `<option value="${show.time}">${show.time}</option>`).join("")}
        </select>
        <button type="button" id="proceedToSeats" class="btn-primary">Weiter</button>
    </form>
  `;

  // Daten vor dem heutigen Datum deaktivieren
  const dateSelect = document.getElementById("dateSelect");
  const today = new Date().toISOString().split("T")[0]; // Heutiges Datum (im Format YYYY-MM-DD)
  dateSelect.min = today;

  document.getElementById("proceedToSeats")?.addEventListener("click", () => {
    const selectedDate = dateSelect.value;
    const selectedTime = document.getElementById("timeSelect")?.value;

    if (!selectedDate || !selectedTime) {
      alert("Bitte wählen Sie ein gültiges Datum und eine Uhrzeit.");
      return;
    }

    showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
  });
}

// "Salon Auswahl Bestätigen" Event Listener (Ausgelagert)
export function attachConfirmSalonListener(cinemaId) {
  document.getElementById("confirmSalon")?.addEventListener("click", () => {
    const selectedSalon = document.querySelector("input[name='salon']:checked");
    if (selectedSalon) {
      showDateSelection(cinemaId, selectedSalon.value);
    } else {
      alert("Bitte wählen Sie einen Salon aus.");
    }
  });
}
