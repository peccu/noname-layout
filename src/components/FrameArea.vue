<template>
  <ToolBar
    :windowCount="windowCount"
    @other-window="otherWindow()"
    @split-below="splitBelow()"
    @split-right="splitRight()"
    @enlarge="enlarge()"
    @shrink="shrink()"
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
     splitBelow(){
       console.log('before')
       this.$store.commit('splitBelow', {nth: this.activeWindow, currentWindow: {buffer: "some buffer"}})
       console.log(this.$store.state.windows)
     },
     splitRight(){
       this.$store.commit('splitRight', {nth: this.activeWindow, currentWindow: {buffer: "some buffer"}})
       console.log(this.$store.state.windows)
     },
     enlarge(){
       this.$store.commit('enlarge')
     },
     shrink(){
       this.$store.commit('shrink')
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
