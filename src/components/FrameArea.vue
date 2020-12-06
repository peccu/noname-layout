<template>
  <ToolBar :activeWindow="activeWindow"
       :windowCount="windowCount"
       @other-window="otherWindow()"
       @split-below="splitBelow()"
       @split-right="splitRight()"
       @enlarge="enlarge()"
       @shrink="shrink()"
  />
  <component :is="test"/>
  <div class="outer">
    <HorizontalLayout>
      <template v-slot:left>
        <WindowArea>left</WindowArea>
      </template>
      <template v-slot:right>
        <VerticalLayout>
          <template v-slot:top>
            <WindowArea>right top</WindowArea>
          </template>
          <template v-slot:bottom>
            <WindowArea @enlarge-text="postFontSize += $event">right bottom {{postFontSize}} aaa<TestRender></TestRender>bbb</WindowArea>
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
 import WindowArea from './WindowArea.vue'

 export default {
   name: 'Frame',
   components: {
     ToolBar,
     MiniBuffer,
     WindowArea,
     VerticalLayout,
     HorizontalLayout,
     TestRender
   },
   data(){
     return {
       postFontSize: 10.0,
       activeWindow: 0,
       windowCount: 0
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
     },
     enlarge(){
     },
     shrink(){
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
