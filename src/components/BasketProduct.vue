<template>
  <div>
    <span>{{ name }}</span>
    <span> / quantity: {{ quantity }}</span>
  </div>
</template>

<script>
export default {
  name: "basket-product",
  props: ["name", "quantity"]
};
</script>