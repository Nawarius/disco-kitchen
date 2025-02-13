import * as THREE from 'three'

class AnimationGLB {
    public clock: THREE.Clock = new THREE.Clock()
    public mixer: THREE.AnimationMixer | null = null
    public glb: any

    setGLB (glb: any) {
        this.mixer = new THREE.AnimationMixer(glb.scene)
        this.glb = glb

        let anim = this.mixer.clipAction(glb.animations[0])
        anim.loop = THREE.LoopRepeat
        anim.reset().play()
    }

    animate () {
        if (this.glb && this.mixer) this.mixer.update(this.clock.getDelta())
    }
}

export default AnimationGLB