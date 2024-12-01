import { cineGroupInfo } from "../data/cineGroupInfo.js";
import { showCartModal } from "../reservation/showCartModal.js";

export function loadHeader(cinema = null) {
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
                <section class="cinema-filter-grid">
                  <div class="image">Görsel 1</div>
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
      if (typeof loadHome === "function") {
        loadHome();
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
}
