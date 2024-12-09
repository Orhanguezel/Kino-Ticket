export class Category {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  }
  
  export const categories = [
    new Category(1, "Drama", "Duygusal ve etkileyici hikayeler."),
    new Category(2, "Science Fiction", "Bilim ve hayal gücünün sınırlarını zorlayan filmler."),
    new Category(3, "Adventure", "Macera dolu hikayeler."),
    new Category(4, "Comedy", "Eğlenceli ve komik anlar."),
    new Category(5, "Action", "Heyecan verici aksiyon sahneleri."),
    new Category(6, "Animation", "Çocuklar ve yetişkinler için animasyon filmleri.")
  ];
  