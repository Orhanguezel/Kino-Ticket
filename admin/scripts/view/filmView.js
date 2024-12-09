import { films } from "../data/Film.js";
import { categories } from "../data/Category.js";
import { saveDataToLocalStorage, loadDataFromLocalStorage } from "./stateManager.js";

let localFilms = loadDataFromLocalStorage("films") || [];
if (localFilms.length === 0) {
  localFilms = [...films]; // Standardfilme laden
  saveDataToLocalStorage("films", localFilms); // In LocalStorage speichern
}

// Kategori ID'sinden kategori adını döndüren fonksiyon
function getCategoryNames(categoryIds) {
  return categoryIds
    .map((id) => {
      const category = categories.find((cat) => cat.id === id);
      return category ? category.name : `ID ${id} (Bilinmeyen Kategori)`;
    })
    .join(", ");
}


export function renderFilmView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Hauptinhalt-Bereich nicht gefunden!");
    return;
  }

  container.innerHTML = `
    <h2>Filme</h2>
    <button class="add-film-button" onclick="addFilm()">Neuen Film Hinzufügen</button>
    <div class="film-cards">
      ${localFilms
        .map(
          (film) => `
        <div class="film-card">
          <img src="${film.image || './assets/default-film.jpg'}" alt="${film.name}" class="film-image">
          <div class="film-info">
            <h3>${film.name}</h3>
            <p>Dauer: ${film.duration} Minuten</p>
            <p>Kategorien: ${getCategoryNames(film.categories)}</p> <!-- Kategori adları burada doğru gösterilir -->
            <button onclick="editFilm(${film.id})">Bearbeiten</button>
            <button onclick="removeFilm(${film.id})">Löschen</button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

export function editFilm(filmId) {
  const film = localFilms.find((f) => f.id === filmId);
  if (!film) {
    alert("Film nicht gefunden!");
    return;
  }

  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>${film.name} Bearbeiten</h2>
    <form id="film-form">
      <label for="name">Filmtitel:</label>
      <input type="text" id="name" value="${film.name}" required>

      <label for="duration">Dauer (Minuten):</label>
      <input type="number" id="duration" value="${film.duration}" required>

      <label for="categories">Kategorien (mit Komma trennen):</label>
      <select id="categories" multiple required>
        ${categories
          .map(
            (category) =>
              `<option value="${category.id}" ${
                film.categories.includes(category.id) ? "selected" : ""
              }>${category.name}</option>`
          )
          .join("")}
      </select>

      <label for="image">Film Bild:</label>
      <input type="file" id="image" accept="image/*">
      <img src="${film.image || './assets/default-film.jpg'}" alt="${film.name}" class="film-image-preview">

      <button type="button" onclick="saveFilmChanges(${film.id})">Speichern</button>
    </form>
    <button class="back-button" onclick="renderFilmView()">Zurück</button>
  `;
}

export function saveFilmChanges(filmId) {
  const filmIndex = localFilms.findIndex((f) => f.id === filmId);
  if (filmIndex !== -1) {
    const name = document.getElementById("name").value;
    const duration = parseInt(document.getElementById("duration").value, 10);
    const categories = Array.from(
      document.getElementById("categories").selectedOptions
    ).map((option) => parseInt(option.value, 10));
    const imageInput = document.getElementById("image");

    let image = localFilms[filmIndex].image || "./assets/default-film.jpg";
    if (imageInput.files && imageInput.files[0]) {
      const file = imageInput.files[0];
      image = URL.createObjectURL(file);
    }

    localFilms[filmIndex] = {
      ...localFilms[filmIndex],
      name,
      duration,
      categories,
      image,
    };

    saveDataToLocalStorage("films", localFilms);
    alert("Film erfolgreich aktualisiert!");
    renderFilmView();
  } else {
    alert("Film konnte nicht aktualisiert werden!");
  }
}

export function removeFilm(filmId) {
  if (confirm("Möchten Sie diesen Film wirklich löschen?")) {
    localFilms = localFilms.filter((f) => f.id !== filmId);
    saveDataToLocalStorage("films", localFilms);

    alert("Film erfolgreich gelöscht!");
    renderFilmView();
  }
}

export function addFilm() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>Neuen Film Hinzufügen</h2>
    <form id="film-form">
      <label for="name">Filmtitel:</label>
      <input type="text" id="name" placeholder="Filmtitel" required>

      <label for="duration">Dauer (Minuten):</label>
      <input type="number" id="duration" placeholder="Dauer" required>

      <label for="categories">Kategorien:</label>
      <select id="categories" multiple required>
        ${categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join("")}
      </select>

      <label for="image">Film Bild:</label>
      <input type="file" id="image" accept="image/*">

      <button type="button" onclick="saveNewFilm()">Speichern</button>
    </form>
    <button onclick="renderFilmView()">Zurück</button>
  `;
}

export function saveNewFilm() {
  const id = localFilms.length > 0 ? localFilms[localFilms.length - 1].id + 1 : 1;
  const name = document.getElementById("name").value;
  const duration = parseInt(document.getElementById("duration").value, 10);
  const categories = Array.from(
    document.getElementById("categories").selectedOptions
  ).map((option) => parseInt(option.value, 10));
  const imageInput = document.getElementById("image");

  let image = "./assets/default-film.jpg";
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    image = URL.createObjectURL(file);
  }

  const newFilm = {
    id,
    name,
    duration,
    categories,
    image,
  };

  localFilms.push(newFilm);
  saveDataToLocalStorage("films", localFilms);

  alert("Neuer Film erfolgreich hinzugefügt!");
  renderFilmView();
}

// Globale Funktionen
window.renderFilmView = renderFilmView;
window.editFilm = editFilm;
window.removeFilm = removeFilm;
window.addFilm = addFilm;
window.saveNewFilm = saveNewFilm;
window.saveFilmChanges = saveFilmChanges;