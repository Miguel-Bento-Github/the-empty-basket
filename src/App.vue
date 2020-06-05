<template>
  <div id="app" class="app" :class="theme">
    <network-error v-if="!network" />
    <filter-items
      :theme="theme"
      :loading="loading"
      @filter="findProducts"
      @change-color="changeColor"
      @change-theme="changeTheme"
      @show-header="setHeaderDisplay"
    />
    <main class="main">
      <products
        :theme="theme"
        :loading="loading"
        :showHeader="showHeader"
        :isTyping="isTyping"
        :colors="colors"
        :products="products"
      />
      <basket :theme="theme" />
    </main>
  </div>
</template>

<script>
  import NetworkError from './components/NetworkError';
  import FilterItems from './components/containers/FilterItems';
  import Products from './components/containers/Products';
  import Basket from './components/containers/Basket';
  import findProducts from './utils/find-products';
  import theme from './utils/theme';
  import { actions } from './store/variables';

  export default {
    name: 'App',
    components: {
      NetworkError,
      Products,
      FilterItems,
      Basket,
    },
    data() {
      return {
        network: true,
        products: [],
        loading: false,
        isTyping: false,
        filter: null,
        showHeader: false,
        theme: {
          light: false,
          dark: true,
        },
      };
    },
    methods: {
      findProducts,
      changeTheme() {
        this.theme.light = !this.theme.light;
        this.theme.dark = !this.theme.dark;

        this.$store.dispatch(actions.CHANGE_THEME, this.theme);
      },
      setHeaderDisplay(show) {
        this.showHeader = show;
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
      populateBasket() {
        const basket = localStorage.getItem('basket');
        if (basket) {
          try {
            this.$store.dispatch(actions.FILL_BASKET, JSON.parse(basket));
          } catch (error) {
            localStorage.removeItem('basket');
            throw new Error(
              `Error populating basket at populateBasket(), ${error.message}`
            );
          }
        }
      },
      addTotalProducts() {
        const totalProducts = localStorage.getItem('total-products');
        if (totalProducts > 0) {
          try {
            this.$store.dispatch(actions.INCREMENT, JSON.parse(totalProducts));
          } catch (error) {
            localStorage.getItem('total-products');
            throw new Error(
              `Error adding total amount of products at addTotalProducts(), ${error.message}`
            );
          }
        }
      },
    },
    computed: {
      colors() {
        return this.theme.light ? theme.light : theme.dark;
      },
    },
    mounted() {
      this.populateBasket();
      this.addTotalProducts();
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap');
  @import './colors.scss';

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Inconsolata', monospace;
    font-size: calc(13px + (26 - 13) * ((100vw - 300px) / (1600 - 300)));
    padding: 2vh 4vw;
    line-height: 1.3;
    min-height: 100vh;

    &.dark {
      color: $light;
      background: $dark;
    }

    &.light {
      color: $dark;
      background: $light;
    }
  }

  .icon {
    max-height: 64px;
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
    font-family: 'Inconsolata', monospace;
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
</style>
