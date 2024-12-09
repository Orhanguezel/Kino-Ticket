export class Seat {
    constructor(id, row, number, status = 'boş') {
      this.id = id;        // Koltuğun benzersiz ID'si
      this.row = row;      // Koltuğun bulunduğu sıra
      this.number = number; // Koltuğun numarası
      this.status = status; // Koltuğun durumu: boş, rezerve, satılmış
    }
  }
  