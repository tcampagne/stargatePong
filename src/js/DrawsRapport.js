/**
 * Tous les draws de tous les objets, modèles...
 */
function drawsInitRapport() {
    drawSceneRapport();
    drawTerrainRapport();
    drawEquipementRapport();
    drawBouclierRapport();
    drawRaquettesRapport();
    datGuiRapport();
    drawSpaceRapport();
    drawShipsRapport();
    drawGateRapport();
    drawWaterRapport();
    drawJokerRapport();
    drawPostProcessingRapport();
    drawObstaclesRapport();
    drawEnnemysRapport();
}
var texLoader = new THREE.TextureLoader();
function drawSceneRapport() {
    aspect = tailleMonde / hauteurMonde;
    camera = new THREE.PerspectiveCamera(90, aspect, 1, 10000);
    renderer = new THREE.WebGLRenderer({
        antialias: true, // to get smoother output
        preserveDrawingBuffer: true	// to allow screenshot
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    positionCamera();
    THREEx.Screenshot.bindKey(renderer);
    if (THREEx.FullScreen.available()) {
        THREEx.FullScreen.bindKey();
    }
}

function drawSceneMultiRapport() {
    for (var ii = 0; ii < views.length; ++ii) {

        var view = views[ii];
        camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.x = view.eye[ 0 ];
        camera.position.y = view.eye[ 1 ];
        camera.position.z = view.eye[ 2 ];
        camera.up.x = view.up[ 0 ];
        camera.up.y = view.up[ 1 ];
        camera.up.z = view.up[ 2 ];
        if (ii === 1) {
            camera.rotation.y = -3.15;
        }
        view.camera = camera;
    }
}

function drawTerrainRapport() {
    geoTerrain = new THREE.BoxGeometry(terrainX, terrainY, terrainZ);
    var texTerrain = texLoader.load('./../..//medias/images/logoTerrainV3.jpg'),
            matTerrain = new THREE.MeshBasicMaterial({map: texTerrain});
    terrain = new THREE.Mesh(geoTerrain, matTerrain);
    scene.add(terrain);
    texMur = texLoader.load('/./src/medias/images/texAlu.jpg'),
            matMur = new THREE.MeshBasicMaterial({map: texMur});
    profondeurMur = 1;
    longueurMur = 28;
    geoMur = new THREE.BoxGeometry(profondeurMur, 5, longueurMur);
    murDroite = new THREE.Mesh(geoMur, matMur);
    murDroite.position.x = terrain.position.x + 8.2;
    scene.add(murDroite);
    murGauche = new THREE.Mesh(geoMur, matMur);
    murGauche.position.x = terrain.position.x - 8.2;
    scene.add(murGauche);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

}
;

function drawEquipementRapport() {
    rayonBallon = 0.5;
    geoBallon = new THREE.SphereGeometry(rayonBallon, 24, 16);
    matBallon = new THREE.MeshBasicMaterial({color: 0xffffff});
    ballon = new THREE.Mesh(geoBallon, matBallon);
    ballon.position.y = 1;
    scene.add(ballon);
}

function drawRaquettesRapport() {
    tailleRaquette = 3;
    hauteurRaquette = 1;
    profondeurRaquette = 0.5;
    geoRaquette = new THREE.BoxGeometry(tailleRaquette, hauteurRaquette, profondeurRaquette);
    texRaquette = texLoader.load('./src/medias/images/texMur.png'),
            matRaquette = new THREE.MeshBasicMaterial({map: texRaquette});
    raquetteJoueur = new THREE.Mesh(geoRaquette, matRaquette);
    raquetteJoueur.position.y = terrain.position.y + 1;
    raquetteJoueur.position.z = terrain.position.z + 14;
    scene.add(raquetteJoueur);
    raquetteAdversaire = new THREE.Mesh(geoRaquette, matRaquette);
    raquetteAdversaire.position.y = terrain.position.y + 1;
    raquetteAdversaire.position.z = terrain.position.z - 14;
    scene.add(raquetteAdversaire);
}

function drawBouclierRapport() {
    profondeurBouclier = 0.5;
    geoBouclier = new THREE.BoxGeometry(15, 2, profondeurBouclier);
    texBouclier = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.5, color: 0xffffff});
    bouclier = new THREE.Mesh(geoBouclier, texBouclier);
    scene.add(bouclier);
    bouclier.position.z = 15;
    bouclier.position.y = 1;
    bouclierAdversaire = new THREE.Mesh(geoBouclier, texBouclier);
    scene.add(bouclierAdversaire);
    bouclierAdversaire.position.z = -15;
    bouclierAdversaire.position.y = 1;

}

function drawObstaclesRapport() {
    profondeurObstacle = 1;
    longeurObstacle = 3;
    matObstacle = new THREE.MeshBasicMaterial({color: 0x35363E, opacity: 0.9, transparent: true});
    geoObstacle = new THREE.BoxGeometry(profondeurObstacle, 5, longeurObstacle);
    obstacleDroite = new THREE.Mesh(geoObstacle, matObstacle);
    obstacleDroite.rotation.y = 1.6;
    obstacleDroite.position.x = murDroite.position.x - profondeurMur * 2;
    obstacleGauche = new THREE.Mesh(geoObstacle, matObstacle);
    obstacleGauche.rotation.y = 1.6;
    obstacleGauche.position.x = murGauche.position.x + profondeurMur * 2;
}

function datGuiRapport() {
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
}
;

