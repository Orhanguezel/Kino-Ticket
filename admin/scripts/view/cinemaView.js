import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";
import {
  loadCinemasFromLocalStorage,
  saveCinemasToLocalStorage,
} from "./stateManager.js";

// Kinos werden aus LocalStorage geladen
let logo = "./assets/default-logo.png";
let background = "./assets/default-background.png";

let cinemas = loadCinemasFromLocalStorage();
if (cinemas.length === 0) {
  cinemas = [...defaultCinemas]; // Standarddaten verwenden
  saveCinemasToLocalStorage(cinemas); // In LocalStorage speichern
}

export function renderCinemaView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Der Hauptinhaltbereich wurde nicht gefunden!");
    return;
  }

  if (cinemas.length === 0) {
    container.innerHTML =
      "<p>Keine Kinoinformationen verfügbar. Klicken Sie auf die Schaltfläche unten, um ein neues Kino hinzuzufügen.</p>";
    return;
  }

  container.innerHTML = `
    <h2>Kinos</h2>
    <button class="add-cinema-button" onclick="addCinema()">Neues Kino hinzufügen</button>
    <div class="cinema-cards">
      ${cinemas
        .map(
          (cinema) => `
        <div class="cinema-card">
          <img src="${cinema.logo || "./assets/default-logo.png"}" alt="${
            cinema.name
          }" class="cinema-logo">
          <div class="cinema-info">
            <h3>${cinema.name}</h3>
            <p>Adresse: ${cinema.address}</p>
            <p>Beschreibung: ${cinema.description || "Keine Beschreibung"}</p>
            <p>Telefon: ${cinema.phone || "Nicht angegeben"}</p>
            <p>Email: ${cinema.email || "Nicht angegeben"}</p>
            <button onclick="editCinema(${cinema.id})">Bearbeiten</button>
            <button onclick="deleteCinema(${cinema.id})">Löschen</button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

export function saveCinemaChanges(cinemaId) {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const logoInput = document.getElementById("logo");
  const description = document.getElementById("description").value;
  const backgroundInput = document.getElementById("background");
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const mapEmbed = document.getElementById("mapEmbed").value;

  const selectedSalonTypes = Array.from(
    document.getElementById("salons").selectedOptions
  ).map((option) => parseInt(option.value));
  const selectedSalons = salons.filter((salon) =>
    selectedSalonTypes.includes(salon.type)
  );

  const cinemaIndex = cinemas.findIndex((c) => c.id === cinemaId);
  if (cinemaIndex !== -1) {
    cinemas[cinemaIndex].name = name;
    cinemas[cinemaIndex].address = address;
    cinemas[cinemaIndex].description = description;
    cinemas[cinemaIndex].phone = phone;
    cinemas[cinemaIndex].email = email;
    cinemas[cinemaIndex].mapEmbed = mapEmbed;
    cinemas[cinemaIndex].salons = selectedSalons;

    if (logoInput.files && logoInput.files[0]) {
      const file = logoInput.files[0];
      convertFileToBase64(file).then((base64) => {
        cinemas[cinemaIndex].logo = base64;
        saveCinemasToLocalStorage(cinemas);
        alert("Änderungen wurden gespeichert!");
        renderCinemaView();
      });
    } else {
      saveCinemasToLocalStorage(cinemas);
      alert("Änderungen wurden gespeichert!");
      renderCinemaView();
    }

    if (backgroundInput.files && backgroundInput.files[0]) {
      const file = backgroundInput.files[0];
      convertFileToBase64(file).then((base64) => {
        cinemas[cinemaIndex].background = base64;
        saveCinemasToLocalStorage(cinemas);
      });
    }
  }
}

export function editCinema(cinemaId) {
  const cinema = cinemas.find((c) => c.id === cinemaId);
  if (cinema) {
    showCinemaEditForm(cinema);
  }
}

