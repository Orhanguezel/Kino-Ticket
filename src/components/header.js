import { cineGroupInfo } from "../data/cineGroupInfo.js";
import { showCartModal } from "../reservation/showCartModal.js";

export function loadHeader(cinema = null) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <div class="header-content">
            <div class="logo-title">
                <img src="${cinema && cinema.logo ? cinema.logo : cineGroupInfo.logo}" alt="${cinema && cinema.name ? cinema.name : "CineGrup"}">
                <h1>${cinema && cinema.name ? cinema.name : cineGroupInfo.title}</h1>
            </div>
            <nav class="navbar">
                <div class="hamburger-menu" id="hamburgerMenu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <ul class="nav-links">
                    <li><a href="#" id="homeLink"><i class="fas fa-home"></i><span>Startseite</span></a></li>
                    <li><a href="#" id="cartLink"><i class="fas fa-shopping-cart"></i><span>Warenkorb</span></a></li>
                    <li><a href="#"><i class="fas fa-info-circle"></i><span>Über uns</span></a></li>
                    <li><a href="#"><i class="fas fa-film"></i><span>Filme</span></a></li>
                    <li><a href="#"><i class="fas fa-envelope"></i><span>Kontakt</span></a></li>
                    <li><a href="#" class="buy-now"><i class="fas fa-shopping-bag"></i><span>Jetzt kaufen</span></a></li>
                </ul>
            </nav>
        </div>
    `;

    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navLinks = document.querySelector(".nav-links");

    // Hamburger Menü Aç/Kapat
    hamburgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburgerMenu.classList.toggle("open");
    });

    // Event listeners for navigation links
    document.getElementById("homeLink").addEventListener("click", (e) => {
        e.preventDefault();
        // loadHome function should be defined
        if (typeof loadHome === "function") loadHome();
    });

    document.getElementById("cartLink").addEventListener("click", (e) => {
        e.preventDefault();
        showCartModal();
    });
}
