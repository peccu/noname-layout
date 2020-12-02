<template>
  <div class="tool">
    <h1>this is tool bar: active: {{activeWindow}}</h1>
    <button v-for="(key, i) in emits" :key="i" @click="$emit(key)">{{key}}</button>
  </div>
</template>

<script>
 const emits = [
   'enlarge', 'shrink', 'other-window',
   'split-below', 'split-right'
 ]
 export default {
   name: 'ToolBar',
   props: {
     msg: String,
     activeWindow: Number
   },
   emits: emits,
   data(){
     return {
       emits: emits
     }
   }
 }
</script>

<style>
 .tool{
   height: 40px;
   width: 100%;
 }
</style>
