<template>
  <div class="table">
    <div class="table-header">
      <h1 class="title" v-for="title in titles" :key="title.id">
        <span
          class="letter"
          :style="{ color: colors[i] }"
          v-for="(letter, i) in title"
          :key="letter.id"
          >{{ letter }}</span
        >
      </h1>
    </div>
    <div class="table-body" v-for="product in products" :key="product._id">
      <div class="table-item" name="chain">
        {{ product.product_category }}
      </div>
      <div class="table-item" name="name">
        {{ product.product_name }}
      </div>
      <div class="table-item" name="price">
        {{ product.price }}
      </div>
      <div class="table-item" name="unit">
        {{ product.unit }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GroceryItem',
    props: ['products', 'colors'],
    data() {
      return {
        name: '',
        price: 0,
        unit: '',
        chain: '',
        titles: ['category', 'name', 'price', 'unit'],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .table {
    margin-top: 5vh;

    &-header,
    &-body {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-content: space-between;
      text-transform: capitalize;
      cursor: default;
    }

    &-body {
      transition: color 1500ms linear, background 1500ms linear;

      &:nth-child(even) {
        background: rgba(#1a2530, 0.2);
      }

      &:hover {
        color: #1a2530;
        background: rgba(#f4f4f4, 0.6);
      }
    }

    &-item {
      padding: 5px;
    }

    .control {
      display: flex;
      align-items: center;
    }
  }
</style>
