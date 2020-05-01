<template>
  <div>
    <span>{{ name }}</span>
    <span> x{{ quantity }}</span>
  </div>
</template>

<script>
export default {
  name: "basket-product",
  props: ["name", "quantity"]
};
</script>