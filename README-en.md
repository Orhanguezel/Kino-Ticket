
# Kino-Ticket and Admin Panel 🎥🍿

## Project Description
**Kino-Ticket and Admin Panel** is a platform for cinema ticket booking that enables users to select cinemas, films, seats, and showtimes and complete the booking process. The project also includes an **Admin Panel** for managing cinemas, films, and showtimes.

### Development Status:
- The user interface (Kino-Ticket) is fully functional, allowing users to book tickets seamlessly.
- **The Admin Panel** offers features to manage cinemas, films, and showtimes but is **not yet fully integrated with the user interface**. This integration will be completed in future development phases.

---

## Project Features

### User Side:
- **Ticket Booking**: Users can select cinemas, films, showtimes, and seats.
- **Responsive Design**: Optimized for all devices (desktop, tablet, smartphone).
- **Dynamic Payment System**: Users can complete payments with test card data.
- **Local Storage**: Cart information is retained even after the page refreshes.
- **User-Friendly Experience**: Provides an intuitive and seamless booking experience.

### Admin Panel:
- **Cinema and Hall Management**: Add and edit cinemas and halls.
- **Film Management**: Add films with posters, categories, and durations.
- **Showtime Scheduling**: Define and manage showtimes for films.
- **Campaign Management**: Create promotional campaigns and offers for users.

---

## Project Structure
The project consists of two main modules: the user interface and the admin panel. The files are organized in a modular structure:

### **Main Directories**
- `/src`: Components and reservation functions for the user interface.
- `/admin`: Admin panel and related functionalities.
- `/assets`: Images (film posters, cinema halls, icons).
- `/styles`: CSS files for styling.
- `/tests`: Test files (written using Jest).

### **Example Directory Structure**
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

## Project Features

### User Functions:
1. **Film Selection**:
   - Users can choose cinemas and films.
   - Films are visually presented with posters.

2. **Hall and Seat Selection**:
   - Users can select their preferred seats in the cinema hall.
   - Occupied, selected, and available seats are clearly marked.

3. **Cart and Payment**:
   - Users can add their selected tickets to the cart and proceed with payment.
   - Information is retained using Local Storage.

4. **Responsive User Interface**:
   - Optimized for a seamless experience on all devices.

### Admin Panel Features:
1. **Cinema and Hall Management**:
   - Add, edit, and organize cinemas and halls.

2. **Film Management**:
   - Add films with posters, categories, and durations.

3. **Showtime Scheduling**:
   - Define and manage showtimes.

4. **Campaign Management**:
   - Create offers and campaigns for users.

---

## Technologies Used
The following technologies have been used in this project:
- **HTML5**, **CSS3**, **SASS**: For page structure and styling.
- **JavaScript (ES6)**: For dynamic functionality and interactions.
- **Node.js**: For development and module management.
- **Local Storage**: For data persistence.
- **Jest**: For test automation.
- **GitHub Pages**: For deploying the application.

---

## How to Install the Project

### Steps:
1. **Clone the Project**:
   ```bash
   git clone https://github.com/orhanguezel/kino-ticket.git
   cd kino-ticket
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Project**:
   ```bash
   npm start
   ```

4. **Run Tests**:
   ```bash
   npx jest
   ```

---

## Demo Images
### User Interface
![User Interface](https://orhanguezel.github.io/Kino-Ticket/assets/demo-image.png)

### Admin Panel
![Admin Panel](https://orhanguezel.github.io/Kino-Ticket/assets/admin-panel.png)

---

## Future Development Plans
1. **Integration of the User Interface and Admin Panel**:
   - The Admin Panel will be fully integrated with the user interface.
2. **User Login and Registration**:
   - Users will be able to create accounts and log in.

---

## License
This project is licensed under the **MIT License**.

---

## Contact
Developer: **Orhan Güzel**  
Email: **orhan.guezel@dci-student.org**  
GitHub: **[OrhanGuezel](https://github.com/OrhanGuezel)**
```
