<template>
  <transition name="fade">
    <div
      v-if="basket.length > 0"
      @click="handleVisibility"
      :class="{ hide: hide }"
      class="basket"
    >
      <div class="content">
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
      <bag
        :class="
          ({
            ['bag-hide']: !hide
          },
          theme)
        "
        class="bag"
      />
    </div>
  </transition>
</template>

<script>
import store from "../../store/index";
import BasketProduct from "../BasketProduct";
import Bag from "../icons/Bag";

export default {
  store,
  name: "basket",
  props: ["theme"],
  components: {
    BasketProduct,
    Bag
  },
  data() {
    return {
      hide: false
    };
  },
  methods: {
    handleVisibility() {
      this.hide = !this.hide;
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.basket {
  cursor: default;
  position: fixed;
  bottom: 0;
  max-width: max-content;
  padding: 5px 10px;
  border-radius: 2px;
  transform: translateX(0);
  transition: all 250ms ease;
  display: flex;
}

.footer {
  margin-top: 15px;
}

.bag {
  width: 2vw;
  margin-right: -5px;
  align-self: flex-start;
  cursor: pointer;

  &.dark {
    fill: #f4f4f4;
  }

  &.light {
    fill: #2c3e50;
  }
}

.hide {
  padding: 5px;
  transform: translateX(-100%);
  opacity: 0.5;
  color: #2c3e50;

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
  transform: translateX(-100%);
  opacity: 0;
}
</style>
