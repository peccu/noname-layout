<template>
  <div class="layout"
       @dragover="dragOver($event)"
       @dragend.prevent="dragEnd($event)"
  >
    <div class="left" :style="{ width: 'calc('+left+'% - 2.5px)'}">
      <WindowArea
        :activeWindow="activeWindow"
        :thisWindow="0"
        @enlarge="enlarge(1)"
        @shrink="shrink(1)"
      ><slot name="left"></slot></WindowArea>
    </div>
    <div class="separator"
         draggable="true"
         @dragstart="dragStart($event)"
    ></div>
    <div class="right" :style="{ width: 'calc('+(100-left)+'% - 2.5px)'}">
      <!-- ここがwindow areaじゃなくて、layoutに置き換わらないといけないみたい。
           となるとこのコンポーネントにwindowareaをおいちゃうと困る
      -->
      <WindowArea
        v-if="false"
        :activeWindow="activeWindow"
        :thisWindow="1"
        @enlarge-text="postFontSize += $event"
        @enlarge="shrink(2)"
        @shrink="enlarge(2)"
      ><slot name="right"></slot></WindowArea>
      <slot v-else name="right"></slot>
    </div>
  </div>
</template>

<script>
 import WindowArea from './WindowArea.vue'
 export default {
   name: 'HorizontalLayout',
   components: {
     WindowArea
   },
   data(){
     return {
       left: 50
     }
   },
   props: {
     activeWindow: Number,
     msg: String
   },
   methods: {
     enlarge(){
       this.left += 10;
     },
     shrink(){
       this.left -= 10;
     },
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
