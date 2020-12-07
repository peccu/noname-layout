<template>
  <div class="modeline">{{thisWindow}} U:**--F1 *scratch*  All L4 (Lisp Interaction)</div>
</template>

<script>
 export default {
   props: {
     thisWindow: Number
   }
 }
</script>

<style>
 .modeline{
   height: 1em;
   overflow-x: hidden;
 }
</style>
