<template>
  <div id="app">
    <!-- <create-new-item @create-item="createItem" /> -->
    <filter-items
      @change-color="changeColor"
      @filter="findProducts"
      :loading="loading"
    />
    <grocery-items :colors="colors" :products="products" />
  </div>
</template>

<script>
  import Axios from 'axios';

  import FilterItems from './components/FilterItems';
  import GroceryItems from './components/GroceryItems';

  export default {
    name: 'App',
    components: {
      GroceryItems,
      FilterItems,
    },
    data() {
      return {
        products: [],
        loading: false,
        colors: [
          '#F9F871',
          '#93DC80',
          '#38B892',
          '#D5F4FF',
          '#FFECCB',
          '#FFECCB',
          '#00C6B5',
        ],
      };
    },
    methods: {
      changeColor() {
        const colors = this.colors;
        for (let i = colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [colors[i], colors[j]] = [colors[j], colors[i]];
        }
      },
      async findProducts(payload) {
        this.loading = true;
        const url = 'http://localhost:8008/api/items';
        if (payload) {
          let res;
          if (typeof payload === 'number') {
            if (Number.isInteger(payload)) {
              res = await Axios.post(url, { amount: payload });
            } else {
              res = await Axios.post(url, { price: payload });
            }

            this.products = res.data;
          } else {
            res = await Axios.post(url, { query: payload });
            this.products = res.data;
          }
          this.loading = false;
        } else {
          const { data } = await Axios.post(url);
          this.products = data;
          this.loading = false;
        }
      },
    },
    beforeMount() {
      this.findProducts();
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    min-height: 100vh;
    font-family: 'Inconsolata', monospace;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #f4f4f4;
    background: #2c3e50;
    padding: 2vh 4vw;
  }

  h1 {
    font-size: calc(24px + (48 - 24) * ((100vw - 300px) / (1600 - 300)));
  }
  h2 {
    font-size: calc(18px + (48 - 18) * ((100vw - 300px) / (1600 - 300)));
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
  }

  input {
    border: 0;
    cursor: default;
    width: min-content;
    background: transparent;
    color: #f4f4f4;
    outline: thin;
    font-size: 18px;
  }

  .input {
    border: 0;
    border-bottom: 1px solid #f4f4f4;
    border-radius: 2px;
    outline: thin;
    padding: 8px 16px;
    transition: border 1s ease-out, background 1s linear;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    &:hover {
      background: rgba(#000, 0.1);
    }

    &:focus {
      border-bottom: 1px solid #c4c466;
    }

    &:active {
      border-bottom: 1px solid #c4c466;
    }
  }
</style>
