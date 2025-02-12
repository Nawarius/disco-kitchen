import * as THREE from 'three'
import type { ILoaderBinUploadData } from './types'

class LoaderBIN {

    public scene: THREE.Scene
    private uploadData: ILoaderBinUploadData = { 
        indices: new ArrayBuffer(), 
        positions: new ArrayBuffer(), 
        normals: new ArrayBuffer(), 
        uvs: new ArrayBuffer()
    }

    public onMeshUploaded: Set<any> = new Set()

    constructor (scene: THREE.Scene) {
        this.scene = scene
    }

    _notifyonMeshUploaded (mesh: THREE.Mesh) {
        for (let cb of this.onMeshUploaded) cb(mesh)
    }

    async load () {
    
        for (let key in this.uploadData) {
            this.uploadData[key as keyof ILoaderBinUploadData] = await fetch(`/door_data/${String(key)}.bin`).then(async (r) => await r.arrayBuffer())
        }
    
        const indices = new Uint16Array(this.uploadData.indices)
        const positions = new Float32Array(this.uploadData.positions)
        const normals = new Float32Array(this.uploadData.normals)
        const uvs = new Float32Array(this.uploadData.uvs)
    
        const geometry = new THREE.BufferGeometry()
        geometry.setIndex(new THREE.BufferAttribute(indices, 1))
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    
        const texture = await new THREE.TextureLoader().loadAsync('public/door_data/texture.png' ); 
    
        const material = new THREE.MeshBasicMaterial({ 
            map: texture, 
            aoMap: texture, 
            specularMap: texture,
            side: 2
        });
    
        if (material && material.map) {
            material.map.colorSpace = 'srgb'
            material.map.flipY = false
        }
        
        const mesh = new THREE.Mesh(geometry, material)
        this.scene.add(mesh)
    
        this._notifyonMeshUploaded(mesh)
    }
}

export default LoaderBIN