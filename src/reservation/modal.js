export function showModal(content) {
    const existingModal = document.querySelector(".modal");
    if (existingModal) {
        console.warn("Modal zaten açık. Mevcut modal kapatılıyor.");
        existingModal.remove(); // Eski modalı kaldır
        document.querySelector(".overlay")?.remove(); // Overlay'i kaldır
    }

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = content;

    document.body.appendChild(modal);

    overlay.addEventListener("click", () => {
        closeModal();
    });
}

export function closeModal() {
    document.querySelector(".modal")?.remove();
    document.querySelector(".overlay")?.remove();
}
