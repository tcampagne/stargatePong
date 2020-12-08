/**
 * Fonction de gestion de l'IA
 */
function AdversaireMouvement()
{
    var raquetteAdversaireDirX = (ballon.position.x - raquetteAdversaire.position.x) * difficulty;
    raquetteAdversaire.position.x += raquetteAdversaireDirX;
}