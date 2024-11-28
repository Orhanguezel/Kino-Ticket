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

export class Salon {
    constructor(id, name, image, seats, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.seats = seats;
        this.price = price;
    }
}
