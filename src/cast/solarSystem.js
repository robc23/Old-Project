import { Group } from 'three'
import Garnet from '../cast/garnet'
import Sun from '../cast/sun'
import { Tween, Ease } from '@createjs/tweenjs'
import { bounceIn } from '../utilities/easeFix'

class SolarSystem {
    constructor() {
      this.group = new Group();
  
      const garnet = new Garnet();
      const sun = new Sun();
  
      // Set positions for Garnet and Sun
      garnet.group.position.x = -5; 
      sun.group.position.x = 0; 
  
      // Add Garnet and Sun to the Solar System group
      this.group.add(garnet.group);
      this.group.add(sun.group);
      this.garnet = garnet
      this.sun = sun
    }
    flex() {
      Tween.get(this.garnet.group.scale)
        .to({ x: 3 }, 750, Ease.sineInOut)
        .to({ x: 1 }, 1250, Ease.backOut)
        .to({ y: 4 }, 3000, Ease.elasticInOut)
        .to({ y: 1 }, 500) 
  
      // Rotation animation
      Tween.get(this.garnet.group.rotation)
        .to({ x: Math.PI * 2 }, 1000, Ease.linear)
        .to({ y: Math.PI * 2 }, 1000, Ease.linear)

      Tween.get(this.sun.group.rotation)
        .to({ x: Math.PI * 2 }, 1000,  Ease.linear)
        .to({ y: Math.PI * 2 }, 500,  Ease.linear)

      Tween.get(this.sun.group.scale)
      .to({ x: 3 }, 1000, Ease.quadInOut)
      .to({ x: 1 }, 1000, Ease.cubicInOut)
      .to({ y: 4 }, 1000, Ease.bounceOut)
      .to({ y: 1 }, 500)
  
    }
  
  
    // Makes Garnet realign with the axes, using Tween to make it smooth.
    reset() 
    {
      Tween.get(this.garnet.group.rotation).to({ x: 0, y: 0, z: 0 }, 4000, bounceIn)
      Tween.get(this.sun.group.rotation).to({ x: 0, y: 0, z: 0 }, 4000, bounceIn)
    }
  
  }
  
  export default SolarSystem