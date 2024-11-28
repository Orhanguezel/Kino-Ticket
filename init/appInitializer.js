import { updateUI } from "../controllers/uiController.js";

export function init() {
    document.addEventListener("DOMContentLoaded", () => {
        const savedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
        updateUI(savedCinema || null);
    });
}

init();
