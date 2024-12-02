export function showModal(content, modalId = "defaultModal") {
    closeModal(modalId); // Aynı ID'deki modal varsa kapat

    // Overlay ve modal elementleri oluşturuluyor
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.setAttribute("data-modal-id", modalId);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("data-modal-id", modalId);
    modal.innerHTML = `
        ${content}
        <div class="modal-footer">
            <button class="btn-secondary close-button" data-modal-id="${modalId}">Kapat</button>
        </div>
    `;

    // Kapama işlemi için kapatma düğmesine event listener ekleniyor
    modal.querySelector(".close-button").addEventListener("click", () => closeModal(modalId));
    overlay.addEventListener("click", () => closeModal(modalId));

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

export function closeModal(modalId = "defaultModal") {
    // Belirtilen ID'ye sahip modal'ı ve overlay'i bulup kaldır
    const overlay = document.querySelector(`.overlay[data-modal-id="${modalId}"]`);
    const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);

    if (overlay) overlay.remove();
    if (modal) modal.remove();
}
