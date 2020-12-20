<template>
  <FrameArea/>
</template>

<script>
 import FrameArea from './components/FrameArea.vue'

 export default {
   name: 'App',
   components: {
     FrameArea,
   }
 }
</script>

<style>
 @import "./assets/reset.css";
 * {
   box-sizing: border-box;
   touch-action: manipulation;
 }
 #app {
   height: 100vh;
   width: 100vw;
 }
</style>
