<template>
  <div class="header" :class="{active: activeWindow == thisWindow}">header area </div>
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
 .header{
   height: 1em;
   overflow-x: hidden;
 }
 .header.active{
   background-color: lightblue;
 }
</style>
