//seatAssignment.js dosyası, koltukların otomatik olarak atanmasını sağlar.

import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { films as defaultFilms } from "../data/Film.js";

import {
  loadCinemasFromLocalStorage,
  loadFilmsFromLocalStorage,
} from "./stateManager.js";

// LocalStorage'dan gösterimleri yükleyin veya boş bir dizi oluşturun
let showtimes = JSON.parse(localStorage.getItem("showtimes")) || [];

// Cinemas ve Films'i LocalStorage'dan yükleyin
let cinemas = loadCinemasFromLocalStorage();
let films = loadFilmsFromLocalStorage();

// Eğer LocalStorage'da veri yoksa, varsayılan değerlere dön
if (!cinemas.length) {
  const { cinemas: defaultCinemas } = require("../data/Cinemas.js");
  cinemas = [...defaultCinemas];
}

if (!films.length) {
  const { films: defaultFilms } = require("../data/Film.js");
  films = [...defaultFilms];
}

export function assignOptimalSeats(salons, strategy = "high") {
  salons.forEach((salon) => {
    let occupiedSeats = 0;
    const targetOccupancy = strategy === "low" ? 0.4 : 0.8; // Doluluk oranı: 40% veya 80%
    const maxOccupied = Math.ceil(salon.seats * targetOccupancy);

    salon.seatsList.forEach((seat) => {
      seat.status = occupiedSeats < maxOccupied ? "dolu" : "boş";
      if (seat.status === "dolu") occupiedSeats++;
    });
  });

  localStorage.setItem("salons", JSON.stringify(salons));
}

export function assignRandomSeats(salons) {
  salons.forEach((salon) => {
    salon.seatsList.forEach((seat) => {
      seat.status = Math.random() > 0.5 ? "dolu" : "boş";
    });
  });

  localStorage.setItem("salons", JSON.stringify(salons));
}

window.assignRandomSeats = assignRandomSeats;
window.assignOptimalSeats = assignOptimalSeats;
