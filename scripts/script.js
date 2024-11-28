export class Cinema {
    constructor(id, name, address, logo, footerLogo, description, backgroundImage) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.logo = logo;
        this.footerLogo = footerLogo;
        this.description = description;
        this.backgroundImage = backgroundImage;
        this.salons = [];
        this.shows = [];
    }

    addSalon(salon) {
        this.salons.push(salon);
    }

    addShow(show) {
        this.shows.push(show);
    }

    getFilmShowtimes(filmId, date) {
        return this.shows
            .filter((show) => show.film.id === filmId && show.date === date)
            .map((show) => ({
                salon: show.salon.name,
                time: show.time,
            }));
    }
}

export const cineGroupInfo = {
    logo: "./assets/logo/cinegrup.png",
    footerLogo: "./assets/logo/footer/cinegrup2.png",
    title: "CineGrup - Ihr Kinoerlebnis",
    address: "Berlin",
    description: "Willkommen bei CineGrup! Wählen Sie ein Kino aus, um loszulegen.",
    footer: "© 2024 CineGrup. Alle Rechte vorbehalten."
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
    )
];

export function loadHeader(cinema = null) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <img src="${cinema ? cinema.logo : cineGroupInfo.logo}" alt="${cinema ? cinema.name : "CineGrup"}" style="height: 50px;">
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
                    .map(
                        (cinema) => `
                        <button class="btn-primary cinema-select" data-id="${cinema.id}">
                            ${cinema.name}
                        </button>`
                    )
                    .join("")}
            </div>
        `;
}

export function loadFooter(cinema = null) {
    const footer = document.getElementById("footer");
    footer.innerHTML = `
        <img src="${cinema ? cinema.footerLogo : cineGroupInfo.footerLogo}" alt="${cinema ? cinema.name : "CineGrup"}" style="height: 50px;">
        <p>${cinema ? cinema.address : cineGroupInfo.footer}</p>
    `;
}

function updateUI(cinema = null) {
    loadHeader(cinema);
    loadHome(cinema);
    loadFooter(cinema);

    setTimeout(() => {
        if (cinema) {
            const startReservationButton = document.getElementById("startReservationButton");
            if (startReservationButton) {
                startReservationButton.addEventListener("click", () =>
                    import("./buchenReservieren.js").then(module => module.startReservation(cinema.id))
                );
            }
        }

        const toMainPageButton = document.getElementById("toMainPageButton");
        if (toMainPageButton) {
            toMainPageButton.addEventListener("click", goToMainPage);
        }

        const cinemaSelectButtons = document.querySelectorAll(".cinema-select");
        cinemaSelectButtons.forEach(button => {
            button.addEventListener("click", (e) => selectCinema(parseInt(e.target.dataset.id)));
        });
    }, 0); // setTimeout is used to ensure that the buttons are loaded before adding event listeners
}


function goToMainPage() {
    localStorage.removeItem("selectedCinema");
    updateUI(null);
}

function selectCinema(cinemaId) {
    const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);
    if (selectedCinema) {
        localStorage.setItem("selectedCinema", JSON.stringify(selectedCinema));
        updateUI(selectedCinema);
    } else {
        console.error("Sinema bulunamadı.");
    }
}

export function init() {
    document.addEventListener("DOMContentLoaded", () => {
        const savedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
        updateUI(savedCinema || null);
    });
}


init();
