<template>
<div class="tool">
  <h1>this is tool bar: active: {{activeWindow}}</h1>
    <button @click="$emit('enlarge')">enlarge</button>
    <button @click="$emit('shrink')">shrink</button>
  <button @click="$emit('other-window')">other-window</button>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
msg: String,
activeWindow: Number
},
emits: ['enlarge', 'shrink', 'other-window'],
onmount(){
}

}
</script>

<style>
.tool{
  height: 40px;
  width: 100%;
}
</style>
