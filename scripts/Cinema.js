import { Salon } from "./Salon.js";
import { getCinemaShows } from "./filmsData.js";

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
