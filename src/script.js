import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

import bgTexture1 from '/images/1.jpg';
import bgTexture2 from '/images/2.jpg';
import bgTexture3 from '/images/3.jpg';
import bgTexture4 from '/images/4.jpg';
import sunTexture from '/images/sun.jpg';
import mercuryTexture from '/images/mercurymap.jpg';
import mercuryBump from '/images/mercurybump.jpg';
import venusTexture from '/images/venusmap.jpg';
import venusBump from '/images/venusmap.jpg';
import venusAtmosphere from '/images/venus_atmosphere.jpg';
import earthTexture from '/images/earth_daymap.jpg';
import earthNightTexture from '/images/earth_nightmap.jpg';
import earthAtmosphere from '/images/earth_atmosphere.jpg';
import earthMoonTexture from '/images/moonmap.jpg';
import earthMoonBump from '/images/moonbump.jpg';
import marsTexture from '/images/marsmap.jpg';
import marsBump from '/images/marsbump.jpg';
import jupiterTexture from '/images/jupiter.jpg';
import ioTexture from '/images/jupiterIo.jpg';
import europaTexture from '/images/jupiterEuropa.jpg';
import ganymedeTexture from '/images/jupiterGanymede.jpg';
import callistoTexture from '/images/jupiterCallisto.jpg';
import saturnTexture from '/images/saturnmap.jpg';
import satRingTexture from '/images/saturn_ring.png';
import uranusTexture from '/images/uranus.jpg';
import uraRingTexture from '/images/uranus_ring.png';
import neptuneTexture from '/images/neptune.jpg';
import plutoTexture from '/images/plutomap.jpg';

// ******  SETUP  ******
console.log("Create the scene");
const scene = new THREE.Scene();

console.log("Create a perspective projection camera");
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(-175, 115, 5);

console.log("Create the renderer");
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '1';
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

console.log("Create an orbit control");
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.75;
controls.screenSpacePanning = false;

console.log("Set up texture loader");
const cubeTextureLoader = new THREE.CubeTextureLoader();
const loadTexture = new THREE.TextureLoader();

// ******  POSTPROCESSING setup ******
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// ******  OUTLINE PASS  ******
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 3;
outlinePass.edgeGlow = 1;
outlinePass.visibleEdgeColor.set(0xffffff);
outlinePass.hiddenEdgeColor.set(0x190a05);
composer.addPass(outlinePass);

// ******  BLOOM PASS  ******
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.4, 0.85);
bloomPass.threshold = 1;
bloomPass.radius = 0.9;
composer.addPass(bloomPass);

// ****** AMBIENT LIGHT ******
console.log("Add the ambient light");
var lightAmbient = new THREE.AmbientLight(0x222222, 6); 
scene.add(lightAmbient);

// ******  Star background  ******
scene.background = cubeTextureLoader.load([

  bgTexture3,
  bgTexture1,
  bgTexture2,
  bgTexture2,
  bgTexture4,
  bgTexture2
]);

// ******  CONTROLS  ******
const gui = new dat.GUI({ autoPlace: false });
const customContainer = document.getElementById('gui-container');
customContainer.appendChild(gui.domElement);

// ****** SETTINGS FOR INTERACTIVE CONTROLS  ******
const settings = {
  // Zaman Kontrolleri
  accelerationOrbit: 1,
  acceleration: 1,
  timeSpeed: 1,
  pause: false,
  
  // Kamera Kontrolleri
  cameraSpeed: 1,
  autoRotate: false,
  zoomSpeed: 1,
  
  // Işık Kontrolleri
  sunIntensity: 5,
  ambientLight: 6,
  pointLightIntensity: 1200,
  shadows: true,
  
  // Görsel Efektler
  bloomEnabled: true,
  bloomThreshold: 1,
  bloomRadius: 0.9,
  bloomStrength: 0.85,
  outlineEnabled: true,
  outlineStrength: 3,
  
  // Görüntüleme Seçenekleri
  showOrbits: true,
  showLabels: false,
  showAsteroids: true,
  wireframe: false,
  
  // Sıfırlama
  reset: function() {
    settings.accelerationOrbit = 1;
    settings.acceleration = 1;
    settings.timeSpeed = 1;
    settings.pause = false;
    settings.cameraSpeed = 1;
    settings.autoRotate = false;
    settings.zoomSpeed = 1;
    settings.sunIntensity = 5;
    settings.ambientLight = 6;
    settings.pointLightIntensity = 1200;
    settings.shadows = true;
    settings.bloomEnabled = true;
    settings.bloomThreshold = 1;
    settings.bloomRadius = 0.9;
    settings.bloomStrength = 0.85;
    settings.outlineEnabled = true;
    settings.outlineStrength = 3;
    settings.showOrbits = true;
    settings.showLabels = false;
    settings.showAsteroids = true;
    settings.wireframe = false;
    
    // Reset camera
    camera.position.set(-175, 115, 5);
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Reset lighting
    pointLight.intensity = settings.pointLightIntensity;
    lightAmbient.intensity = settings.ambientLight;
    sunMat.emissiveIntensity = settings.sunIntensity;
    
    // Reset effects
    bloomPass.enabled = settings.bloomEnabled;
    outlinePass.enabled = settings.outlineEnabled;
    
    // Reset shadows
    renderer.shadowMap.enabled = settings.shadows;
    
    // Update GUI
    gui.updateDisplay();
  }
};

