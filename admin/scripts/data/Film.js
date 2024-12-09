export class Film {
    constructor(id, name, duration, image, categoryIds = []) {
      this.id = id;
      this.name = name;
      this.duration = duration;
      this.image = image;
      this.categories = categoryIds;
    }
  }
  
  export const films = [
    new Film(1, "Avatar: Der Weg des Wassers", 180, "./assets/filmafis/default.jpg", [1, 2]),
    new Film(2, "Oppenheimer", 195, "./assets/filmafis/default.jpg", [1, 2]),
    new Film(3, "Barbie", 120, "./assets/filmafis/default.jpg", [3, 4]),
    new Film(4, "The Marvels", 130, "./assets/filmafis/default.jpg", [5]),
    new Film(5, "Dune: Teil 2", 155, "./assets/filmafis/default.jpg", [2, 5]),
    new Film(6, "Mörder des Blumenmondes", 206, "./assets/filmafis/default.jpg", [1]),
    new Film(7, "The Dark Knight", 152, "./assets/filmafis/default.jpg", [1, 5]),
    new Film(8, "Inception", 148, "./assets/filmafis/default.jpg", [1, 2]),
    new Film(9, "Interstellar", 169, "./assets/filmafis/default.jpg", [2, 5]),
    new Film(10, "Titanic", 195, "./assets/filmafis/default.jpg", [1, 3]),
    new Film(11, "Frozen", 102, "./assets/filmafis/default.jpg", [4, 6]),
    new Film(12, "Toy Story", 81, "./assets/filmafis/default.jpg", [4, 6]),
    new Film(13, "The Lion King", 88, "./assets/filmafis/default.jpg", [4, 6]),
    new Film(14, "The Godfather", 175, "./assets/filmafis/default.jpg", [1, 5]),
    new Film(15, "Pulp Fiction", 154, "./assets/filmafis/default.jpg", [1, 3]),
    new Film(16, "The Matrix", 136, "./assets/filmafis/default.jpg", [2, 5]),
    new Film(17, "The Avengers", 143, "./assets/filmafis/default.jpg", [5]),
    new Film(18, "Star Wars: A New Hope", 121, "./assets/filmafis/default.jpg", [2, 5]),
    new Film(19, "Harry Potter and the Philosopher's Stone", 152, "./assets/filmafis/default.jpg", [2, 4]),
    new Film(20, "Jurassic Park", 127, "./assets/filmafis/default.jpg", [2, 5]),
  ];
  