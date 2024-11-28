import { Cinema } from "./Cinema.js";
import { getCinemaShows } from "./filmsData.js";

export const cineGroupInfo = {
    logo: "./assets/logo/cinegrup.png",
    footerLogo: "./assets/logo/footer/cinegrup2.png",
    title: "CineGrup - Ihr Kinoerlebnis",
    address: "Berlin",
    description: "Willkommen bei CineGrup! Wählen Sie ein Kino aus, um loszulegen.",
    design: "OG",
    get footer() {
        return `© 2024 CineGrup. Alle Rechte vorbehalten. ${this.design}`;
    }
};



export const cinemas = [
    new Cinema(
        1,
        "Cineplex Berlin Steglitz",
        "Schloßstraße 4, 12163 Berlin",
        "./assets/logo/cineberlin.png",
        "./assets/logo/footer/cineberlin2.png",
        "Erleben Sie die besten Filme bei Cineplex Berlin Steglitz!",
        "./assets/cinema/berlin-bg.jpg"
    ),
    new Cinema(
        2,
        "Cineplex Neukölln",
        "Karl-Marx-Straße 66, 12043 Köln",
        "./assets/logo/cinekoln.png",
        "./assets/logo/footer/cinekoln2.png",
        "Genießen Sie ein einmaliges Kinoerlebnis bei Cineplex Neukölln.",
        "./assets/cinema/neukolln-bg.jpg"
    ),
];

// Gösterimleri ekle
cinemas.forEach((cinema) => {
    const shows = getCinemaShows(cinema.id);
    shows.forEach((show) => cinema.addShow(show));
});

export function loadHeader(cinema = null) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <img src="${cinema ? cinema.logo : cineGroupInfo.logo}" alt="${cinema ? cinema.name : "CineGrup"}">
        <h1>${cinema ? cinema.name : cineGroupInfo.title}</h1>
    `;
}

export function loadHome(cinema = null) {
    const home = document.getElementById("home");
    home.style.backgroundImage = `url(${cinema ? cinema.backgroundImage : './assets/cinema/default-bg.jpg'})`;
    home.style.backgroundSize = "cover";
    home.style.backgroundPosition = "center";
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

export function loadFooter(cinema = null) {
    const footer = document.getElementById("footer");
    const ogUrl = "https://orhanguezel.github.io/personal/"; 

    footer.innerHTML = `
        <img src="${cinema ? cinema.footerLogo : cineGroupInfo.footerLogo}" alt="${cinema ? cinema.name : "CineGrup"}">
        <p>${cinema ? cinema.address : cineGroupInfo.address}</p>
        <p>
            ${cinema ? cinema.description : cineGroupInfo.footer.replace("OG", `<a href="${ogUrl}" target="_blank" rel="noopener noreferrer">OG</a>`)}
        </p>
    `;
}

function updateUI(cinema = null) {
    loadHeader(cinema);
    loadHome(cinema);
    loadFooter(cinema);

    setTimeout(() => {
        if (cinema) {
            document.getElementById("startReservationButton")?.addEventListener("click", () =>
                import("./buchenReservieren.js").then((module) => module.startReservation(cinema.id))
            );
        }

        document.getElementById("toMainPageButton")?.addEventListener("click", goToMainPage);

        document.querySelectorAll(".cinema-select").forEach((button) =>
            button.addEventListener("click", (e) => selectCinema(parseInt(e.target.dataset.id)))
        );
    }, 0);
}

function goToMainPage() {
    localStorage.removeItem("selectedCinema");
    updateUI(null);
}

function selectCinema(cinemaId) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    if (cinema) {
        localStorage.setItem("selectedCinema", JSON.stringify(cinema));
        updateUI(cinema);
    }
}

export function init() {
    document.addEventListener("DOMContentLoaded", () => {
        const savedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
        updateUI(savedCinema || null);
    });
}

init();
