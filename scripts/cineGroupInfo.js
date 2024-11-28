export const cineGroupInfo = {
    logo: "./assets/logo/cinegrup.png",
    footerLogo: "./assets/logo/footer/cinegrup2.png",
    title: "CineGrup - Ihr Kinoerlebnis",
    address: "Berlin",
    description: "Willkommen bei CineGrup! Wählen Sie ein Kino aus, um loszulegen.",
    design: "OG",
    get footer() {
        return `© 2024 CineGrup. Alle Rechte vorbehalten. ${this.design}`;
    },
};
