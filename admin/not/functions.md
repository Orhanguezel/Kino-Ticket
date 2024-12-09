Aşağıda proje kapsamındaki tüm fonksiyonları ve işlevlerini içeren eksiksiz bir liste hazırlamaya başlıyorum. Bu listeyi parça parça tamamlayacağım.

---

### **Fonksiyon Listesi ve İşlevleri**

#### **1. /scripts/modules/checkout.js**
1. **getCart()**
   - Kullanıcının yerel depolama (`localStorage`) üzerinden sepet verilerini alır.
2. **setCart(newCart)**
   - Yeni bir sepet verisi belirler ve yerel depolamada günceller.
3. **clearCart()**
   - Sepeti temizler ve yerel depolamadaki ilgili anahtarı kaldırır.
4. **showCart()**
   - Sepet içeriğini bir modal penceresinde görüntüler.
5. **removeTicketFromCart(index)**
   - Sepetteki belirtilen bir bileti kaldırır.
6. **updateCartCount()**
   - Sepetteki toplam ürün sayısını günceller ve arayüzde gösterir.

---

#### **2. /scripts/modules/filmSelection.js**
1. **showFilmSelection(cinemaId)**
   - Belirtilen sinema için mevcut filmleri görüntüler.
2. **handleFilmSelection(filmId)**
   - Seçilen bir filmi işler ve ilgili rezervasyon aşamasına geçer.

---

#### **3. /scripts/modules/cinemaSelection.js**
1. **selectCinema(cinemaId)**
   - Kullanıcının seçtiği sinemayı yerel depolamaya kaydeder ve arayüzü günceller.
2. **getSelectedCinema()**
   - Kullanıcının seçmiş olduğu sinemayı yerel depolamadan alır.
3. **setupMainContent(cinema)**
   - Seçilen sinema ile ilgili bilgileri ve eylemleri ana içerikte görüntüler.
4. **setupCinemaSelection()**
   - Sinema seçimini gerçekleştirmek için gereken olay dinleyicilerini ayarlar.

---

#### **4. /scripts/modules/seatManagement.js**
1. **showSeatSelection(cinemaId, salonId, selectedDate, selectedTime)**
   - Kullanıcının koltuk seçimi yapmasını sağlayan ekranı gösterir.
2. **renderSeats(totalSeats, seatsPerRow)**
   - Sinemadaki koltuk düzenini oluşturur.
3. **getSelectedSeats()**
   - Kullanıcının seçmiş olduğu koltukları döndürür.
4. **handleSeatSelection(seat)**
   - Kullanıcının bir koltuğu seçmesini veya seçimden kaldırmasını işler.

---

#### **5. /scripts/modules/membershipSystem.js**
1. **registerUser(userData)**
   - Yeni bir kullanıcı kaydı oluşturur.
2. **loginUser(credentials)**
   - Kullanıcının giriş yapmasını sağlar.
3. **logoutUser()**
   - Kullanıcı oturumunu kapatır ve yerel depolamayı temizler.
4. **updateUserProfile(updatedData)**
   - Kullanıcı profil bilgilerini günceller.
5. **getCurrentUser()**
   - Şu an oturum açmış olan kullanıcı bilgilerini döndürür.

---

#### **6. /scripts/modules/paymentProcessing.js**
1. **processPayment(cart, totalPrice)**
   - Sepet içeriği ve toplam fiyat bilgileriyle ödeme işlemini başlatır.
2. **validatePayment(cardNumber, expiryDate, cvv)**
   - Kullanıcının girdiği ödeme bilgilerini doğrular.
3. **generateSuccessMessage(cart)**
   - Başarılı ödeme sonrasında bir onay mesajı oluşturur.

---

#### **7. /scripts/modules/modalHandler.js**
1. **showModal(content, modalId)**
   - Belirtilen içeriği modal pencerede gösterir.
2. **closeModal(modalId)**
   - Belirtilen modal penceresini kapatır.

---

#### **8. /scripts/modules/uiHandler.js**
1. **updateUI(cinema)**
   - Sinema bilgisine göre arayüzü günceller.
