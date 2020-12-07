<template>
  <ToolBar :activeWindow="activeWindow"
       :windowCount="windowCount"
       @other-window="otherWindow()"
       @split-below="splitBelow()"
       @split-right="splitRight()"
       @enlarge="enlarge()"
       @shrink="shrink()"
  />
  <div class="outer">
    <HorizontalLayout :activeWindow="activeWindow">
      <template v-slot:left>
        left
      </template>
      <template v-slot:right>
        <VerticalLayout :activeWindow="activeWindow">
          <template v-slot:top>
            right top
          </template>
          <template v-slot:bottom>
            right bottom {{postFontSize}} aaa<TestRender></TestRender>bbb
          </template>
        </VerticalLayout>
      </template>
    </HorizontalLayout>
  </div>
  <MiniBuffer/>
</template>

<script>
 import ToolBar from './ToolBar.vue'
 import TestRender from './TestRender.vue'
 import MiniBuffer from './MiniBuffer.vue'
 import HorizontalLayout from './HorizontalLayout.vue'
 import VerticalLayout from './VerticalLayout.vue'
 /* import WindowArea from './WindowArea.vue' */

 import store from '../store/store.js'

 export default {
   name: 'Frame',
   components: {
     ToolBar,
     MiniBuffer,
     /* WindowArea, */
     VerticalLayout,
     HorizontalLayout,
     TestRender
   },
   data(){
     return {
       postFontSize: 10.0,
       activeWindow: 0
     }
   },
   computed:{
     windowCount(){
       return store.state.windows.length
     }
   },
   methods:{
     otherWindow(){
       this.activeWindow = (this.activeWindow + 1) % this.windowCount
     },
     splitBelow(){
       console.log('before')
       this.$store.commit('splitBelow', {nth: this.activeWindow, currentWindow: {buffer: "some buffer"}})
       console.log(this.$store.state.windows)
       this.windowCount = this.$store.state.windows.length
     },
     splitRight(){
       this.$store.commit('splitRight', {nth: this.activeWindow, currentWindow: {buffer: "some buffer"}})
       console.log(this.$store.state.windows)
       this.windowCount = this.$store.state.windows.length
     }
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
