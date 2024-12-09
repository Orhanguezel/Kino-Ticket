// seatAssignment.js Datei, sorgt für die automatische Zuweisung von Sitzplätzen.

import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { films as defaultFilms } from "../data/Film.js";

import {
  loadCinemasFromLocalStorage,
  loadFilmsFromLocalStorage,
} from "./stateManager.js";

// Zeigezeiten aus LocalStorage laden oder leere Liste erstellen
let showtimes = JSON.parse(localStorage.getItem("showtimes")) || [];

// Kinos und Filme aus LocalStorage laden
let cinemas = loadCinemasFromLocalStorage();
let films = loadFilmsFromLocalStorage();

// Wenn keine Daten im LocalStorage vorhanden sind, Standardwerte verwenden
if (!cinemas.length) {
  const { cinemas: defaultCinemas } = require("../data/Cinemas.js");
  cinemas = [...defaultCinemas];
}

if (!films.length) {
  const { films: defaultFilms } = require("../data/Film.js");
  films = [...defaultFilms];
}

export function assignOptimalSeats(salons, strategy = "hoch") {
  salons.forEach((salon) => {
    let besetzteSitze = 0;
    const zielBelegung = strategy === "niedrig" ? 0.4 : 0.8; // Belegungsquote: 40% oder 80%
    const maxBelegt = Math.ceil(salon.seats * zielBelegung);

    salon.seatsList.forEach((sitz) => {
      sitz.status = besetzteSitze < maxBelegt ? "besetzt" : "frei";
      if (sitz.status === "besetzt") besetzteSitze++;
    });
  });

  localStorage.setItem("salons", JSON.stringify(salons));
}

export function assignRandomSeats(salons) {
  salons.forEach((salon) => {
    salon.seatsList.forEach((sitz) => {
      sitz.status = Math.random() > 0.5 ? "besetzt" : "frei";
    });
  });

  localStorage.setItem("salons", JSON.stringify(salons));
}

window.assignRandomSeats = assignRandomSeats;
window.assignOptimalSeats = assignOptimalSeats;
