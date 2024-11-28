class Cinema {
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


const cineGroupInfo = {
    logo: "./assets/logo/cinegrup.png",
    footerLogo: "./assets/logo/footer/cinegrup2.png",
    title: "CineGrup - Ihr Kinoerlebnis",
    address: "Berlin",
    description: "Willkommen bei CineGrup! Wählen Sie ein Kino aus, um loszulegen.",
    footer: "© 2024 CineGrup. Alle Rechte vorbehalten."
};

const cinemas = [
    new Cinema(
        1,
        "Cineplex Berlin Steglitz",
        "Schloßstraße 4, 12163 Berlin",
        "./assets/logo/cineberlin.png",
        "./assets/logo/footer/cineberlin2.png",
        "Erleben Sie die besten Filme bei Cineplex Berlin Steglitz!",
        "./assets/cinema/berlin-bg.jpg" // Berlin için arka plan resmi
    ),
    new Cinema(
        2,
        "Cineplex Neukölln",
        "Karl-Marx-Straße 66, 12043 Köln",
        "./assets/logo/cinekoln.png",
        "./assets/logo/footer/cinekoln2.png",
        "Genießen Sie ein einmaliges Kinoerlebnis bei Cineplex Neukölln.",
        "./assets/cinema/neukolln-bg.jpg" // Neukölln için arka plan resmi
    )
];


function loadHeader(cinema = null) {
    const header = document.getElementById("header");
    if (cinema) {
        // Eğer sinema seçilmişse, onun logosunu göster
        header.innerHTML = `
            <img src="${cinema.logo}" alt="${cinema.name}" style="height: 50px;">
            <h1>${cinema.name}</h1>
        `;
    } else {
        // Eğer sinema seçilmemişse varsayılan CineGrup logosunu göster
        header.innerHTML = `
        <img src="${cinema ? cinema.logo : cineGroupInfo.logo}" 
             alt="${cinema ? cinema.name : "CineGrup"}" 
             style="height: 50px;">
        <h1>${cinema ? cinema.name : cineGroupInfo.title}</h1>
    `;
    }
}

function loadHome(cinema = null) {
    const home = document.getElementById("home");
    if (cinema) {
        // Sinema seçilmişse, arka plan resmini ayarla
        home.style.backgroundImage = `url(${cinema.backgroundImage})`;
        home.style.backgroundSize = "cover";
        home.style.backgroundPosition = "center";
        home.innerHTML = `
            <h2>Willkommen bei ${cinema.name}</h2>
            <p>${cinema.description}</p>
            <button class="btn-primary" onclick="startReservation(${cinema.id})">Buchen oder Reservieren</button>
            <button class="btn-secondary" onclick="goToMainPage()">Zurück zur Startseite</button>
        `;
    } else {
        // CineGrup genel bilgileri için varsayılan arka plan
        home.style.backgroundImage = `url('./assets/cinema/default-bg.jpg')`;
        home.style.backgroundSize = "cover";
        home.style.backgroundPosition = "center";
        home.innerHTML = `
            <h2>${cineGroupInfo.title}</h2>
            <p>${cineGroupInfo.description}</p>
            <div>
                ${cinemas
                  .map(
                      (cinema) =>
                          `<button class="btn-primary" onclick="selectCinema(${cinema.id})">${cinema.name}</button>`
                  )
                  .join("")}
            </div>
        `;
    }
}

function loadFooter(cinema = null) {
    const footer = document.getElementById("footer");
    footer.innerHTML = `
        <img src="${cinema ? cinema.footerLogo : cineGroupInfo.footerLogo}" alt="${cinema ? cinema.name : "CineGrup"}" style="height: 50px;">
        <p>${cinema ? cinema.address : cineGroupInfo.footer}</p>
    `;
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

function startReservation(cinemaId) {
    const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);
    document.getElementById("home").innerHTML = `
        <h2>Buchung oder Reservierung - ${selectedCinema.name}</h2>
        <p>Bitte treffen Sie Ihre Auswahl.</p>
        <button class="btn-secondary" onclick="selectCinema(${cinemaId})">Zurück</button>
    `;
}

function updateUI(cinema = null) {
    loadHeader(cinema);
    loadHome(cinema);
    loadFooter(cinema);
}

function goToMainPage() {
    localStorage.removeItem("selectedCinema");
    document.getElementById("header").innerHTML = `
        <img src="${cineGroupInfo.logo}" alt="CineGrup" style="height: 50px;">
        <h1>Willkommen bei CineGrup</h1>
    `;
    document.getElementById("home").innerHTML = `
        <h2>Startseite</h2>
        <p>Willkommen auf unserer Plattform! Entdecken Sie unsere Kinos und Filme.</p>
        <button class="btn-primary" onclick="goToCineGrup()">Zu CineGrup</button>
    `;
    document.getElementById("footer").innerHTML = `
        <img src="${cineGroupInfo.footerLogo}" alt="CineGrup" style="height: 50px;">
        <p>${cineGroupInfo.footer}</p>
    `;
}

function goToCineGrup() {
    const savedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
    updateUI(savedCinema);
}

function init() {
    const savedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
    if (savedCinema) {
        updateUI(savedCinema);
    } else {
        goToMainPage();
    }
}

init();