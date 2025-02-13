<script setup>
    import MainCamera from '@/Cameras/MainCamera'
    import LoaderBIN from '@/Loaders/LoaderBIN'
    import LoaderGLB from '@/Loaders/LoaderGLB'
    import Preloader from './Preloader.vue'

    import * as THREE from 'three'
    import { ref, onMounted } from 'vue'
    

    const target = ref()

    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)
    //const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10 );
    //scene.add( light )

    const light = new THREE.PointLight( 0xffffbb, 100, 100 );
    light.castShadow = true

    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500

    const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 ); 
    const cube = new THREE.Mesh( geometry ); 
    
    const pos = new THREE.Vector3(2.5, 3, -2.5)
    cube.position.set(pos.x, pos.y, pos.z)
    light.position.set(pos.x, pos.y, pos.z)

    scene.add( cube )
    scene.add( light )

    const MainCameraInst = new MainCamera(renderer)
    MainCameraInst.init()

    // Upload door from bins
    const LoaderBinInst = new LoaderBIN(scene)
    LoaderBinInst.load()
    LoaderBinInst.observers.onMeshUploaded.add(mesh => MainCameraInst.pointTheCameraAtMesh(mesh))

    // Upload kitchen from gltf
    const LoaderGlbInst = new LoaderGLB(scene, renderer)
    LoaderGlbInst.load()

    const camera = MainCameraInst.getCamera()

    function animate () {
        MainCameraInst.updateCamera()
        renderer.render(scene, camera)
    }

    onMounted(() => {
        target.value.appendChild(renderer.domElement)
        animate()
    })
</script>

<template>
    <Preloader />
    <div ref="target" id = "three_container"></div>
</template>

<style>

</style>