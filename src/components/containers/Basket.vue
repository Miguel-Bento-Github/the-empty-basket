<template>
  <transition name="slide-fade">
    <div
      v-if="basket.length > 0"
      @click="handleVisibility"
      :class="{ hide: hide }"
      class="basket"
    >
      <header class="header">
        <h1 class="title">Basket</h1>
      </header>
      <basket-product
        v-for="product in basket"
        :name="product.name"
        :quantity="product.quantity"
        :key="product._id"
      />
      <footer class="footer">
        <h2>Total: €{{ totalPrice }}</h2>
        <h2>Estimated weight: {{ totalWeight }}</h2>
      </footer>
    </div>
  </transition>
</template>

<script>
  import store from '../../store/index';
  import BasketProduct from '../BasketProduct';

  export default {
    store,
    name: 'basket',
    components: {
      BasketProduct,
    },
    data() {
      return {
        hide: false,
      };
    },
    methods: {
      handleVisibility() {
        this.hide = !this.hide;
      },
    },
    computed: {
      basket() {
        return store.state.basket;
      },
      totalPrice() {
        return store.getters.totalPrice;
      },
      totalWeight() {
        return store.getters.totalWeight;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .basket {
    background: #2c3e50;
    color: #f4f4f4;
    max-width: max-content;
    padding: 5px 10px;
    border-radius: 2px;
    transform: translateX(0);
    transition: all 250ms ease;
  }

  .footer {
    margin-top: 15px;
  }

  .hide {
    transform: translateX(-100%);
    opacity: 0.5;
    color: #2c3e50;
  }
</style>
