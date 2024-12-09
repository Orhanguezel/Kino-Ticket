import { cinemas as defaultCinemas } from "../data/Cinemas.js";
import { films as defaultFilms } from "../data/Film.js";

import {
  loadCinemasFromLocalStorage,
  saveCinemasToLocalStorage,
  loadFilmsFromLocalStorage,
  saveFilmsToLocalStorage,
} from "./stateManager.js";

import { assignRandomFilms, assignOptimalFilms } from "./filmAssignment.js";

let showtimes = JSON.parse(localStorage.getItem("showtimes")) || [];

// Eğer LocalStorage'da sinema verisi yoksa varsayılan sinemaları yükle
let cinemas = loadCinemasFromLocalStorage();
if (cinemas.length === 0) {
  cinemas = [...defaultCinemas];
  saveCinemasToLocalStorage(cinemas);
}

// Eğer LocalStorage'da film verisi yoksa varsayılan filmleri yükle
let films = loadFilmsFromLocalStorage();
if (films.length === 0) {
  films = [...defaultFilms];
  saveFilmsToLocalStorage(films);
}

// Gösterim görünümü oluştur
export function renderShowtimeView() {
  const container = document.getElementById("main-content");

  // Sayfa temel yapısı
  container.innerHTML = `
    <h2>Gösterimler</h2>
    


    <div class="showtime-controls">
      <h3>Toplu Gösterim Atama</h3>
      <button onclick="assignRandomFilms()">Rastgele Atama</button>
      <button onclick="assignOptimalFilms()">Optimal Atama</button>
    </div>
    <div class="current-showtimes-section">
      <h3>Mevcut Gösterimler</h3>
      <div id="current-showtimes">
        ${renderGroupedShowtimes()}
      </div>
    </div>

    <div class="add-showtime-section">
      <h3>Yeni Gösterim Ekle</h3>
      <form id="add-showtime-form">
        <label for="cinema-select">Sinema:</label>
        <select id="cinema-select" required>
          ${cinemas
            .map(
              (cinema) => `<option value="${cinema.id}">${cinema.name}</option>`
            )
            .join("")}
        </select>
        
        <label for="salon-select">Salon:</label>
        <select id="salon-select" required>
          <option value="">Önce sinema seçin</option>
        </select>
        
        <label for="film-select">Film:</label>
        <select id="film-select" required>
          ${films
            .map((film) => `<option value="${film.id}">${film.name}</option>`)
            .join("")}
        </select>
        
        <label for="showtime-input">Gösterim Saatleri:</label>
        <div id="showtime-list"></div>
        <input type="time" id="showtime-input">
        <button type="button" id="add-showtime-button">Saat Ekle</button>
        
        <button type="button" onclick="addShowtime()">Kaydet</button>
      </form>
    </div>

  `;

  // Dinamik olarak salonları güncelle
  const cinemaSelect = document.getElementById("cinema-select");
  const salonSelect = document.getElementById("salon-select");

  cinemaSelect.addEventListener("change", () => {
    const selectedCinemaId = parseInt(cinemaSelect.value, 10);
    const selectedCinema = cinemas.find(
      (cinema) => cinema.id === selectedCinemaId
    );

    if (selectedCinema) {
      salonSelect.innerHTML = selectedCinema.salons
        .map((salon) => `<option value="${salon.type}">${salon.name}</option>`)
        .join("");
    }
  });

  // Gösterim saati ekleme
  const addShowtimeButton = document.getElementById("add-showtime-button");
  const showtimeList = document.getElementById("showtime-list");

  addShowtimeButton.addEventListener("click", () => {
    const showtimeInput = document.getElementById("showtime-input");
    const time = showtimeInput.value;

    if (time) {
      const timeDiv = document.createElement("div");
      timeDiv.className = "showtime-item";
      timeDiv.innerHTML = `
        <span>${time}</span>
        <button type="button" class="remove-showtime-button">Sil</button>
      `;

      // Saat silme
      timeDiv
        .querySelector(".remove-showtime-button")
        .addEventListener("click", () => {
          timeDiv.remove();
        });

      showtimeList.appendChild(timeDiv);
      showtimeInput.value = ""; // Saat girdisini temizle
    } else {
      alert("Lütfen bir saat seçin!");
    }
  });

  // Varsayılan olarak ilk sinema salonlarını yükle
  cinemaSelect.dispatchEvent(new Event("change"));
}

