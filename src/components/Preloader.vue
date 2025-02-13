<script>
</script>

<template>
<div id = "preloader_wrap" class = "preloader_wrap">
  <div class="lds-dual-ring"></div>
  <span id = "preloader_progress">Loading is started. Please, wait.</span>
</div>
</template>

<style scoped>
.preloader_wrap {
    background-color: white;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.lds-dual-ring,
.lds-dual-ring:after {
  box-sizing: border-box;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6.4px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>