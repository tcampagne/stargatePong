/**
 * Fichier regroupant les fonctions de gestion des actions de jeu
 */
function entreDeux() {
    ballon.position.z = 0;
    ballon.position.x = 0;
    axeBallonX = 0;
    attaque = true;
    rechargerBouclier = true;
    rechargerBouclierAdversaire = true;
    scene.add(bouclier);
    scene.add(bouclierAdversaire);
    if (scoreAdversaire >= 3) {
        document.getElementById("sortieHyperSpace").innerHTML = "Victoire de l'adversaire";
        actionMatch = "menu";
    } else if (scoreJoueur >= 3) {
        if (manche === 1) {
            document.getElementById("sortieHyperSpace").innerHTML = "Victoire de SG1 sur Ra. L'ennemi 1 est vaincu !";
            scene.remove(ennemy1);
        } else if (manche === 2) {
            document.getElementById("sortieHyperSpace").innerHTML = "Victoire de SG1 sur Baal. L'ennemi 2 est vaincu !";
            scene.remove(ennemy2);
        } else {
            document.getElementById("sortieHyperSpace").innerHTML = "Victoire de SG1 sur Apophis. L'ennemi 3 est vaincu. T'es le meilleur !";
            scene.remove(ennemy3);
        }
        document.getElementById("sortieHyperSpace").style.display = "block";
        actionMatch = "menu";
    } else {
        dureeCompteur = 3;
        actionMatch = 'transitionManche';
    }

}

function passe() {
    if (attaque === false) {
        attaque = true;
    } else {
        attaque = false;
    }
}
function rebond() {
    axeBallonX = -axeBallonX;
}

function axePasse(distance) {
    axeBallonX = distance / 4;
}
;

function enAvant() {
    actionMatch = "jeu";
}