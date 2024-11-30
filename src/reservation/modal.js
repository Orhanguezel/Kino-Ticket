export function showModal(contentHtml) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-header">
            <button id="closeModalButton" class="btn-secondary">X</button>
        </div>
        <div class="modal-body">
            ${contentHtml}
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Modalı göster
    overlay.style.display = "block";
    modal.style.display = "block";

    // Modalı kapatma işlevi
    const closeModal = () => {
        overlay.style.display = "none";
        modal.style.display = "none";
        overlay.remove();
        modal.remove();
    };

    document.getElementById("closeModalButton").addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
}
