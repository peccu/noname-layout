<template>
  <div class="windowarea">
    <HeaderLine
      :thisWindow="thisWindow"
      :activeWindow="activeWindow"
    ></HeaderLine>
    <div class="main noscrollbar">
      <pre>
;; This buffer is for text that is not saved, and for Lisp evaluation.
;; To create a file, visit it with C-x C-f and enter text in its buffer.
      </pre>
      <div>buffer name: {{buffer}}</div>
      <div>
        <slot></slot>
      </div>
    </div>
    <ModeLine
      :thisWindow="thisWindow"
      :activeWindow="activeWindow"
    ></ModeLine>
  </div>
</template>

<script>
 // need to set correct width and height from surround objects
 /* これはもしかしてウィンドウではなくバッファ？ */

 import HeaderLine from './HeaderLine.vue'
 import ModeLine from './ModeLine.vue'

 import store from '../store/store.js'

 export default {
   name: 'WindowArea',
   components: {
     HeaderLine,
     ModeLine
   },
   props: {
     buffer: String,
     thisWindow: Number
   },
   emits: ['enlarge', 'shrink', 'enlarge-text'],
   computed:{
     activeWindow(){
       return store.state.activeWindow
     }
   }
 }
</script>

<style>
 @import './noscrollbar.css';
 .windowarea {
   width: 100%;
   height: 100%;
   background: #777;
   margin: 0px;
   padding: 0px;
   display: flex;
   flex-direction: column;
 }
 .main{
   height: calc(100% - 2em);
   background: #aaa;
   overflow: scroll;
 }
</style>
