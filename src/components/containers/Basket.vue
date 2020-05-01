<template>
  <transition name="fade">
    <div
      v-if="basket.length > 0"
      :class="[{ hide: hide }, theme]"
      class="basket"
    >
      <header class="header">
        <h1 class="title">Basket</h1>
      </header>
      <div class="content">
        <basket-product
          :theme="theme"
          v-for="product in basket"
          :product="product"
          :key="product._id"
        />
      </div>
      <footer class="footer">
        <div>Total: €{{ totalPrice }}</div>
        <div>Estimated weight: {{ totalWeight }}</div>
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
    props: {
      theme: {
        type: Object,
        required: true,
      },
    },
    components: {
      BasketProduct,
    },
    computed: {
      hide() {
        return store.state.hideBasket;
      },
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
  @import '../../colors.scss';

  .basket {
    transform: translateX(0);
    position: fixed;
    bottom: 0;
    padding: 5px 15px;
    opacity: 0.9;
    border-radius: 5px;
    cursor: default;
    transition: all 250ms ease;
    max-width: max-content;
    overflow-y: auto;

    &.light {
      background: $light;
      color: $dark;
      box-shadow: 0 0 16px $grey;
    }

    &.dark {
      background: $dark;
      color: $light;
    }

    .content {
      max-height: 30vh;
      display: flex;
      flex-flow: column wrap;
    }
  }

  .footer {
    margin-top: 15px;
  }

  .hide {
    padding: 5px;
    transform: translate3d(0, 100%, 0);
    opacity: 0.9;
    transition: transform 250ms ease, opacity 250ms ease;

    &.light {
      color: $light;
    }

    &.dark {
      color: $dark;
    }

    &:hover {
      opacity: 1;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: transform 250ms ease, opacity 250ms ease;
  }

  .fade-enter,
  .fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
</style>
