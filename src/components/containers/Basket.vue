<template>
  <transition name="slide-fade">
    <div
      v-if="showBasket"
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
import BasketProduct from "../BasketProduct";

export default {
  name: "basket",
  components: {
    BasketProduct
  },
  props: {
    basket: {
      required: true,
      type: Array
    },
    showBasket: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      hide: false
    };
  },
  methods: {
    handleVisibility({ target }) {
      console.log(target);

      this.hide = !this.hide;
    }
  },
  computed: {
    totalPrice() {
      let result = 0;
      this.basket.map(({ price }) => {
        result += +price;
      });
      return result.toFixed(2);
    },
    totalWeight() {
      let result = 0;
      this.basket.map(({ unit }) => {
        if (unit.slice(-2) === "kg") {
          const quantity = Number(unit.replace(/[^0-9.]+/g, ""));
          result += quantity;
        } else if (unit.slice(-2) === " g") {
          let quantity = Number(unit.replace(/[^0-9]+/g, "")) / 1000;
          result += quantity;
        }
      });
      return result + " Kg";
    }
  }
};
</script>

<style lang='scss' scoped>
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
