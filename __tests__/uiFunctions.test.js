import { getCart, setCart, clearCart, showCart } from "../src/reservation/checkoutHandler.js";
import { showCartModal, processPayment } from "../src/reservation/paymentHandler.js";
import { startReservation } from "../src/reservation/reservationHandler.js";
import { showSalonSelection } from "../src/reservation/salonSelection.js";
import { showSeatSelection } from "../src/reservation/seatSelection.js";
import { showModal, closeModal } from "../src/reservation/modal.js";

jest.mock("../src/data/filmsData.js", () => ({
  getCinemaShows: jest.fn((cinemaId) => {
    if (cinemaId === 1) {
      return [
        {
          film: { id: 1, name: "Avatar: Der Weg des Wassers", image: "film1.jpg" },
          salon: { id: 1, name: "Saal 1", seats: 50, price: 10 },
          time: "12:00",
        },
      ];
    }
    return [];
  }),
  getCinemaSalons: jest.fn((cinemaId) => {
    if (cinemaId === 1) {
      return [
        { id: 1, name: "Saal 1", seats: 50, price: 10, shows: [{ time: "12:00" }] },
      ];
    }
    return [];
  }),
}));

jest.spyOn(console, "error").mockImplementation(() => {});

describe("Checkout Handler Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("getCart retrieves an empty cart if no data is stored", () => {
    expect(getCart()).toEqual([]);
  });

  test("setCart updates the cart and stores it in localStorage", () => {
    const testCart = [{ cinema: "Kino", seat: "A1", price: 10 }];
    setCart(testCart);
    expect(getCart()).toEqual(testCart);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual(testCart);
  });

  test("clearCart clears the cart and removes it from localStorage", () => {
    setCart([{ cinema: "Kino", seat: "A1", price: 10 }]);
    clearCart();
    expect(getCart()).toEqual([]);
    expect(localStorage.getItem("cart")).toBeNull();
  });

  test("showCart displays an empty message if the cart is empty", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    showCart();
    expect(document.body.innerHTML).toContain("Ihr Warenkorb ist leer.");
  });
});

describe("Payment Handler Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("showCartModal displays cart items and total price", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    setCart([{ cinema: "Kino", seat: "A1", price: 10 }]);
    showCartModal();
    expect(document.body.innerHTML).toContain("Kino");
    expect(document.body.innerHTML).toContain("10.00 €");
  });

  test("processPayment displays a success message on valid payment data", () => {
    document.body.innerHTML = `<div id="modal"></div>`;
    const cart = [{ cinema: "Kino", seat: "A1", price: 10 }];
    const totalPrice = 10;
    processPayment(cart, totalPrice);

    document.getElementById("cardNumberInput").value = "1234 5678 9012 3456";
    document.getElementById("expiryDateInput").value = "12/34";
    document.getElementById("cvvInput").value = "123";

    document.getElementById("confirmPayment").click();

    expect(window.alert).toHaveBeenCalledWith("Zahlung erfolgreich! Ihre Tickets werden vorbereitet...");
  });
});

describe("Reservation Tests", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="mainContent"></div>`;
  });

  test("startReservation sets up a reservation carousel", () => {
    const cinemaId = 1;
    startReservation(cinemaId);

    expect(document.body.innerHTML).toContain("Avatar: Der Weg des Wassers");
  });

  test("showSalonSelection displays available salons for a film", () => {
    const cinemaId = 1;
    const filmId = 1;
    showSalonSelection(cinemaId, filmId);

    expect(document.body.innerHTML).toContain("Saal 1");
  });

  test("showSeatSelection displays available seats", () => {
    const cinemaId = 1;
    const salonId = 1;
    const selectedDate = "2024-12-01";
    const selectedTime = "12:00";

    showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
    expect(document.body.innerHTML).toContain("Ausgewählte Plätze: 0");
  });
});

describe("Modal Tests", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="modal"></div>`;
  });

  test("showModal displays modal with content", () => {
    showModal("<p>Test Content</p>");
    expect(document.body.innerHTML).toContain("Test Content");
  });

  test("closeModal removes modal from DOM", () => {
    showModal("<p>Test Content</p>");
    closeModal();
    expect(document.body.innerHTML).not.toContain("Test Content");
  });
});
