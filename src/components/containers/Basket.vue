<template>
  <transition name="fade">
    <div
      v-if="basket.length > 0"
      :class="[{ hide: hide, 'basket-wide': fullWidth }, theme]"
      class="basket"
    >
      <header class="header">
        <h1 class="title">Basket</h1>
        <span @click="fullWidth = !fullWidth" class="resize">{{
          fullWidth ? 'collapse' : 'expand'
        }}</span>
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
    data() {
      return {
        fullWidth: false,
      };
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
    bottom: 16px;
    padding: 8px 16px;
    opacity: 0.9;
    border-radius: 8px;
    cursor: default;
    overflow-y: auto;
    min-width: 30%;
    max-width: 92%;
    transition: all 250ms ease;

    &-wide {
      min-width: 92%;

      .product {
        min-width: min-content;
      }
    }

    &:hover {
      opacity: 0.95;
    }

    &.light {
      background: $light;
      color: $dark;
      box-shadow: -4px -4px 8px lighten($grey, 4%), 4px 4px 8px $grey;

      &:hover {
        box-shadow: -2px -2px 4px lighten($grey, 4%), 2px 2px 4px $grey;
      }
    }

    &.dark {
      background: $dark;
      color: $light;
      box-shadow: -4px -4px 8px lighten($dark, 4%), 4px 4px 8px $black;

      &:hover {
        box-shadow: -2px -2px 4px lighten($dark, 4%), 2px 2px 4px $black;
      }
    }

    .header {
      position: relative;

      .resize {
        position: absolute;
        right: 16px;
        top: 8px;
        cursor: pointer;
      }
    }

    .content {
      max-height: 20vh;
      display: flex;
      flex-flow: column wrap;
    }

    &.hide {
      padding: 5px;
      transform: translate3d(-50%, 100%, 0) scale(0);
      opacity: 0.9;
      transition: all 250ms ease;
      filter: none;

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
  }

  .footer {
    margin-top: 15px;
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
