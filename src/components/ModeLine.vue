<template>
  <div class="modeline" :class="{active: activeWindow == thisWindow}">{{thisWindow}} U:**--F1 *scratch*  All L4 (Lisp Interaction)</div>
</template>

<script>
 export default {
   props: {
     activeWindow: Number,
     thisWindow: Number
   }
 }
</script>

<style>
 .modeline{
   height: 1em;
   overflow-x: hidden;
 }
 .modeline.active{
   background-color: lightblue;
 }
</style>
