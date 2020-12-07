<template>
  <div class="layout"
       @dragover="dragOver($event)"
       @dragend.prevent="dragEnd($event)"
  >
    <div class="primary" :style="{ height: 'calc('+size+'% - 2.5px)'}">
      <LayoutArea :layout="layout.primary"></LayoutArea>
    </div>
    <div class="separator"
         draggable="true"
         @dragstart="dragStart($event)"
    ></div>
    <div class="secondary" :style="{ height: 'calc('+(100-size)+'% - 2.5px)'}">
      <LayoutArea :layout="layout.secondary"></LayoutArea>
    </div>
  </div>
</template>

<script>
 import { defineAsyncComponent } from 'vue'
 import LayoutArea from './LayoutArea.vue'
 import store from '../store/store.js'

 export default {
   name: 'VerticalLayout',
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
       console.log('start',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
     },
     dragEnd: ($event) => {
       console.log('end',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
     },
     dragOver: ($event) => {
       console.log('over',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
     },
     drag: ($event) => {
       console.log('drag',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
     },
   }
 }
</script>

<style scoped>
 .layout {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
 }
 .layout > *{
   width: 100%;
 }
 .separator{
   height: 5px;
   cursor: row-resize;
 }
</style>