// Zaman Kontrolleri
const timeFolder = gui.addFolder('Zaman Kontrolleri');
timeFolder.add(settings, 'accelerationOrbit', 0, 10).name('Yörünge Hızı').onChange(value => {
  // Update all orbit speeds
  mercury.planet3d.rotation.y = 0;
  venus.planet3d.rotation.y = 0;
  earth.planet3d.rotation.y = 0;
  mars.planet3d.rotation.y = 0;
  jupiter.planet3d.rotation.y = 0;
  saturn.planet3d.rotation.y = 0;
  uranus.planet3d.rotation.y = 0;
  neptune.planet3d.rotation.y = 0;
  pluto.planet3d.rotation.y = 0;
});
timeFolder.add(settings, 'acceleration', 0, 10).name('Dönüş Hızı');
timeFolder.add(settings, 'timeSpeed', 0, 5).name('Zaman Çarpanı');
timeFolder.add(settings, 'pause').name('Duraklat/Devam');

// Kamera Kontrolleri
const cameraFolder = gui.addFolder('Kamera Kontrolleri');
cameraFolder.add(settings, 'cameraSpeed', 0.1, 3).name('Kamera Hızı').onChange(value => {
  controls.dampingFactor = 0.75 / value;
});
cameraFolder.add(settings, 'autoRotate').name('Otomatik Döndür').onChange(value => {
  controls.autoRotate = value;
});
cameraFolder.add(settings, 'zoomSpeed', 0.1, 3).name('Yakınlaştırma Hızı').onChange(value => {
  controls.zoomSpeed = value;
});

// Işık Kontrolleri
const lightFolder = gui.addFolder('Işık Kontrolleri');
lightFolder.add(settings, 'sunIntensity', 0, 20).name('Güneş Parlaklığı').onChange(value => {
  sunMat.emissiveIntensity = value;
});
lightFolder.add(settings, 'ambientLight', 0, 20).name('Çevre Işığı').onChange(value => {
  lightAmbient.intensity = value;
});
lightFolder.add(settings, 'pointLightIntensity', 0, 5000).name('Nokta Işık Gücü').onChange(value => {
  pointLight.intensity = value;
});
lightFolder.add(settings, 'shadows').name('Gölgeler').onChange(value => {
  renderer.shadowMap.enabled = value;
});

// Görsel Efektler
const effectsFolder = gui.addFolder('Görsel Efektler');
effectsFolder.add(settings, 'bloomEnabled').name('Parlama Efekti').onChange(value => {
  bloomPass.enabled = value;
});
effectsFolder.add(settings, 'bloomThreshold', 0, 3).name('Parlama Eşiği').onChange(value => {
  bloomPass.threshold = value;
});
effectsFolder.add(settings, 'bloomRadius', 0, 2).name('Parlama Yarıçapı').onChange(value => {
  bloomPass.radius = value;
});
effectsFolder.add(settings, 'bloomStrength', 0, 2).name('Parlama Gücü').onChange(value => {
  bloomPass.strength = value;
});
effectsFolder.add(settings, 'outlineEnabled').name('Kenar Vurgusu').onChange(value => {
  outlinePass.enabled = value;
});
effectsFolder.add(settings, 'outlineStrength', 0, 10).name('Kenar Gücü').onChange(value => {
  outlinePass.edgeStrength = value;
});

