<template>
      <div class="layout">
        <div class="top" :style="{ height: 'calc('+top+'% - 2.5px)'}">
          <slot name="top"></slot>
        </div>
        <div class="separator"></div>
        <div class="bottom" :style="{ height: 'calc('+(100-top)+'% - 2.5px)'}">
          <slot name="bottom"></slot>
        </div>
      </div>
</template>

<script>
export default {
  name: 'HorizontalLayout',
  props: {
top: Number,
    msg: String
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.layout > *{
  width: 100%;
}
.separator{
  height: 5px;
cursor: row-resize;
}
</style>
