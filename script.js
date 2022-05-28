// Ustawianie sceny
const scene = new THREE.Scene();
const renderCube = new THREE.WebGLRenderer();
renderCube.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderCube.domElement);
scene.background = new THREE.Color(0x686868);

const textureLoader = new THREE.TextureLoader();
const ourTexture = textureLoader.load("textura.png");

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

class Cube {
  constructor(pos, sc, texture, rotVec) {
    this.pos = pos;
    this.scale = sc;
    this.rotCube = rotVec;

    this.geometry = new THREE.BoxGeometry(
      this.scale.x,
      this.scale.y,
      this.scale.z
    );
    this.material = new THREE.MeshStandardMaterial({ map: texture });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.cube);
    this.cube.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
  animateCubeRotation() {
    this.cube.rotation.x += this.rotCube.x;
    this.cube.rotation.y += this.rotCube.y;
    this.cube.rotation.z += this.rotCube.z;
  }
  updatePosition(vector) {
    this.cube.position.x += vector.x;
    this.cube.position.y += vector.y;
  }
}

const PositionCu = [
  { x: 1, y: -1, z: 0 },
  { x: -1, y: -1, z: 0 },
  { x: -1, y: 1, z: 0 },
  { x: 2, y: 1, z: -1 },

];
const cubes = [];
for (let i = 0; i < 4; i++) {
  const randomScale = Math.random() * 0.9+0.1 ;
  cubes.push(
    new Cube(
      PositionCu[i],
      { x: randomScale, y: randomScale, z: randomScale },
      ourTexture,
      {
        x: Math.random() * 0.03,
        y: Math.random() * 0.03,
        z: Math.random() * 0.03,
      }
    )
  );
}

const ambientLight = new THREE.AmbientLight(0x909090);
scene.add(ambientLight);

directLight = [];
for (let i = 0; i < 4; i++) {
  directLight.push(new THREE.DirectionalLight(0xE7E7E7, 0.7));
  directLight[i].position.set(
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10
  );
  scene.add(directLight[i]);
}

let selectedCube = cubes[4];
const selectCube = (id) => {
  selectedCube = cubes[id];
};


document
  .getElementById("but1")
  .addEventListener("click", () => selectCube(2));
document
  .getElementById("but2")
  .addEventListener("click", () => selectCube(3));
document
  .getElementById("but3")
  .addEventListener("click", () => selectCube(1));
document
  .getElementById("but4")
  .addEventListener("click", () => selectCube(0));



const cameraRotation = new THREE.OrbitControls(camera, renderCube.domElement);
cameraRotation.update();

const xSpeed = 0.1;
const ySpeed = 0.1;
// Sterowanie kamerą
const cubeSteering = (event) => {
  var keyCode = event.which;
  if (event.altKey) {

    if (keyCode == 37) {
      camera.position.x -= xSpeed;
    } else if (keyCode == 38) {
      camera.position.y += ySpeed;
    } else if (keyCode == 39) {
      camera.position.x += xSpeed;
    } else if (keyCode == 40) {
      camera.position.y -= ySpeed;
    }
  } else {
    if (keyCode == 37) {
      selectedCube.updatePosition({ x: -xSpeed, y: 0 });
    } else if (keyCode == 38) {
      selectedCube.updatePosition({ x: 0, y: ySpeed });
    } else if (keyCode == 39) {
      selectedCube.updatePosition({ x: xSpeed, y: 0 });
    } else if (keyCode == 40) {
      selectedCube.updatePosition({ x: 0, y: -ySpeed });
    }
  }
};
document.addEventListener("keydown", cubeSteering, false);

function render() {
  //60 klatek na sekundę
  setTimeout(function () {
    requestAnimationFrame(render);
  }, 1000 / 60);

  renderCube.render(scene, camera);
  cubes.forEach((cube) => {
    cube.animateCubeRotation();
  });
}

render();
