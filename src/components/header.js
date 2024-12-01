import { cineGroupInfo } from "../data/cineGroupInfo.js";
import { cinemas } from "../data/cinemas.js";
import { showCartModal } from "../reservation/showCartModal.js";

export function loadHeader(cinema = null) {
  // Dinamik Arka Plan Ayarı
  document.body.style.backgroundImage = `url('${
    cinema ? cinema.backgroundImage : "./assets/cinema/default-bg.jpg"
  }')`;
  
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.transition = "background-image 0.5s ease-in-out";

  const header = document.getElementById("header");
  header.innerHTML = `
        <div class="grid-container">
            <!-- Sol Üst: Hamburger Menü -->
            <div class="grid-hamburger-menu">
                <div class="lines">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>

            <!-- Header -->
            <header class="grid-header">
                <div class="header-logo">
                  <img src="${cinema?.logo || cineGroupInfo.logo}" alt="${
    cinema?.name || "CineGrup"
  }">
                  <h1>${cinema?.name || cineGroupInfo.title}</h1>
                </div>
      
                <nav class="header-nav">
                  <!-- İkinci Hamburger Menü (Navbar için) -->
                  <div class="hamburger-menu" id="hamburgerMenu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                  </div>
                  <ul class="nav-links">
                    <li><a href="#" id="homeLink"> Startseite</a></li>
                    <li><a href="#"> Über uns</a></li>
                    <li><a href="#"> Filme</a></li>
                    <li><a href="#"> Kontakt</a></li>
                    <li><a href="#" class="buy-now"> Jetzt kaufen</a></li>
                  </ul>
                </nav>
            </header>

            <!-- Sidebar -->
            <aside class="grid-sidebar">
                <div class="sidebar-login-register">
                    <a href="#" id="homeLink"> Login</a>
                    <a href="#"> Register</a>
                </div>
                <div class="sidebar-cart" id="cartLink">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="sidebar-search">
                    <i class="fas fa-search"></i>
                </div>
            </aside>
      
            <!-- Main Content -->
            <main class="grid-main">
                <section class="top-section">
                  <p>Willkommen in unserem Kino</p>
                  <h1>Erleben Sie die Magie des Kinos mit uns</h1>
                  <p>Es ist eine allgemein bekannte Tatsache, dass der Leser durch den lesbaren Inhalt einer Seite abgelenkt wird, wenn er sich ihr Layout ansieht.</p>
                  <button class="explore-button">Mehr entdecken →</button>
                </section>
                <section class="main-content" id="mainContent">
                  ${
                    cinema
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
                      `
                  }
                </section>
            </main>
        </div>
    `;

  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navLinks = document.querySelector(".nav-links");
  const cartLink = document.getElementById("cartLink");

  // Navbar için hamburger menü kontrolü
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.toggle("active");
      }
      hamburgerMenu.classList.toggle("open");
    });
  }

  // Home link kontrolü
  const homeLink = document.getElementById("homeLink");
  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof updateUI === "function") {
        updateUI(null);
      }
    });
  }

  // Cart modal açma
  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      showCartModal();
    });
  }

  // Main Content'e Dinamik Arka Plan Uygulama
  const mainContent = document.getElementById("mainContent");
  if (mainContent) {
    mainContent.style.backgroundImage = `url('${
      cinema ? cinema.backgroundImage : "./assets/cinema/default-bg.jpg"
    }')`;}


  // Event Dinamik Sinema Seçim
  document.querySelectorAll(".cinema-select").forEach((button) => {
    button.addEventListener("click", (event) => {
      const cinemaId = event.target.getAttribute("data-id");
      const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);

      if (selectedCinema) {
        updateUI(selectedCinema); // Sinema sayfasını yükle
      } else {
        console.error("Geçersiz sinema seçimi!");
      }
    });
  });
}
