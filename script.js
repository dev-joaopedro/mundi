const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("globe-container").appendChild(renderer.domElement);

// Controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 1.2;

// Carregando texturas
const textureLoader = new THREE.TextureLoader();
const outlineTexture = textureLoader.load("mapa_outline3.jpg");

// Criando o globo com material transparente
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshBasicMaterial({
    map: outlineTexture,
    transparent: true,  // Permite a transparência
    opacity: 1,         // Ajuste conforme necessário
});

const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Luz direcional
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 3, 5);
scene.add(light);

camera.position.z = 2;

// Raycaster para detectar cliques
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Função para capturar cliques
function onDocumentClick(event) {
    // Normaliza as coordenadas do clique
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Envia o raio para a cena
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(globe);

    if (intersects.length > 0) {
        const clickedPoint = intersects[0].point;
        console.log("Clique detectado em:", clickedPoint);

        // Simulação de detecção do país com base na posição (precisa de um mapa de cores real)
        document.getElementById("info-box").innerText = `Você clicou em um país! (Coordenadas: ${clickedPoint.x.toFixed(2)}, ${clickedPoint.y.toFixed(2)})`;
    }
}

// Evento de clique
window.addEventListener("click", onDocumentClick);

// Animação para rotação do globo
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002; // Faz o globo girar lentamente
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajustar tamanho ao redimensionar a tela
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
