<script setup>
    import MainCamera from '@/Cameras/MainCamera'
    import LoaderBIN from '@/Loaders/LoaderBIN'
    import * as THREE from 'three'
    import { ref, onMounted } from 'vue'

    const target = ref()

    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)

    const MainCameraInst = new MainCamera(renderer)
    MainCameraInst.init()

    const LoaderBinInst = new LoaderBIN(scene)
    LoaderBinInst.load()

    LoaderBinInst.onMeshUploaded.add(mesh => MainCameraInst.pointTheCameraAt(mesh))

    const camera = MainCameraInst.getCamera()

    function animate() {
        MainCameraInst.updateOrbit()
        renderer.render(scene, camera)
    }

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