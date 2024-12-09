export class Seat {
    constructor(id, row, number, status = 'boş') {
      this.id = id;        
      this.row = row;      
      this.number = number; 
      this.status = status; 
    }
  }
  