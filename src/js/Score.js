/**
 * Gestion des collisions avec bouclier, ou score
 */
function checkPanier()
{
    if (ballon.position.z <= bouclier.position.z + profondeurBouclier + rayonBallon
            && ballon.position.z >= bouclier.position.z - profondeurBouclier - rayonBallon)
    {
        if (invincible) {
            passe();
        } else {
            if (bouclierJoueurActif) {
                passe();
                reduireVotreBouclier = true;
                sonBouclier();
            } else {
                sonScore();
                scoreAdversaire = scoreAdversaire + 1;
                dernierScoreur = false;
                entreDeux();
            }
        }
    } else {
        if (ballon.position.z <= bouclierAdversaire.position.z + profondeurBouclier + rayonBallon
                && ballon.position.z >= bouclierAdversaire.position.z - profondeurBouclier - rayonBallon)
        {
            if (bouclierAdversaireActif) {
                passe();
                reduireBouclierAdversaire = true;
                sonBouclier();
            } else {
                sonScore();
                scoreJoueur = scoreJoueur + 1;
                dernierScoreur = true;
                entreDeux();
            }
        }
    }
}
;