export function addCinema() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>Neues Kino hinzufügen</h2>
    <form id="add-cinema-form">
      <label for="name">Name:</label>
      <input type="text" id="name" placeholder="Kinoname" required>
      
      <label for="address">Adresse:</label>
      <input type="text" id="address" placeholder="Kinoadresse" required>
      
      <label for="logo">Logo:</label>
      <input type="file" id="logo" accept="image/*">

      <label for="description">Beschreibung:</label>
      <textarea id="description" placeholder="Kinobeschreibung"></textarea>

      <label for="background">Hintergrundbild:</label>
      <input type="file" id="background" accept="image/*">

      <label for="phone">Telefon:</label>
      <input type="tel" id="phone" placeholder="Telefonnummer">
      
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="E-Mail-Adresse">

      <label for="mapEmbed">Karte (Embed-Code):</label>
      <textarea id="mapEmbed" placeholder="Karte Embed-Code"></textarea>

      <label for="salons">Säle:</label>
      <select id="salons" multiple>
        ${salons
          .map(
            (salon) => `
          <option value="${salon.type}">${salon.name}</option>
        `
          )
          .join("")}
      </select>

      <button type="button" onclick="saveNewCinema()">Speichern</button>
    </form>
    <button onclick="renderCinemaView()">Zurück</button>
  `;
}

export function saveNewCinema() {
  if (!document.getElementById("add-cinema-form").checkValidity()) {
    alert("Bitte füllen Sie alle Felder aus!");
    return;
  }
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const logoInput = document.getElementById("logo");
  const description = document.getElementById("description").value;
  const backgroundInput = document.getElementById("background");
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const mapEmbed = document.getElementById("mapEmbed").value;

  const selectedSalonTypes = Array.from(
    document.getElementById("salons").selectedOptions
  ).map((option) => parseInt(option.value));
  const selectedSalons = salons.filter((salon) =>
    selectedSalonTypes.includes(salon.type)
  );

  let logo = "./assets/default-logo.png";
  let background = "./assets/default-background.png";

  if (logoInput.files && logoInput.files[0]) {
    logo = URL.createObjectURL(logoInput.files[0]);
  }

  if (backgroundInput.files && backgroundInput.files[0]) {
    background = URL.createObjectURL(backgroundInput.files[0]);
  }

  const newCinema = new Cinema(
    Date.now(),
    name,
    address,
    logo,
    description,
    background,
    phone,
    email,
    mapEmbed,
    selectedSalons
  );

  cinemas.push(newCinema);
  saveCinemasToLocalStorage(cinemas);

  alert("Neues Kino wurde erfolgreich hinzugefügt!");
  renderCinemaView();
}

export function showCinemaEditForm(cinema) {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>${cinema.name} Bearbeiten</h2>
    <form id="edit-cinema-form">
      <label for="name">Name:</label>
      <input type="text" id="name" value="${cinema.name}" required>
      
      <label for="address">Adresse:</label>
      <input type="text" id="address" value="${cinema.address}" required>
      
      <label for="logo">Logo:</label>
      <input type="file" id="logo" accept="image/*">
      <img src="${cinema.logo}" alt="Aktuelles Logo" class="cinema-logo-preview">
      
      <label for="description">Beschreibung:</label>
      <textarea id="description">${cinema.description}</textarea>
      
      <label for="background">Hintergrundbild:</label>
      <input type="file" id="background" accept="image/*">
      <img src="${
        cinema.background
      }" alt="Aktuelles Hintergrundbild" class="cinema-background-preview">
      
      <label for="phone">Telefon:</label>
      <input type="tel" id="phone" value="${cinema.phone}">
      
      <label for="email">Email:</label>
      <input type="email" id="email" value="${cinema.email}">
      
      <label for="mapEmbed">Karte (Embed-Code):</label>
      <textarea id="mapEmbed">${cinema.mapEmbed}</textarea>

      <label for="salons">Säle:</label>
      <select id="salons" multiple>
        ${salons
          .map(
            (salon) => `
          <option value="${salon.type}" ${
              cinema.salons.some((s) => s.type === salon.type) ? "selected" : ""
            }>
            ${salon.name}
          </option>
        `
          )
          .join("")}
      </select>
      
      <button type="button" onclick="saveCinemaChanges(${
        cinema.id
      })">Speichern</button>
    </form>
    <button onclick="renderCinemaView()">Zurück</button>
  `;
}

export function deleteCinema(cinemaId) {
  const confirmation = confirm(
    "Sind Sie sicher, dass Sie dieses Kino löschen möchten?"
  );
  if (confirmation) {
    cinemas = cinemas.filter((c) => c.id !== cinemaId);
    saveCinemasToLocalStorage(cinemas);
    alert("Das Kino wurde erfolgreich gelöscht!");
    renderCinemaView();
  }
}

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

window.editCinema = editCinema;
window.renderCinemaView = renderCinemaView;
window.saveCinemaChanges = saveCinemaChanges;
window.showCinemaEditForm = showCinemaEditForm;
window.deleteCinema = deleteCinema;
window.addCinema = addCinema;
