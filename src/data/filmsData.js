// **Film Sınıfı**
export class Film {
  constructor(id, name, duration, image, showtimes = []) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image = image;
    this.showtimes = showtimes;
  }
}

// **Salon Sınıfı**
export class Salon {
  constructor(id, name, image, seats, price) {
    if (!id || !name || !image || !seats || !price) {
      console.error("Eksik veya geçersiz salon verisi:", { id, name, image, seats, price });
    }
    this.id = id;
    this.name = name;
    this.image = image;
    this.seats = seats;
    this.price = price;
  }
}

// **Film Listesi**
export const films = [
  new Film(1, "Avatar: The Way of Water", 180, "./assets/filmafis/avatar.jpg", ["12:00", "15:30", "19:00"]),
  new Film(2, "Oppenheimer", 195, "./assets/filmafis/oppenheimer.jpg", ["10:30", "14:00", "18:00"]),
  new Film(3, "Barbie", 120, "./assets/filmafis/barbie.jpg", ["11:00", "13:30", "16:00"]),
  new Film(4, "The Marvels", 130, "./assets/filmafis/marvels.jpg", ["12:45", "17:00", "20:30"]),
  new Film(5, "Dune Part 2", 155, "./assets/filmafis/dune.jpg", ["14:00", "19:00"]),
  new Film(6, "Killers of the Flower Moon", 206, "./assets/filmafis/killers.jpg", ["12:00", "16:00", "20:00"]),
];

// **Salon Verisi**
export const salons = [
  new Salon(1, "Saal 1", "salon1.jpg", 50, 12),
  new Salon(2, "Saal 2", "salon2.jpg", 30, 10),
  new Salon(3, "Saal 3", "salon3.jpg", 40, 15),
  new Salon(4, "Saal 4", "salon4.jpg", 60, 20),
  new Salon(5, "Saal 5", "salon5.jpg", 70, 25),
  new Salon(6, "Saal 6", "salon6.jpg", 80, 30),
];

// **Sinema ve Gösterim Verileri**
export const cinemaShows = {
  1: [
    { filmId: 1, salonId: 1, time: "12:00" },
    { filmId: 1, salonId: 2, time: "15:30" },
    { filmId: 2, salonId: 2, time: "10:30" },
    { filmId: 2, salonId: 3, time: "14:00" },
    { filmId: 3, salonId: 1, time: "15:00" },
    { filmId: 3, salonId: 3, time: "18:00" },
  ],
  2: [
    { filmId: 4, salonId: 4, time: "11:00" },
    { filmId: 4, salonId: 5, time: "15:00" },
    { filmId: 5, salonId: 4, time: "14:00" },
    { filmId: 5, salonId: 6, time: "19:00" },
    { filmId: 6, salonId: 4, time: "17:30" },
    { filmId: 6, salonId: 5, time: "20:00" },
    { filmId: 6, salonId: 6, time: "23:00" },
  ],
};

// **Gösterim Verilerini Döndür**
export function getCinemaShows(cinemaId) {
  if (!cinemaId) {
    console.error("Cinema ID tanımlı değil!");
    return [];
  }

  console.log(`Cinema ID: ${cinemaId} için gösterimler aranıyor...`);

  if (!cinemaShows[cinemaId]) {
    console.error(`Cinema ID ${cinemaId} için gösterim bulunamadı.`);
    return [];
  }

  return cinemaShows[cinemaId]
    .map((show) => {
      const film = films.find((f) => f.id === show.filmId);
      const salon = salons.find((s) => s.id === show.salonId);

      if (!film || !salon) {
        console.error("Eksik veri bulundu:", { show });
        return null;
      }

      console.log("Bulunan gösterim:", { film, salon, time: show.time });
      return { film, salon, time: show.time };
    })
    .filter((entry) => entry !== null);
}

// **Salon Verilerini Döndür**
export function getCinemaSalons(cinemaId) {
  console.log(`Cinema ID: ${cinemaId} için salonlar kontrol ediliyor...`);
  const cinemaShows = getCinemaShows(cinemaId);

  if (!cinemaShows || cinemaShows.length === 0) {
    console.error(`Cinema ID ${cinemaId} için gösterim bulunamadı.`);
    return [];
  }

  const uniqueSalons = cinemaShows
    .map((show) => show.salon)
    .filter(
      (salon, index, self) => self.findIndex((s) => s.id === salon.id) === index
    )
    .map((salon) => ({
      ...salon,
      shows: cinemaShows
        .filter((show) => show.salon.id === salon.id)
        .map((show) => ({
          time: show.time,
        })),
    }));

  console.log("Bulunan salonlar:", uniqueSalons);
  return uniqueSalons;
}
