import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

class DoorGUI {
    public gui: GUI

    public observers: any = {
        onFinishChange: new Set(),
        onWidthChanged: new Set()
    }

    private params: any
    
    constructor () {
        this.gui = new GUI()
        this.params = { width: 1 }
        
        this.gui.add(this.params, 'width', 1, 1.5).step(0.05).name('Width').onChange(val => {
            this._notifyObserverByName('onWidthChanged', val)
        })

        this.gui.onFinishChange(() => {
            this._notifyObserverByName('onFinishChange', null)
        })
    }

    _notifyObserverByName (observerName: string, data: any) {
        for (let cb of this.observers[observerName]) cb(data)
    }
}

export default DoorGUI