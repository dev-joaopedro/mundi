const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Carregando a textura do mapa político
const textureLoader = new THREE.TextureLoader();
const globeTexture = textureLoader.load("mapa.jpg"); 

const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: globeTexture });

const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Luz ambiente e direcional
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 3, 5);
scene.add(light);

// Posicionando a câmera
camera.position.z = 2;

// Animação para rotação
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002; // Faz o globo girar lentamente
    renderer.render(scene, camera);
}
animate();
