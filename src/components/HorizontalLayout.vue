<template>
  <div class="layout"
              @dragover="dragOver($event)"
       @dragend.prevent="dragEnd($event)"
       >
    <div class="left" :style="{ width: 'calc('+left+'% - 2.5px)'}">
      <!-- <slot name="left"></slot> -->
          <button @click="enlarge()">enlarge</button>
          <button @click="shrink()">shrink</button>
    </div>
    <div class="separator"
             draggable="true"
             @dragstart="dragStart($event)"
         ></div>
    <div class="right" :style="{ width: 'calc('+(100-left)+'% - 2.5px)'}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
name: 'HorizontalLayout',
data(){
return {
left: 30
}
},
props: {
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
