import { cinemas } from "../data/cinemas.js";
import { getCinemaSalons } from "../data/filmsData.js";
import { proceedToCheckout, setCart, getCart } from "./checkoutHandler.js";

// Koltuk Seçimi ve Detaylar
export function showSeatSelection(cinemaId, salonId, selectedDate, selectedTime) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    if (!cinema) {
        alert("Sinema verisi bulunamadı!");
        return;
    }

    const salon = getCinemaSalons(cinemaId)?.find((s) => s.id === parseInt(salonId));
    if (!salon) {
        alert("Salon verisi bulunamadı!");
        return;
    }

    const home = document.getElementById("home");
    const seats = Array.from({ length: salon.seats }, (_, i) => ({
        id: i + 1,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        seatNumber: (i % 10) + 1,
        occupied: Math.random() > 0.7, // Rastgele doluluk
    }));

    home.innerHTML = `
        <h2>${cinema.name} - ${salon.name}</h2>
        <div class="seat-plan">
            ${seats
                .map(
                    (seat) =>
                        `<button class="seat ${
                            seat.occupied ? "occupied" : "available"
                        }" data-id="${seat.row}${seat.seatNumber}" ${
                            seat.occupied ? "disabled" : ""
                        }>${seat.row}${seat.seatNumber}</button>`
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
        enterDetails(Array.from(selectedSeats), cinema, salon, selectedDate, selectedTime);
    });
}

function enterDetails(selectedSeats, cinema, salon, selectedDate, selectedTime) {
    const home = document.getElementById("home");
    home.innerHTML = `
        <form id="detailsForm">
            ${selectedSeats
                .map(
                    (seat, index) => `
                    <div>
                        <label>${seat} - Vorname:</label>
                        <input type="text" id="name${index}" required>
                        <label>Nachname:</label>
                        <input type="text" id="surname${index}" required>
                    </div>`
                )
                .join("")}
            <button type="button" id="addToCart">In den Warenkorb legen</button>
        </form>
    `;

    document.getElementById("addToCart").addEventListener("click", () => {
        const details = selectedSeats.map((seat, index) => ({
            cinema: cinema.name,
            salon: salon.name,
            seat,
            name: document.getElementById(`name${index}`).value,
            surname: document.getElementById(`surname${index}`).value,
            date: selectedDate,
            time: selectedTime,
        }));

        const cart = getCart();
        setCart([...cart, ...details]);
        alert("Koltuklar sepete eklendi!");
        proceedToCheckout();
    });
}


// Rezervasyonu Tamamlama
function finalizeReservation(selectedSeats, cinema, salon, selectedDate, selectedTime) {
  const reservationDetails = selectedSeats.map((seat, index) => ({
      cinema: cinema.name,
      salon: salon.name,
      seat: seat,
      name: `User ${index + 1}`, // Placeholder for user input
      surname: `Surname ${index + 1}`, // Placeholder for user input
      category: "Erwachsener", // Default olarak Erwachsener
      date: selectedDate,
      time: selectedTime,
  }));

  const currentCart = getCart();
  const updatedCart = [...currentCart, ...reservationDetails];
  setCart(updatedCart);

  alert("Koltuklar sepete eklendi!");
  proceedToCheckout(); // Ödeme sayfasına yönlendirme
}

function updateCartLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); // Sepeti Local Storage'a kaydet
}



// Sepet Görüntüleme
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
              <p><strong>Preis:</strong> 10,00 €</p>
          </div>
      `
          )
          .join("")}
      <button class="btn-primary" id="checkoutButton">Weiter zur Kasse</button>
  `;

  document.getElementById("checkoutButton")?.addEventListener("click", () => {
      window.location.href = "checkout.html";
  });
}

// Örnek Kullanımı
showCart();
updateCartLocalStorage();