// Gösterim listesi render fonksiyonu
function renderGroupedShowtimes() {
  const cinemaGroups = {};
  showtimes.forEach((showtime) => {
    if (!cinemaGroups[showtime.cinemaName]) {
      cinemaGroups[showtime.cinemaName] = [];
    }
    cinemaGroups[showtime.cinemaName].push(showtime);
  });

  return Object.keys(cinemaGroups)
    .map((cinemaName) => {
      const cinemaShowtimes = cinemaGroups[cinemaName];
      return `
        <h3>${cinemaName}</h3>
        <table>
          <thead>
            <tr>
              <th>Salon</th>
              <th>Film</th>
              <th>Gösterim Saatleri</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            ${cinemaShowtimes
              .map(
                (showtime) => `
                <tr>
                  <td>${showtime.salonName}</td>
                  <td>${showtime.filmName}</td>
                  <td>${showtime.times.join(", ")}</td>
                  <td>
                    <button onclick="editShowtime(${showtimes.indexOf(
                      showtime
                    )})">Düzenle</button>
                    <button onclick="removeShowtime(${showtimes.indexOf(
                      showtime
                    )})">Sil</button>
                  </td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      `;
    })
    .join("");
}

// Gösterim ekleme fonksiyonu
export function addShowtime() {
  const cinemaId = parseInt(document.getElementById("cinema-select").value, 10);
  const salonType = parseInt(document.getElementById("salon-select").value, 10);
  const filmId = parseInt(document.getElementById("film-select").value, 10);

  const cinema = cinemas.find((cinema) => cinema.id === cinemaId);
  const salon = cinema?.salons.find((salon) => salon.type === salonType);
  const film = films.find((film) => film.id === filmId);

  const times = Array.from(
    document.querySelectorAll("#showtime-list .showtime-item span")
  ).map((span) => span.textContent);

  if (!cinema || !salon || !film || times.length === 0) {
    alert("Lütfen tüm alanları doldurun ve en az bir saat ekleyin!");
    return;
  }

  const newShowtime = {
    cinemaId,
    cinemaName: cinema.name,
    salonType,
    salonName: salon.name,
    filmId,
    filmName: film.name,
    times,
  };

  showtimes.push(newShowtime);
  localStorage.setItem("showtimes", JSON.stringify(showtimes)); // LocalStorage'a kaydet

  alert("Gösterim başarıyla eklendi!");
  renderShowtimeView();
}

export function removeShowtime(index) {
  if (confirm("Bu gösterimi silmek istediğinizden emin misiniz?")) {
    showtimes.splice(index, 1);
    localStorage.setItem("showtimes", JSON.stringify(showtimes)); // LocalStorage'ı güncelle
    alert("Gösterim başarıyla silindi!");
    renderShowtimeView();
  }
}

export function editShowtime(index) {
  const showtime = showtimes[index]; // Düzenlenecek gösterimi al
  const container = document.getElementById("main-content");

  if (!showtime) {
    console.error("Gösterim bulunamadı!");
    return;
  }

  // Düzenleme formunu oluştur
  container.innerHTML = `
    <h2>Gösterimi Düzenle</h2>
    <form id="edit-showtime-form">
      <label for="cinema">Sinema:</label>
      <select id="cinema" required>
        ${cinemas
          .map(
            (cinema) => `
          <option value="${cinema.id}" ${
              cinema.id === showtime.cinemaId ? "selected" : ""
            }>
            ${cinema.name}
          </option>
        `
          )
          .join("")}
      </select>
      
      <label for="salon">Salon:</label>
      <select id="salon" required>
        <option value="">Önce sinema seçin</option>
      </select>
      
      <label for="film">Film:</label>
      <select id="film" required>
        ${films
          .map(
            (film) => `
          <option value="${film.id}" ${
              film.id === showtime.filmId ? "selected" : ""
            }>
            ${film.name}
          </option>
        `
          )
          .join("")}
      </select>
      
      <label for="showTimes">Gösterim Saatleri:</label>
      <div id="showTimeList">
        ${showtime.times
          .map(
            (time) => `
          <div>
            <input type="time" value="${time}" class="showTimeInput" required>
            <button type="button" class="remove-showTime">Sil</button>
          </div>
        `
          )
          .join("")}
      </div>
      <button type="button" id="addShowTime">Saat Ekle</button>
      
      <button type="button" onclick="saveShowtimeChanges(${index})">Kaydet</button>
    </form>
    <button onclick="renderShowtimeView()">Geri</button>
  `;

  // Sinema değiştiğinde salonları güncelle
  document.getElementById("cinema").onchange = (event) => {
    const cinemaId = parseInt(event.target.value, 10);
    const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);
    const salonSelect = document.getElementById("salon");
    if (selectedCinema) {
      salonSelect.innerHTML = selectedCinema.salons
        .map(
          (salon) => `
        <option value="${salon.type}" ${
            salon.type === showtime.salonType ? "selected" : ""
          }>
          ${salon.name}
        </option>
      `
        )
        .join("");
    } else {
      salonSelect.innerHTML = `<option value="">Önce sinema seçin</option>`;
    }
  };

  // Saat ekleme işlemi
  document.getElementById("addShowTime").onclick = () => {
    const showTimeList = document.getElementById("showTimeList");
    const newTimeInput = document.createElement("div");
    newTimeInput.innerHTML = `
      <input type="time" class="showTimeInput" required>
      <button type="button" class="remove-showTime">Sil</button>
    `;
    showTimeList.appendChild(newTimeInput);

    newTimeInput.querySelector(".remove-showTime").onclick = () => {
      newTimeInput.remove();
    };
  };

  // Saat silme işlemi
  document.querySelectorAll(".remove-showTime").forEach((button) => {
    button.onclick = () => {
      button.parentElement.remove();
    };
  });

  // Sinema seçimini başlat
  document.getElementById("cinema").dispatchEvent(new Event("change"));
}

// Gösterimi kaydet
export function saveShowtimeChanges(index) {
  const cinemaId = parseInt(document.getElementById("cinema").value, 10);
  const salonType = parseInt(document.getElementById("salon").value, 10);
  const filmId = parseInt(document.getElementById("film").value, 10);
  const times = Array.from(document.querySelectorAll(".showTimeInput"))
    .map((input) => input.value)
    .filter((time) => time !== "");

  const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);
  const selectedSalon = selectedCinema?.salons.find(
    (salon) => salon.type === salonType
  );
  const selectedFilm = films.find((film) => film.id === filmId);

  if (!selectedCinema || !selectedSalon || !selectedFilm) {
    alert("Lütfen tüm alanları doldurun!");
    return;
  }

  // Gösterimi güncelle
  showtimes[index] = {
    cinemaId,
    cinemaName: selectedCinema.name,
    salonType,
    salonName: selectedSalon.name,
    filmId,
    filmName: selectedFilm.name,
    times,
  };

  // LocalStorage'a kaydet
  localStorage.setItem("showtimes", JSON.stringify(showtimes));

  alert("Gösterim başarıyla güncellendi!");
  renderShowtimeView();
}

// Global hale getirme
window.renderShowtimeView = renderShowtimeView;
window.addShowtime = addShowtime;
window.removeShowtime = removeShowtime;
window.assignRandomFilms = assignRandomFilms;
window.assignOptimalFilms = assignOptimalFilms;
window.editShowtime = editShowtime;
window.saveShowtimeChanges = saveShowtimeChanges;
window.renderGroupedShowtimes = renderGroupedShowtimes();
