import { cinemas, getCinemaSalons } from "../data/cinemas.js";
import { cart } from "../data/cart.js";

// Koltuk Seçimi ve Detaylar
export function showSeatSelection(cinemaId, salonId, selectedDate, selectedTime) {
  const cinema = cinemas.find((c) => c.id === cinemaId);
  if (!cinema) {
    console.error("Geçersiz cinemaId:", cinemaId);
    alert("Sinema verisi bulunamadı!");
    return;
  }

  const salon = getCinemaSalons(cinemaId).find((s) => s.id === salonId);
  if (!salon) {
    console.error("Geçersiz salonId:", salonId);
    alert("Salon verisi bulunamadı!");
    return;
  }

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
              (index % 10 === 0 ? `<div class="row-label">${seat.row}</div>` : "") +
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
