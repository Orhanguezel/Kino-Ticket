import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";
import {
  loadCinemasFromLocalStorage,
  saveCinemasToLocalStorage,
} from "./stateManager.js";

// Sinemalar LocalStorage'dan yükleniyor
let logo = "./assets/default-logo.png";
let background = "./assets/default-background.png";

let cinemas = loadCinemasFromLocalStorage();
if (cinemas.length === 0) {
  cinemas = [...defaultCinemas]; // Varsayılan verileri kullan
  saveCinemasToLocalStorage(cinemas); // LocalStorage'a kaydet
}

export function renderCinemaView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Ana içerik bölgesi bulunamadı!");
    return;
  }

  if (cinemas.length === 0) {
    container.innerHTML =
      "<p>Sinema bilgisi bulunamadı. Yeni bir sinema eklemek için aşağıdaki butona tıklayın.</p>";
    return;
  }

  container.innerHTML = `
    <h2>Sinemalar</h2>
    <button class="add-cinema-button" onclick="addCinema()">Yeni Sinema Ekle</button>
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
            <p>Adres: ${cinema.address}</p>
            <p>Açıklama: ${cinema.description || "Açıklama yok"}</p>
            <p>Telefon: ${cinema.phone || "Belirtilmemiş"}</p>
            <p>Email: ${cinema.email || "Belirtilmemiş"}</p>
            <button onclick="editCinema(${cinema.id})">Düzenle</button>
            <button onclick="deleteCinema(${cinema.id})">Sil</button>
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
        alert("Değişiklikler kaydedildi!");
        renderCinemaView();
      });
    } else {
      saveCinemasToLocalStorage(cinemas);
      alert("Değişiklikler kaydedildi!");
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
    <h2>Yeni Sinema Ekle</h2>
    <form id="add-cinema-form">
      <label for="name">Ad:</label>
      <input type="text" id="name" placeholder="Sinema Adı" required>
      
      <label for="address">Adres:</label>
      <input type="text" id="address" placeholder="Sinema Adresi" required>
      
      <label for="logo">Logo:</label>
      <input type="file" id="logo" accept="image/*">

      <label for="description">Açıklama:</label>
      <textarea id="description" placeholder="Sinema açıklaması"></textarea>

      <label for="background">Arka Plan Resmi:</label>
      <input type="file" id="background" accept="image/*">

      <label for="phone">Telefon:</label>
      <input type="tel" id="phone" placeholder="Telefon Numarası">
      
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="E-posta Adresi">

      <label for="mapEmbed">Harita (Embed Kodu):</label>
      <textarea id="mapEmbed" placeholder="Harita Embed Kodu"></textarea>

      <label for="salons">Salonlar:</label>
      <select id="salons" multiple>
        ${salons
          .map(
            (salon) => `
          <option value="${salon.type}">${salon.name}</option>
        `
          )
          .join("")}
      </select>

      <button type="button" onclick="saveNewCinema()">Kaydet</button>
    </form>
    <button onclick="renderCinemaView()">Geri</button>
  `;
}

export function saveNewCinema() {
  // Form verilerini al
  if (!document.getElementById("add-cinema-form").checkValidity()) {
    alert("Lütfen tüm alanları doldurun!");
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

  // Salon seçimini al
  const selectedSalonTypes = Array.from(
    document.getElementById("salons").selectedOptions
  ).map((option) => parseInt(option.value));
  const selectedSalons = salons.filter((salon) =>
    selectedSalonTypes.includes(salon.type)
  );

  // Logo ve Arka Plan Resmi Yükleme
  let logo = "./assets/default-logo.png";
  let background = "./assets/default-background.png";

  if (logoInput.files && logoInput.files[0]) {
    logo = URL.createObjectURL(logoInput.files[0]);
  }

  if (backgroundInput.files && backgroundInput.files[0]) {
    background = URL.createObjectURL(backgroundInput.files[0]);
  }

  // Yeni sinema oluşturma
  const newCinema = new Cinema(
    Date.now(), // Benzersiz ID
    name,
    address,
    logo,
    description,
    background,
    phone,
    email,
    mapEmbed,
    selectedSalons // Seçilen salonlar
  );

  // LocalStorage'a ekle ve kaydet
  cinemas.push(newCinema);
  saveCinemasToLocalStorage(cinemas);

  alert("Yeni sinema başarıyla eklendi!");
  renderCinemaView();
}

export function showCinemaEditForm(cinema) {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>${cinema.name} Düzenleme</h2>
    <form id="edit-cinema-form">
      <label for="name">Ad:</label>
      <input type="text" id="name" value="${cinema.name}" required>
      
      <label for="address">Adres:</label>
      <input type="text" id="address" value="${cinema.address}" required>
      
      <label for="logo">Logo:</label>
      <input type="file" id="logo" accept="image/*">
      <img src="${cinema.logo}" alt="Mevcut Logo" class="cinema-logo-preview">
      
      <label for="description">Açıklama:</label>
      <textarea id="description">${cinema.description}</textarea>
      
      <label for="background">Arka Plan Resmi:</label>
      <input type="file" id="background" accept="image/*">
      <img src="${
        cinema.background
      }" alt="Mevcut Arka Plan" class="cinema-background-preview">
      
      <label for="phone">Telefon:</label>
      <input type="tel" id="phone" value="${cinema.phone}">
      
      <label for="email">Email:</label>
      <input type="email" id="email" value="${cinema.email}">
      
      <label for="mapEmbed">Harita (Embed Kodu):</label>
      <textarea id="mapEmbed">${cinema.mapEmbed}</textarea>

      <label for="salons">Salonlar:</label>
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
      })">Kaydet</button>
    </form>
    <button onclick="renderCinemaView()">Geri</button>
  `;
}

export function deleteCinema(cinemaId) {
  const confirmation = confirm(
    "Bu sinemayı silmek istediğinizden emin misiniz?"
  );
  if (confirmation) {
    cinemas = cinemas.filter((c) => c.id !== cinemaId);
    saveCinemasToLocalStorage(cinemas);
    alert("Sinema başarıyla silindi!");
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

// Global hale getirme
window.editCinema = editCinema;
window.renderCinemaView = renderCinemaView;
window.saveCinemaChanges = saveCinemaChanges;
window.showCinemaEditForm = showCinemaEditForm;
window.deleteCinema = deleteCinema;
window.addCinema = addCinema;
