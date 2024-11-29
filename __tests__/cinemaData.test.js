import { getCinemaShows, getCinemaSalons } from "../src/data/filmsData.js";
import { cinemaShows } from "../src/data/filmsData.js";

describe("Cinema Verileri Testi", () => {
  test("CinemaShows tüm salonlar için geçerli mi?", () => {
    expect(cinemaShows).toBeDefined();
    expect(typeof cinemaShows).toBe("object");
    console.log("Test sırasında cinemaShows:", cinemaShows);
  });

  test("getCinemaShows doğru çalışıyor mu?", () => {
    if (!cinemaShows) {
      console.error("cinemaShows tanımlı değil!");
      return;
    }
    Object.keys(cinemaShows).forEach((cinemaId) => {
      const shows = getCinemaShows(Number(cinemaId));
      expect(shows).toBeDefined();
      expect(Array.isArray(shows)).toBe(true);
    });
  });

  test("getCinemaSalons doğru salonları döndürüyor mu?", () => {
    if (!cinemaShows) {
      console.error("cinemaShows tanımlı değil!");
      return;
    }
    Object.keys(cinemaShows).forEach((cinemaId) => {
      const salons = getCinemaSalons(Number(cinemaId));
      expect(salons).toBeDefined();
      expect(Array.isArray(salons)).toBe(true);
    });
  });
});
