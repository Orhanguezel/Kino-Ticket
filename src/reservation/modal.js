export function showModal(contentHtml) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <button id="closeModalButton" class="btn-secondary" style="float: right;">X</button>
        ${contentHtml}
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Göster
    overlay.style.display = "block";
    modal.style.display = "block";

    // Kapatma işlemi
    document.getElementById("closeModalButton").addEventListener("click", () => {
        overlay.style.display = "none";
        modal.style.display = "none";
        overlay.remove();
        modal.remove();
    });

    // Arka plan tıklamasında kapatma
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        modal.style.display = "none";
        overlay.remove();
        modal.remove();
    });
}

// Film seçimi sırasında modal örneği
export function startReservation(cinemaId) {
    // ... mevcut kodlar

    // Radyo butonlarına olay dinleyicisi ekle
    const filmRadios = document.querySelectorAll(".film-radio");
    filmRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const filmId = parseInt(e.target.value, 10);
            if (!filmId) {
                alert("Geçersiz film seçimi!");
                return;
            }

            // Modal içeriği
            const modalContent = `
                <h3>Salon für den Film</h3>
                <p>Film ID: ${filmId}</p>
                <button id="proceedToSalon" class="btn-primary">Weiter zur Salon-Auswahl</button>
            `;
            showModal(modalContent);

            // Salona geçiş
            document.getElementById("proceedToSalon").addEventListener("click", () => {
                showSalonSelection(cinemaId, filmId);
                document.querySelector(".overlay").remove();
                document.querySelector(".modal").remove();
            });
        });
    });
}
