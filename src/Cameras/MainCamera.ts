import MeshDimensionsCalc from '@/Dimensions/MeshDimensionsCalc'
import * as THREE from 'three'
import type { IMainMouseCoords } from './types'

class MainCamera {
    public camera: THREE.PerspectiveCamera

    public keys: any = {}
    public mouseCoords: IMainMouseCoords = {x: 0, y: 0}

    private isBlocked: boolean = false
    private isMouseDown: boolean = false

    constructor () {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    }

    init () {
        this.camera.position.set(0, 0, 0)
        this._keysControls()
    }

    pointTheCameraAtMesh (mesh: THREE.Mesh) {
        if (!mesh) return
       
        const center = MeshDimensionsCalc.getMeshCenter(mesh)
        const maxSize = MeshDimensionsCalc.getMeshMaxSize(mesh)
    
        this.camera.position.set(center.x, center.y, center.z)
        this.camera.position.setZ(maxSize)
    }

    _keysControls () {
        window.addEventListener('keydown', (event) => {
            if (this.isBlocked) return
            this.keys[event.code] = true
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.code] = false
        });

        window.addEventListener('mousedown', () => {
            if (this.isBlocked) return
            this.isMouseDown = true
        });

        window.addEventListener('mouseup', () => {
            this.isMouseDown = false
        });

        window.addEventListener('mousemove', (event) => {
            if (this.isMouseDown) {
                this.mouseCoords.x = event.movementX;
                this.mouseCoords.y = event.movementY;
            }
        });
    }

    updateCamera () {
        const moveSpeed = 0.05
        const rotateSpeed = 0.005

        if (this.keys['KeyW']) {
            this.camera.translateZ(-moveSpeed)
        }
        if (this.keys['KeyS']) {
            this.camera.translateZ(moveSpeed)
        }
        if (this.keys['KeyA']) {
            this.camera.translateX(-moveSpeed)
        }
        if (this.keys['KeyD']) {
            this.camera.translateX(moveSpeed)
        }

        if (this.isMouseDown) {
            const quaternionX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.mouseCoords.x * -rotateSpeed)
            const quaternionY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.mouseCoords.y * -rotateSpeed)

            this.camera.quaternion.multiplyQuaternions(quaternionX, this.camera.quaternion).multiply(quaternionY)
        }
        
        this.mouseCoords.x = 0
        this.mouseCoords.y = 0
    }

    getCamera () {
        return this.camera
    }

    blockCamera (bool: boolean) {
        this.isBlocked = bool
    }
}

export default MainCamera