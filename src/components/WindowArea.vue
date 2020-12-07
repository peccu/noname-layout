<template>
  <div class="windowarea">
    <HeaderLine
      :thisWindow="thisWindow"
      :activeWindow="activeWindow"
    ></HeaderLine>
    <div class="main">
      <pre>
;; This buffer is for text that is not saved, and for Lisp evaluation.
;; To create a file, visit it with C-x C-f and enter text in its buffer.
      </pre>
      <div>
        <slot></slot>
      </div>
      <button @click="$emit('enlarge')">enlarge</button>
      <button @click="$emit('shrink')">shrink</button>
      <button @click="$emit('enlarge-text', 1.0)">
        Enlarge text
      </button>
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
 export default {
   name: 'WindowArea',
   components: {
     HeaderLine,
     ModeLine
   },
   props: {
     msg: String,
     activeWindow: Number,
     thisWindow: Number
   },
   emits: ['enlarge', 'shrink', 'enlarge-text']
 }
</script>

<style>
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
