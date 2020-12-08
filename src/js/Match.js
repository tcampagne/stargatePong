/**
 * Rendu + gestion
 */
function initMatch() {
    drawsInit();
    musicMenu();
    gestionMusicMenu();
    if (afficherMusic){
    document.getElementById("son").innerHTML = "<img src=\"./src/medias/images/son.png\" class=\"imageSon\" alt=\"Modifier le son\"/>";
    }
}
function initManche() {
    dernierScoreur = null;
    dureeCompteur = 3;
    ennemy1.position.set(starGate.position.x - 25, starGate.position.y + 25, starGate.position.z - 3);
    ennemy2.position.set(starGate.position.x - 25, starGate.position.y + 25, starGate.position.z - 3);
    ennemy3.position.set(starGate.position.x - 25, starGate.position.y + 25, starGate.position.z - 3);
    scoreJoueur = 0;
    scoreAdversaire = 0;
    document.getElementById("sortieHyperSpace").style.display = "none";
    switch (manche) {
        case 1:
            scene.add(ennemy1);
            difficulty = 0.01;
            vitesseBallonZ = 0.15;
            break;
        case 2:
            scene.add(ennemy2);
            difficulty = 0.03;
            vitesseBallonZ = 0.30;
            break;
        case 3:
            scene.add(ennemy3);
            difficulty = 0.05;
            vitesseBallonZ = 0.45;
            break;
    }
    actionMatch = "attentePartie";
    axeBallonX = 0;
    directionBallonX = 0;
}
function render() {
    if (displayScene) {
        switch (actionMatch) {
            case 'presentation':
                scene.remove(jokerExtra);
                scene.remove(jokerSante);
                if (typeof ennemy1 !== "undefined" && typeof gate !== "undefined") {
                    scene.add(ennemy1);
                    if (ennemy1.position.z < gate.position.z + 5) {
                        ennemy1.position.z += 0.1;
                    } else {
                        ennemy1.position.z = gate.position.z - 3;
                    }
                }

                if (reduireVotreBouclier) {
                    if (bouclier.scale.x > 0 && bouclier.scale.y > 0) {
                        bouclier.scale.x -= 0.1;
                        bouclier.scale.y -= 0.1;
                    } else {
//                        reduireVotreBouclier = false;
                        bouclierJoueurActif = false;
//                        rechargerBouclier=true;
                    }
                }
                if (rechargerBouclier) {
                    if (bouclier.scale.x < 1 || bouclier.scale.y < 1) {
                        bouclier.scale.x += 0.1;
                        bouclier.scale.y += 0.1;
                        bouclierJoueurActif = true;
                    } else {
//                        rechargerBouclier = false;
//                        reduireVotreBouclier=true;
                    }
                }
                musicBool=false;
                gestionMusicMenu();
                break;
            case 'menu':
                document.getElementById("menu").style.display = "block";
                document.getElementById("compteur").style.display = "none";
                break;
            case 'attentePartie':
                if (ennemy1.position.z < gate.position.z + 5) {
                    ennemy1.position.z += 0.1;
                }
                if (ennemy2.position.z < gate.position.z + 5) {
                    ennemy2.position.z += 0.1;
                }
                if (ennemy3.position.z < gate.position.z + 5) {
                    ennemy3.position.z += 0.1;
                }
                afficherCompteur();
                break;
            case 'transitionManche':
                afficherCompteur();
                switch (manche) {
                    case 1:
                        difficulty = 0.01;
                        vitesseBallonZ = 0.15;
                        break;
                    case 2:
                        difficulty = 0.03;
                        vitesseBallonZ = 0.30;
                        break;
                    case 3:
                        difficulty = 0.05;
                        vitesseBallonZ = 0.45;
                        break;
                }
                break;
            case 'pause':
                document.getElementById("sortieHyperSpace").innerHTML = "PAUSE<br>Appuyez sur ESPACE pour revenir au jeu";
                document.getElementById("sortieHyperSpace").style.display = "block";
                break;
            case 'multi':
                document.getElementById("menu").style.display = "none";
                break;
            case 'jeu':
                ballon.rotation.y += 0.1;
                ballon.position.x += directionBallonX;
                checkCollisionRaquettes();
                checkCollisionMur();
                if (jokerEnCours) {
                    checkCollisionJoker();
                }
                checkPanier();
                if (boolObstacles) {
                    checkCollisionObstacle();
                }
                if (attaque === false) {
                    ballon.position.z += vitesseBallonZ;
                    ballon.position.x += axeBallonX / 6;
                }
                if (attaque === true) {
                    ballon.position.z -= vitesseBallonZ;
                    ballon.position.x += axeBallonX / 6;
                }
                if (!multi) {
                    AdversaireMouvement();
                }
                document.getElementById("votreScore").innerHTML = scoreJoueur;
                document.getElementById("scoreAdversaire").innerHTML = scoreAdversaire;
                if (reduireRaquette) {
                    if (joueurJoker === "SG1") {
                        raquetteJoueur.scale.x -= 1;
                    } else {
                        raquetteAdversaire.scale.x -= 1;
                    }
                }
                reduireRaquette = false;
                if (reduireVotreBouclier) {
                    if (bouclier.scale.x > 0 && bouclier.scale.y > 0) {
                        bouclier.scale.x -= 0.1;
                        bouclier.scale.y -= 0.1;
                    } else {
                        reduireVotreBouclier = false;
                        bouclierJoueurActif = false;
                    }
                }
                if (rechargerBouclier) {
                    if (bouclier.scale.x < 1 || bouclier.scale.y < 1) {
                        bouclier.scale.x += 0.1;
                        bouclier.scale.y += 0.1;
                        bouclierJoueurActif = true;
                    } else {
                        rechargerBouclier = false;
                    }
                }
                if (reduireBouclierAdversaire) {
                    if (bouclierAdversaire.scale.x > 0 && bouclierAdversaire.scale.y > 0) {
                        bouclierAdversaire.scale.x -= 0.1;
                        bouclierAdversaire.scale.y -= 0.1;
                    } else {
                        reduireBouclierAdversaire = false;
                        bouclierAdversaireActif = false;
                    }
                }
                if (rechargerBouclierAdversaire) {
                    if (bouclierAdversaire.scale.x < 1 || bouclier.scale.y < 1) {
                        bouclierAdversaire.scale.x += 0.1;
                        bouclierAdversaire.scale.y += 0.1;
                        bouclierAdversaireActif = true;
                    } else {
                        rechargerBouclierAdversaire = false;
                    }
                }
                break;
        }
        //Joueur
        if (raquetteCamera === true && deplacerDroiteCamera) {
            if (raquetteJoueur.position.x < 6.1) {
                camera.position.x += 0.15;
            }
        }
        if (raquetteCamera === true && deplacerGaucheCamera) {
            if (raquetteJoueur.position.x > -6.1) {
                camera.position.x -= 0.15;
            }
        }
        if (deplacerDroite === true) {
            if (raquetteJoueur.position.x < 6.1) {
                raquetteJoueur.position.x += 0.15;
            }
        }
        if (deplacerGauche === true) {
            if (raquetteJoueur.position.x > -6.1) {
                raquetteJoueur.position.x -= 0.15;
            }
        }
        if (inertieOn) {
            if (deplacerDroiteJoueurInertie === true) {
                if (raquetteJoueur.position.x < 6.1 && deplacementInertie > 0) {
                    raquetteJoueur.position.x += deplacementInertie;
                    deplacementInertie -= 0.01;
                } else {
                    deplacerDroiteJoueurInertie = false;
                }
            }
            if (deplacerGaucheJoueurInertie === true) {
                if (raquetteJoueur.position.x > -6.1 && deplacementInertie > 0) {
                    raquetteJoueur.position.x -= deplacementInertie;
                    deplacementInertie -= 0.01;
                } else {
                    deplacerGaucheJoueurInertie = false;
                }
            }
        }
        //Adversaire
        if (deplacerDroiteAdversaire === true) {
            if (raquetteAdversaire.position.x < 6.1) {
                raquetteAdversaire.position.x += 0.15;
            }
        }
        if (deplacerGaucheAdversaire === true) {
            if (raquetteAdversaire.position.x > -6.1) {
                raquetteAdversaire.position.x -= 0.15;
            }
        }
        if (!bouclierJoueurActif) {
            scene.remove(bouclier);
        }
        if (bouclierJoueurActif) {
            scene.add(bouclier);
        }
        if (!bouclierAdversaireActif) {
            scene.remove(bouclierAdversaire);
        }
        if (bouclierAdversaireActif) {
            scene.add(bouclierAdversaire);
        }
        if (animCamera) {
            camera.position.z -= 0.2;
        }
//porte
        water.material.uniforms.time.value += 1.0 / 25.0;
        water.render();
        //déplacement vaisseaux
        if (typeof ship4 !== "undefined" && typeof gate !== "undefined") {
            ship1.position.z -= 0.1;
            ship4.position.z -= 0.1;
            if (ship1.position.z < gate.position.z - 80) {
                ship1.position.z = 30;
            }
            if (ship4.position.z < gate.position.z - 80) {
                ship4.position.z = 30;
            }
        }
        stats.begin();
        stats.end();
        if (orbitControlActif){
        controls.update();
    }
        if (!isPlay) {
            return;
        }
        requestAnimationFrame(render);
        if (!boolpostProcessing) {
            if (!multi) {
                renderer.render(scene, camera);
            } else {
                view = views[1];
                camera = view.camera;
                view.camera.position.set(raquetteAdversaire.position.x, raquetteAdversaire.position.y + 2, raquetteAdversaire.position.z - 4);

                var left = Math.floor(windowWidth * view.left);
                var bottom = Math.floor(windowHeight * view.bottom);
                var width = Math.floor(windowWidth * view.width);
                var height = Math.floor(windowHeight * view.height);
                renderer.setViewport(left, bottom, width, height);
                renderer.setScissor(left, bottom, width, height);
                renderer.setScissorTest(true);
                renderer.setClearColor(view.background);

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.render(scene, camera);
                view = views[0];
                camera = view.camera;
                view.camera.position.set(raquetteJoueur.position.x, raquetteJoueur.position.y + 2, raquetteJoueur.position.z + 4);

                var left = Math.floor(windowWidth * view.left);
                var bottom = Math.floor(windowHeight * view.bottom);
                var width = Math.floor(windowWidth * view.width);
                var height = Math.floor(windowHeight * view.height);
                renderer.setViewport(left, bottom, width, height);
                renderer.setScissor(left, bottom, width, height);
                renderer.setScissorTest(true);
                renderer.setClearColor(view.background);

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.render(scene, camera);
            }
        } else {
            composer.render();
            setTimeout(stopPostPocessing, 2000);
        }
    }
}
;
function t()
{
    var compteur = document.getElementById('compteur');
    s = dureeCompteur;
    m = 0;
    h = 0;
    if (s < 0)
    {
    } else
    {
        if (s > 59)
        {
            m = Math.floor(s / 60);
            s = s - m * 60
        }
        if (m > 59)
        {
            h = Math.floor(m / 60);
            m = m - h * 60
        }
        if (s < 10)
        {
            s = "0" + s
        }
        if (m < 10)
        {
            m = "0" + m
        }
        if (typeof manche !== "undefined" && actionMatch === "attentePartie") {
            compteur.innerHTML = "LA MANCHE " + manche + " VA COMMENCER<br> " + s;
        }
        if (typeof manche !== "undefined" && actionMatch === "transitionManche") {
            if (dernierScoreur === false) {
                compteur.innerHTML = "VOTRE BOUCLIER DIMINUE ! ATTENTION !<br> " + s;
            } else {
                compteur.innerHTML = "VOTRE ADVERSAIRE S'AFFAIBLIT ! CONTINUEZ !<br> " + s;
            }
        }
    }
    dureeCompteur = dureeCompteur - 1;
    if ((dureeCompteur === -1 && actionMatch === "attentePartie") || (dureeCompteur === -1 && actionMatch === "transitionManche")) {
        actionMatch = "jeu";
        afficherHub();
    }
    window.setTimeout("t();", 999);
}

function stopPostPocessing() {
    boolpostProcessing = false;
}
function playPostPocessing() {
    boolpostProcessing = true;
}
function bouclierPresentation() {
    if (!reduireVotreBouclier && !rechargerBouclier) {
        reduireVotreBouclier = true;
    }
    if (reduireVotreBouclier) {
        reduireVotreBouclier = false;
        rechargerBouclier = true;
    } else
    if (rechargerBouclier) {
        rechargerBouclier = false;
        reduireVotreBouclier = true;
    }
}