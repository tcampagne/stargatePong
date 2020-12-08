/**
 * Gestion des touches, et fonctions associées
 * @param {type} event
 */
function deplacer(event)
{
    //deplacement joueur
    if (event.keyCode === 39) {
        if (raquetteCamera) {
            deplacerDroiteCamera = true;
        }
        deplacerDroite = true;
        mobileRaquette = true;
        departDroiteRaquette = true;
    }
    if ((event.keyCode === 37)) {
        if (raquetteCamera) {
            deplacerGaucheCamera = true;
        }
        deplacerGauche = true;
        mobileRaquette = true;
        departGaucheRaquette = true;
    }
    //deplacement adversaire
    if (multi) {
        if (event.keyCode === 81) {
            deplacerDroiteAdversaire = true;
            mobileRaquetteAdversaire = true;
            departDroiteRaquetteAdversaire = true;
        }
        if ((event.keyCode === 68)) {
            deplacerGaucheAdversaire = true;
            mobileRaquetteAdversaire = true;
            departGaucheRaquetteAdversaire = true;
        }
    }
    if (event.keyCode === 71) {
        if (inertieOn) {
            inertieOn = false;
        } else {
            inertieOn = true;
            deplacementInertie = 0;
        }
    }
    if (event.keyCode === 73) {
        if (invincible) {
            bouclier.material.color.setHex( 0xffffff );
            invincible = false;
        } else {
            bouclier.material.color.setHex( 0x5858FA );
            invincible = true;
        }
    }
    if (event.keyCode === 32) {
//        chargeRendu = true;
        if (actionMatch === "jeu") {
            actionMatch = "pause";
        } else if (actionMatch === "pause") {
            actionMatch = "jeu";
            document.getElementById("sortieHyperSpace").style.display = "none";
        }
    }
    if ((event.keyCode === 77)) { //m
        if (musicBool === true) {
            musicBool = false;
        } else {
            musicBool = true;
        }
        gestionMusicMenu();
    }
    if (event.keyCode === 97) { //touche 1
        topCamera = false;
        fixeCamera = false;
        raquetteCamera = true;
        positionCamera();
    }
    if (event.keyCode === 96) { //touche 0
        topCamera = false;
        fixeCamera = true;
        raquetteCamera = false;
        positionCamera();
    }
    if (event.keyCode === 98) { //touche 2
        topCamera = true;
        fixeCamera = false;
        raquetteCamera = false;
        positionCamera();
    }
    if (event.keyCode === 72) {
        if (actionMatch === "jeu") {
        actionMatch = "pause";
    }
        document.getElementById("recapTouches").style.display = "block";
    }
    if (event.keyCode === 75) {
        if (bouclierAdversaireActif && actionMatch === "jeu") {
            reduireBouclierAdversaire = true;
        }
    }
    if ((event.keyCode === 40)) {
        raquetteAuCentre = true;
    }
    if (event.keyCode === 74) {
        if (!jokerEnCours) {
            jokerEnCours = true;
            var jokerX = Math.floor((Math.random() * 12) - 6);
            var jokerZ = Math.floor((Math.random() * 24) - 12);
            if (jokerAlea() === 0) {
                jokerSante.position.set(jokerX, 1.5, jokerZ);
                jokerExtra.position.set(0, 50, 0);

            } else {
                jokerExtra.position.set(jokerX, 1.5, jokerZ);
                jokerSante.position.set(0, 50, 0);
            }
            setTimeout(removeJoker, 5000);
        } else {
        }
    }
    if (event.keyCode === 68) {
        if (!chargeRendu) {
            multi = true;
            drawSceneMulti();
            chargeRendu = true;
            displayScene = true;
            document.getElementById("hyperspace").style.display = "none";
            document.getElementById("sortieHyperSpace").style.display = "none";
            playPostPocessing();
            render();
        }
    }
    if (event.keyCode === 79) { //O
        if (!boolObstacles) {
            boolObstacles = true;
            scene.add(obstacleDroite);
            scene.add(obstacleGauche);
        } else {
            boolObstacles = false;
            scene.remove(obstacleDroite);
            scene.remove(obstacleGauche);
        }
    }
}
;

