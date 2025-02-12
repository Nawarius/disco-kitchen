import * as THREE from 'three'
import type { ILoaderRootObservers } from './types'

class LoaderRoot {

    public observers: ILoaderRootObservers = {
        onMeshLoading: new Set(),
        onMeshUploaded: new Set(),
    }

    _notifyObserverByName (observerName: string, mesh: THREE.Mesh) {
        for (let cb of this.observers[observerName as keyof ILoaderRootObservers]) cb(mesh)
    }
}

export default LoaderRoot