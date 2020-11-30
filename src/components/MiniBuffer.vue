<template>
  <div class="minibuffer">
    this is minibuffer
  </div>
</template>

<script>
export default {
  name: 'MiniBuffer',
  props: {
    msg: String
  }
}
</script>

<style>
.minibuffer{
  height: 1em;
  width: 100%;
}
</style>
