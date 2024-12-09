export class Category {
  constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
  }
}

export const categories = [
  new Category(1, "Drama", "Emotionale und bewegende Geschichten."),
  new Category(2, "Science-Fiction", "Filme, die die Grenzen von Wissenschaft und Fantasie überschreiten."),
  new Category(3, "Abenteuer", "Geschichten voller Abenteuer."),
  new Category(4, "Komödie", "Lustige und unterhaltsame Momente."),
  new Category(5, "Action", "Spannende Action-Szenen."),
  new Category(6, "Animation", "Animationsfilme für Kinder und Erwachsene.")
];
