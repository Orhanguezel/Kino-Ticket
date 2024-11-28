### **Local Storage Nedir?**
Local Storage, web tarayıcılarının sağladığı bir depolama alanıdır. Kullanıcı verilerini tarayıcıda kalıcı olarak saklamaya olanak tanır. Bu veriler, tarayıcı sekmesi veya pencere kapatıldıktan sonra bile silinmez.

---

### **Local Storage'ın Özellikleri**
1. **Kalıcı Depolama:**
   - Local Storage'daki veriler tarayıcı kapatılsa bile saklanır.
   - Kullanıcı manuel olarak veya JavaScript ile temizlemedikçe veriler silinmez.

2. **Key-Value (Anahtar-Değer) Yapısı:**
   - Veriler anahtar-değer çiftleri olarak saklanır.
   - Anahtarlar ve değerler yalnızca `string` türünde olabilir.

3. **Tarayıcıya Özel:**
   - Veriler yalnızca o tarayıcı ve domain (alan adı) için geçerlidir.

4. **Depolama Sınırı:**
   - Tarayıcı başına yaklaşık 5MB veri depolama kapasitesine sahiptir.

5. **Kapsam:**
   - Local Storage yalnızca aynı protokol (`http` veya `https`), aynı alan adı ve aynı porttan erişilebilir.

---

### **Local Storage'ın Avantajları**
1. **Sunucuya Bağımlılık Yok:**
   - Veriler tarayıcıda saklanır, bu nedenle hızlıdır ve ağ trafiğini azaltır.
2. **Kolay Kullanım:**
   - JavaScript ile kolayca veri ekleme, okuma, güncelleme ve silme işlemleri yapılabilir.
3. **Güvenilirlik:**
   - Veriler tarayıcı kapanınca kaybolmaz.
4. **Yedekleme Gereksinimi Yok:**
   - Veriler istemcide saklandığı için sunucu üzerinde ekstra bir yapılandırma gerekmez.

---

### **Local Storage ile İlgili Metotlar**

#### **1. Veri Ekleme (`setItem`)**
Local Storage’a veri eklemek için `setItem` metodu kullanılır.

```javascript
localStorage.setItem('key', 'value');
```

Örnek:
```javascript
localStorage.setItem('username', 'JohnDoe');
```

---

#### **2. Veri Okuma (`getItem`)**
Local Storage’dan veri almak için `getItem` metodu kullanılır.

```javascript
const value = localStorage.getItem('key');
```

Örnek:
```javascript
const username = localStorage.getItem('username');
console.log(username); // Çıktı: JohnDoe
```

---

#### **3. Veri Silme (`removeItem`)**
Belirli bir anahtarla ilişkili veriyi silmek için `removeItem` metodu kullanılır.

```javascript
localStorage.removeItem('key');
```

Örnek:
```javascript
localStorage.removeItem('username');
```

---

#### **4. Tüm Verileri Temizleme (`clear`)**
Local Storage’daki tüm verileri temizlemek için `clear` metodu kullanılır.

```javascript
localStorage.clear();
```

---

#### **5. Saklanan Verilerin Sayısını Öğrenme (`length`)**
Local Storage’da saklanan toplam anahtar sayısını öğrenmek için `length` özelliği kullanılır.

```javascript
const itemCount = localStorage.length;
console.log(itemCount);
```

---

#### **6. Belirli Bir Anahtarı Almak (`key`)**
Belirli bir indeks numarasına göre anahtarı almak için `key` metodu kullanılır.

```javascript
const key = localStorage.key(index);
```

Örnek:
```javascript
const firstKey = localStorage.key(0);
console.log(firstKey);
```

---

### **Local Storage Kullanım Senaryoları**
1. **Kullanıcı Ayarları:**
   - Tema (koyu/açık mod) gibi kullanıcı tercihlerini saklama.
2. **Sepet Bilgileri:**
   - E-ticaret sitelerinde kullanıcı sepetindeki ürünleri saklama.
3. **Oturum Yönetimi:**
   - Kullanıcı giriş bilgilerini (örneğin, `token`) geçici olarak saklama.
4. **Form Verileri:**
   - Kullanıcının doldurduğu form verilerini saklama.

---

### **Local Storage'da JSON Veri Saklama**
Local Storage yalnızca `string` türünde veri saklar. Bu nedenle, nesne veya dizi gibi veri türlerini JSON formatına dönüştürmek gerekir.

#### **1. Nesneyi JSON Olarak Saklama**
```javascript
const user = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
};

localStorage.setItem('user', JSON.stringify(user));
```

