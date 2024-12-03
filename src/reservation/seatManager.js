export class Seat {
    constructor(row, number) {
        this.row = row; // A, B, C...
        this.number = number; // 1, 2, 3...
        this.selected = false; // Varsayılan olarak seçili değil
        this.element = null; // HTML elementi
    }

    createNode() {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        seatElement.textContent = `${this.row}${this.number}`;
        seatElement.dataset.row = this.row;
        seatElement.dataset.number = this.number;

        // Seçme/toggle işlevi
        seatElement.addEventListener('click', () => {
            this.toggleSelection();
        });

        this.element = seatElement;
        return seatElement;
    }

    toggleSelection() {
        this.selected = !this.selected;
        this.element.classList.toggle('selected');
    }
}

export class SeatManager {
    constructor(container) {
        this.container = container; // Koltukların yerleştirileceği alan
        this.rows = [];
    }

    createSeats(rowsCount, seatsPerRow) {
        for (let i = 0; i < rowsCount; i++) {
            const rowChar = String.fromCharCode(65 + i); // A, B, C...
            const row = [];

            for (let j = 1; j <= seatsPerRow; j++) {
                const seat = new Seat(rowChar, j);
                row.push(seat);
            }

            this.rows.push(row);
        }
    }

    renderSeats() {
        this.container.innerHTML = ""; // Önceki içeriği temizle
        this.rows.forEach((row) => {
            const rowContainer = document.createElement('div');
            rowContainer.classList.add('seat-row');
            row.forEach((seat) => {
                const seatNode = seat.createNode();
                rowContainer.appendChild(seatNode);
            });
            this.container.appendChild(rowContainer);
        });
    }

    getSelectedSeats() {
        const selectedSeats = [];
        this.rows.forEach((row) => {
            row.forEach((seat) => {
                if (seat.selected) {
                    selectedSeats.push(`${seat.row}${seat.number}`);
                }
            });
        });
        return selectedSeats;
    }
}
