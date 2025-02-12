import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import LoaderRoot from './LoaderRoot'

class LoaderGLB extends LoaderRoot {

    public scene: THREE.Scene
    private loader: GLTFLoader

    constructor (scene: THREE.Scene) {
        super()
        this.scene = scene
        this.loader = new GLTFLoader();
    }

    async load () {
        const glb: any = await new Promise(res => res(this.loader.loadAsync('kitchen_model/Küche Held4.glb')))
        // //https://dl.dropbox.com/scl/fi/4hr8i7448zqcahq71ib54/K-che-Held3.glb?rlkey=aqsmh4rbbebo7odnyacemymui&st=h5t970jv

        glb.scene.traverse((obj: any) => {
            if (obj.isMesh) {
                const mesh = obj

                mesh.castShadow = true
                

                if (mesh.name.includes('Sphere001')) {
                    //mesh.material.flatShading = true
                    //mesh.material = new THREE.MeshStandardMaterial()
                    //console.log(mesh.material)
                }
                //console.log(mesh.name)
                if (mesh.name.includes('_Shadow')) {
                    //console.log(mesh.name)
                    //if (mesh.name.includes('Wall'))
                    //mesh.castShadow = false
                    mesh.receiveShadow = true
                }
                
            }
        })

        // Animation (Need to decompose)
        let clock = new THREE.Clock()
        let mixer = new THREE.AnimationMixer(glb.scene);
        let loading = mixer.clipAction(glb.animations[0]);
        loading.loop = THREE.LoopRepeat;
        loading.reset().play();

        setInterval(() => {
            if (glb.scene) mixer.update( clock.getDelta() )
        })

        this.scene.add(glb.scene)
        
    }

}

export default LoaderGLB