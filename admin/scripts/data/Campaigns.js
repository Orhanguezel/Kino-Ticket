export class Campaign {
  constructor(id, name, targetAudience, discountType, discountValue, startDate, endDate, status = "active") {
    this.id = id;
    this.name = name; // Kampanya adı
    this.targetAudience = targetAudience; // ["Öğrenci", "Çocuk"]
    this.discountType = discountType; // "percentage" veya "fixed"
    this.discountValue = discountValue; // İndirim miktarı (örn: %10 veya 5€)
    this.startDate = startDate; // Başlangıç tarihi
    this.endDate = endDate; // Bitiş tarihi
    this.status = status; // "active" veya "inactive"
  }
}

// Varsayılan kampanyalar
export const defaultCampaigns = [
  new Campaign(
    1,
    "Öğrenci İndirimi",
    ["Öğrenci"],
    "percentage",
    20,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    2,
    "Çocuk İndirimi",
    ["Çocuk"],
    "fixed",
    5,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    3,
    "Halk Günü İndirimi",
    ["Genel Halk"],
    "percentage",
    30,
    "2024-03-01",
    "2024-03-31"
  ),
  new Campaign(
    4,
    "Aile Paketi",
    ["Aile"],
    "fixed",
    10,
    "2024-06-01",
    "2024-08-31"
  ),
  new Campaign(
    5,
    "Hafta Sonu Kampanyası",
    ["Genel"],
    "percentage",
    15,
    "2024-01-06",
    "2024-12-29"
  ),
  new Campaign(
    6,
    "Doğum Günü Özel",
    ["Doğum Günü Kutlayanlar"],
    "fixed",
    20,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    7,
    "Yılbaşı Özel İndirimi",
    ["Genel"],
    "percentage",
    25,
    "2024-12-20",
    "2024-12-31"
  ),
  new Campaign(
    8,
    "Kadınlar Günü Kampanyası",
    ["Kadınlar"],
    "percentage",
    20,
    "2024-03-01",
    "2024-03-08"
  ),
  new Campaign(
    9,
    "Sezonluk Kombine Paket",
    ["Genel"],
    "fixed",
    50,
    "2024-01-01",
    "2024-06-30"
  ),
  new Campaign(
    10,
    "Erken Rezervasyon İndirimi",
    ["Genel"],
    "percentage",
    10,
    "2024-01-01",
    "2024-05-31"
  ),
  new Campaign(
    11,
    "Memur İndirimi",
    ["Memurlar"],
    "percentage",
    15,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    12,
    "Sosyal Yardım İndirimi",
    ["Sosyal Yardım Alanlar"],
    "fixed",
    7,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    13,
    "Bayram İndirimi",
    ["Genel"],
    "percentage",
    20,
    "2024-04-20",
    "2024-04-27"
  ),
  new Campaign(
    14,
    "Öğretmenler Günü Kampanyası",
    ["Öğretmenler"],
    "percentage",
    25,
    "2024-11-24",
    "2024-11-24"
  ),
  new Campaign(
    15,
    "Engelli İndirimi",
    ["Engelliler"],
    "percentage",
    30,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    16,
    "Sadakat Programı Ödülü",
    ["Sadakat Kartı Sahipleri"],
    "fixed",
    10,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    17,
    "Erken Seans İndirimi",
    ["Genel"],
    "fixed",
    5,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    18,
    "Gece Seansı İndirimi",
    ["Genel"],
    "percentage",
    20,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    19,
    "Bilet Alana İkincisi %50 İndirim",
    ["Genel"],
    "percentage",
    50,
    "2024-01-01",
    "2024-12-31"
  ),
  new Campaign(
    20,
    "Kombine Kampanya: Sinema + Yiyecek",
    ["Genel"],
    "fixed",
    15,
    "2024-01-01",
    "2024-12-31"
  ),
];
