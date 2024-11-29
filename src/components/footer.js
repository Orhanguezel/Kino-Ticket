import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadFooter(cinema = null) {
    const footer = document.getElementById("footer");
    const ogUrl = "https://orhanguezel.github.io/personal/";

    footer.innerHTML = `
        <img src="${cinema ? cinema.footerLogo : cineGroupInfo.footerLogo}" alt="${cinema ? cinema.name : 'CineGrup'}">
        <p>${cinema ? cinema.address : cineGroupInfo.address}</p>
        <p>
            ${cinema ? cinema.description : cineGroupInfo.footer.replace("OG", `<a href="${ogUrl}" target="_blank" rel="noopener noreferrer">OG</a>`)}
        </p>
    `;
}

