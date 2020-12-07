<template>
  <div class="layout"
       @dragover="dragOver($event)"
       @dragend.prevent="dragEnd($event)"
  >
    <div class="top" :style="{ height: 'calc('+top+'% - 2.5px)'}">
      <WindowArea
        :activeWindow="activeWindow"
        :thisWindow="1"
        @enlarge-text="postFontSize += $event"
        @enlarge="enlarge(1)"
        @shrink="shrink(1)"
      ><slot name="top"></slot></WindowArea>
    </div>
    <div class="separator"
         draggable="true"
         @dragstart="dragStart($event)"
    ></div>
    <div class="bottom" :style="{ height: 'calc('+(100-top)+'% - 2.5px)'}">
      <WindowArea
        :activeWindow="activeWindow"
        :thisWindow="2"
        @enlarge-text="postFontSize += $event"
        @enlarge="shrink(2)"
        @shrink="enlarge(2)"
      ><slot name="bottom"></slot></WindowArea>
    </div>
  </div>
</template>

<script>
 import WindowArea from './WindowArea.vue'
 export default {
   name: 'VerticalLayout',
   components: {
     WindowArea
   },
   data(){
     return {top: 50}
   },
   props: {
     activeWindow: Number,
     msg: String
   },
   methods: {
     enlarge(){
       console.log('enlarge')
       this.top += 10;
     },
     shrink(){
       console.log('shrink')
       this.top -= 10;
     },
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
