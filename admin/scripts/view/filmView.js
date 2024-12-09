import { films } from "../data/Film.js";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "./stateManager.js";

let localFilms = loadDataFromLocalStorage("films") || [];
if (localFilms.length === 0) {
  localFilms = [...films]; // Varsayılan filmleri yükle
  saveDataToLocalStorage("films", localFilms); // LocalStorage'a kaydet
}

export function renderFilmView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Ana içerik bölgesi bulunamadı!");
    return;
  }

  container.innerHTML = `
    <h2>Filmler</h2>
    <button class="add-film-button"onclick="addFilm()">Yeni Film Ekle</button>
    <div class="film-cards">
      ${localFilms
        .map(
          (film) => `
        <div class="film-card">
          <img src="${film.image || "./assets/default-film.jpg"}" alt="${
            film.name
          }" class="film-image">
          <div class="film-info">
            <h3>${film.name}</h3>
            <p>Süre: ${film.duration} dk</p>
            <p>Kategoriler: ${film.categories.join(", ")}</p>
            <button onclick="editFilm(${film.id})">Düzenle</button>
            <button onclick="removeFilm(${film.id})">Sil</button>
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
    alert("Film bulunamadı!");
    return;
  }

  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>${film.name} Düzenleme</h2>
    <form id="film-form">
      <label for="name">Film Adı:</label>
      <input type="text" id="name" value="${film.name}" required>

      <label for="duration">Süre (dk):</label>
      <input type="number" id="duration" value="${film.duration}" required>

      <label for="categories">Kategoriler (virgülle ayırın):</label>
      <input type="text" id="categories" value="${film.categories.join(
        ", "
      )}" required>

      <label for="image">Film Görseli:</label>
      <input type="file" id="image" accept="image/*">
      <img src="${film.image || "./assets/default-film.jpg"}" alt="${
    film.name
  }" class="film-image-preview">

      <button type="button" onclick="saveFilmChanges(${
        film.id
      })">Kaydet</button>
    </form>
    <button onclick="renderFilmView()">Geri</button>
  `;
}

export function saveFilmChanges(filmId) {
  const filmIndex = localFilms.findIndex((f) => f.id === filmId);
  if (filmIndex !== -1) {
    const name = document.getElementById("name").value;
    const duration = parseInt(document.getElementById("duration").value, 10);
    const categories = document
      .getElementById("categories")
      .value.split(",")
      .map((cat) => cat.trim());
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
    alert("Film başarıyla güncellendi!");
    renderFilmView();
  } else {
    alert("Film güncellenemedi!");
  }
}

export function removeFilm(filmId) {
  if (confirm("Bu filmi silmek istediğinizden emin misiniz?")) {
    localFilms = localFilms.filter((f) => f.id !== filmId);
    saveDataToLocalStorage("films", localFilms);

    alert("Film başarıyla silindi!");
    renderFilmView();
  }
}

export function addFilm() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>Yeni Film Ekle</h2>
    <form id="film-form">
      <label for="name">Film Adı:</label>
      <input type="text" id="name" placeholder="Film Adı" required>

      <label for="duration">Süre (dk):</label>
      <input type="number" id="duration" placeholder="Süre" required>

      <label for="categories">Kategoriler (virgülle ayırın):</label>
      <input type="text" id="categories" placeholder="Kategoriler" required>

      <label for="image">Film Görseli:</label>
      <input type="file" id="image" accept="image/*">

      <button type="button" onclick="saveNewFilm()">Kaydet</button>
    </form>
    <button onclick="renderFilmView()">Geri</button>
  `;
}

export function saveNewFilm() {
  const id =
    localFilms.length > 0 ? localFilms[localFilms.length - 1].id + 1 : 1;
  const name = document.getElementById("name").value;
  const duration = parseInt(document.getElementById("duration").value, 10);
  const categories = document
    .getElementById("categories")
    .value.split(",")
    .map((cat) => cat.trim());
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

  alert("Yeni film başarıyla eklendi!");
  renderFilmView();
}

// Global fonksiyonları tanımlayın
window.renderFilmView = renderFilmView;
window.editFilm = editFilm;
window.removeFilm = removeFilm;
window.addFilm = addFilm;
window.saveNewFilm = saveNewFilm;
window.saveFilmChanges = saveFilmChanges;