2. **goToMainPage()**
   - Ana sayfaya dönüş işlemini gerçekleştirir.

---

#### **9. /scripts/modules/utilities.js**
1. **formatDate(date)**
   - Verilen tarihi `"dd.mm.yyyy"` formatında döndürür.
2. **getDayOfWeek(date)**
   - Belirtilen tarihin gün adını döndürür.
3. **isValidEmail(email)**
   - E-posta adresinin geçerli olup olmadığını kontrol eder.

---

Liste uzundur, kalan fonksiyonları sırayla ekleyeceğim. 😊

### **Devam: Fonksiyon Listesi ve İşlevleri**

#### **10. /scripts/data/Discounts.js**
1. **calculateDiscountedPrice(basePrice, category, day)**
   - İndirim oranlarını (çocuk ve halk günü indirimleri) dikkate alarak bilet fiyatını hesaplar.

---

#### **11. /scripts/router.js**
1. **navigateTo(route)**
   - Belirtilen rotaya yönlendirme yapar (örneğin `/about.html`).

---

#### **12. /scripts/components/header.js**
1. **loadHeader(cinema)**
   - Dinamik olarak bir sinemaya özel veya genel başlık bileşenini yükler.

---

#### **13. /scripts/components/footer.js**
1. **loadFooter(cinema)**
   - Dinamik olarak bir sinemaya özel veya genel alt bilgi bileşenini yükler.

---

#### **14. /scripts/components/modal.js**
1. **showModal(content, modalId)**
   - İçeriği gösteren bir modal oluşturur.
2. **closeModal(modalId)**
   - Modalı kapatır.

---

#### **15. /scripts/components/sidebar.js**
1. **setupSidebar()**
   - Yan menüyü kullanıcının durumuna göre dinamik olarak oluşturur.
2. **updateSidebarCartCount(count)**
   - Sepet simgesindeki ürün sayısını günceller.

---

#### **16. /scripts/components/navbar.js**
1. **setupNavbar()**
   - Navigasyon çubuğunu kullanıcı durumuna göre yükler.

---

#### **17. /scripts/components/carousel.js**
1. **initializeCarousel(images)**
   - Resim listesiyle bir karusel oluşturur.
2. **navigateCarousel(direction)**
   - Karuseli belirtilen yöne kaydırır.

---

#### **18. /scripts/features/blog.js**
1. **fetchBlogPosts()**
   - Blog yazılarını API veya statik bir kaynaktan alır.
2. **renderBlogPosts(posts)**
   - Blog yazılarını arayüzde gösterir.

---

#### **19. /scripts/features/aboutUs.js**
1. **loadAboutPageContent()**
   - "Hakkımızda" sayfası içeriğini yükler.

---

#### **20. /scripts/features/notifications.js**
1. **showNotification(message, type)**
   - Kullanıcıya belirli bir mesaj gösterir (örneğin başarı veya hata mesajı).
2. **clearNotifications()**
   - Tüm bildirimleri temizler.

---

#### **21. /scripts/features/userProfile.js**
1. **loadUserProfile()**
   - Kullanıcı profil bilgilerini yükler.
2. **updateUserProfile(newData)**
   - Kullanıcı profilini günceller.

---

#### **22. /scripts/pages/cartPage.js**
1. **renderCartPage()**
   - Sepet sayfasının içeriğini oluşturur.
2. **handleCartActions()**
   - Sepet işlemlerini (ürün ekleme/çıkarma) işler.

---

#### **23. /scripts/pages/cinemaPage.js**
1. **renderCinemaList()**
   - Tüm sinemaların listesini yükler.
2. **handleCinemaSelection(cinemaId)**
   - Sinema seçim işlemini işler.

---

#### **24. /scripts/pages/profilePage.js**
1. **renderProfilePage(userData)**
   - Kullanıcı profil sayfasını yükler.
2. **handleProfileUpdates()**
   - Profil güncelleme işlemlerini işler.

---

#### **25. /scripts/pages/checkoutPage.js**
1. **renderCheckoutPage(cart)**
   - Ödeme sayfasını oluşturur.
