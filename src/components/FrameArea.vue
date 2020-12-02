<template>
  <ToolBar :activeWindow="activeWindow" @other-window="otherWindow()"/>
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
            <WindowArea @enlarge-text="postFontSize += $event">right bottom {{postFontSize}}</WindowArea>
          </template>
        </VerticalLayout>
      </template>
    </HorizontalLayout>
  </div>
  <MiniBuffer/>
</template>

<script>
 import ToolBar from './ToolBar.vue'
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
     HorizontalLayout
   },
   data(){
     return {
       postFontSize: 10.0,
       activeWindow: 0
     }
   },
   methods:{
     otherWindow(){
       this.activeWindow += 1
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
