/**
 * We take the approach of organizing each “cast member” in a scene within its own file.
 * This is a choice and isn’t required, but it does isolate internal changes/enhancements
 * to these specific “characters.”
 */
import { Group, SphereGeometry, MeshPhongMaterial, Mesh, TextureLoader, RingGeometry, DoubleSide} from 'three'
import { Tween, Ease } from '@createjs/tweenjs'
import { bounceIn } from '../utilities/easeFix'

// Original image is copied from Smule website:
// https://www.smule.com/song/garnet-peridot-lets-fuse-steven-universe-scene-karaoke-lyrics/244819067_1445650/arrangement
//import garnetSmule from '../textures/garnet-smule.jpg'
import ring from '../textures/ring.jpg' // from https://science.nasa.gov/wp-content/uploads/2023/09/PIA08836.jpg
import apocalypseWorld from '../textures/apocalypse world.jpg' //from https://media.istockphoto.com/id/178088253/photo/earth-burning-after-a-global-disaster.jpg?s=612x612&w=0&k=20&c=Nf_MCgN1b996eu4QDiS2gsAA4xvZTXWD1Pgaw6hTfnM=


/**
 * The use of a JavaScript “class” is also a design choice.
 */
class Garnet {
  constructor(color) {
    // Initialize Three.js scene
    const textureLoader = new TextureLoader()

    this.geometry = new SphereGeometry()
    this.material = new MeshPhongMaterial({color: '#4849c5', map: textureLoader.load(apocalypseWorld)})
    this.mesh = new Mesh(this.geometry, this.material)


    this.ringGeometry = new RingGeometry();
    this.ringMaterial = new MeshPhongMaterial({ color: 'purple', map: textureLoader.load(ring)})
    this.ring = new Mesh(this.ringGeometry, this.ringMaterial)
    this.ringMaterial.side = DoubleSide

    this.group = new Group()
    this.group.add(this.mesh)
    this.group.add(this.ring)
    this.group.position.set(0, 0, 0)
    this.ring.scale.set(3, 3, 3)
  }

  // Additional methods or animations can be added here

  // Makes Garnet do a “canned” stretch-like animation.
  flex() {
    // Tween is a convenient helper for doing completely independent autonomous animations.
    // See https://www.createjs.com/demos/tweenjs/tween_sparktable to get a visual on various
    // easing functions.
    //
    // Caution: Some easing functions aren’t built correctly and will produce errors. You can
    // copy the source code to use them.
    Tween.get(this.mesh.scale)
      .to({ x: 3 }, 750, Ease.sineInOut)
      .to({ x: 1 }, 1250, Ease.backOut)
      .to({ y: 4 }, 3000, Ease.elasticInOut)
      .to({ y: 1 }, 500) // No Ease means linear motion (our animator friends would call that boring).
  }

  
  // Makes Garnet realign with the axes, using Tween to make it smooth.
  reset() 
  {
    Tween.get(this.mesh.rotation).to({ x: 0, y: 0, z: 0 }, 4000, bounceIn)
  }
}

export default Garnet
