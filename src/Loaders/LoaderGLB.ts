import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import LoaderRoot from './LoaderRoot'
import { writePercentage } from '@/utils/preloader.utils'

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

    async load () {
        const glb: any = await new Promise(res => {
            this.loader.load('kitchen_model/Küche Held4.glb', (glb) => {
                res(glb)
            }, (e) => {
                const percents = e.loaded / e.total * 100
                writePercentage(percents)
            })
        })
        // //https://dl.dropbox.com/scl/fi/4hr8i7448zqcahq71ib54/K-che-Held3.glb?rlkey=aqsmh4rbbebo7odnyacemymui&st=h5t970jv

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