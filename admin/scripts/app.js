import { renderNavbar } from "./view/navbar.js";
import { renderCinemaView } from "./view/cinemaView.js";

// Uygulama başlatma
document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");

  appContainer.innerHTML = `
    <header>
      <h1>CineGrup Admin Panel</h1>
    </header>
    <main id="main-content">
      <div id="start-screen">
        <p>Willkommen im Verwaltungsbereich. Bitte geben Sie das Passwort ein, um fortzufahren.</p>
        <input id="password-input" type="password" placeholder="Passwort eingeben" />
        <button id="start-button">Start</button>
        <p id="error-message" style="color: red; display: none;">Falsches Passwort. Bitte erneut versuchen.</p>
      </div>
    </main>
  `;

  document.getElementById("start-button").onclick = () => {
    const password = document.getElementById("password-input").value;
    if (password === "1234") {
      renderNavbar();
      renderCinemaView();
    } else {
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
    }
  };
});



