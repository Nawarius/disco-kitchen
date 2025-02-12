import MeshDimensionsCalc from '@/Dimensions/MeshDimensionsCalc'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

class MainCamera {
    public camera: THREE.PerspectiveCamera
    public orbit: OrbitControls

    constructor (renderer: THREE.WebGLRenderer) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.orbit = new OrbitControls(this.camera, renderer.domElement)
    }

    init () {
        this.camera.position.set(0, 0, 0)

        this.orbit.update()
        this.orbit.target = new THREE.Vector3(0, 0, 0).clone()
    }

    pointTheCameraAt (mesh: THREE.Mesh) {
        if (!mesh) return
       
        const center = MeshDimensionsCalc.getMeshCenter(mesh)
        const maxSize = MeshDimensionsCalc.getMeshMaxSize(mesh)
    
        this.camera.position.set(center.x, center.y, center.z)
        this.camera.position.setZ(maxSize)

        this.orbit.target = center.clone()
    }

    updateOrbit () {
        this.orbit.update()
    }

    getCamera () {
        return this.camera
    }
}

export default MainCamera