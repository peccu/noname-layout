<template>
  <div class="tool">
    <h1>this is tool bar: active: {{activeWindow}} in {{windowCount}} windows</h1>
    <button v-for="(key, i) in emits" :key="i" @click="$emit(key)">{{key}}</button>
  </div>
</template>

<script>
 import store from '../store/store.js'
 const emits = [
   'enlarge-window', 'shrink-window', 'enlarge-window-horizontally', 'shrink-window-horizontally', 'other-window',
   'split-below', 'split-right'
 ]
 export default {
   name: 'ToolBar',
   props: {
     msg: String,
     windowCount: Number
   },
   emits: emits,
   data(){
     return {
       emits: emits
     }
   },
   computed:{
     activeWindow(){
       return store.state.activeWindow
     }
   }
 }
</script>

<style>
 .tool{
   height: 40px;
   width: 100%;
 }
</style>
