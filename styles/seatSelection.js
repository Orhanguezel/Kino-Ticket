import { cinemas } from "../data/cinemas.js";
import { getCinemaSalons } from "../data/filmsData.js";
import { proceedToCheckout, setCart, getCart } from "./checkoutHandler.js";

// İndirimler
const DISCOUNTS = {
    child: 0.3, // Çocuk indirimi %30
    publicDay: 0.2, // Halk günü indirimi %20
};

const PUBLIC_DAYS = ["Monday", "Wednesday"]; // Halk günleri

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
        <p>Sitzplätze für den ${selectedDate} um ${selectedTime}:</p>
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
        <h2>Kundendetails</h2>
        <form id="detailsForm">
            ${selectedSeats
                .map(
                    (seat, index) => `
                    <div>
                        <h3>Sitzplatz: ${seat}</h3>
                        <label for="name${index}">Vorname:</label>
                        <input type="text" id="name${index}" required>
                        <label for="surname${index}">Nachname:</label>
                        <input type="text" id="surname${index}" required>
                        <label for="category${index}">Kategorie:</label>
                        <select id="category${index}">
                            <option value="adult">Erwachsener</option>
                            <option value="child">Kind</option>
                        </select>
                    </div>`
                )
                .join("")}
            <button type="button" id="addToCart" class="btn-primary">In den Warenkorb legen</button>
        </form>
    `;

    document.getElementById("addToCart").addEventListener("click", () => {
        const details = selectedSeats.map((seat, index) => {
            const category = document.getElementById(`category${index}`).value;
            let price = salon.price;

            // Çocuk indirimi uygula
            if (category === "child") {
                price -= price * DISCOUNTS.child;
            }

            // Halk günü indirimi uygula
            const dayName = new Date(selectedDate).toLocaleString("en-US", { weekday: "long" });
            if (PUBLIC_DAYS.includes(dayName)) {
                price -= price * DISCOUNTS.publicDay;
            }

            return {
                cinema: cinema.name,
                salon: salon.name,
                seat,
                price: parseFloat(price.toFixed(2)), // Fiyatı iki ondalık basamakla döndür
                name: document.getElementById(`name${index}`).value,
                surname: document.getElementById(`surname${index}`).value,
                category,
                date: selectedDate,
                time: selectedTime,
            };
        });

        const cart = getCart();
        setCart([...cart, ...details]);
        alert("Biletiniz sepete eklendi!");
        proceedToCheckout(); // Ödeme sürecine geçiş
    });
}
