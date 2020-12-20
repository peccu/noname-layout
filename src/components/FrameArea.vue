<template>
  <ToolBar
    :windowCount="windowCount"
    @other-window="otherWindow()"
    @split-below="splitWindowBelow()"
    @split-right="splitWindowRight()"
    @enlarge-window="enlargeWindow()"
    @shrink-window="shrinkWindow()"
    @enlarge-window-horizontally="enlargeWindowHorizontally()"
    @shrink-window-horizontally="shrinkWindowHorizontally()"
  />
  <div class="outer">
    <LayoutArea :layout="layout"></LayoutArea>
  </div>
  <MiniBuffer/>
</template>

<script>
 import ToolBar from './ToolBar.vue'
 import MiniBuffer from './MiniBuffer.vue'
 import LayoutArea from './LayoutArea.vue'

 import store from '../store/store.js'

 export default {
   name: 'Frame',
   components: {
     ToolBar,
     MiniBuffer,
     LayoutArea,
   },
   data(){
     return {
       postFontSize: 10.0
     }
   },
   computed:{
     windowCount(){
       return store.state.windows.length
     },
     layout(){
       return store.state.layout
     }
   },
   methods:{
     otherWindow(){
       this.$store.commit('otherWindow')
     },
     splitWindowBelow(){
       console.log('before')
       this.$store.commit('splitWindowBelow', {nth: this.activeWindow, currentWindow: {buffer: "some buffer"}})
       console.log(this.$store.state.windows)
     },
     splitWindowRight(){
       this.$store.commit('splitWindowRight', {nth: this.activeWindow, currentWindow: {buffer: "some buffer"}})
       console.log(this.$store.state.windows)
     },
     enlargeWindow(){
       this.$store.commit('enlargeWindow')
     },
     shrinkWindow(){
       this.$store.commit('shrinkWindow')
     },
     enlargeWindowHorizontally(){
       this.$store.commit('enlargeWindowHorizontally')
     },
     shrinkWindowHorizontally(){
       this.$store.commit('shrinkWindowHorizontally')
     },
   }
 }
</script>

<style>
 .outer{
   height: calc(100vh - 40px - 1em);
   width: 100vw;
   display: flex;
 }
 .separator{
   background: #333;
 }
</style>
