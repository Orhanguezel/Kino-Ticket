export class Campaign {
  constructor(id, name, targetAudience, discountType, discountValue, startDate, endDate, status = "aktiv") {
    this.id = id;
    this.name = name; 
    this.targetAudience = targetAudience; 
    this.discountType = discountType; 
    this.discountValue = discountValue; 
    this.startDate = startDate; 
    this.endDate = endDate; 
    this.status = status; // "aktiv" oder "inaktiv"
  }
}

// Standardkampagnen
export const defaultCampaigns = [
  new Campaign(
    1,
    "Studentenrabatt",
    ["Studenten"],
    "percentage",
    20,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    2,
    "Kinderrabatt",
    ["Kinder"],
    "fixed",
    5,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    3,
    "Kinotag-Rabatt",
    ["Alle"],
    "percentage",
    30,
    "2024-03-01",
    "2024-03-31"
  ),
  new Campaign(
    4,
    "Familienpaket",
    ["Familien"],
    "fixed",
    10,
    "2024-06-01",
    "2024-08-31"
  ),
  new Campaign(
    5,
    "Wochenendangebot",
    ["Alle"],
    "percentage",
    15,
    "2024-01-06",
    "2024-12-29"
  ),
  new Campaign(
    6,
    "Geburtstags-Special",
    ["Geburtstagskinder"],
    "fixed",
    20,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    7,
    "Weihnachtsrabatt",
    ["Alle"],
    "percentage",
    25,
    "2024-12-20",
    "2024-12-31"
  ),
  new Campaign(
    8,
    "Frauentagsaktion",
    ["Frauen"],
    "percentage",
    20,
    "2024-03-01",
    "2024-03-08"
  ),
  new Campaign(
    9,
    "Saisonkarte",
    ["Alle"],
    "fixed",
    50,
    "2024-01-01",
    "2024-06-30"
  ),
  new Campaign(
    10,
    "Frühbucherrabatt",
    ["Alle"],
    "percentage",
    10,
    "2024-01-01",
    "2024-05-31"
  ),
  new Campaign(
    11,
    "Beamtenrabatt",
    ["Beamte"],
    "percentage",
    15,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    12,
    "Sozialhilfe-Rabatt",
    ["Sozialhilfeempfänger"],
    "fixed",
    7,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    13,
    "Feiertagsrabatt",
    ["Alle"],
    "percentage",
    20,
    "2024-04-20",
    "2024-04-27"
  ),
  new Campaign(
    14,
    "Lehrertagsrabatt",
    ["Lehrer"],
    "percentage",
    25,
    "2024-11-24",
    "2024-11-24"
  ),
  new Campaign(
    15,
    "Inklusionsrabatt",
    ["Menschen mit Behinderung"],
    "percentage",
    30,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    16,
    "Treueprogramm-Bonus",
    ["Treuekarteninhaber"],
    "fixed",
    10,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    17,
    "Frühvorstellungs-Rabatt",
    ["Alle"],
    "fixed",
    5,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    18,
    "Spätvorstellungs-Rabatt",
    ["Alle"],
    "percentage",
    20,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    19,
    "2 für 1: Zweites Ticket 50% Rabatt",
    ["Alle"],
    "percentage",
    50,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    20,
    "Kombiticket: Kino + Snacks",
    ["Alle"],
    "fixed",
    15,
    "2024-01-01",
    "2024-12-31"
  ),
];
