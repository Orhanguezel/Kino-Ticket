import { cinemas } from "../data/cinemas.js";
import { getCinemaSalons } from "../data/filmsData.js";
import { setCart, getCart } from "./checkoutHandler.js";
import { showModal } from "./modal.js";
import { processPayment } from "./paymentHandler.js"; // Ödeme işlemini yönetir

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
                <button id="confirmSeats" class="button" disabled>Devam Et</button>
            </div>
        </div>
    `;

    setupSeatSelection(seats, cinema, salon, selectedDate, selectedTime);
}

function setupSeatSelection(seats, cinema, salon, selectedDate, selectedTime) {
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
        showSeatSummary(selectedSeats, cinema, salon, selectedDate, selectedTime);
    });
}

function showSeatSummary(selectedSeats, cinema, salon, selectedDate, selectedTime) {
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
        closeModal();
    });

    document.getElementById("cancelSelection").addEventListener("click", closeModal);
}

function enterDetails(selectedSeats, cinema, salon, selectedDate, selectedTime) {
    const modalContent = `
        <h3>Müşteri Detayları</h3>
        <form id="detailsForm">
            ${selectedSeats
                .map(
                    (seat, index) => `
                    <div class="customer-details">
                        <h4>Koltuk: ${seat}</h4>
                        <label for="name${index}">Ad:</label>
                        <input type="text" id="name${index}" required placeholder="Ad">
                        <label for="surname${index}">Soyad:</label>
                        <input type="text" id="surname${index}" required placeholder="Soyad">
                        <label for="category${index}">Kategori:</label>
                        <select id="category${index}">
                            <option value="adult">Yetişkin</option>
                            <option value="child">Çocuk</option>
                        </select>
                    </div>`
                )
                .join("")}
            <button type="button" id="addToCart" class="btn-primary">Sepete Ekle</button>
            <button type="button" id="cancelDetails" class="btn-secondary">İptal</button>
        </form>
    `;

    // Modalı göster
    showModal(modalContent);

    // Sepete ekle butonuna event listener ekle
    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
            const details = selectedSeats.map((seat, index) => {
                const name = document.getElementById(`name${index}`).value;
                const surname = document.getElementById(`surname${index}`).value;
                const category = document.getElementById(`category${index}`).value;

                if (!name || !surname) {
                    alert("Lütfen tüm alanları doldurun.");
                    return null;
                }

                let price = salon.price;
                if (category === "child") price -= price * DISCOUNTS.child;

                const dayName = new Date(selectedDate).toLocaleString("en-US", { weekday: "long" });
                if (PUBLIC_DAYS.includes(dayName)) price -= price * DISCOUNTS.publicDay;

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

            setCart([...getCart(), ...details]);
            alert("Biletler sepete eklendi!");
            processPayment();
            closeModal();
        });
    } else {
        console.error("addToCart düğmesi bulunamadı!");
    }

    // İptal butonuna event listener ekle
    const cancelDetailsButton = document.getElementById("cancelDetails");
    if (cancelDetailsButton) {
        cancelDetailsButton.addEventListener("click", closeModal);
    } else {
        console.error("cancelDetails düğmesi bulunamadı!");
    }
}
