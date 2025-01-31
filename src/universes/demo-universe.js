/**
 * The scene-manager module serves as an entry point to all scene-related activities, from initialization
 * to access to objects to anything else.
 *
 * The starter version of the scene manager is adapted from the introductory code provided by three.js.
 */
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, TextureLoader, CameraHelper, Fog } from 'three'

import Peridot from '../cast/peridot'

import SolarSystem from '../cast/solarSystem'
import darkSpace from '../textures/dark-space.jpg' // from https://lh3.googleusercontent.com/9zE3StG50FuHs9PCo6kMTIhWKyIc3vJ2JqxPZEgaKc8WQ2vzAyWR4wqYYhMZ7zkhc0C893COYflGKt70Sb15e4gg7eI=w640-h400-e365-rj-sc0x00ffffff
import nebula from '../textures/nebula.jpg'//https://4kwallpapers.com/images/wallpapers/nebulae-cosmic-stars-dark-blue-dark-background-digital-5120x3200-3926.jpg
const DEFAULT_ROTATION_RATE = 0.01

const createDemoUniverse = ({ fieldOfView, width, height, nearPlane, farPlane}) => {
  const scene = new Scene()
  const camera = new PerspectiveCamera(fieldOfView, width / height, nearPlane, farPlane)

  const textureLoader = new TextureLoader()
  scene.background = textureLoader.load(nebula)

  let moveDirection = 1;
  const moveSpeed = 0.001;
  const orbitRadius = 0.01;



  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)

  scene.add(new AmbientLight('white', 2))

  const directionalLight = new DirectionalLight('white', 1)
  directionalLight.position.set(-1.5, 1, 2)
  directionalLight.target.position.set(0, 0, 0)
  scene.add(directionalLight)
  scene.add(directionalLight.target)

  const directionalLightFromBehind = new DirectionalLight('white', 2)
  directionalLightFromBehind.position.set(-1.5, 1, -2)
  directionalLightFromBehind.target.position.set(0, 0, 0)
  scene.add(directionalLightFromBehind)
  scene.add(directionalLightFromBehind.target)

  directionalLight.castShadow = true
  directionalLightFromBehind.castShadow = true

  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  directionalLight.shadow.camera.near = 0.5
  directionalLight.shadow.camera.far = 500

  const shadowHelper = new CameraHelper(directionalLight.shadow.camera)
  scene.add(shadowHelper)

  scene.fog = new Fog('white', 1, 16)

  const setShadowHelperVisibility = (visible) => {
    if (shadowHelper) {
     shadowHelper.visible = visible;
    }
  }

  const solarSystem = new SolarSystem()
  scene.add(solarSystem.group)
  solarSystem.garnet.group.castShadow = true
  solarSystem.group.receiveShadow = true

  const peridot = new Peridot()
  scene.add(peridot.group)


  // Turning is a universe-specific behavior: you can decide what these can be.
  let turning = false
  const turn = () => {
    turning = true
  }

  const stop = () => {
    turning = false
  }

  const garnetOrbitRadius = 5; // Adjust the orbit radius as needed
  let garnetOrbitAngle = 0;

  const animate = () => {
    window.requestAnimationFrame(animate)
  
  
  if (turning) {

  // Move Garnet in an orbit around the Sun
  const orbitSpeed = 0.001; // Adjust the speed of the orbit
  garnetOrbitAngle += orbitSpeed; // Adjust the speed of Garnet's orbit
  solarSystem.garnet.group.position.x = Math.cos(garnetOrbitAngle) * garnetOrbitRadius;
  solarSystem.garnet.group.position.y = Math.sin(garnetOrbitAngle) * garnetOrbitRadius;
  }

    if (turning) {

      peridot.group.rotation.x -= DEFAULT_ROTATION_RATE / 2
      peridot.group.rotation.y -= DEFAULT_ROTATION_RATE / 4
    }


    scene.position.x += moveSpeed * moveDirection;

    // Check if the scene is out of FOV and change direction
    if (scene.position.x > 5 || scene.position.x < -5) {
      moveDirection *= -1; // Change direction
    }
    
    if (turning) {
      solarSystem.group.rotation.x += DEFAULT_ROTATION_RATE / 2;
      solarSystem.group.rotation.y += DEFAULT_ROTATION_RATE / 4;
    }
    renderer.render(scene, camera)
  }

  return {
    camera,
    renderer,
    animate,
    turn,
    stop,
    shadowHelper,
    cast: {

      peridot,
      solarSystem
    }
  }
}

export { createDemoUniverse }