// Görüntüleme Seçenekleri
const displayFolder = gui.addFolder('Görüntüleme Seçenekleri');
displayFolder.add(settings, 'showOrbits').name('Yörünge Yolları').onChange(value => {
  // Toggle orbit visibility
  const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];
  planets.forEach(planet => {
    if (planet.planetSystem.children[1]) { // Orbit is at index 1
      planet.planetSystem.children[1].visible = value;
    }
  });
});
displayFolder.add(settings, 'showLabels').name('Gezegen Etiketleri');
displayFolder.add(settings, 'showAsteroids').name('Asteroitler').onChange(value => {
  asteroids.forEach(asteroid => {
    asteroid.visible = value;
  });
});
displayFolder.add(settings, 'wireframe').name('Tel Kafes Görünümü').onChange(value => {
  const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];
  planets.forEach(planet => {
    planet.planet.material.wireframe = value;
  });
});

// Sıfırlama
const resetFolder = gui.addFolder('Sıfırlama');
resetFolder.add(settings, 'reset').name('Her Şeyi Sıfırla');

// Open all folders by default
timeFolder.open();
cameraFolder.open();
lightFolder.open();
effectsFolder.open();
displayFolder.open();

// Add Turkish control button functionality
setTimeout(() => {
  const guiContainer = document.querySelector('.dg.ac');
  if (guiContainer) {
    // Create custom Turkish button
    const turkishButton = document.createElement('div');
    turkishButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: #333;
      color: #fff;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      z-index: 1001;
      border: 1px solid #555;
      font-family: 'Inter', sans-serif;
    `;
    turkishButton.textContent = 'Kontrolleri Kapat';
    
    // Add click functionality
    turkishButton.addEventListener('click', () => {
      if (gui.closed) {
        gui.open();
        turkishButton.textContent = 'Kontrolleri Kapat';
      } else {
        gui.close();
        turkishButton.textContent = 'Kontrolleri Aç';
      }
    });
    
    guiContainer.appendChild(turkishButton);
  }
}, 100);

// mouse movement
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// ******  SELECT PLANET  ******
let selectedPlanet = null;
let isMovingTowardsPlanet = false;
let targetCameraPosition = new THREE.Vector3();
let offset;

function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(raycastTargets);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    selectedPlanet = identifyPlanet(clickedObject);
    
    if (selectedPlanet) {
      closeInfoNoZoomOut();
      
      settings.accelerationOrbit = 0; // Stop orbital movement

      // Update camera to look at the selected planet
      const planetPosition = new THREE.Vector3();
      selectedPlanet.planet.getWorldPosition(planetPosition);
      controls.target.copy(planetPosition);
      camera.lookAt(planetPosition); // Orient the camera towards the planet

      targetCameraPosition.copy(planetPosition).add(camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset));
      isMovingTowardsPlanet = true;
    }
  }
}

function identifyPlanet(clickedObject) {
  // Logic to identify which planet was clicked based on the clicked object, different offset for camera distance
        if (clickedObject.material === mercury.planet.material) {
          offset = 10;
          return mercury;
        } else if (clickedObject.material === venus.Atmosphere.material) {
          offset = 25;
          return venus;
        } else if (clickedObject.material === earth.Atmosphere.material) {
          offset = 25;
          return earth;
        } else if (clickedObject.material === mars.planet.material) {
          offset = 15;
          return mars;
        } else if (clickedObject.material === jupiter.planet.material) {
          offset = 50;
          return jupiter;
        } else if (clickedObject.material === saturn.planet.material) {
          offset = 50;
          return saturn;
        } else if (clickedObject.material === uranus.planet.material) {
          offset = 25;
          return uranus;
        } else if (clickedObject.material === neptune.planet.material) {
          offset = 20;
          return neptune;
        } else if (clickedObject.material === pluto.planet.material) {
          offset = 10;
          return pluto;
        } 

  return null;
}

// ******  SHOW PLANET INFO AFTER SELECTION  ******
function showPlanetInfo(planet) {
  var info = document.getElementById('planetInfo');
  var name = document.getElementById('planetName');
  var details = document.getElementById('planetDetails');

  if (planetData[planet]) {
  name.innerText = planet;
    
    // Gezegen görseli için dosya adını belirle
    let imageFile = '';
    switch(planet) {
      case 'Merkür':
        imageFile = 'mercury.webp';
        break;
      case 'Venüs':
        imageFile = 'venus.jpg';
        break;
      case 'Dünya':
        imageFile = 'earth.png';
        break;
      case 'Mars':
        imageFile = 'mars.jpg';
        break;
      case 'Jüpiter':
        imageFile = 'jupiter.webp';
        break;
      case 'Satürn':
        imageFile = 'saturn.webp';
        break;
      case 'Uranüs':
        imageFile = 'uranus.webp';
        break;
      case 'Neptün':
        imageFile = 'neptune.webp';
        break;
      case 'Plüton':
        imageFile = 'pluto.webp'; // Eğer pluto.webp yoksa varsayılan görsel
        break;
      default:
        imageFile = 'earth.png';
    }
    
    details.innerHTML = `
      <div style="margin-bottom: 20px;">
        <img src="/images/cardimages/${imageFile}" 
             alt="${planet}" 
             style="width: 320px; height: 180px; object-fit: cover; border-radius: 8px; border: 1px solid #333;"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="display: none; width: 320px; height: 180px; background: #222; border: 1px solid #333; border-radius: 8px; align-items: center; justify-content: center; color: #666; font-size: 14px;">
          Görsel Bulunamadı
        </div>
      </div>
      <div style="margin-bottom: 12px;"><strong>Yarıçap:</strong> ${planetData[planet].radius}</div>
      <div style="margin-bottom: 12px;"><strong>Eğim:</strong> ${planetData[planet].tilt}</div>
      <div style="margin-bottom: 12px;"><strong>Dönüş:</strong> ${planetData[planet].rotation}</div>
      <div style="margin-bottom: 12px;"><strong>Yörünge:</strong> ${planetData[planet].orbit}</div>
      <div style="margin-bottom: 12px;"><strong>Mesafe:</strong> ${planetData[planet].distance}</div>
      <div style="margin-bottom: 12px;"><strong>Uydular:</strong> ${planetData[planet].moons}</div>
      <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #333;"><strong>Bilgi:</strong> ${planetData[planet].info}</div>
    `;
  } else {
    name.innerText = planet;
    details.innerText = 'Gezegen bilgisi yükleniyor...';
  }

  info.style.display = 'block';
}
let isZoomingOut = false;
let zoomOutTargetPosition = new THREE.Vector3(-175, 115, 5);
// close 'x' button function
function closeInfo() {
  var info = document.getElementById('planetInfo');
  info.style.display = 'none';
  settings.accelerationOrbit = 1;
  isZoomingOut = true;
  controls.target.set(0, 0, 0);
}
window.closeInfo = closeInfo;
// close info when clicking another planet
function closeInfoNoZoomOut() {
  var info = document.getElementById('planetInfo');
  info.style.display = 'none';
  settings.accelerationOrbit = 1;
}
// ******  SUN  ******
let sunMat;

const sunSize = 697/40; // 40 times smaller scale than earth
const sunGeom = new THREE.SphereGeometry(sunSize, 32, 20);
sunMat = new THREE.MeshStandardMaterial({
  emissive: 0xFFF88F,
  emissiveMap: loadTexture.load(sunTexture),
  emissiveIntensity: settings.sunIntensity
});
const sun = new THREE.Mesh(sunGeom, sunMat);
scene.add(sun);

//point light in the sun
const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);
scene.add(pointLight);


// ******  PLANET CREATION FUNCTION  ******
function createPlanet(planetName, size, position, tilt, texture, bump, ring, atmosphere, moons){

  let material;
  if (texture instanceof THREE.Material){
    material = texture;
  } 
  else if(bump){
    material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture),
    bumpMap: loadTexture.load(bump),
    bumpScale: 0.7
    });
  }
  else {
    material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture)
    });
  } 

  const name = planetName;
  const geometry = new THREE.SphereGeometry(size, 32, 20);
  const planet = new THREE.Mesh(geometry, material);
  const planet3d = new THREE.Object3D;
  const planetSystem = new THREE.Group();
  planetSystem.add(planet);
  let Atmosphere;
  let Ring;
  planet.position.x = position;
  planet.rotation.z = tilt * Math.PI / 180;

  // add orbit path
  const orbitPath = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    position, position, // xRadius, yRadius
    0, 2 * Math.PI,   // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);

  const pathPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.03 });
  const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  planetSystem.add(orbit);

  //add ring
  if(ring)
  {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius,30);
    const RingMat = new THREE.MeshStandardMaterial({
      map: loadTexture.load(ring.texture),
      side: THREE.DoubleSide
    });
    Ring = new THREE.Mesh(RingGeo, RingMat);
    planetSystem.add(Ring);
    Ring.position.x = position;
    Ring.rotation.x = -0.5 *Math.PI;
    Ring.rotation.y = -tilt * Math.PI / 180;
  }
  
  //add atmosphere
  if(atmosphere){
    const atmosphereGeom = new THREE.SphereGeometry(size+0.1, 32, 20);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      map:loadTexture.load(atmosphere),
      transparent: true,
      opacity: 0.4,
      depthTest: true,
      depthWrite: false
    })
    Atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMaterial)
    
    Atmosphere.rotation.z = 0.41;
    planet.add(Atmosphere);
  }

  //add moons
  if(moons){
    moons.forEach(moon => {
      let moonMaterial;
      
      if(moon.bump){
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture),
          bumpMap: loadTexture.load(moon.bump),
          bumpScale: 0.5
        });
      } else{
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture)
        });
      }
      const moonGeometry = new THREE.SphereGeometry(moon.size, 32, 20);
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      const moonOrbitDistance = size * 1.5;
      moonMesh.position.set(moonOrbitDistance, 0, 0);
      planetSystem.add(moonMesh);
      moon.mesh = moonMesh;
    });
  }
  //add planet system to planet3d object and to the scene
  planet3d.add(planetSystem);
  scene.add(planet3d);
  return {name, planet, planet3d, Atmosphere, moons, planetSystem, Ring};
}


// ******  LOADING OBJECTS METHOD  ******
function loadObject(path, position, scale, callback) {
  const loader = new GLTFLoader();

  loader.load(path, function (gltf) {
      const obj = gltf.scene;
      obj.position.set(position, 0, 0);
      obj.scale.set(scale, scale, scale);
      scene.add(obj);
      if (callback) {
        callback(obj);
      }
  }, undefined, function (error) {
      console.error('An error happened', error);
  });
}

// ******  ASTEROIDS  ******
const asteroids = [];
function loadAsteroids(path, numberOfAsteroids, minOrbitRadius, maxOrbitRadius) {
  const loader = new GLTFLoader();
  loader.load(path, function (gltf) {
      gltf.scene.traverse(function (child) {
          if (child.isMesh) {
              for (let i = 0; i < numberOfAsteroids / 12; i++) { // Divide by 12 because there are 12 asteroids in the pack
                  const asteroid = child.clone();
                  const orbitRadius = THREE.MathUtils.randFloat(minOrbitRadius, maxOrbitRadius);
                  const angle = Math.random() * Math.PI * 2;
                  const x = orbitRadius * Math.cos(angle);
                  const y = 0;
                  const z = orbitRadius * Math.sin(angle);
                  child.receiveShadow = true;
                  asteroid.position.set(x, y, z);
                  asteroid.scale.setScalar(THREE.MathUtils.randFloat(0.8, 1.2));
                  scene.add(asteroid);
                  asteroids.push(asteroid);
              }
          }
      });
  }, undefined, function (error) {
      console.error('An error happened', error);
  });
}


// Earth day/night effect shader material
const earthMaterial = new THREE.ShaderMaterial({
  uniforms: {
    dayTexture: { type: "t", value: loadTexture.load(earthTexture) },
    nightTexture: { type: "t", value: loadTexture.load(earthNightTexture) },
    sunPosition: { type: "v3", value: sun.position }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vSunDirection;

    uniform vec3 sunPosition;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
      vSunDirection = normalize(sunPosition - worldPosition.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;

    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vSunDirection;

    void main() {
      float intensity = max(dot(vNormal, vSunDirection), 0.0);
      vec4 dayColor = texture2D(dayTexture, vUv);
      vec4 nightColor = texture2D(nightTexture, vUv)* 0.2;
      gl_FragColor = mix(nightColor, dayColor, intensity);
    }
  `
});


// ******  MOONS  ******
// Earth
const earthMoon = [{
  size: 1.6,
  texture: earthMoonTexture,
  bump: earthMoonBump,
  orbitSpeed: 0.001 * settings.accelerationOrbit,
  orbitRadius: 10
}]

// Mars' moons with path to 3D models (phobos & deimos)
const marsMoons = [
  {
    modelPath: '/images/mars/phobos.glb',
    scale: 0.1,
    orbitRadius: 5,
    orbitSpeed: 0.002 * settings.accelerationOrbit,
    position: 100,
    mesh: null
  },
  {
    modelPath: '/images/mars/deimos.glb',
    scale: 0.1,
    orbitRadius: 9,
    orbitSpeed: 0.0005 * settings.accelerationOrbit,
    position: 120,
    mesh: null
  }
];

// Jupiter
const jupiterMoons = [
  {
    size: 1.6,
    texture: ioTexture,
    orbitRadius: 20,
    orbitSpeed: 0.0005 * settings.accelerationOrbit
  },
  {
    size: 1.4,
    texture: europaTexture,
    orbitRadius: 24,
    orbitSpeed: 0.00025 * settings.accelerationOrbit
  },
  {
    size: 2,
    texture: ganymedeTexture,
    orbitRadius: 28,
    orbitSpeed: 0.000125 * settings.accelerationOrbit
  },
  {
    size: 1.7,
    texture: callistoTexture,
    orbitRadius: 32,
    orbitSpeed: 0.00006 * settings.accelerationOrbit
  }
];

// ******  PLANET CREATIONS  ******
const mercury = new createPlanet('Merkür', 2.4, 40, 0, mercuryTexture, mercuryBump);
const venus = new createPlanet('Venüs', 6.1, 65, 3, venusTexture, venusBump, null, venusAtmosphere);
const earth = new createPlanet('Dünya', 6.4, 90, 23, earthMaterial, null, null, earthAtmosphere, earthMoon);
const mars = new createPlanet('Mars', 3.4, 115, 25, marsTexture, marsBump)
// Load Mars moons
marsMoons.forEach(moon => {
  loadObject(moon.modelPath, moon.position, moon.scale, function(loadedModel) {
    moon.mesh = loadedModel;
    mars.planetSystem.add(moon.mesh);
    moon.mesh.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });
});

const jupiter = new createPlanet('Jüpiter', 69/4, 200, 3, jupiterTexture, null, null, null, jupiterMoons);
const saturn = new createPlanet('Satürn', 58/4, 270, 26, saturnTexture, null, {
  innerRadius: 18, 
  outerRadius: 29, 
  texture: satRingTexture
});
const uranus = new createPlanet('Uranüs', 25/4, 320, 82, uranusTexture, null, {
  innerRadius: 6, 
  outerRadius: 8, 
  texture: uraRingTexture
});
const neptune = new createPlanet('Neptün', 24/4, 340, 28, neptuneTexture);
const pluto = new createPlanet('Plüton', 1, 350, 57, plutoTexture)

  // ******  PLANETS DATA  ******
  const planetData = {
    'Merkür': {
        radius: '2,439.7 km',
        tilt: '0.034°',
        rotation: '58.6 Dünya günü',
        orbit: '88 Dünya günü',
        distance: '57.9 milyon km',
        moons: '0',
        info: 'Güneş sistemimizin en küçük gezegeni ve Güneş\'e en yakın olanı.'
    },
    'Venüs': {
        radius: '6,051.8 km',
        tilt: '177.4°',
        rotation: '243 Dünya günü',
        orbit: '225 Dünya günü',
        distance: '108.2 milyon km',
        moons: '0',
        info: 'Güneş\'ten ikinci gezegen, aşırı sıcaklıkları ve kalın atmosferi ile bilinir.'
    },
    'Dünya': {
        radius: '6,371 km',
        tilt: '23.5°',
        rotation: '24 saat',
        orbit: '365 gün',
        distance: '150 milyon km',
        moons: '1 (Ay)',
        info: 'Güneş\'ten üçüncü gezegen ve yaşam barındırdığı bilinen tek gezegen.'
    },
    'Mars': {
        radius: '3,389.5 km',
        tilt: '25.19°',
        rotation: '1.03 Dünya günü',
        orbit: '687 Dünya günü',
        distance: '227.9 milyon km',
        moons: '2 (Phobos ve Deimos)',
        info: 'Kırmızı Gezegen olarak bilinir, kırmızımsı görünümü ve insan kolonizasyonu potansiyeli ile ünlüdür.'
    },
    'Jüpiter': {
        radius: '69,911 km',
        tilt: '3.13°',
        rotation: '9.9 saat',
        orbit: '12 Dünya yılı',
        distance: '778.5 milyon km',
        moons: '95 bilinen uydu (Ganymede, Callisto, Europa, Io en büyük 4\'ü)',
        info: 'Güneş sistemimizin en büyük gezegeni, Büyük Kırmızı Leke ile bilinir.'
    },
    'Satürn': {
        radius: '58,232 km',
        tilt: '26.73°',
        rotation: '10.7 saat',
        orbit: '29.5 Dünya yılı',
        distance: '1.4 milyar km',
        moons: '146 bilinen uydu',
        info: 'Geniş halka sistemi ile ayırt edilir, güneş sistemimizin ikinci en büyük gezegeni.'
    },
    'Uranüs': {
        radius: '25,362 km',
        tilt: '97.77°',
        rotation: '17.2 saat',
        orbit: '84 Dünya yılı',
        distance: '2.9 milyar km',
        moons: '27 bilinen uydu',
        info: 'Benzersiz yan dönüşü ve soluk mavi rengi ile bilinir.'
    },
    'Neptün': {
        radius: '24,622 km',
        tilt: '28.32°',
        rotation: '16.1 saat',
        orbit: '165 Dünya yılı',
        distance: '4.5 milyar km',
        moons: '14 bilinen uydu',
        info: 'Güneş sistemimizde Güneş\'ten en uzak gezegen, derin mavi rengi ile bilinir.'
    },
    'Plüton': {
        radius: '1,188.3 km',
        tilt: '122.53°',
        rotation: '6.4 Dünya günü',
        orbit: '248 Dünya yılı',
        distance: '5.9 milyar km',
        moons: '5 (Charon, Styx, Nix, Kerberos, Hydra)',
        info: 'Başlangıçta dokuzuncu gezegen olarak sınıflandırılmış, şimdi cüce gezegen olarak kabul edilir.'
    }
};


// Array of planets and atmospheres for raycasting
const raycastTargets = [
  mercury.planet, venus.planet, venus.Atmosphere, earth.planet, earth.Atmosphere, 
  mars.planet, jupiter.planet, saturn.planet, uranus.planet, neptune.planet, pluto.planet
];

// ******  SHADOWS  ******
renderer.shadowMap.enabled = true;
pointLight.castShadow = true;

//properties for the point light
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 10;
pointLight.shadow.camera.far = 20;

//casting and receiving shadows
earth.planet.castShadow = true;
earth.planet.receiveShadow = true;
earth.Atmosphere.castShadow = true;
earth.Atmosphere.receiveShadow = true;
earth.moons.forEach(moon => {
moon.mesh.castShadow = true;
moon.mesh.receiveShadow = true;
});
mercury.planet.castShadow = true;
mercury.planet.receiveShadow = true;
venus.planet.castShadow = true;
venus.planet.receiveShadow = true;
venus.Atmosphere.receiveShadow = true;
mars.planet.castShadow = true;
mars.planet.receiveShadow = true;
jupiter.planet.castShadow = true;
jupiter.planet.receiveShadow = true;
jupiter.moons.forEach(moon => {
  moon.mesh.castShadow = true;
  moon.mesh.receiveShadow = true;
  });
saturn.planet.castShadow = true;
saturn.planet.receiveShadow = true;
saturn.Ring.receiveShadow = true;
uranus.planet.receiveShadow = true;
neptune.planet.receiveShadow = true;
pluto.planet.receiveShadow = true;




function animate(){
  // Skip animation if paused
  if (settings.pause) {
    controls.update();
    requestAnimationFrame(animate);
    composer.render();
    return;
  }

  // Apply time speed multiplier
  const timeMultiplier = settings.timeSpeed;

  //rotating planets around the sun and itself
  sun.rotateY(0.001 * settings.acceleration * timeMultiplier);
  mercury.planet.rotateY(0.001 * settings.acceleration * timeMultiplier);
  mercury.planet3d.rotateY(0.004 * settings.accelerationOrbit * timeMultiplier);
  venus.planet.rotateY(0.0005 * settings.acceleration * timeMultiplier)
  venus.Atmosphere.rotateY(0.0005 * settings.acceleration * timeMultiplier);
  venus.planet3d.rotateY(0.0006 * settings.accelerationOrbit * timeMultiplier);
  earth.planet.rotateY(0.005 * settings.acceleration * timeMultiplier);
  earth.Atmosphere.rotateY(0.001 * settings.acceleration * timeMultiplier);
  earth.planet3d.rotateY(0.001 * settings.accelerationOrbit * timeMultiplier);
  mars.planet.rotateY(0.01 * settings.acceleration * timeMultiplier);
  mars.planet3d.rotateY(0.0007 * settings.accelerationOrbit * timeMultiplier);
  jupiter.planet.rotateY(0.005 * settings.acceleration * timeMultiplier);
  jupiter.planet3d.rotateY(0.0003 * settings.accelerationOrbit * timeMultiplier);
  saturn.planet.rotateY(0.01 * settings.acceleration * timeMultiplier);
  saturn.planet3d.rotateY(0.0002 * settings.accelerationOrbit * timeMultiplier);
  uranus.planet.rotateY(0.005 * settings.acceleration * timeMultiplier);
  uranus.planet3d.rotateY(0.0001 * settings.accelerationOrbit * timeMultiplier);
  neptune.planet.rotateY(0.005 * settings.acceleration * timeMultiplier);
  neptune.planet3d.rotateY(0.00008 * settings.accelerationOrbit * timeMultiplier);
  pluto.planet.rotateY(0.001 * settings.acceleration * timeMultiplier)
  pluto.planet3d.rotateY(0.00006 * settings.accelerationOrbit * timeMultiplier)

// Animate Earth's moon
if (earth.moons) {
  earth.moons.forEach(moon => {
    const time = performance.now();
    const tiltAngle = 5 * Math.PI / 180;

    const moonX = earth.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed * timeMultiplier);
    const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed * timeMultiplier) * Math.sin(tiltAngle);
    const moonZ = earth.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed * timeMultiplier) * Math.cos(tiltAngle);

    moon.mesh.position.set(moonX, moonY, moonZ);
    moon.mesh.rotateY(0.01 * timeMultiplier);
  });
}
// Animate Mars' moons
if (marsMoons){
marsMoons.forEach(moon => {
  if (moon.mesh) {
    const time = performance.now();

    const moonX = mars.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed * timeMultiplier);
    const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed * timeMultiplier);
    const moonZ = mars.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed * timeMultiplier);

    moon.mesh.position.set(moonX, moonY, moonZ);
    moon.mesh.rotateY(0.001 * timeMultiplier);
  }
});
}

