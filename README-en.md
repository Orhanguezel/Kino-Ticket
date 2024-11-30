# Kino-Ticket Web Application 🎥

## Project Description
The Kino-Ticket application allows users to select cinema tickets, reserve seats, and complete payment processes through a modern web interface. The project is designed as a **Single Page Application (SPA)** and features a **modular** architecture for future scalability.

The platform is based on the **CineGrup** infrastructure. Currently, two cinemas are supported, but the modular structure allows for easy addition of cinemas, movies, and seating plans.

Visit the website here: [Kino-Ticket](https://orhanguezel.github.io/Kino-Ticket/).

---

## Technologies Used
- **HTML5**: For structuring the page content.
- **CSS3 (SASS)**: For creating responsive and modern designs.
- **JavaScript (ES6)**: For dynamic interactions and functionality.
- **Node.js**: To manage the modular project structure.
- **Jest**: For automated testing.
- **Babel**: To ensure compatibility of modern JavaScript features.
- **GitHub Pages**: For deploying the application.

---

## Project Features
- **Modular Design**: Easy to expand with new cinemas, movies, and seats.
- **SPA (Single Page Application)**: Smooth and fast navigation without page reloads.
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop).
- **Dynamic Payment**: Simulated payment process with test card information.
- **Local Storage**: Saves data locally to prevent loss during page reloads.
- **Easy Management**: New content can be added by editing the data sources.

---

## Application Features

### 1. **Homepage**
The homepage displays general information about CineGrup and the available cinemas.

### 2. **Movie Selection**
Users can view and select the available movies for each cinema.

### 3. **Seat and Salon Selection**
Users can select their preferred salon and seat for the chosen movie. Occupied, available, and selected seats are visually distinguished.

### 4. **Cart**
Selected tickets are saved in a cart, which is dynamically displayed as a modal. Users can proceed to payment from here.

### 5. **Payment**
Users can complete the payment with test card information. After successful payment, tickets are displayed to the user.

---

## Directory Structure
The project structure follows a modular approach:
- **/src/components**: Header, Footer, and other UI components.
- **/src/reservation**: Functions for managing reservations.
- **/src/data**: Static data such as movies and cinemas.
- **/styles**: Individual CSS files for each component.
- **/utils**: Helper functions (e.g., data formatting).

---

## Demo Image
![Demo Image](https://orhanguezel.github.io/Kino-Ticket/assets/demo-image.png)

---

## License
This project is licensed under the [MIT License](LICENSE).

We welcome feedback and contributions! 🎬
