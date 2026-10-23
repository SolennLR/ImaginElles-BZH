
import randonneeImg1 from "../assets/randonnee1.jpg";
import convivialeImg from "../assets/conviviale.jpg";
import marcheSportiveImg from "../assets/marche_sportive.jpg";
import peintureImg from "../assets/peinture.jpg";
import modelageImg from "../assets/modelage.jpg";
import monotypeImg from "../assets/monotype.jpg";
import tapisserieImg from "../assets/tapisserie.jpg";
import sculptureImg from "../assets/sculpture.jpg";
import lorientaiseImg from "../assets/lorientaise.jpg";
import lorientaise1 from "../assets/27535.jpg";
import lorientaise2 from "../assets/27527.jpg";
import marcheSportive1 from "../assets/27472.jpg";
import ellesDansentImg from "../assets/ellesDansent.jpg";
import jeuImg from "../assets/jeu.png";
import spectacleImg from "../assets/IMG-20261021-WA0000.jpg";


export const activities = [
    {
        id: "tapisserie-2026-11-21",
        title: 'Atelier créatif',
        date: "2026-11-21",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Samedi 21 novembre 2026 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-21-11-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 107 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "jeux-2026-11-21",
        title: 'Activité jeux',
        date: "2026-11-21",
        description: 'Jeux de société, de cartes de dés...',
        color: "#24408E",
        image: jeuImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Sylvie / Nathalie - Tél : 06 50 23 77 97",
        who: "Ouvert à toutes les adhérentes.",
        when: "Samedi 21 novembre 2026 - 14h30 à 18h30",
        where: "Le Bigbang bar - 110 rue de Bénodet 29000 Quimper",
        price: "Gratuit. 1 consommation minimum à commander au bar qui nous accueille",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/activite-jeux-du-21-11-2026",

        details:
        "Rdv à 14h30 au BigBangBar à Quimper.pour un après-midi ludique dans un endroit dédié à l'activité Jeu.\n" +
        "L'idée de cet après-midi est de se réunir, et passer un moment convivial en plein automne (c'est quand même beaucoup mieux que de regarder les feuilles tomber !!)\n" +
        "Cet endroit bénéficie d'une grande salle lumineuse à l'étage où il est possible de commander différentes boissons et de se restaurer. Il met aussi à disposition de nombreux jeux de société.\n" +
        "Une personne du BigBangBar peut nous guider dans nos choix, être force de propositions et d'inspirations. Elle pourra bien sûr nous aider et nous expliquer les règles si le besoin se présente.\n" +
        "Chaque participante peut bien sûr emmener un jeu qu'elle affectionne et le proposer au groupe. C'est même recommandé ! \n" +
        "Selon le nombre d'inscrites, il sera possible aussi de jouer à plusieurs jeux (jeu de société, jeu de carte, jeu de dés, etc), organiser plusieurs tables, selon les préférences de chacune. \n" +
        "\n" +
        "Possible selon les inspirations de prolonger par un apero, et/ou un resto aux alentours.\n"
    },
    {
        id: "impro-2026-11-21",
        title: "Activité spectacle",
        date: "2026-11-21",
        description: "Théâtre d'impro",
        color: "#24408E",
        image: spectacleImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Sylvie",
        who: "Ouvert à toutes, adhérentes et non adhérentes.",
        when: "Samedi 21 novembre 2026 - 20h30 à 22h30",
        where: "Terrain Blanc - Boulevard de Bretagne 29000 Quimper",
        price: "9€ plein, 7€ réduit, gratuit -12 ans",
        helloasso: "https://www.billetweb.fr/match-dimprovisation-quimper-vs-nantes?fbclid=IwVERDUAVF5E9leHRuA2FlbQIxMABwZG9mBXNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHrLaL4yY-hvU3y4MKZYdrn9LXev7PZOJxFaRPZeNxgZMyPgLPw9xQGJtSJOV_aem_6QXqeBsolirJW312fUiTmw",

        details:
            " Le premier des 2 matchs de la saison se jouera face à NANTES ! Devant un public de 260 personnes et la salle surchauffée (des bonnes ondes) du Terrain Blanc !\n" +
            " \n" +
            "On sort la patinoire, les maillots, l'arbitre aiguise les thèmes, donne du sifflet et joue sur les règles !\n" +
            " \n" +
            "En musique, et sous l'animation du maître de cérémonie chaque impro sera suivie par le vote du public !\n"
    },
    {
        id: "tapisserie-2026-10-29",
        title: 'Atelier créatif',
        date: "2026-10-29",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Jeudi 29 octobre 2026 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-29-10-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 11 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2026-11-24",
        title: 'Atelier créatif',
        date: "2026-11-24",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Mardi 24 novembre 2026 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-24-11-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2026-12-12",
        title: 'Atelier créatif',
        date: "2026-12-12",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Samedi 12 décembre 2026 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-12-12-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2026-12-14",
        title: 'Atelier créatif',
        date: "2026-12-14",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Lundi 14 décembre 2026 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-14-12-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2027-01-23",
        title: 'Atelier créatif',
        date: "2027-01-23",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Samedi 23 janvier 2027 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-23-01-2027",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2027-01-25",
        title: 'Atelier créatif',
        date: "2027-01-25",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Lundi 25 janvier 2027 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-25-01-2027",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2027-02-11",
        title: 'Atelier créatif',
        date: "2027-02-11",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Jeudi 11 février 2027 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-11-02-2027",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2027-02-27",
        title: 'Atelier créatif',
        date: "2027-02-27",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Samedi 27 février 2027 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-27-02-2027",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2027-03-06",
        title: 'Atelier créatif',
        date: "2027-03-06",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Samedi 6 mars 2027 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-6-03-2027",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "tapisserie-2027-03-12",
        title: 'Atelier créatif',
        date: "2027-03-12",
        description: 'Activité tapisserie',
        color: "#008026",
        image: tapisserieImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Elise / Véro - Tél : 06 74 84 90 92",
        who: "5 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Vendredi 12 mars 2027 - 9h30 à 17h30",
        where: "Maisons des associations - Lorient",
        price: "50 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-tapisserie-du-12-03-2027",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 9h30 pour un atelier tapisserie. Durée : 8h00.\n" +
            "\n" +
            "L'atelier s'adresse à toutes les personnes débutantes ou non. La réfection des sièges est réalisée en graniture mousse. Pour une 1ère expérience, Elise vous conseille de privilégier un petit projet : chaise, petite assise, tabouret...\n" +
            "\n" +
            "Préparer son siège en amont : Le dégarnissage, qui consiste à retirer le tissu et les anciennes matières de garniture, est une étape qui peut être assez longue. La réaliser en amont permet de gagner du temps le jour de l'atelier et de se consacrer à la réfection du siège.\n" +
            "\n" +
            "Pendant l'atelier, Elise prête le matériel nécessaire aux différents travaux. Les fournitures nécessaires à la réfection de votre siège sont à votre charge et les quantités nécessaires à votre projet sont définies ensemble en début d'atelier. Le tissu et la finition sont également à votre charge. Il n'y a aucune obligation d'acheter les fournitures auprès de l'atelier : vous êtes libre de choisir votre tissu et vos fournisseurs.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "libre-2026-09-24",
        title: 'Atelier créatif',
        date: "2026-09-24",
        description: 'Activité manuelle',
        color: "#008026",
        image: modelageImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Véro - Tél : 06 74 84 90 92",
        who: "Réservé aux adhérentes",
        when: "Jeudi 24 septembre 2026 - 14h00 à 18h00",
        where: "Maisons des associations - Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/activite-manuelle-du-24-09-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 233 à partir de 14h00 pour un atelier modelage ou une activité manuelle libre. Durée : environ 4h00.\n"
    },
    {
        id: "monotype-2026-11-15",
        title: 'Atelier créatif',
        date: "2026-11-15",
        description: 'Atelier monotype / impression sur papier',
        color: "#008026",
        image: monotypeImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Corinne / Véro - Tél : 06 74 84 90 92",
        who: "Maximum 10 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Dimanche 15 novembre 2026 - 14h00 à 18h00",
        where: "A définir",
        price: "30 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-monotype-du-15-11-2026",

        details:
            "Rdv à 14h00 pour réaliser des dessins en impression à l'encre de gravure. Durée : environ 4h00.\n" +
            "\n" +
            "C'est un temps de création que vous propose Corinne. L'atelier s'adresse à toutes les personnes débutantes ou non.\n" +
            "\n" +
            "Reproductions d'après des oeuvres (paysage, personnages...) ou des objets (coquillages, feuille...) ou avec notre propre imagination.\n" +
            "\n" +
            "Vous devez apporter un carnet à dessin, crayon gris et gomme. Corinne fournit le papier d'impression, l'encre et les outils."
    },
    {
        id: "sculpture-2027-01-16",
        title: 'Atelier créatif',
        date: "2027-01-16",
        description: 'Atelier modelage / sculpture',
        color: "#008026",
        image: sculptureImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Corinne / Véro - Tél : 06 74 84 90 92",
        who: "Maximum 10 adhérentes - ❌ S'il n'y a pas 5 inscrites, l'atelier sera annulé.",
        when: "Samedi 16 & Dimanche 17 janvier 2027 - 10h00 à 17h00",
        where: "A définir",
        price: "110 €",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-sculpture-des-16-17-01-2027",

        details:
            "Rdv à 10h00 pour la reproduction d'une tête . Durée : 2 jours.\n" +
            "\n" +
            "C'est un temps de création que vous propose Corinne. Une immersion dans la matière. L'atelier s'adresse à toutes les personnes débutantes ou non.\n" +
            "\n" +
            "Reproductions d'après d'après des plâtres de l'école des Beaux-Arts de Rennes. Etudes deu dessin et prise en compte de la morphologie, des muscles et des os.\n" +
            "\n" +
            "Vous devez apporter un carnet à dessin, crayon gris, gomme et un carton ou cageot pour transporter vos sculptures. Corinne fournit la terre et mise à disposition d'outils de modelage.\n" +
            "\n" +
            "Vous devez aussi prévoir un pique-nique pour le midi."
    },
    {
        id: "marche-2026-10-16",
        title: 'Marche sportive',
        date: "2026-10-16",
        description: 'Marche sportive',
        color: '#E40303',
        image: marcheSportiveImg,
        presentationImages: [
            marcheSportive1,
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Nathalie - Tél : 06 50 23 77 97",
        who: "Maximum 15 adhérentes",
        when: "Vendredi 16 octobre 2026 - 17h30 à 18h30",
        where: "Base nautique du ter - Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/marche-sportive-du-16-10-2026",

        details:
            "Rdv à la base nautique du Ter à Lorient - rue du ter - à 17h30 précise pour une marche sportive. Prévoir chaussures et tenue adaptées à l'activité. Durée : environ 1h00.\n" +
            "\n" +
            "Vous serez accompagnées de Nathalie votre organisatrice et son compagnon Oslo 🐶\n" +
            "\n" +
            "🐶 Les chiens sont les bienvenus mais sous la responsabilité de leur maîtresse.\n" +
            "\n" +
            "❌ Annulation en cas d'intempéries."

    },
    {
        id: "marche-2026-11-13",
        title: 'Marche sportive',
        date: "2026-11-13",
        description: 'Marche sportive',
        color: '#E40303',
        image: marcheSportiveImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Nathalie - Tél : 06 50 23 77 97",
        who: "Maximum 15 adhérentes",
        when: "Vendredi 13 novembre 2026 - 17h30 à 18h30",
        where: "Base nautique du ter - Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/marche-sportive-du-13-11-2026",

        details:
            "Rdv à la base nautique du Ter à Lorient - rue du ter - à 17h30 précise pour une marche sportive. Prévoir chaussures et tenue adaptées à l'activité. Durée : environ 1h00.\n" +
            "\n" +
            "Vous serez accompagnées de Nathalie votre organisatrice et son compagnon Oslo 🐶\n" +
            "\n" +
            "🐶 Les chiens sont les bienvenus mais sous la responsabilité de leur maîtresse.\n" +
            "\n" +
            "❌ Annulation en cas d'intempéries."

    },
    {
        id: "marche-2026-10-02",
        title: 'Marche sportive',
        date: "2026-10-2",
        description: "1er rdv de l'asso à la base nautique du Ter",
        color: '#E40303',
        image: marcheSportiveImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Nathalie - Tél : 06 50 23 77 97",
        who: "Maximum 15 adhérentes",
        when: "Vendredi 2 octobre 2026 - 17h00 à 18h00",
        where: "Base nautique du ter - Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/marche-sportive",

        details:
            "Rdv à la base nautique du Ter à Lorient - rue du ter - à 17h00 précise pour une marche sportive pour un 1er rdv de l'association. Prévoir chaussures et tenue adaptées à l'activité. Durée : environ 1h00.\n" +
            "\n" +
            "Vous serez accompagnées de Nathalie votre organisatrice et son compagnon Oslo 🐶\n" +
            "\n" +
            "🐶 Les chiens sont les bienvenus mais sous la responsabilité de leur maîtresse.\n" +
            "\n" +
            "❌ Annulation en cas d'intempéries."

    },
    {
        id: "aquarelle-2026-11-13",
        title: 'Atelier créatif',
        date: "2026-11-13",
        description: 'Atelier Aquarelle peinture en salle.',
        color: "#008026",
        image: peintureImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Lise - Tél : 06 68 00 34 77",
        who: "Maximum 10 adhérentes",
        when: "Vendredi 13 novembre 2026 - 14h00 à 17h00",
        where: "Maison de l'association - Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/atelier-aquarelle-du-13-11-2026",

        details:
            "Rdv à la maison des associations de Lorient - 5 place Louis Bonneaud - en salle 123 à 14h00 pour un atelier de création artistique autour de la peinture aquarelle. Durée : 3h00.\n" +
            "\n" +
            "Pour le matériel : prévoir quelques feuilles type Canson et un kit peinture aquarelle de chez Action font l'affaire."
    },
    {
        id: "rando-2027-04-25",
        title: 'Randonnée',
        date: "2027-04-25",
        description: 'Ria Garden Womens',
        color: '#FF8C00',
        image: randonneeImg1,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Juliette - Tél : 06 09 27 55 56",
        who: "Ouvert à toutes les adhérentes",
        when: "Dimanche 25 avril 2027 - 10h00",
        where: "Ria d'Etel côté Nostang",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/...",

        details:
            "🤸Départ 10h : au bout de la rue de la côte à Nostang.\n" +
            "Passez le lieu-dit St Ernan, jusqu'à la rivière et le petit parking ombragé.\n" +
            "\n" +
            "🚶‍♀️Marche d'environ 2h sur le sentier côtier de la Ria d'Etel. \n" +
            "Circuit de St Ernan au Gouarde, boucle de 7km.\n" +
            "\n" +
            "🍽️ Pour celles qui souhaitent rester déjeuner : pique-nique dans mon jardin (j'habite à proximité de la balade).\n" +
            "Chacune ramène de quoi se restaurer.\n" +
            "\n" +
            "🥳 🎲🛝 Après-midi récréative.\n" +
            "\n" +
            "🐶🎠 Animaux et enfants bienvenus.\n" +
            "\n" +
            "❌ Annulation en cas d'intempéries."
    },
    {
        id: "conviviale-2026-10-30",
        title: 'Soirée',
        date: "2026-10-30",
        description: "Elles dansent",
        color: "#24408E",
        image: ellesDansentImg,
        presentationImages: [
            ellesDansentImg,
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Juliette - Tél : 06 09 27 55 56",
        who: "Ouvert à toutes les adhérentes et non adhérentes",
        when: "Vendredi 30 octobre 2026 de 19h à 02h",
        where: "Le Jameson - 48 Rue Jules Simon - Lorient",
        price: "5 € seulement, incluant ta conso (avec ou sans alcool) et ton ticket de tombola",
        helloasso: "https://www.helloasso.com/associations/parents-an-oriant/evenements/elles-dansent?fbclid=IwVERDUAU5uWtleHRuA2FlbQIxMABwZG9mBXNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHv4CHsROxpsN9zfvONgJgr_wNnfD-4Lyy6ocPjtg6_Eoc9BhYqJjtJ4vQOQj_aem_5dLnONO5DBjKieK1USoURw",

        details:
            " Elles dansent - Édition #4\n" +
            "\n" +
            "Une soirée réservée aux filles, aux femmes, aux meufs. \n" +
            "\n" +
            "Celle que t'es, celle que t'as envie d'être le temps d'une nuit, sans jugement, sans prise de tête. \n" +
            "\n" +
            "Dress code : witch, please 💅🖤\n" +
            "\n" +
            "Au programme : La Lucha pour nous régaler, Gyny aux platines, Anne-Claire Flécher pour immortaliser la soirée, J&M rêve de prestige pour la déco et toi, au centre. \n" +
            "\n" +
            "Ce soir-là, tu existes pour toi.\n" +
            "Et c'est tout ce qui compte.\n" +
            "\n" +
            "La billetterie est ouverte : n’attend pas pour nous rejoindre !"
    },
    {
        id: "conviviale-2026-10-24",
        title: "Soirée",
        date: "2026-10-24",
        description: "La conviviale de l'asso",
        color: "#24408E",
        image: convivialeImg,
        presentationImages: [
            convivialeImg,
            // autre photo éventuellement
        ],
        archiveImages: [
            // photos ajoutées après l'activité
        ],
        referente : "Juliette, Monique et Véro",
        who: "Ouvert à toutes les adhérentes et non adhérentes",
        when: "Samedi 24 octobre 2026 à partir de 19h",
        where: "Barzh bar - 9 Rue Victor Masse - Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/imagin-elles/evenements/soiree-conviviale-du-24-10-2026-1",

        details:
            "Imagin'Elles vous invite à passer un début de soirée entre femmes au Barzh Bar à Lorient.\n" +
            "Une salle à l'étage nous est réservée de 19h à 20h30.\n" +
            "Rencontres, échanges et surtout le plaisir de se retrouver dans une ambiance chaleureuse et bienveillante.\n" +
            "L'occasion de faire connaissance, de créer du lien et de passer un agréable moment ensemble. Tout simplement.\n" +
            "\n" +
            "La soirée se prolongera ensuite avec un DJ set, tout public.\n" +
            "\n" +
            "Au plaisir de se retrouver bientôt.\n" +
            "\n" +
            "L'équipe Imagin'Elles."
    },
    {
        id: "lorientaise-2026-10-04",
        title: 'La Lorientaise',
        date: "2026-10-4",
        description: "Participation à la Lorientaise",
        color: "#FD6C9E",
        image: lorientaiseImg,
        presentationImages: [
            // autre photo éventuellement
        ],
        archiveImages: [
            lorientaiseImg,
            lorientaise1,
            lorientaise2,
            // photos ajoutées après l'activité
        ],
        referente : "Nathalie",
        who: "Ouvert à toutes les adhérentes et non adhérentes",
        when: "Dimacnhe 4 octobre 2026",
        where: "Centre ville de Lorient",
        price: "Gratuit",
        helloasso: "https://www.helloasso.com/associations/...",

        details:
            "L'association Imagin'Elles est présente à la Lorientaise 🩷🩷🩷. Certaines ont réalisé la course et d'autres la marche. Bravo les filles 👏"
    },


]