#### **2. JSON Veriyi Okuma**
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.name); // Çıktı: John Doe
```

---

### **Local Storage ile Oturum Depolama Karşılaştırması**
| **Özellik**              | **Local Storage**                          | **Session Storage**                        |
|--------------------------|-------------------------------------------|-------------------------------------------|
| **Saklama Süresi**        | Kalıcı                                   | Tarayıcı sekmesi kapanınca silinir        |
| **Depolama Alanı**        | Yaklaşık 5MB                             | Yaklaşık 5MB                              |
| **Kapsam**                | Tüm tarayıcı oturumları                  | Yalnızca aynı sekme için geçerlidir       |
| **Kullanım Amaçları**     | Kalıcı kullanıcı verileri                 | Geçici oturum verileri                    |

---

### **Local Storage'ın Sınırlamaları**
1. **Tarayıcıya Bağımlılık:**
   - Kullanıcılar tarayıcı geçmişini temizlediğinde veriler silinebilir.
2. **Güvenlik:**
   - Local Storage şifreleme içermez. Hassas bilgiler burada saklanmamalıdır.
3. **Boyut Kısıtlaması:**
   - Depolama alanı sınırlıdır (~5MB).
4. **Yavaş Erişim:**
   - Büyük miktarda veri ile çalışırken performans düşebilir.

---

### **Uygulama Örneği**
Bir `todo list` uygulamasında, görevlerin localStorage’da saklanması:
```javascript
// Görev Ekleme
function addTodo(task) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(task);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Görevleri Listeleme
function listTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => console.log(todo));
}

// Görevleri Temizleme
function clearTodos() {
  localStorage.removeItem('todos');
}

// Örnek Kullanım
addTodo('Learn JavaScript');
addTodo('Learn Local Storage');
listTodos(); // Çıktı: Learn JavaScript, Learn Local Storage
clearTodos();
```

---

### **Sonuç**
Local Storage, tarayıcıda veri depolamak için kullanışlı ve etkili bir araçtır. Ancak, güvenlik ve boyut sınırlamaları nedeniyle hassas veriler için kullanılmamalıdır. Uygulamalarda doğru bir şekilde kullanıldığında, kullanıcı deneyimini büyük ölçüde iyileştirebilir.

// Film Class
class Film {
    constructor(id, name, price) {
        this.id = id; // Film ID
        this.name = name; // Film adı
        this.price = price; // Bilet fiyatı
    }
}

// Seat Class
class Seat {
    constructor(number, status = "leer") {
        this.number = number; // Koltuk numarası
        this.status = status; // Koltuk durumu: 'leer', 'besetzt', 'ausgewählt'
    }

    // Koltuk durumu değiştirme
    changeStatus(newStatus) {
        this.status = newStatus;
    }
}

// Hall Class
class Hall {
    constructor(name, seatCount) {
        this.name = name; // Salon adı
        this.seats = this.createSeats(seatCount); // Koltuk listesi
    }

    // Koltukları rastgele oluştur
    createSeats(seatCount) {
        let seats = [];
        for (let i = 1; i <= seatCount; i++) {
            const randomStatus = Math.random() > 0.8 ? "besetzt" : "leer"; // %20 dolu
            seats.push(new Seat(i, randomStatus));
        }
        return seats;
    }
}

// Cinema Class
class Cinema {
    constructor(name, address) {
        this.name = name; // Sinema adı
        this.address = address; // Adres
        this.halls = []; // Salon listesi
    }

    // Salona ekleme
    addHall(hall) {
        this.halls.push(hall);
    }
}

// Ticket Class
class Ticket {
    constructor(film, hall, seats) {
        this.film = film; // Seçilen film
        this.hall = hall; // Seçilen salon
        this.seats = seats; // Seçilen koltuklar
        this.totalPrice = this.calculate(); // Toplam fiyat
    }

    // Toplam fiyatı hesapla
    calculate() {
        return this.seats.length * this.film.price;
    }
}

// Veriler
const films = [
    new Film(1, "Avatar: The Way of Water", 12),
    new Film(2, "Oppenheimer", 15),
    new Film(3, "Barbie", 10),
    new Film(4, "The Marvels", 11),
    new Film(5, "The Hunger Games: The Ballad of Songbirds & Snakes", 13),
    new Film(6, "Killers of the Flower Moon", 14),
    new Film(7, "Dune: Part Two", 15),
    new Film(8, "Mission: Impossible - Dead Reckoning Part One", 14),
    new Film(9, "Spider-Man: Across the Spider-Verse", 12),
    new Film(10, "John Wick: Chapter 4", 13),
];

const cinema1 = new Cinema("Cineplex Berlin", "Alexanderplatz 3, 10178 Berlin");

// Üç farklı salon oluştur
const hall1 = new Hall("Saal 1", 30); // 30 koltuk
const hall2 = new Hall("Saal 2", 20); // 20 koltuk
const hall3 = new Hall("Saal 3", 40); // 40 koltuk

// Salonları sinemaya ekle
cinema1.addHall(hall1);
cinema1.addHall(hall2);
cinema1.addHall(hall3);

// Koltuk durumlarını konsolda göster
cinema1.halls.forEach((hall, index) => {
    console.log(`\n${hall.name} Koltuk Durumları:`);
    hall.seats.forEach((seat) => {
        console.log(`Koltuk ${seat.number}: ${seat.status}`);
    });
});

// Örnek Ticket
const selectedFilm = films[0];
const selectedHall = hall1;

// Rastgele seçilmiş koltuklar
const selectedSeats = selectedHall.seats.filter((seat) => seat.status === "leer").slice(0, 2); // İlk 2 boş koltuk

// Bilet oluştur
const ticket = new Ticket(selectedFilm, selectedHall, selectedSeats);

console.log("\nSeçilen Bilet Bilgileri:", ticket);
