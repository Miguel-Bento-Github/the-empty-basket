<template>
  <div class="network-error">
    There's a connection problem. Offline mode is now on.
  </div>
</template>

<script>
  export default {
    name: 'network-error',
  };
</script>
<style lang="scss" scoped>
  .network-error {
    color: #ff8b8b;
    background: #111;
    text-align: center;
    width: max-content;
    border-radius: 8px;
    padding: 8px 16px;
  }
</style>