function drawGateRapport() {
    var loader = new THREE.JSONLoader();
    loader.load('./src/medias/models/gate.json', function addModelToScene(geometry, materials) {
        var material = new THREE.MultiMaterial(materials);
        gate = new THREE.Mesh(geometry, material);
        gate.scale.set(12, 12, 12);
        gate.position.set(prometheus.position.x, prometheus.position.y + 15, prometheus.position.z - 50);
        scene.add(gate);
    });
    geoGate = new THREE.CircleGeometry(35, 64);
    matGate = new THREE.MeshBasicMaterial({});
    starGate = new THREE.Mesh(geoGate, matGate);
    starGate.position.set(0, 0, -45);
}

function drawShipsRapport() {
    var loader = new THREE.JSONLoader();
    loader.load('./src/medias/models/prometheusV2.json', function addModelToScene(geometry, materials) {
        var material = new THREE.MultiMaterial(materials);
        prometheus = new THREE.Mesh(geometry, material);
        prometheus.scale.set(4, 4, 4);
        prometheus.position.set(terrain.position.x, terrain.position.y - 15, terrain.position.z + 4);
        prometheus.rotation.y = 3.15;
        scene.add(prometheus);
        ship1 = new THREE.Mesh(geometry, material);
        ship1.scale.set(2, 2, 2);
        ship1.position.set(prometheus.position.x + 60, prometheus.position.y, prometheus.position.z - 50);
        ship1.rotation.y = 3.15;
        scene.add(ship1);
        ship4 = new THREE.Mesh(geometry, material);
        ship4.scale.set(2, 2, 2);
        ship4.position.set(prometheus.position.x - 60, prometheus.position.y, prometheus.position.z);
        ship4.rotation.y = 3.15;
        scene.add(ship4);
    });
}

function drawSpaceRapport() {
    var spacetex = texLoader.load('./src/medias/images/spaceV2.jpg');
    var spacesphereGeo = new THREE.SphereGeometry(250, 250, 250);
    var spacesphereMat = new THREE.MeshBasicMaterial();
    spacesphereMat.map = spacetex;

    var spacesphere = new THREE.Mesh(spacesphereGeo, spacesphereMat);

    spacesphere.material.side = THREE.DoubleSide;

    spacesphere.material.map.wrapS = THREE.RepeatWrapping;
    spacesphere.material.map.wrapT = THREE.RepeatWrapping;
    spacesphere.material.map.repeat.set(5, 3);

    scene.add(spacesphere);

    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.intensity = 2;
    scene.add(spotLight);

    var spotLight2 = new THREE.SpotLight(0x5192e9);
    spotLight2.position.set(40, -60, 30);
    spotLight2.intensity = 1.5;
    scene.add(spotLight2);
}

function drawWaterRapport() {
    var waterNormals = texLoader.load('./src/medias/images/texGate.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water(renderer, camera, scene, {
        waterNormals: waterNormals,
        waterColor: 0x00BFFF
    });

    var mirrorMesh = new THREE.Mesh(
            new THREE.CircleGeometry(35, 64),
            water.material
            );

    mirrorMesh.add(water);
    mirrorMesh.position.set(0, 0, -45);
    scene.add(mirrorMesh);
}

function drawEnnemysRapport() {
    var loader = new THREE.JSONLoader();
    loader.load('./src/medias/models/logoRa.json', function addModelToScene(geometry, materials) {
        var material = new THREE.MultiMaterial(materials);
        ennemy1 = new THREE.Mesh(geometry, material);
        ennemy1.scale.set(6, 6, 6);
        ennemy1.position.set(starGate.position.x - 25, starGate.position.y + 25, starGate.position.z - 3);
        ennemy1.rotation.x = 1.5;
    });
    loader.load('./src/medias/models/logoBaal.json', function addModelToScene(geometry, materials) {
        var material = new THREE.MultiMaterial(materials);
        ennemy2 = new THREE.Mesh(geometry, material);
        ennemy2.scale.set(6, 6, 6);
        ennemy2.position.set(starGate.position.x - 25, starGate.position.y + 25, starGate.position.z - 3);
        ennemy2.rotation.x = 1.5;
    });
    loader.load('./src/medias/models/logoApophis.json', function addModelToScene(geometry, materials) {
        var material = new THREE.MultiMaterial(materials);
        ennemy3 = new THREE.Mesh(geometry, material);
        ennemy3.scale.set(6, 6, 6);
        ennemy3.position.set(starGate.position.x - 25, starGate.position.y + 25, starGate.position.z - 3);
        ennemy3.rotation.x = 1.5;
    });
}

function drawJokerRapport() {
    geoJoker = new THREE.BoxGeometry(2, 2, 2);
    texJokerSante = texLoader.load('./src/medias/images/jokers/health.jpg'),
            matJokerSante = new THREE.MeshBasicMaterial({color: 0xffffff, map: texJokerSante});
    jokerSante = new THREE.Mesh(geoJoker, matJokerSante);
    jokerSante.name = "jokerSante";
    scene.add(jokerSante);
    jokerSante.position.set(0, 50, 0);
    texJokerExtra = texLoader.load('./src/medias/images/jokers/extra.png'),
            matJokerExtra = new THREE.MeshBasicMaterial({color: 0xffffff, map: texJokerExtra});
    jokerExtra = new THREE.Mesh(geoJoker, matJokerExtra);
    jokerExtra.name = "jokerExtra";
    scene.add(jokerExtra);
    jokerExtra.position.set(0, 50, 0);
}

function drawPostProcessingRapport() {
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    glitchPass = new THREE.GlitchPass();
    glitchPass.renderToScreen = true;
    composer.addPass(glitchPass);
}
