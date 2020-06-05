<template>
  <div class="product">
    <div class="content">
      <span>{{ product.name }}</span>
      <span> {{ product.quantity | overOne }}</span>
    </div>
    <div class="product-amount-control">
      <span class="item" :class="[theme.dark ? 'item-dark' : 'item-light']" @click="decrement">-</span>
      /
      <span class="item" :class="[theme.dark ? 'item-dark' : 'item-light']" @click="increment">+</span>
    </div>
  </div>
</template>

<script>
  import { ACTIONS } from '../store/variables';

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
        this.$store.dispatch(ACTIONS.REMOVE_PRODUCT, this.product._id);
        this.$store.dispatch(ACTIONS.DECREMENT);
      },
      increment() {
        this.$store.dispatch(ACTIONS.ADD_PRODUCT, this.product);
        this.$store.dispatch(ACTIONS.INCREMENT);
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

  .product {
    min-width: 100%;
    margin-right: 20px;
  }

  .product,
  .product-amount-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product-amount-control {
    padding: 0 16px;

    .item {
      transition: filter 250ms ease;
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
