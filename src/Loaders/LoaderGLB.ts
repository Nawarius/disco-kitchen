import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import LoaderRoot from './LoaderRoot'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

class LoaderGLB extends LoaderRoot {

    public scene: THREE.Scene
    public glb: any 
    private loader: GLTFLoader
    public renderer: any

    constructor (scene: THREE.Scene, renderer: any) {
        super()
        this.scene = scene
        this.glb = null
        this.loader = new GLTFLoader();
        this.renderer = renderer
    }

    async load () {
        const glb: any = await new Promise(res => res(this.loader.loadAsync('kitchen_model/Küche Held4.glb')))
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

        const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        this.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04, 1, 3).texture;

        this.glb = glb
    }

    getGlbScene () {
        return this.glb.scene
    }
}

export default LoaderGLB