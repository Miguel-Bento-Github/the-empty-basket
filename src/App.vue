<template>
  <div id="app" class="app" :class="theme">
    <!-- <create-new-item @create-item="createItem" /> -->
    <filter-items
      @change-theme="changeTheme"
      @show-header="setHeaderDisplay"
      @change-color="changeColor"
      @filter="findProducts"
      @not-typing="isTyping = false"
      :loading="loading"
      :theme="theme"
    />
    <grocery-items
      :theme="theme"
      :loading="loading"
      :showHeader="showHeader"
      :isTyping="isTyping"
      :colors="colors"
      :products="products"
    />
  </div>
</template>

<script>
import Axios from "axios";
import FilterItems from "./components/FilterItems";
import GroceryItems from "./components/GroceryItems";

export default {
  name: "App",
  components: {
    GroceryItems,
    FilterItems
  },
  data() {
    return {
      products: [],
      loading: true,
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
      const dark = [
        "#F9F871",
        "#93DC80",
        "#38B892",
        "#D5F4FF",
        "#FFECCB",
        "#00C6B5"
      ];
      const light = [
        "#ECA72C",
        "#EE5622",
        "#202C59",
        "#A1B5D8",
        "#856A5D",
        "#E0ACD5"
      ];

      return this.theme.light ? light : dark;
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
    async findProducts(payload) {
      this.filter = payload;
      this.loading = true;
      const url = `${process.env.VUE_APP_API}api/items`;
      if (payload) {
        let res;
        if (typeof payload === "number") {
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
    }
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
</style>
