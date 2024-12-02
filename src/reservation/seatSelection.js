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
        row: String.fromCharCode(65 + Math.floor(i / 14)),
        seatNumber: (i % 14) + 1,
        occupied: Math.random() > 0.7,
    }));

    mainContent.innerHTML = `
        <div class="hall">
            <div class="hall__screen"></div>
            <div class="seats">
                ${seats
                    .map(
                        (seat) => `
                            <div class="seats__row" data-row="${seat.row}">
                                <div class="seats__item ${seat.occupied ? "occupied" : "available"}" data-id="${seat.row}${seat.seatNumber}" ${
                            seat.occupied ? "disabled" : ""
                        }>${seat.row}${seat.seatNumber}</div>
                            </div>
                        `
                    )
                    .join("")}
            </div>
            <div class="info-box">
                <p class="info-box__price">Seçili Koltuk: 0</p>
                <button id="confirmSeats" class="button" disabled>Bestätigen</button>
            </div>
        </div>
    `;

    const selectedSeats = new Set();
    const priceInfo = document.querySelector(".info-box__price");
    const confirmButton = document.getElementById("confirmSeats");

    document.querySelectorAll(".seats__item.available").forEach((seat) =>
        seat.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            if (selectedSeats.has(id)) {
                selectedSeats.delete(id);
                e.target.classList.remove("seats__item_selected");
            } else {
                selectedSeats.add(id);
                e.target.classList.add("seats__item_selected");
            }
            priceInfo.textContent = `Seçili Koltuk: ${selectedSeats.size}`;
            confirmButton.disabled = selectedSeats.size === 0;
        })
    );

    confirmButton.addEventListener("click", () => {
        if (selectedSeats.size === 0) {
            alert("Lütfen en az bir koltuk seçin.");
            return;
        }

        const modalContent = `
            <h3>Seçtiğiniz Koltuklar:</h3>
            <ul>
                ${Array.from(selectedSeats)
                    .map((seat) => `<li>${seat}</li>`)
                    .join("")}
            </ul>
            <button id="enterDetails" class="button">Devam</button>
            <button id="cancelSelection" class="button button--secondary">İptal</button>
        `;

        showModal(modalContent);

        document.getElementById("enterDetails").addEventListener("click", () => {
            enterDetails(Array.from(selectedSeats), cinema, salon, selectedDate, selectedTime);
            document.querySelector(".overlay").remove();
            document.querySelector(".modal").remove();
        });

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
