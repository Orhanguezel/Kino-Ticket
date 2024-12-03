import { getCinemaShows, getCinemaSalons } from "../src/data/filmsData.js";
import { cinemaShows } from "../src/data/filmsData.js";

describe("Kinodaten Test", () => {
  test("Ist das Objekt cinemaShows definiert und gültig?", () => {
    expect(cinemaShows).toBeDefined();
    expect(typeof cinemaShows).toBe("object");
  });

  test("Gibt getCinemaShows ein gültiges Array zurück?", () => {
    if (!cinemaShows) {
      return;
    }
    Object.keys(cinemaShows).forEach((cinemaId) => {
      const shows = getCinemaShows(Number(cinemaId));
      expect(shows).toBeDefined();
      expect(Array.isArray(shows)).toBe(true);
      shows.forEach((show) => {
        expect(show).toHaveProperty("film");
        expect(show).toHaveProperty("salon");
        expect(show).toHaveProperty("time");
      });
    });
  });

  test("Gibt getCinemaSalons die richtigen Salondaten zurück?", () => {
    if (!cinemaShows) {
      return;
    }
    Object.keys(cinemaShows).forEach((cinemaId) => {
      const salons = getCinemaSalons(Number(cinemaId));
      expect(salons).toBeDefined();
      expect(Array.isArray(salons)).toBe(true);
      salons.forEach((salon) => {
        expect(salon).toHaveProperty("id");
        expect(salon).toHaveProperty("name");
        expect(salon).toHaveProperty("shows");
        expect(Array.isArray(salon.shows)).toBe(true);
      });
    });
  });
});
