<template>
  <div class="layout"
       @dragover="dragOver($event)"
       @dragend.prevent="dragEnd($event)"
  >
    <div class="primary" :style="{ width: 'calc('+size+'% - 2.5px)'}">
      <LayoutArea :layout="layout.primary"></LayoutArea>
    </div>
    <div class="separator"
         draggable="true"
         @dragstart="dragStart($event)"
    ></div>
    <div class="secondary" :style="{ width: 'calc('+(100-size)+'% - 2.5px)'}">
      <LayoutArea :layout="layout.secondary"></LayoutArea>
    </div>
  </div>
</template>

<script>
 import { defineAsyncComponent } from 'vue'
 import LayoutArea from './LayoutArea.vue'
 import store from '../store/store.js'

 export default {
   name: 'HorizontalLayout',
   components: {
     LayoutArea: defineAsyncComponent(() => Promise.resolve(LayoutArea))
   },
   props: {
     activeWindow: Number,
     layout: Object,
     msg: String
   },
   computed:{
     size(){
       return store.state.size[this.layout.no]
     }
   },
   methods: {
     dragStart: ($event) => {
       console.log('start',[$event.clientX,$event.layerX,$event.offsetX,$event.pageX,$event.screenX])
     },
     dragEnd: ($event) => {
       console.log('end',[$event.clientX,$event.layerX,$event.offsetX,$event.pageX,$event.screenX])
     },
     dragOver: ($event) => {
       console.log('over',[$event.clientX,$event.layerX,$event.offsetX,$event.pageX,$event.screenX])
     },
     drag: ($event) => {
       console.log('drag',[$event.clientX,$event.layerX,$event.offsetX,$event.pageX,$event.screenX])
     },
   }
 }
</script>

<style scoped>
 .layout {
   width: 100%;
   height: 100%;
   display: flex;
 }
 .layout > *{
   height: 100%;
 }
 .separator{
   width: 5px;
   cursor: col-resize;
 }
</style>
