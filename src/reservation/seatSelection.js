import { getCinemaSalons } from "../data/filmsData.js";
import { showModal, closeModal } from "./modal.js";
import { setCart, getCart } from "./checkoutHandler.js";
import { showCartModal } from "./paymentHandler.js";

const DISCOUNTS = {
    child: 0.3, // Çocuk indirimi
    publicDay: 0.2, // Halk günü indirimi
};

const PUBLIC_DAYS = ["Monday", "Wednesday"]; // Halk günleri

class Seat {
    constructor(row, number, occupied = false) {
        this.row = row;
        this.number = number;
        this.occupied = occupied;
        this.selected = false;
        this.element = null;
    }

    createNode() {
        const seatElement = document.createElement("div");
        seatElement.classList.add("seat");
        seatElement.textContent = `${this.row}${this.number}`;

        if (this.occupied) {
            seatElement.classList.add("occupied");
        } else {
            seatElement.classList.add("available");
            seatElement.addEventListener("click", () => this.toggleSelection());
        }

        this.element = seatElement;
        return seatElement;
    }

    toggleSelection() {
        if (!this.occupied) {
            this.selected = !this.selected;
            this.element.classList.toggle("selected");
        }
    }
}

class SeatManager {
    constructor(container) {
        this.container = container;
        this.seats = [];
    }

    createSeats(totalSeats, seatsPerRow, occupancyRate = 0.3) {
        this.seats = []; // Eski koltukları temizle
        const rowsCount = Math.ceil(totalSeats / seatsPerRow);
        for (let i = 0; i < rowsCount; i++) {
            const rowLetter = String.fromCharCode(65 + i);
            const row = [];
            for (let j = 1; j <= seatsPerRow; j++) {
                const seatIndex = i * seatsPerRow + j;
                if (seatIndex > totalSeats) break;
                const isOccupied = Math.random() < occupancyRate;
                const seat = new Seat(rowLetter, j, isOccupied);
                row.push(seat);
            }
            this.seats.push(row);
        }
    }

    renderSeats() {
        this.container.innerHTML = "";
        this.seats.forEach((row) => {
            const rowElement = document.createElement("div");
            rowElement.classList.add("seat-row");
            row.forEach((seat) => {
                const seatNode = seat.createNode();
                rowElement.appendChild(seatNode);
            });
            this.container.appendChild(rowElement);
        });
    }

    getSelectedSeats() {
        return this.seats.flat().filter((seat) => seat.selected);
    }
}

export function showSeatSelection(cinemaId, salonId, selectedDate, selectedTime) {
    const cinemaSalons = getCinemaSalons(cinemaId);
    const salon = cinemaSalons.find((s) => s.id === parseInt(salonId));
    if (!salon) {
        console.error("Salon bilgisi bulunamadı. Gelen salon ID:", salonId);
        alert("Salon bilgisi bulunamadı!");
        return;
    }

    const mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = `
        <div class="hall">
            <div class="hall__screen">Leinwand</div>
            <div class="seats"></div>
            <div class="info-box">
                <p class="info-box__price">Ausgewählte Plätze: 0</p>
                <button id="confirmSeats" class="button" disabled>Weiter</button>
            </div>
        </div>
    `;

    const seatContainer = document.querySelector(".seats");
    const seatManager = new SeatManager(seatContainer);
    const seatsPerRow = 10;
    seatManager.createSeats(salon.seats, seatsPerRow);
    seatManager.renderSeats();

    const confirmButton = document.getElementById("confirmSeats");
    const priceInfo = document.querySelector(".info-box__price");

    seatContainer.addEventListener("click", () => {
        const selectedSeats = seatManager.getSelectedSeats();
        priceInfo.textContent = `Ausgewählte Plätze: ${selectedSeats.length}`;
        confirmButton.disabled = selectedSeats.length === 0;
    });

    confirmButton.addEventListener("click", () => {
        const selectedSeats = seatManager.getSelectedSeats();
        showSeatSummary(selectedSeats, cinemaId, salon, selectedDate, selectedTime);
    });
}

function showSeatSummary(selectedSeats, cinemaId, salon, selectedDate, selectedTime) {
    const modalContent = `
        <h3>Ausgewählte Plätze:</h3>
        <ul>
            ${selectedSeats.map((seat) => `<li>${seat.row}${seat.number}</li>`).join("")}
        </ul>
        <button id="enterDetails" class="button">Weiter</button>
    `;

    showModal(modalContent);

    const enterDetailsButton = document.getElementById("enterDetails");
    if (enterDetailsButton) {
        enterDetailsButton.addEventListener("click", () => {
            enterDetails(selectedSeats, cinemaId, salon, selectedDate, selectedTime);
        });
    }
}

function enterDetails(selectedSeats, cinemaId, salon, selectedDate, selectedTime) {
    const modalContent = `
        <h3>Kundendetails</h3>
        <form id="detailsForm">
            ${selectedSeats
                .map(
                    (seat, index) => `
                    <div class="customer-details">
                        <h4>Sitzplatz: ${seat.row}${seat.number}</h4>
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
            <button type="button" id="addToCart" class="btn-primary">In den Warenkorb</button>
        </form>
    `;

    showModal(modalContent);

    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
            const details = selectedSeats.map((seat, index) => {
                const name = document.getElementById(`name${index}`).value;
                const surname = document.getElementById(`surname${index}`).value;
                const category = document.getElementById(`category${index}`).value;

                if (!name || !surname) {
                    alert("Bitte füllen Sie alle Felder aus.");
                    return null;
                }

                let price = salon.price;
                if (category === "child") price -= price * DISCOUNTS.child;

                const dayName = new Date(selectedDate).toLocaleString("de-DE", { weekday: "long" });
                if (PUBLIC_DAYS.includes(dayName)) price -= price * DISCOUNTS.publicDay;

                return {
                    cinemaId,
                    salon: salon.name,
                    seat: `${seat.row}${seat.number}`,
                    price: parseFloat(price.toFixed(2)),
                    name,
                    surname,
                    category,
                    date: selectedDate,
                    time: selectedTime,
                };
            });

            if (details.includes(null)) return;

            setCart([...getCart(), ...details]);
            alert("Tickets wurden dem Warenkorb hinzugefügt!");
            closeModal();
            showPaymentModal();
        });
    }
}

function showPaymentModal() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Ihr Warenkorb ist leer!");
        return;
    }
    showCartModal();
}
