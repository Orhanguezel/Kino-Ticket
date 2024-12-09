# Kino-Ticket Web Uygulaması 🎥

## Proje Açıklaması
Kino-Ticket uygulaması, kullanıcıların modern bir web arayüzü üzerinden sinema biletlerini seçmesini, salon ve koltuk seçimi yapmasını ve ödeme işlemlerini tamamlamasını sağlayan **modüler** bir sinema bilet rezervasyon platformudur. Uygulama, kullanıcı dostu bir deneyim sunmak için **Single Page Application (SPA)** olarak tasarlanmıştır. 

Projede **CineGrup** platformu baz alınmış olup, şu anda iki sinema desteklenmektedir. Ancak modüler yapısı sayesinde, sinema sayısı kolayca artırılabilir ve farklı içeriklerle genişletilebilir. Sinema bilgileri dinamik olarak yönetilebilecek şekilde yapılandırılmıştır.

Web sayfasına buradan erişebilirsiniz: [Kino-Ticket](https://orhanguezel.github.io/Kino-Ticket/).

---

## Kullandığımız Teknolojiler
Bu projede aşağıdaki teknolojiler ve araçlar kullanılmıştır:

- **HTML5**: Sayfa içeriğini oluşturmak için.
- **CSS3 (SASS)**: Şık ve duyarlı bir tasarım sağlamak için.
- **JavaScript (ES6)**: Dinamik işlevsellik ve kullanıcı etkileşimleri için.
- **Node.js**: Geliştirme ortamında modüler yapıların yönetimi için.
- **Jest**: Test otomasyonu için.
- **Babel**: Modern JavaScript kodlarının tarayıcı uyumluluğunu sağlamak için.
- **GitHub Pages**: Uygulamanın yayınlanması için.

---

## Proje Özellikleri
- **Modüler Tasarım**: Proje, login, register, arama, sinema, salon, film, kategori, tarih ve koltuk seçimleri gibi bileşenlerin kolayca eklenip çıkarılabileceği bir şekilde tasarlandı.
- **SPA (Single Page Application)**: Sayfa yenilemesi olmadan hızlı ve akıcı bir kullanıcı deneyimi sunar.
- **Responsive Tasarım**: Tüm cihazlarda (mobil, tablet ve masaüstü) kullanıcı dostu bir görünüm sağlar.
- **Dinamik Ödeme**: Kullanıcılar üye girisi veya misafir olarak biletlerini seçtikten sonra ödeme işlemini test kart bilgileriyle tamamlayabilir.
- **Yerel Depolama (Local Storage)**: Sepet bilgileri yerel depolamada saklanır, bu sayede sayfa yenilenince bile veriler kaybolmaz.
- **Kolay Yönetim**: Yeni sinema, salon, film eklemek için veya indirim belirlemek icin sadece veri dosyalarının düzenlenmesi yeterlidir.

---

## Sayfa Fonksiyonları ve Yapı

### 1. **Ana Sayfa**
Ana sayfa, kullanıcılara CineGrup’un genel bilgilerini ve aktif sinema seçeneklerini sunar. Kullanıcı, seçmek istediği sinemaya kolayca ulaşabilir. abaut uns ile bilgi verilir. filmlerle ilgili bilgi verilir. sinema ile ilgili blog yazıları paylaşılır.

### 2. **Film Seçimi**
Her sinema için mevcut filmler gösterilir. Filmler, kullanıcı deneyimini artırmak için görsel olarak düzenlenmiştir.

ayrica sinemadan bagimsiz olarak tüm filmler arasinda kategorilerden film secimi yapilabilir.

### 3. **Salon ve Koltuk Seçimi**
Kullanıcılar seçtikleri film için salon ve koltuk tercihlerinde bulunabilirler. Koltuklar dolu, seçili ve boş olarak işaretlenir.

### 4. **Sepet Yönetimi**
Seçilen biletler, kullanıcı tarafından kontrol edilebileceği bir sepet ekranına eklenir. Sepet, dinamik bir modal üzerinde gösterilir ve kullanıcı buradan biletlerini duzenleyebilir, tek tek veya tümünü iptal edebilir, ödeme işlemine geçebilir.

### 5. **Ödeme**
Kullanıcılar ödeme işlemini test kart bilgileriyle gerçekleştirebilir. Geçerli bilgilerle ödeme tamamlandığında, biletler başarılı bir şekilde kullanıcıya gösterilir.

---

## Kullanılan Dosya Yapısı
Projede dosya organizasyonu modüler bir yaklaşımla düzenlenmiştir:
- **/src/components**: Header, footer ve ana sayfa gibi temel bileşenler.
- **/src/reservation**: Sinema rezervasyonu için gerekli işlevler.
- **/src/data**: Filmler, sinemalar ve grup bilgileri gibi sabit veriler.
- **/styles**: Her sayfa ve bileşen için özel CSS dosyaları.
- **/utils**: Yardımcı fonksiyonlar (örneğin, veri formatlama).

---

## Demo Görseli
![Demo Ekranı](https://orhanguezel.github.io/Kino-Ticket/assets/demo-image.png)

---

## Lisans
Bu proje [MIT Lisansı](LICENSE) ile korunmaktadır.

Her türlü geri bildiriminizi ve katkınızı bekliyoruz! 🎬