// Animate Jupiter's moons
if (jupiter.moons) {
  jupiter.moons.forEach(moon => {
    const time = performance.now();
    const moonX = jupiter.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed * timeMultiplier);
    const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed * timeMultiplier);
    const moonZ = jupiter.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed * timeMultiplier);

    moon.mesh.position.set(moonX, moonY, moonZ);
    moon.mesh.rotateY(0.01 * timeMultiplier);
  });
}

// Rotate asteroids
asteroids.forEach(asteroid => {
  asteroid.rotation.y += 0.0001 * timeMultiplier;
  asteroid.position.x = asteroid.position.x * Math.cos(0.0001 * settings.accelerationOrbit * timeMultiplier) + asteroid.position.z * Math.sin(0.0001 * settings.accelerationOrbit * timeMultiplier);
  asteroid.position.z = asteroid.position.z * Math.cos(0.0001 * settings.accelerationOrbit * timeMultiplier) - asteroid.position.x * Math.sin(0.0001 * settings.accelerationOrbit * timeMultiplier);
});

// ****** OUTLINES ON PLANETS ******
raycaster.setFromCamera(mouse, camera);

// Check for intersections
var intersects = raycaster.intersectObjects(raycastTargets);

// Reset all outlines
outlinePass.selectedObjects = [];

