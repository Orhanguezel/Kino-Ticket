import { cineGroupInfo } from "../data/cinemas.js";
import { showCartModal, updateCartCount } from "../reservation/paymentHandler.js";
import { setupContactHamburgerMenu } from "./contactHamburger.js";
import { getSelectedCinema, setupMainContent } from "../reservation/cinemaSelection.js"; 

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


function setupNavListeners() {
  const cartLink = document.getElementById("cartLink");
  const homeLink = document.getElementById("homeLink");

  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      showCartModal();
    });
  }

  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("selectedCinema");
      goToMainPage() // Varsayılan duruma dön
    });
  }

  updateCartCount();
}
