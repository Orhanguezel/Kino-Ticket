// navbar.js

import { renderCinemaView } from "./cinemaView.js";
import { renderSalonView } from "./salonView.js";
import { renderFilmView } from "./filmView.js";
import { renderShowtimeView } from "./showtimeView.js";
import { renderSeatPlanView } from "./seatsPlanView.js";
import { renderCampaignView } from "./campaignView.js";
import { resetData } from "./stateManager.js";


export function renderNavbar() {
  const navbar = document.createElement("nav");
  navbar.id = "navbar";
  navbar.innerHTML = `
    <div class="navbar-container">
      <button class="hamburger-menu" id="hamburger-menu">☰</button>
      <div class="navbar-links" id="navbar-links">
        <button id="cinema-tab">Sinemalar</button>
        <button id="salon-tab">Salonlar</button>
        <button id="film-tab">Filmler</button>
        <button id="showtime-tab">Gösterimler</button>
        <button id="seat-plan-tab">Koltuk Yerleşimi</button>
        <button id="campaign-tab">Kampanyalar</button>
        <button id="reset-data-tab">Reset</button>
      </div>
    </div>
  `;

  document.body.prepend(navbar);

  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbarLinks = document.getElementById("navbar-links");

  hamburgerMenu.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
    // Hamburger menüsü tıklandığında X simgesine dönüşümü
    hamburgerMenu.textContent = navbarLinks.classList.contains("active") ? "✖" : "☰";
  });

  document.getElementById("cinema-tab").onclick = () => renderCinemaView();
  document.getElementById("salon-tab").onclick = () => renderSalonView();
  document.getElementById("film-tab").onclick = () => renderFilmView();
  document.getElementById("showtime-tab").onclick = () => renderShowtimeView();
  document.getElementById("seat-plan-tab").onclick = () => renderSeatPlanView();
  document.getElementById("campaign-tab").onclick = () => renderCampaignView();
  document.getElementById("reset-data-tab").onclick = () => resetData();
}
