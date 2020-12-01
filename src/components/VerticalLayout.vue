<template>
  <div class="layout"
       @dragover="dragOver($event)"
       @dragend.prevent="dragEnd($event)"
       >
        <div class="top" :style="{ height: 'calc('+top+'% - 2.5px)'}">
          <!-- <slot name="top"></slot> -->
          <button @click="enlarge()">enlarge</button>
          <button @click="shrink()">shrink</button>
        </div>
        <div class="separator"
             draggable="true"
             @dragstart="dragStart($event)"
             ></div>
        <div class="bottom" :style="{ height: 'calc('+(100-top)+'% - 2.5px)'}">
          <slot name="bottom" @enlarge="enlarge()" @shrink="shrink()"></slot>
        </div>
      </div>
</template>

<script>
export default {
name: 'VerticalLayout',
data(){
return {top: 40}
},
  props: {
    msg: String
},
methods: {
enlarge(){
this.top += 10;
},
shrink(){
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