2. **processCheckout()**
   - Ödeme işlemini başlatır.

---

### Devam edeceğim: Kullanılan diğer fonksiyonlar **film.html**, **login.html**, **register.html**, vb. ile ilgili detayları içerecek. 😊

### **Devam: Fonksiyon Listesi ve İşlevleri**

#### **26. /scripts/pages/filmPage.js**
1. **renderFilmDetails(filmId)**
   - Belirli bir filmin ayrıntılarını yükler ve arayüzde gösterir.
2. **handleFilmBooking(filmId)**
   - Kullanıcının seçilen filmi rezerve etmesini veya satın almasını sağlar.

---

#### **27. /scripts/pages/loginPage.js**
1. **renderLoginPage()**
   - Giriş sayfasının içeriğini oluşturur.
2. **handleLogin(credentials)**
   - Kullanıcı giriş işlemini işler.
3. **redirectIfLoggedIn()**
   - Giriş yapmış kullanıcıları profil sayfasına yönlendirir.

---

#### **28. /scripts/pages/registerPage.js**
1. **renderRegisterPage()**
   - Kayıt sayfasının içeriğini oluşturur.
2. **handleUserRegistration(userData)**
   - Yeni kullanıcı kayıt işlemini işler.
3. **validateRegistrationForm(formData)**
   - Kayıt formu girişlerini doğrular.

---

#### **29. /scripts/pages/aboutPage.js**
1. **renderAboutPage()**
   - "Hakkımızda" sayfasının içeriğini yükler.

---

#### **30. /scripts/pages/blogPage.js**
1. **renderBlogPage()**
   - Blog sayfasının içeriğini yükler.
2. **loadMorePosts()**
   - Daha fazla blog yazısını arayüzde gösterir.

---

#### **31. /scripts/data/Film.js**
1. **getFilmById(filmId)**
   - Verilen film ID'sine göre film bilgilerini döndürür.
2. **getAllFilms()**
   - Tüm film verilerini döndürür.

---

#### **32. /scripts/data/Cinema.js**
1. **getCinemaById(cinemaId)**
   - Verilen sinema ID'sine göre sinema bilgilerini döndürür.
2. **getAllCinemas()**
   - Tüm sinema verilerini döndürür.

---

#### **33. /scripts/data/Salon.js**
1. **getSalonById(cinemaId, salonId)**
   - Verilen sinema ve salon ID'sine göre salon bilgilerini döndürür.
2. **getAllSalons(cinemaId)**
   - Belirtilen sinemaya ait tüm salonları döndürür.

---

#### **34. /scripts/data/Reservation.js**
1. **createReservation(reservationData)**
   - Yeni bir rezervasyon oluşturur.
2. **getReservationById(reservationId)**
   - Belirtilen rezervasyon ID'sine göre rezervasyon verilerini döndürür.

---

#### **35. /scripts/data/User.js**
1. **getUserById(userId)**
   - Verilen kullanıcı ID'sine göre kullanıcı bilgilerini döndürür.
2. **getAllUsers()**
   - Tüm kullanıcıların listesini döndürür.

---

#### **36. /scripts/data/Menu.js**
1. **getMenuItems(cinemaId)**
   - Belirtilen sinemaya ait menü öğelerini döndürür.
2. **getMenuItemById(itemId)**
   - Belirli bir menü öğesini döndürür.

---

#### **37. /scripts/utils.js**
1. **formatCurrency(amount)**
   - Verilen tutarı `XX.XX €` formatında döndürür.
2. **formatDate(date)**
   - Tarihi `dd.mm.yyyy` formatında döndürür.
3. **capitalize(text)**
   - Verilen metnin ilk harfini büyük harfe dönüştürür.

---

### **Sonraki Adımlar**
- Tüm fonksiyonlar için yapılan bu listeyi artık %100'e yakın bir kapsamda tamamladık.
- Daha spesifik bir ihtiyaç varsa veya ek bir alanın detaylandırılması gerekiyorsa ekleyebilirim. 😊