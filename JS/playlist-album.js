// VARIABLES
let tabIndex = 0;
let lecteur = document.getElementById('lecteur');
let songduration = document.getElementById('songduration');

/* OLD PLAYLIST
let playlist = [
    './media/Bonobo - Kiara.mp3',
    './media/ReRe.mp3',
    './media/Arctic Monkeys - Fluorescent Adolescent.mp3',
    './media/Gorillaz - Feel Good Inc HD.mp3',
    './media/BLAUDZUN - PROMISES OF NO MANS LAND (Official Audio).mp3',
];
*/

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
    }
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
        card.setAttribute("onclick", "playalbum(" + [i] + ")");

        // Création de l'image
        let cardImage = document.createElement("img");
        cardImage.src = cardData.imageFile;
        cardImage.className = "card-img-top";
        cardImage.alt = "";

        // Création du corps
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Création de l'artiste
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = cardData.artistName;

        // Création du titre
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
    trackInfo(tabIndex)
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
    if (tabIndex < playlistcard.length - 1) {
        lecteur.src = playlistcard[++tabIndex]['audioFile'];        // incrémentation en préfixe pour commencer à la valeur de tabIndex (= 0)
    } else {
        tabIndex = 0;
        lecteur.src = playlistcard[tabIndex]['audioFile'];
    }
    lecteur.autoplay = true;
    trackInfo(tabIndex)
}

function previous() {
    if (tabIndex == 0) {
        tabIndex = playlistcard.length;
    }
    lecteur.src = playlistcard[--tabIndex]['audioFile'];
    lecteur.autoplay = true;
    trackInfo(tabIndex)
}

function playalbum(tabIndex) {
    // if (tabIndex == 0) {
    //     lecteur.src = playlistcard[0]['audioFile'];
    // } else {
    lecteur.src = playlistcard[tabIndex]['audioFile'];
    // }
    lecteur.play();
    trackInfo(tabIndex)
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

// AFFICHAGE DYNAMIQUE DES INFOS
function trackInfo(tabIndex) {
    document.getElementById('artist-name').textContent = playlistcard[tabIndex]['artistName']
    document.getElementById('track-name').textContent = playlistcard[tabIndex]['songName']

    // Affichage de la durée de la piste à l'instant T
    let trackCurrent = setInterval(function () {
        let mins = Math.floor(lecteur.currentTime / 60);            // On utilise math.floor pour obtenir une durée en minutes
        let secs = Math.floor(lecteur.currentTime % 60);            // On utilise % pour obtenir le restant en secondes
        if (secs < 10) {    // Entre 0 et 9sec, on affiche un 0 devant pour garder un format à 2 chiffres              
            secs = '0' + String(secs);
        }
        if (mins < 10) {    // Même chose pour les musiques (pour les fans de Tools...)
            mins = '0' + String(mins);
        }
        document.getElementById('track-current').innerHTML = mins + ':' + secs;
    }, 1000)                 // setInterval = Actualisation en ms (ici 1s)

    // Affichage de la durée totale de la piste
    let trackEnd = setTimeout(function () {
        let mins = Math.floor(lecteur.duration / 60);
        let secs = Math.floor(lecteur.duration % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }
        if (mins < 10) {
            mins = '0' + String(mins);
        }
        document.getElementById('track-end').innerHTML = mins + ':' + secs;
    }, 100)                 // setTimeout = exécution du code après 0.1s
}
