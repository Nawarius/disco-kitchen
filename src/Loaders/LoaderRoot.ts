import * as THREE from 'three'
import type { ILoaderRootObservers } from './types'

class LoaderRoot {

    public onLoadingProcess: Set<any> = new Set()

    public observers: ILoaderRootObservers = {
        onMeshUploaded: new Set(),
    }

    _notifyObserverByName (observerName: string, mesh: THREE.Mesh) {
        for (let cb of this.observers[observerName as keyof ILoaderRootObservers]) cb(mesh)
    }

    _notifyOnLoadingProcess (val: number) {
        for (let cb of this.onLoadingProcess) cb(val)
    }
}

export default LoaderRoot