/**
 * Fichier regroupant les fonctions de gestion des collisions (murs, raquettes, obstacles, jokers...
 */
function checkCollisionRaquettes()
{
    if ((ballon.position.z <= raquetteJoueur.position.z + profondeurRaquette + rayonBallon
            && ballon.position.z >= raquetteJoueur.position.z - profondeurRaquette - rayonBallon))
    {
        if (attaque === false) {
            if (ballon.position.x <= raquetteJoueur.position.x + (tailleRaquette + rayonBallon) / 2
                    && ballon.position.x >= raquetteJoueur.position.x - (tailleRaquette + rayonBallon) / 2)
            {
                passe();
                sonCollision();
                if (raquetteJoueur.position.x === -5.551115123125783e-17) {
                    raquetteJoueur.position.x = 0;
                }
                distance = ballon.position.x - raquetteJoueur.position.x;
                if (mobileRaquette) {
                    if (departDroiteRaquette) {
                        distance = distance * 4;
                    }
                    if (departGaucheRaquette) {
                        distance = distance * -4;
                    }
                }
                axePasse(distance);
                vitesseBallonZ += 0.01;
            }
        }
    } else {
        if (ballon.position.x <= raquetteAdversaire.position.x + (tailleRaquette + rayonBallon) / 2
                && ballon.position.x >= raquetteAdversaire.position.x - (tailleRaquette + rayonBallon) / 2
                && ballon.position.z <= raquetteAdversaire.position.z + profondeurRaquette + rayonBallon
                && ballon.position.z >= raquetteAdversaire.position.z - profondeurRaquette - rayonBallon)
        {
            passe();
            sonCollision();
            if (raquetteAdversaire.position.x === -5.551115123125783e-17) {
                raquetteAdversaire.position.x = 0;
            }
            distance = ballon.position.x - raquetteAdversaire.position.x;
            if (mobileRaquetteAdversaire) {
                if (departDroiteRaquetteAdversaire) {
                    distance = distance * 4;
                }
                if (departGaucheRaquetteAdversaire) {
                    distance = distance * -4;
                }
            }
            axePasse(distance);
            vitesseBallonZ += 0.01;
        }

//            if(Math.sign(distance)===-1){
//                distance=-distance;
//            }
    }
}
;
function checkCollisionMur()
{

    if ((ballon.position.x <= murDroite.position.x + profondeurMur / 2 + rayonBallon
            && ballon.position.x >= murDroite.position.x - profondeurMur / 2 - rayonBallon) ||
            ballon.position.x <= murGauche.position.x + profondeurMur / 2 + rayonBallon
            && ballon.position.x >= murGauche.position.x - profondeurMur / 2 - rayonBallon)
    {
        rebond();
    }
}
;
function checkCollisionObstacle()
{

    if ((ballon.position.z <= obstacleDroite.position.z + profondeurObstacle + rayonBallon
            && ballon.position.z >= obstacleDroite.position.z - profondeurObstacle - rayonBallon) ||
            (ballon.position.z <= obstacleGauche.position.z + profondeurObstacle + rayonBallon
                    && ballon.position.z >= obstacleGauche.position.z - profondeurObstacle - rayonBallon))
    {
        if ((ballon.position.x <= obstacleDroite.position.x + longeurObstacle + rayonBallon
                && ballon.position.x >= obstacleDroite.position.x - longeurObstacle - rayonBallon) ||
                (ballon.position.x <= obstacleGauche.position.x + longeurObstacle + rayonBallon
                        && ballon.position.x >= obstacleGauche.position.x - longeurObstacle - rayonBallon)) {
            passe();
        }
    }
}
;

function checkCollisionJoker() {
    if (jokerExtra.position.y < 3) {
        if (ballon.position.z <= jokerExtra.position.z + 1 + rayonBallon &&
                ballon.position.z >= jokerExtra.position.z - 1 - rayonBallon) {
            if (ballon.position.x <= jokerExtra.position.x + 1 + rayonBallon &&
                    ballon.position.x >= jokerExtra.position.x - 1 - rayonBallon) {
                if (!jokerExtraBool) {
                    if (attaque) {
                        jokerExtraBool = true;
                        tailleRaquette += 1;
                        raquetteJoueur.scale.x += 1;
                        jokerExtra.position.set(0, 50, 0);
                        joueurJoker = "SG1";
                    } else {
                        tailleRaquetteAdversaire += 1;
                        raquetteAdversaire.scale.x += 1;
                        jokerExtra.position.set(0, 50, 0);
                        joueurJoker = "Adversaire";
                    }
                    effetJoker = true;
                    setTimeout(endJoker, 10000);
                }
            }
        }
    }
    if (jokerSante.position.y < 3) {
        if (ballon.position.z <= jokerSante.position.z + 1 + rayonBallon &&
                ballon.position.z >= jokerSante.position.z - 1 - rayonBallon) {
            if (ballon.position.x <= jokerSante.position.x + 1 + rayonBallon &&
                    ballon.position.x >= jokerSante.position.x - 1 - rayonBallon) {
                if (attaque) {
                    rechargerBouclier = true;
                } else {
                    rechargerBouclierAdversaire = true;
                }
                jokerSante.position.set(0, 50, 0);
            }
        }
    }
}

function endJoker() {
    effetJoker = false;
    reduireRaquette = true;
}