/**
 * Toutes les fonctions de gestion des sons
 * @type Howl
 */
var cheminMusic="./src/";
var musicM;
function musicMenu() {
    musicM = new Howl({
        urls: [cheminMusic+'medias/sounds/musicMenu.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.2,
        onend: function () {
            musicJeu();
        }
    });
}
;
function musicJeu() {
    musicM = new Howl({
        urls: [cheminMusic+'medias/sounds/stargateMusic.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.2
    });
}
;
function gestionMusicMenu() {
    if (musicBool) {
        musicM.play();
    } else {
        musicM.stop();
    }
}


function sonCollision() {
    var sonCollision = new Howl({
        urls: [cheminMusic+'medias/sounds/sonCollision.wav'],
        autoplay: false,
        loop: true,
        volume: 0.2
    });
    sonCollision.play();
}
;

function sonBouclier() {
    var sonBouclier = new Howl({
        urls: [cheminMusic+'medias/sounds/sonBouclier.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.2
    });
    sonBouclier.play();
}
;

function sonScore() {
    var sonScore = new Howl({
        urls: [cheminMusic+'medias/sounds/sonScore.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.2
    });
    sonScore.play();
}
;