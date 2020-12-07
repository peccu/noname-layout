<template>
  <WindowArea
    v-if="layout.type == 'buffer'"
    :buffer="layout.buffer"
    :thisWindow="layout.no"
  ></WindowArea>
  <VerticalLayout
    v-else-if="layout.type == 'vertical'"
    :layout="layout"
  ></VerticalLayout>
  <HorizontalLayout
    v-else-if="layout.type == 'horizontal'"
    :layout="layout"
  ></HorizontalLayout>
  <template V-else>
    Something wrong
  </template>
</template>

<script>
 import HorizontalLayout from './HorizontalLayout.vue'
 import VerticalLayout from './VerticalLayout.vue'
 import WindowArea from './WindowArea.vue'
 export default {
   name: 'LayoutArea',
   components: {
     WindowArea,
     VerticalLayout,
     HorizontalLayout
   },
   props: {
     layout: Object,
     no: Number
   }
 }
</script>

<style>
</style>
