<script setup>
    import MainCamera from '@/Cameras/MainCamera'
    import LoaderBIN from '@/Loaders/LoaderBIN'
    import LoaderGLB from '@/Loaders/LoaderGLB'

    import * as THREE from 'three'
    import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
    import { ref, onMounted } from 'vue'
    import DoorGUI from '@/GUI/DoorGUI'
    import AnimationGLB from '@/Animation/AnimationGLB'

    const emit = defineEmits(['loadingInProgress', 'loadingIsComplete'])

    const target = ref()

    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)

    const pmremGenerator = new THREE.PMREMGenerator(renderer )
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04, 1, 3).texture

    const light = new THREE.PointLight( 0xffffbb, 100, 100 );
    light.castShadow = true
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500

    // Cube light
    const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const cube = new THREE.Mesh(geometry);
    
    const pos = new THREE.Vector3(2.5, 3, -2.5)
    cube.position.set(pos.x, pos.y, pos.z)
    light.position.set(pos.x, pos.y, pos.z)

    scene.add(cube)
    scene.add(light)

    // Perspective camera
    const MainCameraInst = new MainCamera(renderer)
    MainCameraInst.init()

    // Upload door from bins
    const LoaderBinInst = new LoaderBIN(scene)
    LoaderBinInst.load()
    LoaderBinInst.observers.onMeshUploaded.add(mesh => MainCameraInst.pointTheCameraAtMesh(mesh))

    // Animate Disco floor
    const AnimInst = new AnimationGLB()

    // Upload kitchen from gltf
    const LoaderGlbInst = new LoaderGLB(scene)
    LoaderGlbInst.load()
    LoaderGlbInst.observers.onMeshUploaded.add(() => {
        AnimInst.setGLB(LoaderGlbInst.getGLB())
        
        emit('loadingIsComplete')
    })

    LoaderGlbInst.onLoadingProcess.add(mbs => {
        emit('loadingInProgress', mbs)
    })

    // Door width change gui
    const DoorGuiInst = new DoorGUI()
    DoorGuiInst.observers.onWidthChanged.add(width => {
        MainCameraInst.blockCamera(true)

        const door_mesh = LoaderBinInst.getMesh()
        if (door_mesh) door_mesh.scale.set(1, 1, width)
    })

    DoorGuiInst.observers.onFinishChange.add(() => MainCameraInst.blockCamera(false))

    // Anim Loop
    function animate () {
        MainCameraInst.updateCamera()
        AnimInst.animate()
        renderer.render(scene, MainCameraInst.getCamera())

        const door_mesh = LoaderBinInst.getMesh()
        if (door_mesh) door_mesh.rotation.y += 0.01
    }

    // Resize
    window.addEventListener('resize', () => {
        MainCameraInst.getCamera().aspect = window.innerWidth / window.innerHeight
        MainCameraInst.getCamera().updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    onMounted(() => {
        target.value.appendChild(renderer.domElement)
        animate()
    })
</script>

<template>
    <div ref="target" id = "three_container"></div>
</template>

<style>

</style>