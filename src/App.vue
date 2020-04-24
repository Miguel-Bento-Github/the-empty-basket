<template>
  <div id="app">
    <create-new-item @create-item="createItem" />
    <grocery-items
      @update-item="updateItem"
      @delete-item="deleteItem"
      :items="items"
    />
  </div>
</template>

<script>
  import Axios from 'axios';
  import CreateNewItem from './components/CreateNewItem';
  import GroceryItems from './components/GroceryItems';

  export default {
    name: 'App',
    components: {
      CreateNewItem,
      GroceryItems,
    },
    data() {
      return { items: [] };
    },
    methods: {
      async updateItems() {
        const url = 'http://localhost:8008/api/items';
        const { data } = await Axios(url);
        this.items = data;
      },
      async createItem(payload) {
        const url = 'http://localhost:8008/api/items/new';
        await Axios.post(url, payload);

        this.updateItems();
      },
      async updateItem(payload) {
        console.log(payload);
        const url = 'http://localhost:8008/api/items/' + payload.id;
        await Axios.put(url, payload.data);

        this.updateItems();
      },
      async deleteItem(payload) {
        const url = 'http://localhost:8008/api/items/';
        await Axios.delete(url + payload);

        this.updateItems();
      },
    },
    beforeMount() {
      this.updateItems();
    },
  };
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 15px 25px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  button,
  p {
    all: unset;
  }

  input {
    border: 0;
    cursor: default;
    width: min-content;
  }

  .input {
    border: 0;
    border-bottom: 1px solid #2c3e50;
    border-radius: 2px;
    outline: thin;
    max-width: max-content;
    padding: 2px 6px;

    &:focus {
      border-bottom: 1px solid #c4c466;
    }
  }
</style>
