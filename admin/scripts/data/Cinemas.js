import { salons } from "./Salons.js";

export class Cinema {
  constructor(
    id,
    name,
    address,
    logo,
    description,
    background,
    phone,
    email,
    mapEmbed,
    salons = []
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.logo = logo;
    this.description = description;
    this.background = background;
    this.phone = phone;
    this.email = email;
    this.mapEmbed = mapEmbed;
    this.salons = salons;
  }
}

export const cinemas = [
  new Cinema(
    1,
    "Cineplex Berlin",
    "Schloßstraße 4, 12163 Berlin",
    "./assets/logo/cineberlin.png",
    "Erleben Sie die besten Filme bei Cineplex Berlin!",
    "./assets/backgrounds/cineberlin-bg.jpg",
    "030-1234567",
    "berlin@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BERLIN",
    [salons[0], salons[1], salons[2], salons[3], salons[4], salons[5]]
  ),
  new Cinema(
    2,
    "Cineplex Köln",
    "Karl-Marx-Straße 66, 12043 Köln",
    "./assets/logo/cinekoln.png",
    "Genießen Sie ein einmaliges Kinoerlebnis bei Cineplex Köln.",
    "./assets/backgrounds/cinekoln-bg.jpg",
    "0221-9876543",
    "koln@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_KOLN",
    [salons[3], salons[4], salons[5]]
  ),
  new Cinema(
    3,
    "Cineplex Hamburg",
    "Mönckebergstraße 10, 20095 Hamburg",
    "./assets/logo/cinehamburg.png",
    "Genießen Sie die besten Filme in Hamburg!",
    "./assets/backgrounds/cinehamburg-bg.jpg",
    "040-4567890",
    "hamburg@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_HAMBURG",
    [salons[2], salons[3], salons[4]]
  ),
  new Cinema(
    4,
    "Cineplex München",
    "Leopoldstraße 82, 80802 München",
    "./assets/logo/cinemunich.png",
    "Die besten Filme in der bayerischen Hauptstadt!",
    "./assets/backgrounds/cinemunich-bg.jpg",
    "089-6543210",
    "munich@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_MUNICH",
    [salons[1], salons[3], salons[4], salons[5]]

  ),
  new Cinema(
    5,
    "Cineplex Stuttgart",
    "Königstraße 56, 70173 Stuttgart",
    "./assets/logo/cinestuttgart.png",
    "Filme und Unterhaltung in Stuttgart.",
    "./assets/backgrounds/cinestuttgart-bg.jpg",
    "0711-1234567",
    "stuttgart@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_STUTTGART",
    [salons[0], salons[1], salons[4], salons[5]]

  ),
  new Cinema(
    6,
    "Cineplex Frankfurt",
    "Zeil 101, 60313 Frankfurt am Main",
    "./assets/logo/cinefrankfurt.png",
    "Kino und Spaß im Herzen von Frankfurt.",
    "./assets/backgrounds/cinefrankfurt-bg.jpg",
    "069-9876543",
    "frankfurt@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_FRANKFURT",
    [salons[2], salons[3], salons[4], salons[5]]
  ),
  new Cinema(
    7,
    "Cineplex Düsseldorf",
    "Schadowstraße 50, 40212 Düsseldorf",
    "./assets/logo/cinedusseldorf.png",
    "Ihr Kinoerlebnis in Düsseldorf.",
    "./assets/backgrounds/cinedusseldorf-bg.jpg",
    "0211-1234567",
    "dusseldorf@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_DUSSELDORF",
    [salons[0], salons[1], salons[3], salons[5]]
  ),
  new Cinema(
    8,
    "Cineplex Leipzig",
    "Hainstraße 6, 04109 Leipzig",
    "./assets/logo/cineleipzig.png",
    "Erleben Sie fantastische Filme in Leipzig.",
    "./assets/backgrounds/cineleipzig-bg.jpg",
    "0341-9876543",
    "leipzig@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_LEIPZIG",
    [salons[0], salons[3], salons[4], salons[5]]
  ),
  new Cinema(
    9,
    "Cineplex Bremen",
    "Ostertorsteinweg 1, 28203 Bremen",
    "./assets/logo/cinebremen.png",
    "Kinovergnügen in Bremen.",
    "./assets/backgrounds/cinebremen-bg.jpg",
    "0421-1234567",
    "bremen@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BREMEN",
    [salons[0], salons[1], salons[2], salons[3], salons[4]]
  ),
  new Cinema(
    10,
    "Cineplex Hannover",
    "Lister Meile 25, 30161 Hannover",
    "./assets/logo/cinehannover.png",
    "Die besten Filme in Hannover.",
    "./assets/backgrounds/cinehannover-bg.jpg",
    "0511-9876543",
    "hannover@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_HANNOVER",
    [salons[0], salons[1], salons[2], salons[3], salons[5]]
  ),
];
