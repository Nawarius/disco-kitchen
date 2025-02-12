import * as THREE from 'three'
import type { IMeshSizes } from "./types"

class MeshDimensionsCalc {

    getMeshSizes (mesh: THREE.Mesh) {
        const [min, max] = this.getMinMax(mesh)
        
        const sizes: IMeshSizes = {
            width: Math.abs(min.x - max.x),
            height: Math.abs(min.y - max.y),
        }
       
        return sizes
    }

    getMinMax (mesh: THREE.Mesh) {
        const bbox = new THREE.Box3().setFromObject(mesh)

        return [bbox.min.clone(), bbox.max.clone()]
    }

    getMeshCenter (mesh: THREE.Mesh) {
        const [min, max] = this.getMinMax(mesh)
        return new THREE.Vector3(0, 0, 0).addVectors(max, min).divideScalar(2)
    }

    getMeshMaxSize (mesh: THREE.Mesh) {
        const sizes: IMeshSizes = this.getMeshSizes(mesh)
        return sizes.width > sizes.height ? sizes.width : sizes.height
    }
}

export default new MeshDimensionsCalc()