function stopper(event)
{
    if (event.keyCode === 39) {
        if (raquetteCamera) {
            deplacerDroiteCamera = false;
        }
        deplacerDroite = false;
        deplacerDroiteJoueurInertie = true;
        deplacementInertie = 0.15;
        mobileRaquette = false;
        departDroiteRaquette = false;
    }
    if ((event.keyCode === 37)) {
        if (raquetteCamera) {
            deplacerGaucheCamera = false;
        }
        deplacerGauche = false;
        deplacerGaucheJoueurInertie = true;
        deplacementInertie = 0.15;
        mobileRaquette = false;
        departGaucheRaquette = false;
    }
    if (multi) {
        if (event.keyCode === 81) {
            deplacerDroiteAdversaire = false;
            deplacerDroiteAdversaireInertie = true;
            deplacementInertieAdversaire = 0.15;
            mobileRaquetteAdversaire = false;
            departDroiteRaquetteAdversaire = false;
        }
        if ((event.keyCode === 68)) {
            deplacerGaucheAdversaire = false;
            deplacerGaucheAdversaireInertie = true;
            deplacementInertieAdversaire = 0.15;
            mobileRaquetteAdversaire = false;
            departGaucheRaquetteAdversaire = false;
        }
    }
    if (event.keyCode === 68) {
        deplacerDroiteAdversaire = false;
    }
    if ((event.keyCode === 81)) {
        deplacerGaucheAdversaire = false;
    }
    if (event.keyCode === 72) {
        if (actionMatch === "pause") {
            actionMatch = "jeu";
            document.getElementById("sortieHyperSpace").style.display = "none";
        }
        document.getElementById("recapTouches").style.display = "none";
    }
}
;

window.addEventListener('resize', onWindowResize, true);
//window.addEventListener('keydown', keydown);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function positionCamera() {
    var rotationCamera=-0.465;
    var rotationTopCamera=-1.5;
    if (fixeCamera) {
        camera.position.set(0, 10, 20);
        camera.rotation.x=rotationCamera;
    } else if (raquetteCamera) {
        camera.position.set(raquetteJoueur.position.x, raquetteJoueur.position.y + 2, raquetteJoueur.position.z + 4);
        camera.rotation.x=rotationCamera;
    } else if (topCamera) {
        camera.position.set(0, 20, 0);
        camera.rotation.x=rotationTopCamera;
    } else if (animCamera) {
        camera.position.set(0, 10, +50);
        camera.focus = null;
    }
}

function jokerAlea() {
    var jokerRandom = Math.floor((Math.random() * 2));
    return jokerRandom;
}

function removeJoker() {
    jokerExtra.position.set(0, 50, 0);
    jokerSante.position.set(0, 50, 0);
    jokerEnCours = false;
}

function chargerRendu() {
    if (!chargeRendu) {
        document.getElementById("info").style.display = "none";
        document.getElementById("sortirSeul").style.display = "none";
        document.getElementById("sortirAmi").style.display = "none";
        chargeRendu = true;
        displayScene = true;
        document.getElementById("hyperspace").style.display = "none";
        document.getElementById("sortieHyperSpace").style.display = "none";
        playPostPocessing();
        render();
    }
}

function chargerRenduMulti() {
    if (!chargeRendu) {
        document.getElementById("info").style.display = "none";
        document.getElementById("sortirSeul").style.display = "none";
        document.getElementById("sortirAmi").style.display = "none";
        multi = true;
        drawSceneMulti();
        chargeRendu = true;
        displayScene = true;
        document.getElementById("hyperspace").style.display = "none";
        document.getElementById("sortieHyperSpace").style.display = "none";
        playPostPocessing();
        render();
    }
}

function gestionSon() {
    if (musicBool === true) {
        document.getElementById("son").innerHTML = "<img src=\"./src/medias/images/sonCoupe.png\" class=\"imageSon\" alt=\"Modifier le son\"/>";
        musicBool = false;
    } else {
        musicBool = true;
        document.getElementById("son").innerHTML = "<img src=\"./src/medias/images/son.png\" class=\"imageSon\" alt=\"Modifier le son\"/>";
    }
    gestionMusicMenu();
}