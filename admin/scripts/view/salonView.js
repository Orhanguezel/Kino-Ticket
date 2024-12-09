import { salons as defaultSalons } from "../data/Salons.js";
import {
  loadSalonsFromLocalStorage,
  saveSalonsToLocalStorage,
  saveDataToLocalStorage,
  saveStateToLocalStorage,
} from "./stateManager.js";

// LocalStorage'dan verileri yükle
let salons = loadSalonsFromLocalStorage();
if (salons.length === 0) {
  salons = [...defaultSalons]; // Varsayılan verileri kullan
  saveSalonsToLocalStorage(salons); // LocalStorage'a kaydet
}

export function renderSalonView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Ana içerik bölgesi bulunamadı!");
    return;
  }

  container.innerHTML = `
    <h2>Salonlar</h2>
    <button class="add-salon-button" onclick="addSalon()">Yeni Salon Ekle</button>
    <div class="salon-cards">
      ${salons
        .map(
          (salon) => `
        <div class="salon-card">
          <img src="${salon.image}" alt="${salon.name}" class="salon-image">
          <div class="salon-info">
            <h3>${salon.name}</h3>
            <p>Kapasite: ${salon.seats}</p>
            <p>Genişlik: ${salon.aisleWidth} m</p>
            <p>Fiyat: ${salon.price} €</p>
            <p>Özellikler: 
              ${salon.features?.is3D ? "3D" : ""} 
              ${salon.features?.isVIP ? "VIP" : ""} 
              ${salon.features?.sound || "Ses sistemi belirtilmedi"}
            </p>
            <p>Gösterim Saatleri: ${
              Array.isArray(salon.showTimes)
                ? salon.showTimes.join(", ")
                : "Veri bulunamadı"
            }</p>
            <button class="update-salon-button onclick="editSalon(${
              salon.type
            })">Düzenle</button>
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
    type = salons.length > 0 ? salons[salons.length - 1].type + 1 : 1, // Sıradaki tip numarası otomatik atanır
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
    <h2>${salon.type ? "Salon Düzenleme" : "Yeni Salon Ekle"}</h2>
    <form id="salon-form">
      <label for="salon-name">Salon Adı:</label>
      <input type="text" id="salon-name" value="${name}" required>

      <label for="salon-image">Salon Görseli:</label>
      <input type="file" id="salon-image" accept="image/*">
      <img src="${image}" alt="${name}" class="salon-image-preview">

      <label for="salon-seats">Kapasite:</label>
      <input type="number" id="salon-seats" value="${seats}" required>

      <label for="salon-aisleWidth">Koltuk Aralığı (m):</label>
      <input type="number" id="salon-aisleWidth" value="${aisleWidth}" required>

      <label for="salon-features">Özellikler:</label>
      <div>
        <input type="checkbox" id="salon-is3D" ${
          features.is3D ? "checked" : ""
        }> <label for="salon-is3D">3D</label>
        <input type="checkbox" id="salon-isVIP" ${
          features.isVIP ? "checked" : ""
        }> <label for="salon-isVIP">VIP</label>
      </div>

      <label for="salon-sound">Ses Sistemi:</label>
      <input type="text" id="salon-sound" value="${features.sound}" required>

      <label for="salon-price">Fiyat:</label>
      <input type="number" id="salon-price" value="${price}" required>

      <label for="salon-showTimes">Gösterim Saatleri:</label>
      <input type="text" id="salon-showTimes" value="${showTimes.join(", ")}">

      <button type="button" id="save-salon-button">${
        salon.type ? "Kaydet" : "Oluştur"
      }</button>
    </form>
    <button onclick="renderSalonView()">Geri</button>
  `;

  document.getElementById("save-salon-button").onclick = () => {
    salon.type ? saveSalonChanges(salon.type) : saveNewSalon();
  };
}

export function addSalon() {
  renderSalonForm(); // Yeni salon ekleme formu
}

export function editSalon(type) {
  const salon = salons.find((salon) => salon.type === type);
  if (salon) {
    renderSalonForm(salon);
  } else {
    console.warn(`Salon Tipi ${type} bulunamadı.`);
  }
}

export function saveNewSalon() {
  const nameInput = document.getElementById("salon-name");
  if (!nameInput) {
    console.error("Salon formundaki 'Salon Adı' alanı bulunamadı.");
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

  // LocalStorage'a kaydet
  saveDataToLocalStorage("salons", salons);

  alert("Salon başarıyla kaydedildi!");
  renderSalonView();
}

export function deleteSalon(type) {
  if (confirm("Bu salonu silmek istediğinizden emin misiniz?")) {
    const salonIndex = salons.findIndex((salon) => salon.type === type);
    if (salonIndex !== -1) {
      salons.splice(salonIndex, 1);

      // LocalStorage'a güncel veri yaz
      saveDataToLocalStorage("salons", salons);

      alert("Salon başarıyla silindi!");
      renderSalonView();
    } else {
      console.warn(`Salon Tipi ${type} bulunamadı.`);
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

    // LocalStorage'a kaydet
    saveSalonsToLocalStorage(salons);

    alert("Salon güncellendi!");
    renderSalonView();
  } else {
    console.warn(`Salon Tipi ${type} bulunamadı.`);
  }
}

// Yeni başlangıç verileri
const initialCinemas = [];
const initialFilms = [];
const initialSalons = [];

export function resetAndInitializeData() {
  // LocalStorage'ı temizle
  clearLocalStorage();

  // Başlangıç verilerini ayarla
  initializeAppState(initialCinemas, initialFilms, initialSalons);

  // Durumu kaydet
  saveStateToLocalStorage();

  console.log("LocalStorage sıfırlandı ve başlangıç verileri eklendi.");
}

export function renderResetButton() {
  const navbar = document.getElementById("navbar");
  const resetButton = document.createElement("button");
  resetButton.textContent = "Sıfırla";
  resetButton.onclick = resetAndInitializeData;
  navbar.appendChild(resetButton);
}

// Global fonksiyonları tanımlayın
window.addSalon = addSalon;
window.editSalon = editSalon;
window.deleteSalon = deleteSalon;
window.saveNewSalon = saveNewSalon;
window.saveSalonChanges = saveSalonChanges;
window.renderSalonView = renderSalonView;
