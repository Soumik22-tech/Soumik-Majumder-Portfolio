import * as THREE from "three";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Main Neutral White Directional Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Soft White Point Light for highlights
  const pointLight = new THREE.PointLight(0xffffff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Clean studio HemisphereLight (White sky, dark gray ground for soft shadows)
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0);
  scene.add(hemiLight);

  // Ambient light for natural fill
  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  scene.add(ambientLight);

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;       
    } else {
      pointLight.intensity = 0;
    }
  }
  
  const duration = 2;
  const ease = "power2.inOut";
  
  function turnOnLights() {
    gsap.to(hemiLight, {
      intensity: 1.0,
      duration: duration,
      ease: ease,
    });
    gsap.to(ambientLight, {
      intensity: 0.6,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
