import { cinemas } from "../data/cinemas.js";
import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadHome(cinema = null) {
  const home = document.getElementById("home");
  home.style.backgroundImage = `url(${
    cinema ? cinema.backgroundImage : "./assets/cinema/default-bg.jpg"
  })`;
  home.style.transition = "background-image 0.5s ease-in-out";

  // Üst bölüm
  const topSection = `
    <div class="top-section">
        <p>Willkommen in unserem Kino</p>
        <h1>Erleben Sie die Magie des Kinos mit uns</h1>
        <p>Es ist eine allgemein bekannte Tatsache, dass der Leser durch den lesbaren Inhalt einer Seite abgelenkt wird, wenn er sich ihr Layout ansieht.</p>
        <button class="explore-button">Mehr entdecken →</button>
    </div>
  `;

  // Ana içerik
  const mainContent = cinema
    ? `
        <div class="cinema-details">
            <h2>Willkommen bei ${cinema.name}</h2>
            <p>${cinema.description}</p>
            <div class="cinema-actions">
                <button id="startReservationButton" class="btn-primary">Buchen oder Reservieren</button>
                <button id="toMainPageButton" class="btn-secondary">Zurück zur Startseite</button>
            </div>
        </div>
      `
    : `
        <div class="group-info">
            <h2>${cineGroupInfo.title}</h2>
            <p>${cineGroupInfo.description}</p>
            <div class="cinema-actions">
                ${cinemas
                  .map(
                    (cinema) =>
                      `<button class="btn-primary cinema-select" data-id="${cinema.id}">${cinema.name}</button>`
                  )
                  .join("")}
            </div>
        </div>
      `;

// Alt bölüm
const bottomSection = `
  <div class="bottom-section">
      <div class="bottom-section-content">
          <h2>Über unser Kino & Filme</h2>
          <p>CineGrup ist Ihr vertrauenswürdiger Partner für unvergessliche Kinoerlebnisse. Mit modernster Technologie und einer breiten Auswahl an Filmen bieten wir Ihnen die perfekte Unterhaltung für jede Altersgruppe und jeden Geschmack.</p>
          <p>Unsere Kinos sind mit hochauflösenden Leinwänden, HD 4K-Projektionen und Dolby-Atmos-Sound ausgestattet, um sicherzustellen, dass Sie jedes Detail genießen können. Ob Sie Blockbuster, Klassiker oder unabhängige Filme lieben – bei uns finden Sie alles.</p>
          <div class="bottom-statistics">
              <div class="stat">
                  <i class="fas fa-film"></i>
                  <h3>50+</h3>
                  <p>Kinos in ganz Deutschland</p>
              </div>
              <div class="stat">
                  <i class="fas fa-users"></i>
                  <h3>1M+</h3>
                  <p>Zufriedene Kunden pro Jahr</p>
              </div>
              <div class="stat">
                  <i class="fas fa-award"></i>
                  <h3>25 Jahre</h3>
                  <p>Erfahrung in der Kinobranche</p>
              </div>
              <div class="stat">
                  <i class="fas fa-tv"></i>
                  <h3>HD 4K</h3>
                  <p>Modernste Projektionstechnologie</p>
              </div>
          </div>
      </div>
  </div>
`;




  home.innerHTML = topSection + mainContent + bottomSection;

  // Event Listeners
  if (cinema) {
    document
      .getElementById("startReservationButton")
      .addEventListener("click", () => {
        // Rezervasyon işlemi
      });

    document
      .getElementById("toMainPageButton")
      .addEventListener("click", () => {
        loadHome(); // Ana sayfaya dönüş
      });
  } else {
    document.querySelectorAll(".cinema-select").forEach((button) => {
      button.addEventListener("click", (event) => {
        const cinemaId = event.target.getAttribute("data-id");
        const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);

        if (selectedCinema) {
          loadHome(selectedCinema); // Sinema sayfasını yükle
        } else {
          console.error("Geçersiz sinema seçimi!");
        }
      });
    });
  }
}
