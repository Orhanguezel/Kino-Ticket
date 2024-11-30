# Kino-Ticket Web-Anwendung 🎥

## Projektbeschreibung
Die Kino-Ticket-Anwendung ermöglicht es Benutzern, Kinotickets über eine moderne Weboberfläche auszuwählen, Sitzplätze zu reservieren und Zahlungsprozesse abzuschließen. Das Projekt ist als **Single Page Application (SPA)** konzipiert und bietet ein **modulares** Design für zukünftige Erweiterungen.

Die Plattform basiert auf der **CineGrup**-Infrastruktur. Derzeit werden zwei Kinos unterstützt, aber durch die modulare Struktur können Kinos, Filme und Sitzpläne leicht hinzugefügt werden.

Hier können Sie die Website besuchen: [Kino-Ticket](https://orhanguezel.github.io/Kino-Ticket/).

---

## Verwendete Technologien
- **HTML5**: Erstellung des Seiteninhalts.
- **CSS3 (SASS)**: Responsive und moderne Designs.
- **JavaScript (ES6)**: Dynamische Interaktionen und Funktionalität.
- **Node.js**: Verwaltung der modularen Projektstruktur.
- **Jest**: Automatisierte Tests.
- **Babel**: Kompatibilität moderner JavaScript-Funktionen.
- **GitHub Pages**: Veröffentlichung der Anwendung.

---

## Projektmerkmale
- **Modulares Design**: Ermöglicht die einfache Erweiterung um neue Kinos, Filme und Sitzplätze.
- **SPA (Single Page Application)**: Schnelle und reibungslose Navigation ohne Seiten-Neuladen.
- **Responsive Design**: Optimiert für alle Geräte (Mobil, Tablet, Desktop).
- **Dynamische Zahlung**: Benutzer können mit Testkarteninformationen die Zahlung simulieren.
- **Lokaler Speicher (Local Storage)**: Speichert Daten lokal, sodass sie bei einem Seiten-Neuladen nicht verloren gehen.
- **Einfache Verwaltung**: Neue Inhalte können durch Bearbeitung der Datenquellen einfach hinzugefügt werden.

---

## Funktionen der Anwendung

### 1. **Startseite**
Die Startseite zeigt allgemeine Informationen über CineGrup sowie die verfügbaren Kinos.

### 2. **Filmauswahl**
Benutzer können die verfügbaren Filme für jedes Kino anzeigen und auswählen.

### 3. **Sitzplatz- und Salonwahl**
Benutzer können den gewünschten Salon und Sitzplatz für ihren Film auswählen. Belegte, freie und ausgewählte Sitzplätze werden visuell hervorgehoben.

### 4. **Warenkorb**
Die ausgewählten Tickets werden in einem Warenkorb gespeichert, der dynamisch als Modal angezeigt wird. Benutzer können von hier aus zur Zahlung übergehen.

### 5. **Zahlung**
Die Zahlung kann mit Testkarteninformationen abgeschlossen werden. Nach erfolgreicher Zahlung werden die Tickets dem Benutzer angezeigt.

---

## Verzeichnisstruktur
Die Projektstruktur ist modular aufgebaut:
- **/src/components**: Header, Footer und andere UI-Komponenten.
- **/src/reservation**: Funktionen zur Verwaltung von Reservierungen.
- **/src/data**: Statische Daten wie Filme und Kinos.
- **/styles**: Individuelle CSS-Dateien für jede Komponente.
- **/utils**: Helferfunktionen (z. B. Datenformatierung).

---

## Demo-Bild
![Demo-Bild](https://orhanguezel.github.io/Kino-Ticket/assets/demo-image.png)

---

## Lizenz
Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

Wir freuen uns über Feedback und Beiträge! 🎬
