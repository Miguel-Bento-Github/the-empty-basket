<template>
  <div class="product">
    <div class="content">
      <span>{{ product.name }}</span>
      <span> {{ product.quantity | overOne }}</span>
    </div>
    <div class="product-amount-control">
      <span
        class="item"
        :class="[theme.dark ? 'item-dark' : 'item-light']"
        @click="decrement"
        >-</span
      >
      /
      <span
        class="item"
        :class="[theme.dark ? 'item-dark' : 'item-light']"
        @click="increment"
        >+</span
      >
    </div>
  </div>
</template>

<script>
  import { REMOVE_PRODUCT, ADD_PRODUCT } from '../store/mutation-types';
  export default {
    name: 'basket-product',
    props: {
      product: {
        type: Object,
        required: false,
        default: null,
      },
      theme: {
        type: Object,
        required: true,
        default: null,
      },
    },
    methods: {
      decrement() {
        const payload = {
          id: this.product._id,
          quantity: this.product.quantity,
        };

        this.$store.dispatch(REMOVE_PRODUCT, payload);
      },
      increment() {
        this.$store.dispatch(ADD_PRODUCT, this.product);
      },
    },
    filters: {
      overOne(amount) {
        return amount > 1 ? `x${amount}` : '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../colors.scss';

  .product,
  .product-amount-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product-amount-control {
    padding-left: 16px;

    .item {
      &:hover {
        cursor: pointer;
      }

      &-light:hover {
        filter: drop-shadow(0 0 2px $dark);
      }

      &-dark:hover {
        filter: drop-shadow(0 0 2px $light);
      }
    }
  }
</style>
