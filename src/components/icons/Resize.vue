<template>
  <div @click="$emit('resize')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="20 20 60 60"
      version="1.1"
      x="0px"
      y="0px"
      class="resize"
    >
      <path
        d="M29.7042145,50.0035549 L37.3506611,57.6500015 L36.6435543,58.3571083 L27.7900009,49.5035549 L36.6435543,40.6500015 L37.3506611,41.3571083 L29.7042145,49.0035549 L47.9971077,49.0035549 L47.9971077,50.0035549 L29.7042145,50.0035549 Z M70.2928932,49.0035549 L62.6464466,41.3571083 L63.3535534,40.6500015 L72.2071068,49.5035549 L63.3535534,58.3571083 L62.6464466,57.6500015 L70.2928932,50.0035549 L52,50.0035549 L52,49.0035549 L70.2928932,49.0035549 Z"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'Resize',
  };
</script>

<style lang="scss" scoped>
  .resize {
    position: fixed;
    top: 0px;
    right: 10px;
    fill: #fff;
    height: 50px;
    cursor: pointer;
  }
</style>
