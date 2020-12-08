/**
 * Toutes les variables globales
 */
var scene = new THREE.Scene();
var renderer;
var camera;
var terrain, ballon, murDroite, murGauche, raquetteJoueur, raquetteAdversaire, tailleRaquette, tailleRaquetteAdversaire, hauteurRaquette, profondeurRaquette, rayonBallon, profondeurMur, longueurMur;
var deplacerDroite = false;
var deplacerGauche = false;
var deplacerDroiteAdversaire = false;
var deplacerGaucheAdversaire = false;
var attaque = false;
var tailleMonde = window.innerWidth;
var hauteurMonde = window.innerHeight;
var axeBallonX;
var vitesseBallonZ;
var directionBallonX;
var directionBallonZ;
var centreRaquette;
var actionMatch = "menu";
var i = 0;
var j = 0;
var raquetteAuCentre = false;
var departDroiteRaquette = false;
var departGaucheRaquette = false;
var departDroiteRaquetteAdversaire = false;
var departGaucheRaquetteAdversaire = false;
var mobileRaquette = false;
var mobileRaquetteAdversaire = false;
var bouclierJoueurActif = true;
var bouclierAdversaireActif = true;
var rayonBallon, geoBallon, texBallon;
var bouclierJoueur, bouclierAdversaire;
var profondeurBouclier;
var bouclier, bouclierAdversaire;
var scoreJoueur = 0, scoreAdversaire = 0;
var sol;
var prometheus;
var ship1, ship2, ship3, ship4;
var gate;
var stats;
var vitesseBalle = 0;
var manche = null;
var starGate, mvStarGate = false;
var matGate;
var boolDecompte = true;
var compteurlance = false;
var musicBool = true;
var fixeCamera = true;
var raquetteCamera = false;
var topCamera = false;
var animCamera = false;
var deplacerDroiteCamera = false;
var deplacerGaucheCamera = false;
var dernierScoreur = null;
var jokerSante, jokerExtra;
var raycastInit = false;
var jokerExtraBool = false;
var terrainX = 15;
var terrainY = 1;
var terrainZ = 28;
var tempsJoker = 10;
var obstacleDroite, obstacleGauche, profondeurObstacle, longueurObstacle;
var boolInertie = false;
var deplacementInertie = 0;
var deplacerDroiteJoueurInertie = false;
var deplacerGaucheJoueurInertie = false;
var boolpostProcessing = false;
var composer;
var boolObstacles = false;
var obstacleDroite, obstacleGauche;
var isPlay = true;
var jokerEnCours = false;
var texLoader;
var id;
var displayScene = false;
var difficulty = 0;
var inertieOn = false;
var invincible = false;
var chargeRendu = false;
var ennemy1, ennemy2, ennemy3;
var camera2;
var multi = false;
var views = [
    {
        left: 0,
        bottom: 0,
        width: 1,
        height: 0.5,
        eye: [1400, 800, 1400],
        up: [0, 1, 0],
        fov: 60
    },
    {
        left: 0,
        bottom: 0.5,
        width: 1,
        height: 0.5,
        eye: [1400, 800, 1400],
        up: [0, 1, 0],
        fov: 60
    }
];
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
var effetJoker = false;
joueurJoker = null;
var reduireRaquette = false;
var presentation = false;
var reduireVotreBouclier = false;
var reduireBouclierAdversaire = false;
var rechargerBouclier = false;
var rechargerBouclierAdversaire = false;
var afficherMusic=true;
var orbitControlActif=false;