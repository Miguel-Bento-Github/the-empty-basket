<template>
  <div id="app" class="app" :class="theme">
    <filter-items
      @change-theme="changeTheme"
      @show-header="setHeaderDisplay"
      @change-color="changeColor"
      @filter="findProducts"
      :loading="loading"
      :theme="theme"
    />
    <main class="main">
      <grocery-items
        @add-to-cart="addToCart"
        :theme="theme"
        :loading="loading"
        :showHeader="showHeader"
        :isTyping="isTyping"
        :colors="colors"
        :products="products"
      />

      <basket :showBasket="basket.length > 0" :basket="basket" />
    </main>
  </div>
</template>

<script>
import FilterItems from "./components/containers/FilterItems";
import GroceryItems from "./components/containers/GroceryItems";
import Basket from "./components/containers/Basket";
import findProducts from "./utils/findProducts";
import theme from "./utils/theme";

export default {
  name: "App",
  components: {
    GroceryItems,
    FilterItems,
    Basket
  },
  data() {
    return {
      basket: [],
      products: [],
      loading: false,
      isTyping: false,
      filter: null,
      showHeader: false,
      theme: {
        light: true,
        dark: false
      }
    };
  },
  computed: {
    colors() {
      return this.theme.light ? theme.light : theme.dark;
    }
  },
  methods: {
    changeTheme() {
      this.theme.light = !this.theme.light;
      this.theme.dark = !this.theme.dark;
    },
    setHeaderDisplay(isVisible) {
      this.showHeader = isVisible;
    },
    changeColor() {
      this.isTyping = true;
      const colors = this.colors;
      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }
      return colors;
    },
    addToCart(product) {
      let inBasket = false;
      this.basket.map(item => {
        if (item._id === product._id) {
          item.quantity += 1;
          inBasket = true;
        }
      });

      if (!inBasket) {
        this.$set(product, ["quantity"], 1);
        this.basket.push(product);
      }
    },
    findProducts
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  font-family: "Inconsolata", monospace;
  font-size: calc(13px + (26 - 13) * ((100vw - 300px) / (1600 - 300)));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 2vh 2vw;
  line-height: 1.3;

  @media screen and (max-width: 450px) {
    min-height: 85vh;
  }

  &.dark {
    color: #f4f4f4;
    background: #2c3e50;
  }

  &.light {
    color: #2c3e50;
    background: #f4f4f4;
  }
}

h1 {
  font-size: calc(20px + (48 - 23) * ((100vw - 300px) / (1600 - 300)));
}

h2 {
  font-size: calc(16px + (30 - 16) * ((100vw - 300px) / (1600 - 300)));
}

ul {
  list-style-type: none;
  padding: 0;
}

button,
p {
  all: unset;
}

button,
input {
  font-family: "Inconsolata", monospace;
  font-size: calc(18px + (28 - 18) * ((100vw - 300px) / (1600 - 300)));
}

input {
  border: 0;
  cursor: default;
  width: min-content;
  background: transparent;
  color: inherit;
  outline: thin;
}

.main {
  margin-top: 5vh;
}
</style>
