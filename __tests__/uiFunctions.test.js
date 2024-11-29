import { showDateSelection } from "../src/reservation/dateSelection.js";
import { showSeatSelection } from "../src/reservation/seatSelection.js";
import { getCinemaShows } from "../src/data/filmsData.js";
import { getCinemaSalons } from "../src/data/filmsData.js";

describe("UI Function Tests with Real Data", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="home"></div>`; // DOM'u sıfırla
  });

  test("showDateSelection gerçek verilerle doğru çalışıyor mu?", () => {
    // Gerçek veri
    const cinemaId = 1;
    const salonId = 1;

    // Gerçek fonksiyonu çağır
    const shows = getCinemaShows(cinemaId);
    console.log("Dönen gösterimler:", shows);

    // Hata durumlarını kontrol et
    expect(shows).toBeDefined(); // Gösterimler tanımlı olmalı
    expect(Array.isArray(shows)).toBe(true); // Gösterimler bir array olmalı
    if (shows.length === 0) {
      console.error(`Cinema ID ${cinemaId} için gösterim bulunamadı.`);
    } else {
      console.log(`Cinema ID ${cinemaId} için ${shows.length} gösterim bulundu.`);
    }

    // Fonksiyonu çağır ve DOM'u kontrol et
    showDateSelection(cinemaId, salonId);
    const home = document.getElementById("home");
    expect(home.innerHTML).toContain("Saal 1");
  });

  test("showSeatSelection gerçek verilerle doğru çalışıyor mu?", () => {
    // Gerçek veri
    const cinemaId = 1;
    const salonId = 1;
    const selectedDate = "2024-11-29";
    const selectedTime = "15:00";

    // Gerçek fonksiyonu çağır
    const salons = getCinemaSalons(cinemaId);
    console.log("Dönen salonlar:", salons);

    // Hata durumlarını kontrol et
    expect(salons).toBeDefined(); // Salonlar tanımlı olmalı
    expect(Array.isArray(salons)).toBe(true); // Salonlar bir array olmalı
    const selectedSalon = salons.find((s) => s.id === salonId);
    if (!selectedSalon) {
      console.error(`Cinema ID ${cinemaId}, Salon ID ${salonId} için salon bulunamadı.`);
    } else {
      console.log("Bulunan salon:", selectedSalon);
    }

    // Fonksiyonu çağır ve DOM'u kontrol et
    showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
    const home = document.getElementById("home");
    expect(home.innerHTML).toContain("Saal 1");
    expect(home.innerHTML).toContain(selectedDate);
    expect(home.innerHTML).toContain(selectedTime);

    // Koltuk butonlarını kontrol et
    const seatButtons = home.querySelectorAll(".seat");
    expect(seatButtons.length).toBeGreaterThan(0); // Koltuklar oluşturulmuş olmalı
  });
});
