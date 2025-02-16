import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import LoaderRoot from './LoaderRoot'

class LoaderGLB extends LoaderRoot {

    public scene: THREE.Scene
    public glb: any 

    private loader: GLTFLoader

    constructor (scene: THREE.Scene) {
        super()
        this.scene = scene
        this.glb = null
        this.loader = new GLTFLoader();
    }

    //public/kitchen_model/Küche Held4.glb
    //https://dl.dropbox.com/scl/fi/yyuxk3v52oefm2a65v7z9/K-che-Held4.glb?rlkey=kijnor1i9h5z4urzb1fvzy3vh&st=lveul2at

    async load () {
        const glb: any = await new Promise(res => {
            this.loader.load('https://dl.dropbox.com/scl/fi/yyuxk3v52oefm2a65v7z9/K-che-Held4.glb?rlkey=kijnor1i9h5z4urzb1fvzy3vh&st=lveul2at', (glb) => {
                res(glb)
            }, (e) => {
                const mbs = Number((e.loaded / (1024 * 1024)).toFixed(0))
                this._notifyOnLoadingProcess(mbs)
            })
        })
        
        glb.scene.traverse((obj: any) => {
            if (obj.isMesh) {
                const mesh = obj

                mesh.castShadow = true
                
                if (mesh.name.includes('_Shadow')) {
                    mesh.receiveShadow = true
                }
            }
        })

        this.scene.add(glb.scene)

        this.glb = glb

        this._notifyObserverByName('onMeshUploaded', new THREE.Mesh())
    }

    getGLB () {
        return this.glb
    }
}

export default LoaderGLB