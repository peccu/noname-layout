<template>
<div class="windowarea">
  <div class="header">header area</div>
  <div class="main">
    this is window area top:{{top}}
    <slot></slot>
  </div>
  <div class="footer">menubar</div>
  </div>
</template>

<script>
// need to set correct width and height from surround objects

export default {
  name: 'WindowArea',
props: {
    msg: String
}
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
.header, .footer{
  height: 1em;
}
.main{
  height: calc(100% - 2em);
  background: #aaa;
}

</style>
