import { salons as defaultSalons } from "../data/Salons.js";
import {
  loadSalonsFromLocalStorage,
  saveSalonsToLocalStorage,
  saveDataToLocalStorage,
  saveStateToLocalStorage,
} from "./stateManager.js";

// LocalStorage'dan Daten laden
let salons = loadSalonsFromLocalStorage();
if (salons.length === 0) {
  salons = [...defaultSalons]; // Standarddaten verwenden
  saveSalonsToLocalStorage(salons); // In LocalStorage speichern
}

export function renderSalonView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Hauptinhaltsbereich nicht gefunden!");
    return;
  }

  container.innerHTML = `
    <h2>Säle</h2>
    <button class="add-salon-button" onclick="addSalon()">Neuen Saal Hinzufügen</button>
    <div class="salon-cards">
      ${salons
        .map(
          (salon) => `
        <div class="salon-card">
          <img src="${salon.image}" alt="${salon.name}" class="salon-image">
          <div class="salon-info">
            <h3>${salon.name}</h3>
            <p>Kapazität: ${salon.seats}</p>
            <p>Reihenbreite: ${salon.aisleWidth} m</p>
            <p>Preis: ${salon.price} €</p>
            <p>Eigenschaften: 
              ${salon.features?.is3D ? "3D" : ""} 
              ${salon.features?.isVIP ? "VIP" : ""} 
              ${salon.features?.sound || "Kein Soundsystem angegeben"}
            </p>
            <p>Vorführungszeiten: ${
              Array.isArray(salon.showTimes)
                ? salon.showTimes.join(", ")
                : "Keine Daten verfügbar"
            }</p>
            <button class="update-salon-button" onclick="editSalon(${salon.type})">Bearbeiten</button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderSalonForm(salon = {}) {
  const {
    type = salons.length > 0 ? salons[salons.length - 1].type + 1 : 1,
    name = "",
    image = "./assets/default-salon.png",
    seats = "",
    aisleWidth = "",
    features = { is3D: false, isVIP: false, sound: "" },
    price = "",
    showTimes = [],
  } = salon;

  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>${salon.type ? "Saal Bearbeiten" : "Neuen Saal Hinzufügen"}</h2>
    <form id="salon-form">
      <label for="salon-name">Name des Saals:</label>
      <input type="text" id="salon-name" value="${name}" required>

      <label for="salon-image">Saalbild:</label>
      <input type="file" id="salon-image" accept="image/*">
      <img src="${image}" alt="${name}" class="salon-image-preview">

      <label for="salon-seats">Kapazität:</label>
      <input type="number" id="salon-seats" value="${seats}" required>

      <label for="salon-aisleWidth">Reihenbreite (m):</label>
      <input type="number" id="salon-aisleWidth" value="${aisleWidth}" required>

      <label for="salon-features">Eigenschaften:</label>
      <div>
        <input type="checkbox" id="salon-is3D" ${
          features.is3D ? "checked" : ""
        }> <label for="salon-is3D">3D</label>
        <input type="checkbox" id="salon-isVIP" ${
          features.isVIP ? "checked" : ""
        }> <label for="salon-isVIP">VIP</label>
      </div>

      <label for="salon-sound">Soundsystem:</label>
      <input type="text" id="salon-sound" value="${features.sound}" required>

      <label for="salon-price">Preis:</label>
      <input type="number" id="salon-price" value="${price}" required>

      <label for="salon-showTimes">Vorführungszeiten:</label>
      <input type="text" id="salon-showTimes" value="${showTimes.join(", ")}">

      <button type="button" id="save-salon-button">${
        salon.type ? "Speichern" : "Erstellen"
      }</button>
    </form>
    <button onclick="renderSalonView()">Zurück</button>
  `;

  document.getElementById("save-salon-button").onclick = () => {
    salon.type ? saveSalonChanges(salon.type) : saveNewSalon();
  };
}

export function addSalon() {
  renderSalonForm();
}

export function editSalon(type) {
  const salon = salons.find((salon) => salon.type === type);
  if (salon) {
    renderSalonForm(salon);
  } else {
    console.warn(`Saaltyp ${type} nicht gefunden.`);
  }
}

export function saveNewSalon() {
  const nameInput = document.getElementById("salon-name");
  if (!nameInput) {
    console.error("Das Feld 'Name des Saals' wurde im Formular nicht gefunden.");
    return;
  }

  const name = nameInput.value;
  const imageInput = document.getElementById("salon-image");
  const seats = parseInt(document.getElementById("salon-seats").value, 10);
  const aisleWidth = parseInt(
    document.getElementById("salon-aisleWidth").value,
    10
  );
  const is3D = document.getElementById("salon-is3D").checked;
  const isVIP = document.getElementById("salon-isVIP").checked;
  const sound = document.getElementById("salon-sound").value;
  const price = parseFloat(document.getElementById("salon-price").value);
  const showTimes = Array.from(document.querySelectorAll(".showTimeInput"))
    .map((input) => input.value)
    .filter((time) => time !== "");

  let image = "./assets/default-salon.png";
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    image = URL.createObjectURL(file);
  }

  const newSalon = {
    type: salons.length > 0 ? salons[salons.length - 1].type + 1 : 1,
    name,
    image,
    seats,
    aisleWidth,
    features: { is3D, isVIP, sound },
    price,
    showTimes,
  };

  salons.push(newSalon);

  saveDataToLocalStorage("salons", salons);

  alert("Saal erfolgreich gespeichert!");
  renderSalonView();
}

export function deleteSalon(type) {
  if (confirm("Sind Sie sicher, dass Sie diesen Saal löschen möchten?")) {
    const salonIndex = salons.findIndex((salon) => salon.type === type);
    if (salonIndex !== -1) {
      salons.splice(salonIndex, 1);

      saveDataToLocalStorage("salons", salons);

      alert("Saal erfolgreich gelöscht!");
      renderSalonView();
    } else {
      console.warn(`Saaltyp ${type} nicht gefunden.`);
    }
  }
}

export function saveSalonChanges(type) {
  const salonIndex = salons.findIndex((salon) => salon.type === type);
  if (salonIndex !== -1) {
    const name = document.getElementById("name").value;
    const seats = parseInt(document.getElementById("seats").value, 10);
    const aisleWidth = parseInt(
      document.getElementById("aisleWidth").value,
      10
    );
    const is3D = document.getElementById("is3D").checked;
    const isVIP = document.getElementById("isVIP").checked;
    const sound = document.getElementById("sound").value;
    const price = parseFloat(document.getElementById("price").value);
    const showTimes = document
      .getElementById("showTimes")
      .value.split(",")
      .map((time) => time.trim());

    salons[salonIndex] = {
      ...salons[salonIndex],
      name,
      seats,
      aisleWidth,
      features: { is3D, isVIP, sound },
      price,
      showTimes,
    };

    saveSalonsToLocalStorage(salons);

    alert("Saal erfolgreich aktualisiert!");
    renderSalonView();
  } else {
    console.warn(`Saaltyp ${type} nicht gefunden.`);
  }
}

// Neue Startdaten
const initialCinemas = [];
const initialFilms = [];
const initialSalons = [];

export function resetAndInitializeData() {
  clearLocalStorage();

  initializeAppState(initialCinemas, initialFilms, initialSalons);

  saveStateToLocalStorage();

  console.log("LocalStorage wurde zurückgesetzt und Startdaten hinzugefügt.");
}

export function renderResetButton() {
  const navbar = document.getElementById("navbar");
  const resetButton = document.createElement("button");
  resetButton.textContent = "Zurücksetzen";
  resetButton.onclick = resetAndInitializeData;
  navbar.appendChild(resetButton);
}

window.addSalon = addSalon;
window.editSalon = editSalon;
window.deleteSalon = deleteSalon;
window.saveNewSalon = saveNewSalon;
window.saveSalonChanges = saveSalonChanges;
window.renderSalonView = renderSalonView;
