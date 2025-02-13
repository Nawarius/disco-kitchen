import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import type { IDoorGUIObservers, IDoorGUIParams } from './types';

class DoorGUI {
    public gui: GUI = new GUI()

    public observers: IDoorGUIObservers = {
        onFinishChange: new Set(),
        onWidthChanged: new Set()
    }

    private params: IDoorGUIParams = { width: 1 }
    
    constructor () {
        this.gui.add(this.params, 'width', 1, 1.5).step(0.05).name('Width').onChange(val => {
            this._notifyObserverByName('onWidthChanged', val)
        })

        this.gui.onFinishChange(() => {
            this._notifyObserverByName('onFinishChange', null)
        })
    }

    _notifyObserverByName (observerName: string, data: any) {
        for (let cb of this.observers[observerName as keyof IDoorGUIObservers]) cb(data)
    }
}

export default DoorGUI