if (intersects.length > 0) {
  const intersectedObject = intersects[0].object;

  // If the intersected object is an atmosphere, find the corresponding planet
  if (intersectedObject === earth.Atmosphere) {
    outlinePass.selectedObjects = [earth.planet];
  } else if (intersectedObject === venus.Atmosphere) {
    outlinePass.selectedObjects = [venus.planet];
  } else {
    // For other planets, outline the intersected object itself
    outlinePass.selectedObjects = [intersectedObject];
  }
}
// ******  ZOOM IN/OUT  ******
if (isMovingTowardsPlanet) {
  // Smoothly move the camera towards the target position
  camera.position.lerp(targetCameraPosition, 0.03);

  // Check if the camera is close to the target position
  if (camera.position.distanceTo(targetCameraPosition) < 1) {
      isMovingTowardsPlanet = false;
      showPlanetInfo(selectedPlanet.name);

  }
} else if (isZoomingOut) {
  camera.position.lerp(zoomOutTargetPosition, 0.05);

  if (camera.position.distanceTo(zoomOutTargetPosition) < 1) {
      isZoomingOut = false;
  }
}

  controls.update();
  requestAnimationFrame(animate);
  composer.render();
}
loadAsteroids('/asteroids/asteroidPack.glb', 1000, 130, 160);
loadAsteroids('/asteroids/asteroidPack.glb', 3000, 352, 370);
animate();

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onDocumentMouseDown, false);
window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
});
