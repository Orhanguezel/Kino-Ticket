
# Kino-Ticket und Admin-Panel 🎥🍿

## Projektbeschreibung
**Kino-Ticket und Admin-Panel** ist eine Plattform für die Buchung von Kinotickets, die es den Benutzern ermöglicht, Kinos, Filme, Sitzplätze und Vorstellungen auszuwählen und den Buchungsprozess abzuschließen. Das Projekt beinhaltet auch ein **Admin-Panel**, das die Verwaltung von Kinos, Filmen und Vorstellungen erleichtert.

### Entwicklungsstatus:
- Die Benutzeroberfläche (Kino-Ticket) ist voll funktionsfähig und ermöglicht den Benutzern eine einfache Ticketbuchung.
- **Das Admin-Panel** bietet Funktionen zur Verwaltung von Kinos, Filmen und Vorstellungen, ist jedoch **noch nicht vollständig mit der Benutzeroberfläche integriert**. Diese Integration wird in zukünftigen Entwicklungsphasen abgeschlossen.

---

## Projektmerkmale

### Benutzerseite:
- **Ticketbuchung**: Benutzer können Kinos, Filme, Vorstellungen und Sitzplätze auswählen.
- **Responsive Design**: Optimale Anzeige auf allen Geräten (Desktop, Tablet, Smartphone).
- **Dynamisches Bezahlsystem**: Benutzer können ihre Tickets mit Test-Kartendaten bezahlen.
- **Lokale Speicherung**: Warenkorbinformationen bleiben dank LocalStorage auch nach dem Aktualisieren der Seite erhalten.

### Admin-Panel:
- **Kino- und Saalverwaltung**: Neue Kinos und Säle können hinzugefügt und bearbeitet werden.
- **Filmverwaltung**: Filme können mit Postern, Kategorien und Laufzeiten ergänzt werden.
- **Vorstellungsplanung**: Vorstellungszeiten für Filme können hinzugefügt und verwaltet werden.
- **Kampagnenverwaltung**: Kampagnen und Angebote können für Benutzer definiert werden.

---

## Projektstruktur
Das Projekt besteht aus zwei Hauptmodulen: der Benutzeroberfläche und dem Admin-Panel. Die Dateien sind modular organisiert:

### **Hauptverzeichnisse**
- `/src`: Komponenten und Reservierungsfunktionen der Benutzeroberfläche.
- `/admin`: Admin-Panel und zugehörige Funktionen.
- `/assets`: Bilder (Filmplakate, Kinosäle, Icons).
- `/styles`: CSS-Dateien.
- `/tests`: Testdateien (erstellt mit Jest).

### **Beispielhafte Verzeichnisstruktur**
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

## Projektfunktionen

### Benutzerfunktionen:
1. **Filmauswahl**:
   - Benutzer können Kinos und Filme auswählen.
   - Filme werden mit visuellen Postern dargestellt.

2. **Saal- und Sitzplatzauswahl**:
   - Benutzer können ihre bevorzugten Sitzplätze im Saal auswählen.
   - Besetzte, ausgewählte und verfügbare Sitzplätze werden farblich gekennzeichnet.

3. **Warenkorb und Zahlung**:
   - Benutzer können ihre ausgewählten Tickets in den Warenkorb legen und bezahlen.
   - Informationen bleiben dank LocalStorage erhalten.

4. **Responsive Benutzeroberfläche**:
   - Optimierte Ansicht für alle Gerätetypen.

### Admin-Panel-Funktionen:
1. **Kino- und Saalverwaltung**:
   - Kinos und Säle können hinzugefügt, bearbeitet und organisiert werden.

2. **Filmverwaltung**:
   - Filme können mit Postern, Kategorien und Laufzeiten ergänzt werden.

3. **Vorstellungsplanung**:
   - Vorstellungszeiten können definiert und bearbeitet werden.

4. **Kampagnenverwaltung**:
   - Benutzerangebote und Aktionen können erstellt werden.

---

## Verwendete Technologien
In diesem Projekt wurden folgende Technologien verwendet:
- **HTML5**, **CSS3**, **SASS**: Struktur und Gestaltung der Seiten.
- **JavaScript (ES6)**: Dynamische Funktionen und Interaktionen.
- **Node.js**: Entwicklungsumgebung und Modulverwaltung.
- **LocalStorage**: Datenhaltung.
- **Jest**: Testautomatisierung.
- **GitHub Pages**: Bereitstellung der Anwendung.

---

## Installation des Projekts

### Schritte:
1. **Projekt klonen**:
   ```bash
   git clone https://github.com/orhanguezel/kino-ticket.git
   cd kino-ticket
   ```

2. **Notwendige Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Projekt starten**:
   ```bash
   npm start
   ```

4. **Tests ausführen**:
   ```bash
   npm test
   ```

---

## Demo-Bilder
### Benutzeroberfläche
![Benutzeroberfläche](https://orhanguezel.github.io/Kino-Ticket/assets/demo-image.png)

### Admin-Panel
![Admin-Panel](https://orhanguezel.github.io/Kino-Ticket/assets/admin-panel.png)

---

## Zukünftige Entwicklungspläne
1. **Integration der Benutzeroberfläche und des Admin-Panels**:
   - Das Admin-Panel wird vollständig mit der Benutzeroberfläche integriert.
2. **Benutzeranmeldung**:
   - Benutzer können Konten erstellen und sich anmelden.

---

## Lizenz
Dieses Projekt steht unter der **MIT-Lizenz**.

---

## Kontakt
Entwickler: **Orhan Güzel**  
E-Mail: **orhan.guezel@dci-student.org**  
GitHub: **[OrhanGuezel](https://github.com/OrhanGuezel)**
```
