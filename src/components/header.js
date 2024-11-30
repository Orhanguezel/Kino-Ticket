import { cineGroupInfo } from "../data/cineGroupInfo.js";
import { showCartModal } from "../reservation/showCartModal.js";

export function loadHeader(cinema = null) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <div class="header-content">
            <div class="logo-title">
                <img src="${cinema ? cinema.logo : cineGroupInfo.logo}" alt="${cinema ? cinema.name : "CineGrup"}">
                <h1>${cinema ? cinema.name : cineGroupInfo.title}</h1>
            </div>
            <nav class="navbar">
                <ul>
                    <li><a href="#" id="homeLink">Ana Sayfa</a></li>
                    <li><a href="#" id="cartLink">Sepetim</a></li>
                </ul>
            </nav>
        </div>
    `;

    // Event listeners for navigation links
    document.getElementById("homeLink").addEventListener("click", (e) => {
        e.preventDefault(); // Varsayılan link davranışını engelle
        loadHome(); // CineGrup ana sayfasını yükle
    });

    document.getElementById("cartLink").addEventListener("click", (e) => {
        e.preventDefault(); // Varsayılan link davranışını engelle
        showCartModal(); // Sepet modalını göster
    });
}
