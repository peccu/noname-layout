<template>
  <div class="layout">
    <div class="left" :style="{ width: 'calc('+left+'% - 2.5px)'}">
      <slot name="left"></slot>
    </div>
    <div class="separator"></div>
    <div class="right" :style="{ width: 'calc('+(100-left)+'% - 2.5px)'}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
name: 'VerticalLayout',
props: {
left: Number,
msg: String
}
}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
}
.layout > *{
  height: 100%;
}
.separator{
  width: 5px;
cursor: col-resize;
}
</style>
