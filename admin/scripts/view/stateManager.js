// Global durum
export let state = {
  cinemas: [],
  films: [],
  salons: [],
  seats: [],
  campaigns: [],
};

// Uygulama durumunu başlat
export function initializeAppState(cinemas = [], films = [], salons = [], seats = [], campaigns = []) {
  state.cinemas = cinemas;
  state.films = films;
  state.salons = salons;
  state.seats = seats; // Koltuk verisi
  state.campaigns = campaigns; // Kampanya verisi
  saveStateToLocalStorage(); // Durumu LocalStorage'a kaydet
}

// Tüm durumu LocalStorage'a kaydet
export function saveStateToLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

// Tüm durumu LocalStorage'dan yükle
export function loadStateFromLocalStorage() {
  const loadedState = localStorage.getItem("state");
  if (loadedState) {
    const parsedState = JSON.parse(loadedState);
    state.cinemas = parsedState.cinemas || [];
    state.films = parsedState.films || [];
    state.salons = parsedState.salons || [];
    state.seats = parsedState.seats || [];
    state.campaigns = parsedState.campaigns || []; // Kampanya verisini yükle
  }
}

// Kampanyalar için LocalStorage işlemleri
// Kampanyalar için LocalStorage işlemleri
const CAMPAIGNS_STORAGE_KEY = "campaigns";

export function loadCampaignsFromLocalStorage() {
  const storedCampaigns = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
  state.campaigns = storedCampaigns ? JSON.parse(storedCampaigns) : [];
  return state.campaigns;
}

export function saveCampaignsToLocalStorage(campaigns) {
  state.campaigns = campaigns;
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
  saveStateToLocalStorage();
}


// Kampanyaları başlat
export function initializeCampaigns(campaigns = []) {
  state.campaigns = campaigns;
  saveCampaignsToLocalStorage(campaigns); // Kampanyaları LocalStorage'a kaydet
}


// Sinemalar için LocalStorage işlemleri
const CINEMAS_STORAGE_KEY = "cinemas";

export function loadCinemasFromLocalStorage() {
  const storedCinemas = localStorage.getItem(CINEMAS_STORAGE_KEY);
  state.cinemas = storedCinemas ? JSON.parse(storedCinemas) : [];
  return state.cinemas;
}

export function saveCinemasToLocalStorage(cinemas) {
  state.cinemas = cinemas;
  localStorage.setItem(CINEMAS_STORAGE_KEY, JSON.stringify(cinemas));
  saveStateToLocalStorage();
}

// Salonlar için LocalStorage işlemleri
const SALONS_STORAGE_KEY = "salons";

export function loadSalonsFromLocalStorage() {
  const storedSalons = localStorage.getItem(SALONS_STORAGE_KEY);
  state.salons = storedSalons ? JSON.parse(storedSalons) : [];
  return state.salons;
}

export function saveSalonsToLocalStorage(salons) {
  state.salons = salons;
  localStorage.setItem(SALONS_STORAGE_KEY, JSON.stringify(salons));
  saveStateToLocalStorage();
}

// Filmler için LocalStorage işlemleri
const FILMS_STORAGE_KEY = "films";

export function loadFilmsFromLocalStorage() {
  const storedFilms = localStorage.getItem(FILMS_STORAGE_KEY);
  state.films = storedFilms ? JSON.parse(storedFilms) : [];
  return state.films;
}

export function saveFilmsToLocalStorage(films) {
  state.films = films;
  localStorage.setItem(FILMS_STORAGE_KEY, JSON.stringify(films));
  saveStateToLocalStorage();
}

// Koltuklar için LocalStorage işlemleri
const SEATS_STORAGE_KEY = "seats";

export function loadSeatsFromLocalStorage() {
  const storedSeats = localStorage.getItem(SEATS_STORAGE_KEY);
  state.seats = storedSeats ? JSON.parse(storedSeats) : [];
  return state.seats;
}

export function saveSeatsToLocalStorage(seats) {
  state.seats = seats;
  localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(seats));
  saveStateToLocalStorage();
}

// Genel veriyi kaydetme ve yükleme fonksiyonları
export function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}



// Tüm LocalStorage verilerini temizle
export function resetData() {
  localStorage.clear();
  alert("Veriler sıfırlandı. Varsayılan veriler yükleniyor.");
  window.location.reload();
}
