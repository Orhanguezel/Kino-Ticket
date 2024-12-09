# Kino-Ticket ve Yönetim Paneli 🎥🍿

## Proje Açıklaması
**Kino-Ticket ve Yönetim Paneli**, kullanıcıların sinema bileti satın alma, salon ve koltuk seçimi yapma, ödeme işlemlerini gerçekleştirme gibi ihtiyaçlarını karşılayan bir bilet rezervasyon platformudur. Proje, aynı zamanda sinema yönetimini kolaylaştıran bir **admin paneli** ile birlikte geliştirilmiştir.

### Geliştirme Durumu:
- Kullanıcı arayüzü (Kino-Ticket) tam işlevseldir ve kullanıcıların bilet rezervasyonu yapmasına olanak tanır.
- **Admin Paneli**, sinema ve film yönetimi gibi özellikler sunmakla birlikte, **henüz kullanıcı tarafıyla tam entegre edilmemiştir**. Bu entegrasyon, geliştirme sürecinde ilerleyen aşamalarda tamamlanacaktır.

---

## Proje Özellikleri

### Kullanıcı Tarafı:
- **Bilet Rezervasyonu**: Kullanıcılar sinema, film, salon ve koltuk seçimi yaparak rezervasyon yapabilir.
- **Responsive Tasarım**: Her cihazda (mobil, tablet ve masaüstü) kullanıcı dostu bir görünüm.
- **Dinamik Ödeme Sistemi**: Seçilen biletlerin ödemesi test kart bilgileriyle yapılabilir.
- **Yerel Depolama**: Sepet bilgileri LocalStorage kullanılarak korunur.

### Yönetim Paneli:
- **Sinema ve Salon Yönetimi**: Yeni sinema ve salon eklenebilir, mevcut olanlar düzenlenebilir.
- **Film Yönetimi**: Filmlere görseller, kategori ve süre bilgisi eklenebilir.
- **Gösterim Yönetimi**: Filmler için gösterim saatleri planlanabilir.
- **Kampanya Yönetimi**: Kullanıcılar için kampanya ve promosyon tanımlanabilir.

---

## Proje Yapısı
Proje, kullanıcı arayüzü ve yönetim paneli olmak üzere iki ana modülden oluşur. Dosya organizasyonu, modüler bir yapıda düzenlenmiştir:

### **Ana Klasörler**
- `/src`: Kullanıcı arayüzü (Kino-Ticket) ve rezervasyon bileşenleri.
- `/admin`: Yönetim paneli ve ilgili araçlar.
- `/assets`: Görseller (film afişleri, salon görselleri, ikonlar).
- `/styles`: CSS dosyaları.
- `/tests`: Test dosyaları (Jest ile yazılmış).

### **Örnek Dosya Yapısı**
```
/Kino-Ticket
├── /admin
│   ├── /scripts
│   │   ├── /data
│   │   ├── /view
│   │   └── app.js
│   ├── /styles
│   │   ├── cinema.css
│   │   ├── film.css
│   │   └── showtimes.css
│   └── admin.html
├── /src
│   ├── /components
│   ├── /reservation
│   └── /data
├── /assets
│   ├── /cinema
│   ├── /filmafis
│   └── /icons
├── /styles
├── /tests
└── index.html
```

---

## Proje Özellikleri

### Kullanıcı Fonksiyonları:
1. **Film Seçimi**:
   - Kullanıcılar sinema ve film seçebilir.
   - Filmler, görsel olarak düzenlenmiştir.

2. **Salon ve Koltuk Seçimi**:
   - Kullanıcılar salondaki mevcut koltuklardan seçim yapabilir.
   - Dolu, seçili ve boş koltuklar farklı renklerle belirtilir.

3. **Sepet Yönetimi ve Ödeme**:
   - Kullanıcılar seçtikleri biletleri sepete ekleyebilir ve ödeme yapabilir.
   - Yerel depolama (LocalStorage) sayesinde bilgiler kaybolmaz.

4. **Responsive Arayüz**:
   - Tüm cihazlarda mükemmel görünüm.

### Yönetim Paneli Fonksiyonları:
1. **Sinema ve Salon Yönetimi**:
   - Sinemalar, salonlar ve oturma düzeni eklenebilir ve düzenlenebilir.

2. **Film Yönetimi**:
   - Filmlere görsel, kategori ve süre bilgisi eklenebilir.

3. **Gösterim Zamanı Planlama**:
   - Filmler için gösterim saatleri planlanabilir ve düzenlenebilir.

4. **Kampanya Yönetimi**:
   - Yönetim panelinde kullanıcılar için kampanyalar oluşturulabilir.

---

## Kullanılan Teknolojiler
Projede kullanılan teknolojiler şunlardır:
- **HTML5**, **CSS3**, **SASS**: Sayfa yapısı ve tasarım.
- **JavaScript (ES6)**: Dinamik işlevsellik.
- **Node.js**: Geliştirme ortamı ve modül yönetimi.
- **LocalStorage**: Veri depolama.
- **Jest**: Testler için.
- **GitHub Pages**: Yayınlama ortamı.

---

## Projenin Kurulumu

### Adımlar:
1. **Projeyi Klonlayın**:
   ```bash
   git clone https://github.com/orhanguezel/kino-ticket.git
   cd kino-ticket
   ```

2. **Gerekli Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

3. **Proje Başlatın**:
   ```bash
   npm start
   ```

4. **Testleri Çalıştırın**:
   ```bash
   npx jest
   ```

---

## Demo Görselleri
### Kullanıcı Arayüzü
![Kullanıcı Arayüzü](https://orhanguezel.github.io/Kino-Ticket/assets/demo-image.png)

### Yönetim Paneli
![Yönetim Paneli](https://orhanguezel.github.io/Kino-Ticket/assets/admin-panel.png)

---

## Gelecekteki Geliştirme Planları
1. **Kullanıcı ve Yönetici Arayüzü Entegrasyonu**:
   - Admin paneli, kullanıcı tarafıyla tamamen entegre edilecek.
2. **Kullanıcı Kimlik Doğrulama**:
   - Kullanıcıların hesap oluşturarak sisteme giriş yapabilmesi.

---

## Lisans
Bu proje **MIT Lisansı** altında sunulmaktadır.

---

## İletişim
Geliştirici: **Orhan Güzel**  
E-posta: **orhan.guezel@dci-student.org**  
GitHub: **[OrhanGuezel](https://github.com/OrhanGuezel)**
```