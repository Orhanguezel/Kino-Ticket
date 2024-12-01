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
                  <img src="${cinema?.logo || cineGroupInfo.logo}" alt="${cinema?.name || "CineGrup"}">
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
                <div class="sidebar-search">Arama</div>
                <div class="sidebar-cart" id="cartLink">Sepet</div>
            </aside>
      
            <!-- Main Content -->
            <main class="grid-main">
                <section class="main-content">
                  <h1>Experience the Magic of Cinema with Us</h1>
                  <p>Açıklama metni buraya gelecek...</p>
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
