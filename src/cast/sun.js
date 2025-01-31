import { SphereGeometry, MeshPhongMaterial, Mesh, TextureLoader, Group } from 'three';
import sunTexture from '../textures/sun-texture.jpg' // from https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fimages%2Fsun-surface-background-texture%2F214554839&psig=AOvVaw35GBteB2FEErHQteSsSgxH&ust=1707445614053000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDnnNzYmoQDFQAAAAAdAAAAABAM


class Sun {
  constructor() {
    const textureLoader = new TextureLoader()
    const sunGeometry = new SphereGeometry();
    const sunMaterial = new MeshPhongMaterial({ color: 'yellow', map: textureLoader.load(sunTexture)});
    this.sun = new Mesh(sunGeometry, sunMaterial);
    this.orbitingObjects = []; // Objects that will orbit around the sun


    this.group = new Group();

    this.group.add(this.sun)

  }

  addOrbitingObject(object) {
    this.orbitingObjects.push(object);
  }

  updateRotation(rate) {
    this.sun.rotation.x += rate / 4;
    this.sun.rotation.y += rate / 4;

    // Update positions for orbiting effect
    this.orbitingObjects.forEach((object, index) => {
      const angle = rate * (index + 1);
      const radius = 30; // Adjust the radius of the orbit
      object.position.x = this.sun.position.x + radius * Math.cos(angle);
      object.position.y = this.sun.position.y + radius * Math.sin(angle);
    });
  }

}

export default Sun;
