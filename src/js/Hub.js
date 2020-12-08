/**
 * Gestion des affichages
 */
function gestionHub() {
    var manche1 = document.getElementById("manche1");
    manche1.onclick = function () {
        manche = 1;
        initManche();
    };
    var manche1 = document.getElementById("manche2");
    manche1.onclick = function () {
        manche = 2;
        initManche();
    };
    var manche1 = document.getElementById("manche3");
    manche1.onclick = function () {
        manche = 3;
        initManche();
    };
}

function afficherHub() {
    document.getElementById("votreScore").style.display = "block";
    document.getElementById("scoreAdversaire").style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("compteur").style.display = "none";
}

function afficherMenu() {
    document.getElementById("votreScore").style.display = "none";
    document.getElementById("scoreAdversaire").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("compteur").style.display = "none";
}
function afficherCompteur() {
    document.getElementById("votreScore").style.display = "none";
    document.getElementById("scoreAdversaire").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("compteur").style.display = "block";
}