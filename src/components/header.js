import { cineGroupInfo } from "../data/cineGroupInfo.js";

export function loadHeader(cinema = null) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <img src="${cinema ? cinema.logo : cineGroupInfo.logo}" alt="${cinema ? cinema.name : "CineGrup"}">
        <h1>${cinema ? cinema.name : cineGroupInfo.title}</h1>
    `;
}
