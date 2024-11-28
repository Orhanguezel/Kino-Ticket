

import { Salon } from "./Cinema.js";

export const salons = [
    new Salon(1, "Saal 1", "salon1.jpg", 50, 12),
    new Salon(2, "Saal 2", "salon2.jpg", 30, 10),
    new Salon(3, "Saal 3", "salon3.jpg", 40, 15),
];

export const cinemaSalons = {
    1: [salons[0], salons[1]], // Berlin için salonlar
    2: [salons[1], salons[2]], // Neukölln için salonlar
};

export function getCinemaSalons(cinemaId) {
    return cinemaSalons[cinemaId] || [];
}

class Film {
    constructor(id, name, duration, image, showtimes = []) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.image = image;
        this.showtimes = showtimes;
    }
}

// Filmler listesi
export const films = [
    new Film(1, "Avatar: The Way of Water", 180, "avatar.jpg", ["12:00", "15:30", "19:00"]),
    new Film(2, "Oppenheimer", 195, "oppenheimer.jpg", ["10:30", "14:00", "18:00"]),
    new Film(3, "Barbie", 120, "barbie.jpg", ["11:00", "13:30", "16:00"]),
    new Film(4, "The Marvels", 130, "marvels.jpg", ["12:45", "17:00", "20:30"]),
    new Film(5, "Dune Part 2", 155, "dune.jpg", ["14:00", "19:00"]),
    new Film(6, "Killers of the Flower Moon", 206, "killers.jpg", ["12:00", "16:00", "20:00"]),
];

// Gösterimler ve sinema bağlantıları
export const cinemaShows = {
    1: [
        { filmId: 1, salonId: 1, time: "12:00" },
        { filmId: 2, salonId: 2, time: "15:00" },
        { filmId: 3, salonId: 1, time: "18:30" },
    ],
    2: [
        { filmId: 4, salonId: 3, time: "11:00" },
        { filmId: 5, salonId: 4, time: "14:00" },
        { filmId: 6, salonId: 3, time: "17:30" },
    ],
};

// Gösterimleri döndüren fonksiyon
export function getCinemaShows(cinemaId) {
    return cinemaShows[cinemaId]?.map((show) => {
        const film = films.find((f) => f.id === show.filmId);
        return { film, salonId: show.salonId, time: show.time };
    }) || [];
}
