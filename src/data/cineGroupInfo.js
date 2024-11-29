
export const cineGroupInfo = {
    title: "CineGrup Kinos",
    description: "Ihr vertrauenswürdiger Begleiter für die besten Kinoerlebnisse.",
    logo: "./assets/logo/cinegrup.png",
    footerLogo: "./assets/logo/footer/cinegrup2.png",
    footer: "© 2024 CineGrup, entwickelt von OG.",
    address: "Deutschlandweit verfügbar.",
    design: "OG",
    get footer() {
        return `© 2024 CineGrup, entwickelt von ${ this.design}`;
    },
};

