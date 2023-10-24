let lecteur = document.getElementById('lecteur')
let playlist = new Array(
    './media/Bonobo - Kiara.mp3',
    './media/ReRe.mp3',
    './media/Arctic Monkeys - Fluorescent Adolescent.mp3',
)
let playlistdeux = new Array(
    './media/Bonobo - Kiara.mp3',
    './media/ReRe.mp3',
    './media/Arctic Monkeys - Fluorescent Adolescent.mp3',
)




function init() {
    lecteur.src = playlist[0];
}

// function precedent() {
//     for (let i = 0; i < playlist.length; i++) {
//         playlist[i] = playlist[i + 1];
//         console.log([i])
//         if (i = playlist.length) {
//             playlist[i] = playlist[0];
//             console.log([i])
//         }
//     }
//     lecteur.src = playlist[0];
// }

function suivant() {
    for (let i = 0; i < playlist.length; i++) {
        
        if (i < playlist.length-1) {
            playlist[i] = playlist[i+1];
            // console.log([i])
            console.log(playlist);
        } else {
            playlist[i] = playlist[0];
            // console.log([i])
            // console.log(playlist);
        }

        lecteur.src = playlist[0];
    }
    // console.log(playlist);
}

function lecture() {
    lecteur.play();
}

function volmoins() {
    lecteur.volume = lecteur.volume - (0.1);
}

function volplus() {
    lecteur.volume = lecteur.volume + (0.1);
}

