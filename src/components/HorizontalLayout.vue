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
 import splitlayout from './splitlayout.js'
 export default splitlayout()
</script>

<style scoped>
 .layout {
   height: 100%;
   width: 100%;
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
