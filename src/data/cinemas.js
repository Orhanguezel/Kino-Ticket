import { getCinemaShows } from "./filmsData.js";

export class Cinema {
  constructor(
    id,
    name,
    address,
    logo,
    footerLogo,
    description,
    backgroundImage,
    phone,
    email,
    map,
    facebook,
    twitter,
    youtube,
    instagram,
    telegram,
    whatsup
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.logo = logo;
    this.footerLogo = footerLogo;
    this.description = description;
    this.backgroundImage = backgroundImage;
    this.phone = phone;
    this.email = email;
    this.map = map;
    this.facebook = facebook;
    this.twitter = twitter;
    this.youtube = youtube;
    this.instagram = instagram;
    this.telegram = telegram;
    this.whatsup = whatsup;
    this.salons = [];
    this.shows = [];
  }

  addSalon(salon) {
    if (!salon || !salon.id || !salon.name) {
      console.error("Invalid salon data", salon);
      return;
    }
    this.salons.push(salon);
  }

  addShow(show) {
    if (!show.film || !show.salon || !show.time) {
      console.error("Invalid show data", show);
      return;
    }
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
  title: "CineGrup Kinos",
  description: "Ihr vertrauenswürdiger Begleiter für die besten Kinoerlebnisse.",
  logo: "./assets/logo/cinegrup.png",
  footerLogo: "./assets/logo/footer/cinegrup2.png",
  footer: "© 2024 CineGrup, entwickelt von OG.",
  address: "Deutschlandweit verfügbar.",
  phone: "(+888) 123 456 765",
  email: "cinegrup@cinegrup.com",
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.839604108928!2d144.9630550159045!3d-37.81421797975127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb8d1d5b0a6378e2c!2sMetro%20Manila%2C%20Filipinler!5e0!3m2!1str!2str!4v1612171371532!5m2!1str!2str",
  facebook: "#",
  twitter: "#",
  youtube: "#",
  instagram: "#",
  telegram: "#",
  whatsup: "#",
  design: "OG",
  get footer() {
    return `© 2024 CineGrup, entwickelt von ${this.design}`;
  },
};

export const cinemas = [
  new Cinema(
    1,
    "Cineplex Berlin",
    "Schloßstraße 4, 12163 Berlin",
    "./assets/logo/cineberlin.png",
    "./assets/logo/footer/cineberlin2.png",
    "Erleben Sie die besten Filme bei Cineplex Berlin Steglitz!",
    "./assets/cinema/berlin-bg.jpg",
    "(+888) 111 222 333",
    "berlin@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BERLIN",
    "https://facebook.com/cineberlin",
    "https://twitter.com/cineberlin",
    "https://youtube.com/cineberlin",
    "https://instagram.com/cineberlin",
    "https://telegram.me/cineberlin",
    "https://wa.me/1234567890"
  ),
  new Cinema(
    2,
    "Cineplex Köln",
    "Karl-Marx-Straße 66, 12043 Köln",
    "./assets/logo/cinekoln.png",
    "./assets/logo/footer/cinekoln2.png",
    "Genießen Sie ein einmaliges Kinoerlebnis bei Cineplex Neukölln.",
    "./assets/cinema/neukolln-bg.jpg",
    "(+888) 444 555 666",
    "koln@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_KOLN",
    "https://facebook.com/cinekoln",
    "https://twitter.com/cinekoln",
    "https://youtube.com/cinekoln",
    "https://instagram.com/cinekoln",
    "https://telegram.me/cinekoln",
    "https://wa.me/0987654321"
  ),
];

// Gösterimleri ekle
cinemas.forEach((cinema) => {
  const shows = getCinemaShows(cinema.id);
  if (!shows || !Array.isArray(shows)) {
    console.error(`No valid shows for cinema ID: ${cinema.id}`);
    return;
  }
  shows.forEach((show) => cinema.addShow(show));
});
