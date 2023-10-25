// VARIABLES
let swapvar = 0;                    // variable dont la valeur initiale est 0
let lecteur = document.getElementById('lecteur');
let songduration = document.getElementById('songduration');
// let playlist = [
//     './media/Bonobo - Kiara.mp3',
//     './media/ReRe.mp3',
//     './media/Arctic Monkeys - Fluorescent Adolescent.mp3',
//     './media/Gorillaz - Feel Good Inc HD.mp3',
//     './media/BLAUDZUN - PROMISES OF NO MANS LAND (Official Audio).mp3',
// ];
let playlistcard = [
    {
        audioFile: './media/Bonobo - Kiara.mp3',
        artistName: 'Bonobo',
        songName: 'Kiara',
        imageFile: './media/album-bonobo.jpg'
    },
    {
        audioFile: './media/ReRe.mp3',
        artistName: 'Asian Kung-Fu Generation',
        songName: 'Re:re',
        imageFile: './media/Re_Re_Asian_Kung-Fu_Generation.jpg'
    },
    {
        audioFile: './media/Arctic Monkeys - Fluorescent Adolescent.mp3',
        artistName: 'Arctic Monkeys',
        songName: 'Fluorescent Adolescent',
        imageFile: './media/Fluorescent_Adolescent.JPG'
    },
    {
        audioFile: './media/Gorillaz - Feel Good Inc HD.mp3',
        artistName: 'Gorillaz',
        songName: 'Feel Good Inc',
        imageFile: './media/gorillaz-demon-days.jpg'
    },
    {
        audioFile: './media/BLAUDZUN - PROMISES OF NO MANS LAND (Official Audio).mp3',
        artistName: 'Blaudzun',
        songName: "Promises of no man's land",
        imageFile: './media/album-blaudzun.jpg'
    },
]

let cardContainer = document.getElementById("cardcontainer");

// FONCTIONS
function init() {

    // Création des cartes
    for (let i = 0; i < playlistcard.length; i++) {
        let cardData = playlistcard[i];

        // Création d'un élément carte
        let card = document.createElement("div");
        card.className = "card";
        card.setAttribute("onclick", "playalbum(" + [i] + ")"); // Assurez-vous que playalbum(i) est correctement défini

        // Création de l'image
        let cardImage = document.createElement("img");
        cardImage.src = cardData.imageFile;
        cardImage.className = "card-img-top";
        cardImage.alt = "";

        // Création du corps
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Création du titre + artiste
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = cardData.artistName;

        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = cardData.songName;

        // Ajout des éléments de la carte au conteneur de carte
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardImage);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    }





    // lecteur.src = playlist[0];
    lecteur.src = playlistcard[0]['audioFile']
}

function play() {
    if (lecteur.paused) {
    lecteur.play();
    } else {
        lecteur.pause();
    }
}

function voldown() {
    if (lecteur.volume.toFixed(1) > 0) {        // .toFixed(1) pour arrondir à 0.1
        lecteur.volume -= 0.1;                  // = lecteur.volume - (0.1)
        document.getElementById('volume').value = lecteur.volume;
    }
}

function volup() {
    if (lecteur.volume.toFixed(1) < 1) {
        lecteur.volume += 0.1;                  // = lecteur.volume + (0.1)
        document.getElementById('volume').value = lecteur.volume;
    }
}

function volchange() {
    lecteur.volume = document.getElementById('volume').value;
}

function next() {


// COUILLE PRESENTE A FAIRE DEMAIN COURAGE
    lecteur.src = playlistcard[++swapvar]['audioFile'];          // incrémentation en préfixe pour commencer à la valeur de swapvar (= 0)
    if (swapvar === playlistcard.length) {
        swapvar = 0;
        lecteur.src = playlistcard[swapvar]['audioFile'];
    }
    lecteur.play();




}

function previous() {
    if (swapvar === 0) {
        swapvar = playlistcard.length;
    }
    lecteur.src = playlistcard[--swapvar]['audioFile'];
    lecteur.play()
}

function playalbum(swapvar) {
    if (swapvar === 0) {
        lecteur.src = playlistcard[0]['audioFile'];            /////// 
    } else {
        lecteur.src = playlistcard[swapvar++]['audioFile'];
    }
    lecteur.play()
}

// Fonction permettant de changer la durée de ma musique
function duration() {
    lecteur.currentTime = songduration.value;       // durée de ma musique = valeur de ma barre 
}

// Fonction liant ma barre de durée et la durée de ma musique
function progression() {
    songduration.value = lecteur.currentTime;
}

// Fonction permettant d'attribuer l'attribut max (100 par défaut) à la valeur de la durée de ma musique en SECONDES (ex:230, 240 etc)
function changeduration() {
    songduration.setAttribute("max", lecteur.duration);
}

