<template>
  <div class="table">
    <div class="table-header">
      <h1>chain</h1>
      <h1>name</h1>
      <h1>price</h1>
      <h1>unit</h1>
    </div>

    <div class="table-body" v-for="item in items" :key="item._id">
      <input
        name="chain"
        @input="updateData"
        :readonly="isReadOnly"
        :class="!isReadOnly && 'input'"
        :placeholder="item.chain"
      />
      <input
        name="name"
        @input="updateData"
        :readonly="isReadOnly"
        :class="!isReadOnly && 'input'"
        :placeholder="item.name"
      />
      <input
        name="price"
        @input="updateData"
        :readonly="isReadOnly"
        :class="!isReadOnly && 'input'"
        :placeholder="item.price"
      />
      <input
        name="unit"
        @input="updateData"
        :readonly="isReadOnly"
        :class="!isReadOnly && 'input'"
        :placeholder="item.unit"
      />
      <grocery-input />

      <div class="control">
        <button @click="toggleEdit" type="edit" class="edit">
          edit
        </button>

        <button
          v-if="isReadOnly"
          @click="deleteItem(item._id)"
          type="button"
          class="delete"
        >
          delete
        </button>
        <button
          v-else
          @click="updateItem(item._id)"
          type="button"
          class="submit"
        >
          submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import GroceryInput from './GroceryInput';

  export default {
    name: 'GroceryItem',
    components: {
      GroceryInput,
    },
    props: ['items'],
    data() {
      return {
        name: '',
        price: '',
        unit: '',
        chain: '',
        isReadOnly: true,
      };
    },
    methods: {
      updateData({ target }) {
        this[target.name] = target.value;
      },
      toggleEdit() {
        console.log(this.items[0]);

        this.isReadOnly = !this.isReadOnly;
      },
      updateItem(id) {
        const data = {
          name: this.name || null,
          price: this.price || null,
          unit: this.unit || null,
          chain: this.chain || null,
        };
        const payload = {
          id,
          data,
        };
        this.$emit('update-item', payload);
      },
      deleteItem(id) {
        this.$emit('delete-item', id);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .table {
    margin-top: 5vh;

    &-header,
    &-body {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-content: space-between;
      text-transform: capitalize;
    }

    .control {
      display: flex;
      align-items: center;

      .edit,
      .delete,
      .submit {
        width: max-content;
        padding: 2px 6px;
        margin: 3px;
        border-radius: 5px;
        transition: box-shadow 1s ease-out;

        &:active {
          position: relative;
          top: 1px;
          left: 1px;
        }
      }

      .edit {
        box-shadow: -1px -1px 3px #54e9c9, 1px 1px 3px #54e9c9;

        &:hover {
          box-shadow: -1px -1px 3px #3a4b47, 1px 1px 3px #3a4b47;
        }
      }

      .submit {
        box-shadow: -1px -1px 3px #54b2e9, 1px 1px 3px #54b2e9;

        &:hover {
          box-shadow: -1px -1px 3px #8ecaec, 1px 1px 3px #8ecaec;
        }
      }

      .delete {
        color: #e95454;
        cursor: default;

        box-shadow: -1px -1px 3px #e95454, 1px 1px 3px #e95454;

        &:hover {
          box-shadow: -1px -1px 3px #ac3838, 1px 1px 3px #ac3838;
        }

        &:active {
          box-shadow: -1px -1px 3px #d62929, 1px 1px 3px #dd2828;
        }
      }
    }
  }
</style>
