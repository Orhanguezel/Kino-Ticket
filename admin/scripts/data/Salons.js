export class Salon {
  constructor(type, name, image, seats, aisleWidth, features, price, showTimes) {
      this.type = type;
      this.name = name;
      this.image = this.validateImagePath(image) ? image : "./assets/salons/default.jpg";
      this.seats = seats;
      this.aisleWidth = aisleWidth;
      this.features = features; // Örn: { is3D: true, isVIP: false, sound: "Dolby Atmos" }
      this.price = price;
      this.showTimes = this.validateShowTimes(showTimes) ? showTimes : [];
      this.showTimesSeats = {}; // Her gösterim için koltuk düzeni
  }

  // Gösterim saatlerini doğrula
  validateShowTimes(showTimes) {
      return showTimes.every((time) => /^\d{2}:\d{2}$/.test(time)); // Saat formatı 24-saat
  }

  // Görsel yolunu doğrula
  validateImagePath(path) {
      return path && typeof path === "string" && path.endsWith(".jpg");
  }
}




// **Salon Listesi**
export const salons = [
  new Salon(
    1,
    "Saal 1",
    "./assets/salons/salon1.jpg",
    120,
    15,
    { is3D: true, isVIP: false, sound: "Dolby Atmos" },
    10,
    ["10:00", "13:00", "16:00", "19:00", "22:00"]
  ),
  new Salon(
    2,
    "Saal 2",
    "./assets/salons/salon2.jpg",
    80,
    12,
    { is3D: false, isVIP: true, sound: "Standard" },
    15,
    ["11:00", "14:00", "17:00", "20:00"]
  ),
  new Salon(
    3,
    "Saal 3",
    "./assets/salons/salon3.jpg",
    100,
    18,
    { is3D: true, isVIP: true, sound: "Dolby Atmos" },
    20,
    ["12:00", "15:00", "18:00", "21:00"]
  ),
  new Salon(
    4,
    "Saal 4",
    "./assets/salons/salon4.jpg",
    150,
    20,
    { is3D: false, isVIP: false, sound: "Standard" },
    8,
    ["10:00", "13:00", "16:00", "19:00", "22:00"]
  ),
  new Salon(
    5,
    "Saal 5",
    "./assets/salons/salon5.jpg",
    200,
    25,
    { is3D: true, isVIP: true, sound: "Dolby Atmos" },
    25,
    ["09:00", "12:00", "15:00", "18:00", "21:00", "00:00"]
  ),
  new Salon(
    6,
    "Saal 6",
    "./assets/salons/salon6.jpg",
    50,
    10,
    { is3D: false, isVIP: false, sound: "Standard" },
    5,
    ["11:30", "14:30", "17:30", "20:30"]
  )
];
