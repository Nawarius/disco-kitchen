<script setup>
import Preloader from './components/Preloader.vue'
import ThreeScene from './components/ThreeScene.vue'
import { ref } from 'vue'

const loadingProgress = ref(0)
const isLoadingDisplayed = ref(true)

const hideLoading = () => isLoadingDisplayed.value = false;
const updateLoadingProgress = (val) => loadingProgress.value = val

</script>

<template>
    <Preloader :loadingProgress = "loadingProgress" v-if = "isLoadingDisplayed" />
    <ThreeScene @loadingInProgress = "updateLoadingProgress" @loadingIsComplete = "hideLoading" />
</template>

<style>
* {
    margin: 0px;
    padding: 0px;
}
#app {
    width: 100%;
    height: 100%;
}
html {
    width: 100%;
    height: 100%;
}
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>