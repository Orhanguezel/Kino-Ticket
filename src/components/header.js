import { cineGroupInfo } from "../data/cinemas.js";
import { showCartModal, updateCartCount } from "../reservation/paymentHandler.js";
import { setupContactHamburgerMenu } from "./contactHamburger.js";
import { getSelectedCinema, setupMainContent } from "../reservation/cinemaSelection.js"; 
import { updateUI } from "../../controllers/uiController.js";

export function loadHeader(cinema = null) {
  // Eğer sinema seçilmemişse localStorage'dan kontrol et
  cinema = cinema || getSelectedCinema() || cineGroupInfo;

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
                  <img id="headerLogo" src="${cinema?.logo || cineGroupInfo.logo}" alt="${
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
                    <li><a href="#" id="homeLink">Startseite</a></li>
                    <li><a href="#">Über uns</a></li>
                    <li><a href="#">Filme</a></li>
                  </ul>
                </nav>
            </header>

            <!-- Sidebar -->
            <aside class="grid-sidebar">
                <div class="sidebar-login-register">
                    <a href="#" id="homeLink">Login</a>
                    <a href="#">Register</a>
                </div>
                <div class="sidebar-cart" id="cartLink" data-count="0">
                  <i class="fas fa-shopping-cart"></i>
                  <span id="cartCount" class="cart-count">0</span>
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
                <section class="main-content" id="mainContent"></section>
            </main>
        </div>
    `;

  setupContactHamburgerMenu(); // Dinamik hamburger menü
  setupNavListeners();

  // Dinamik İçeriği ve Background Ayarını Başlat
  setupMainContent(cinema);
}


function setupNavListeners(cinema) {
  const cartLink = document.getElementById("cartLink");
  const homeLink = document.getElementById("homeLink");
  const headerLogo = document.getElementById("headerLogo");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navLinks = document.querySelector(".nav-links");

  // Sepet modal açma
  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      showCartModal();
      console.log("Cart modal opened");
    });
  }

  // Ana sayfaya dönme
  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Navigating to main page");
      localStorage.removeItem("selectedCinema"); // Seçilen sinemayı temizle
      updateUI(null); // Varsayılan duruma dön
    });
  }

  // Logo tıklama
  if (headerLogo) {
    headerLogo.addEventListener("click", (e) => {
      e.preventDefault();
      if (cinema) {
        updateUI(cinema); // Seçili sinema sayfasını yükle
      } else {
        updateUI(null); // Ana sayfayı yükle
      }
    });
  }

  // Navbar için hamburger menü kontrolü
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.toggle("active");
      }
      hamburgerMenu.classList.toggle("open");
      console.log("Hamburger menu toggled");
    });
  }

  // Navbar dışına tıklayınca kapanması
  document.addEventListener("click", (event) => {
    if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !event.target.closest(".hamburger-menu") &&
      !event.target.closest(".nav-links")
    ) {
      navLinks.classList.remove("active");
      hamburgerMenu.classList.remove("open");
      console.log("Hamburger menu closed by outside click");
    }
  });

  // Sepet içeriğini güncelleme
  updateCartCount();

  // Dinamik sinema seçim
  document.querySelectorAll(".cinema-select").forEach((button) => {
    button.addEventListener("click", (event) => {
      const cinemaId = event.target.getAttribute("data-id");
      const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);

      if (selectedCinema) {
        console.log(`Cinema selected: ${selectedCinema.name}`);
        updateUI(selectedCinema); // Sinema sayfasını yükle
      } else {
        console.error("Geçersiz sinema seçimi!");
      }
    });
  });
}
