import { cineGroupInfo } from "../data/cineGroupInfo.js";
import { cinemas } from "../data/cinemas.js";
import { showCartModal } from "../reservation/paymentHandler.js";
import { getCart } from "../reservation/checkoutHandler.js";

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

            <div class="contact-overlay-content">
            <button id="closeContactOverlay" style="float: right; font-size: 1.5rem; background: none; border: none; color: var(--dark-color); cursor: pointer;">&times;</button>
            <h2>Contact Us</h2>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                    <p>(+888) 123 456 765</p>
                    <p>(+888) 123 456 765</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <p>cinemacontact@gmail.com</p>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>444 Broklyn, New York City<br>86 Road Broklyn Street, 600</p>
            </div>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-telegram"></i></a>
                <a href="#"><i class="fab fa-whatsapp"></i></a>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.839604108928!2d144.9630550159045!3d-37.81421797975127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb8d1d5b0a6378e2c!2sMetro%20Manila%2C%20Filipinler!5e0!3m2!1str!2str!4v1612171371532!5m2!1str!2str"
                allowfullscreen=""
                loading="lazy"></iframe>
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
                    <li><a href="#">Kontakt</a></li>
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

document.addEventListener("click", (event) => {
  if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !event.target.closest(".hamburger-menu") &&
      !event.target.closest(".nav-links")
  ) {
      navLinks.classList.remove("active");
      hamburgerMenu.classList.remove("open");
  }
});

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

  // Sepet içeriğini güncelleme
  updateCartCount();

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

function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.length;
  const cartIcon = document.querySelector(".sidebar-cart");
  const cartCountElement = document.getElementById("cartCount");

  if (cartIcon && cartCountElement) {
    if (cartCount > 0) {
      cartIcon.setAttribute("data-count", cartCount);
      cartCountElement.textContent = cartCount;

      // Animasyon tetikleyici
      cartCountElement.classList.add("bounce");
      setTimeout(() => {
        cartCountElement.classList.remove("bounce");
      }, 500);
    } else {
      cartIcon.removeAttribute("data-count");
      cartCountElement.textContent = "";
    }
  }
}
