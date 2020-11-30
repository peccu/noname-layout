<template>
<ToolBar/>
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
        <WindowArea>right bottom</WindowArea>
      </template>
    </VerticalLayout>
  </template>
</HorizontalLayout>
</div>
<MiniBuffer/>
</template>

<script>
 import ToolBar from './components/ToolBar.vue'
 import MiniBuffer from './components/MiniBuffer.vue'
 import HorizontalLayout from './components/HorizontalLayout.vue'
 import VerticalLayout from './components/VerticalLayout.vue'
 import WindowArea from './components/WindowArea.vue'

 export default {
   name: 'App',
   components: {
ToolBar,
MiniBuffer,
WindowArea,

     VerticalLayout,
     HorizontalLayout
   }
 }
</script>

<style>
@import "./assets/reset.css";
#app {
   text-align: center;
   margin: 0;
   padding: 0;
   height: 100vh;
   width: 100vw;
 }
 * { box-sizing: border-box; }
.outer{
  height: calc(100vh - 40px - 1em);
  width: 100vw;
  display: flex;
}
.separator{
    background: #333;
}
</style>
