import { cinemas } from "../data/cinemas.js";
import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadHome(cinema = null) {
    const home = document.getElementById("home");
    home.style.backgroundImage = `url(${cinema ? cinema.backgroundImage : './assets/cinema/default-bg.jpg'})`;
    home.style.transition = "background-image 0.5s ease-in-out";

    home.innerHTML = cinema
        ? `
            <h2>Willkommen bei ${cinema.name}</h2>
            <p>${cinema.description}</p>
            <button id="startReservationButton" class="btn-primary">Buchen oder Reservieren</button>
            <button id="toMainPageButton" class="btn-secondary">Zurück zur Startseite</button>
        `
        : `
            <h2>${cineGroupInfo.title}</h2>
            <p>${cineGroupInfo.description}</p>
            <div>
                ${cinemas
                    .map((cinema) => `<button class="btn-primary cinema-select" data-id="${cinema.id}">${cinema.name}</button>`)
                    .join("")}
            </div>
        `;
}


