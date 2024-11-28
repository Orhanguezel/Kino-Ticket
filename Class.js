class Film {
    constructor(id, name, duration, image, showtimes = []) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.image = image;
        this.showtimes = showtimes;
    }
}

class Salon {
    constructor(id, name, seats, image, basePrice) {
        this.id = id;
        this.name = name;
        this.seats = seats;
        this.image = image;
        this.basePrice = basePrice;
    }
}

class Show {
    constructor(film, salon, time, date) {
        this.film = film;
        this.salon = salon;
        this.time = time;
        this.date = date;
    }
}

class Cinema {
    constructor(id, name, address, logo) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.logo = logo;
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
        return this.shows.filter(show => show.film.id === filmId && show.date === date)
            .map(show => ({
                salon: show.salon.name,
                time: show.time,
            }));
    }
}

class CinemaManager {
    constructor() {
        this.cinemas = [];
    }

    addCinema(cinema) {
        this.cinemas.push(cinema);
    }

    getCinemaById(cinemaId) {
        return this.cinemas.find(cinema => cinema.id === cinemaId);
    }

    listCinemas() {
        return this.cinemas.map(cinema => ({
            id: cinema.id,
            name: cinema.name,
            address: cinema.address,
            logo: cinema.logo,
        }));
    }
}

const films = [
    new Film(1, "Avatar: The Way of Water", 180, "avatar.jpg"),
    new Film(2, "Oppenheimer", 195, "oppenheimer.jpg"),
    new Film(3, "Barbie", 120, "barbie.jpg"),
    new Film(4, "The Marvels", 130, "marvels.jpg"),
];

const salons1 = [
    new Salon(1, "Saal 1", 30, "saal1.jpg", 12),
    new Salon(2, "Saal 2", 50, "saal2.jpg", 15),
];

const salons2 = [
    new Salon(3, "Saal 1", 40, "saal3.jpg", 14),
    new Salon(4, "Saal 2", 20, "saal4.jpg", 10),
];

const cinema1 = new Cinema(1, "Cineplex Berlin Steglitz", "Schloßstraße 4, 12163 Berlin", "logo1.png");
const cinema2 = new Cinema(2, "Cineplex Neukölln", "Karl-Marx-Straße 66, 12043 Berlin", "logo2.png");

salons1.forEach(salon => cinema1.addSalon(salon));
salons2.forEach(salon => cinema2.addSalon(salon));

cinema1.addShow(new Show(films[0], salons1[0], "12:00", "2024-11-28"));
cinema1.addShow(new Show(films[1], salons1[1], "15:00", "2024-11-28"));
cinema2.addShow(new Show(films[2], salons2[0], "18:00", "2024-11-29"));
cinema2.addShow(new Show(films[3], salons2[1], "20:00", "2024-11-29"));

const cinemaManager = new CinemaManager();
cinemaManager.addCinema(cinema1);
cinemaManager.addCinema(cinema2);

localStorage.setItem("cinemas", JSON.stringify(cinemaManager.listCinemas()));

function saveUserSelection(selection) {
    localStorage.setItem("userSelection", JSON.stringify(selection));
}

function getUserSelection() {
    return JSON.parse(localStorage.getItem("userSelection")) || {};
}

function updateCinemaUI(selectedCinemaId) {
    const savedCinemas = JSON.parse(localStorage.getItem("cinemas"));
    const selectedCinema = savedCinemas.find(cinema => cinema.id === selectedCinemaId);
    document.getElementById("cinema-logo").src = selectedCinema.logo;
    document.getElementById("cinema-name").textContent = selectedCinema.name;
    document.getElementById("cinema-address").textContent = selectedCinema.address;
}

function updateSalonUI(selectedSalonId, cinemaId) {
    const selectedCinema = cinemaManager.getCinemaById(cinemaId);
    const selectedSalon = selectedCinema.salons.find(salon => salon.id === selectedSalonId);
    document.getElementById("salon-image").src = selectedSalon.image;
    document.getElementById("salon-name").textContent = selectedSalon.name;
}

function updateFilmUI(selectedFilmId) {
    const selectedFilm = films.find(film => film.id === selectedFilmId);
    document.getElementById("film-poster").src = selectedFilm.image;
    document.getElementById("film-name").textContent = selectedFilm.name;
    document.getElementById("film-duration").textContent = `${selectedFilm.duration} Minuten`;
}

const userSelection = {
    cinemaId: 1,
    salonId: 2,
    filmId: 3,
    showtime: "18:00",
};

saveUserSelection(userSelection);

const savedSelection = getUserSelection();
updateCinemaUI(savedSelection.cinemaId);
updateSalonUI(savedSelection.salonId, savedSelection.cinemaId);
updateFilmUI(savedSelection.filmId);
