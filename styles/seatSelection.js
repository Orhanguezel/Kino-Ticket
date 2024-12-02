import { cinemas } from "../data/cinemas.js";
import { getCinemaSalons } from "../data/filmsData.js";
import { proceedToCheckout, setCart, getCart } from "./checkoutHandler.js";
import { showModal } from "./modal.js";

const DISCOUNTS = {
    child: 0.3,
    publicDay: 0.2,
};

const PUBLIC_DAYS = ["Monday", "Wednesday"];

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

    const mainContent = document.getElementById("mainContent");
    const seats = Array.from({ length: salon.seats }, (_, i) => ({
        id: i + 1,
        row: String.fromCharCode(65 + Math.floor(i / 10)),
        seatNumber: (i % 10) + 1,
        occupied: Math.random() > 0.7,
    }));

    mainContent.innerHTML = `
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

        // Modal içeriği
        const modalContent = `
            <h3>Ihre ausgewählten Sitze:</h3>
            <ul>
                ${Array.from(selectedSeats)
                    .map((seat) => `<li>${seat}</li>`)
                    .join("")}
            </ul>
            <button id="enterDetails" class="btn-primary">Details Eingeben</button>
            <button id="cancelSelection" class="btn-secondary">Abbrechen</button>
        `;

        // Modalı göster
        showModal(modalContent);

        // Modalda detay girişine geçiş
        document.getElementById("enterDetails").addEventListener("click", () => {
            enterDetails(Array.from(selectedSeats), cinema, salon, selectedDate, selectedTime);
            document.querySelector(".overlay").remove();
            document.querySelector(".modal").remove();
        });

        // Modalda iptal işlemi
        document.getElementById("cancelSelection").addEventListener("click", () => {
            document.querySelector(".overlay").remove();
            document.querySelector(".modal").remove();
        });
    });
}

function enterDetails(selectedSeats, cinema, salon, selectedDate, selectedTime) {
    const modalContent = `
        <h3>Kundendetails</h3>
        <form id="detailsForm">
            ${selectedSeats
                .map(
                    (seat, index) => `
                    <div class="customer-details">
                        <h4>Sitzplatz: ${seat}</h4>
                        <label for="name${index}">Vorname:</label>
                        <input type="text" id="name${index}" required placeholder="Vorname">
                        <label for="surname${index}">Nachname:</label>
                        <input type="text" id="surname${index}" required placeholder="Nachname">
                        <label for="category${index}">Kategorie:</label>
                        <select id="category${index}">
                            <option value="adult">Erwachsener</option>
                            <option value="child">Kind</option>
                        </select>
                    </div>`
                )
                .join("")}
            <button type="button" id="addToCart" class="btn-primary">In den Warenkorb legen</button>
            <button type="button" id="cancelDetails" class="btn-secondary">Abbrechen</button>
        </form>
    `;

    // Modalı göster
    showModal(modalContent);

    // "In den Warenkorb legen" butonuna tıklama işlemi
    document.getElementById("addToCart").addEventListener("click", () => {
        const details = selectedSeats.map((seat, index) => {
            const name = document.getElementById(`name${index}`).value;
            const surname = document.getElementById(`surname${index}`).value;
            const category = document.getElementById(`category${index}`).value;

            if (!name || !surname) {
                alert("Bitte füllen Sie alle Felder aus.");
                return null;
            }

            let price = salon.price;

            if (category === "child") {
                price -= price * DISCOUNTS.child;
            }

            const dayName = new Date(selectedDate).toLocaleString("en-US", { weekday: "long" });
            if (PUBLIC_DAYS.includes(dayName)) {
                price -= price * DISCOUNTS.publicDay;
            }

            return {
                cinema: cinema.name,
                salon: salon.name,
                seat,
                price: parseFloat(price.toFixed(2)),
                name,
                surname,
                category,
                date: selectedDate,
                time: selectedTime,
            };
        });

        if (details.includes(null)) return;

        const cart = getCart();
        setCart([...cart, ...details]);

        alert("Biletiniz sepete eklendi!");
        proceedToCheckout();

        document.querySelector(".overlay").remove();
        document.querySelector(".modal").remove();
    });

    document.getElementById("cancelDetails").addEventListener("click", () => {
        document.querySelector(".overlay").remove();
        document.querySelector(".modal").remove();
    });
}
