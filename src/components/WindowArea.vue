<template>
  <div class="windowarea">
    <div class="header" :style="{backgroundColor: (activeWindow == thisWindow ? 'white' : 'inherit' )}">header area</div>
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
    <div class="modeline">-=--:**--F1 *scratch*  All L4 (Lisp Interaction)</div>
  </div>
</template>

<script>
 // need to set correct width and height from surround objects
 /* これはもしかしてウィンドウではなくバッファ？ */

 export default {
   name: 'WindowArea',
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
 .header, .modeline{
   height: 1em;
 }
 .main{
   height: calc(100% - 2em);
   background: #aaa;
 }

</style>
