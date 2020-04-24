<template>
  <div class="create-item-form">
    <form @submit.prevent="createItem" class="new-item">
      <div class="new-item-row radio">
        <input required v-model="chain" type="radio" value="Plus" id="plus" />
        <label :class="chain === 'Plus' && 'success'" class="label" for="plus"
          >Plus</label
        >

        <input required v-model="chain" type="radio" value="A.H." id="ah" />
        <label :class="chain === 'A.H.' && 'success'" class="label" for="ah"
          >AH</label
        >
      </div>

      <div class="new-item-row">
        <input required class="input" v-model="name" type="text" id="name" />
        <label class="label" for="name">{{ name || 'name' }}</label>
      </div>

      <div class="new-item-row ">
        <input
          required
          class="input"
          v-model="price"
          type="number"
          id="price"
          step="0.01"
        />
        <label class="label" for="price">{{
          (price && '€' + price) || 'price'
        }}</label>
      </div>

      <div class="new-item-row radio">
        <input required v-model="unit" type="radio" value="Piece" id="piece" />
        <label :class="unit === 'Piece' && 'success'" class="label" for="piece"
          >Each</label
        >

        <input required v-model="unit" type="radio" value="Kg" id="kilo" />
        <label :class="unit === 'Kg' && 'success'" class="label" for="kilo"
          >Kg</label
        >
      </div>

      <input class="submit" type="submit" value="submit" /> {{ error }}
    </form>
    <div class="receipt">
      <div class="name">{{ name }}</div>
      <div class="price">{{ price && '€' + price }}</div>
      <div class="unit">{{ unit }}</div>
      <div class="chain">{{ chain && 'Chain ' + chain }}</div>
      <div v-if="!name && !price && !unit && !chain" class="chain">
        Receipt
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateNewItem',
    data() {
      return {
        name: '',
        price: '',
        unit: '',
        chain: '',
        errors: '',
        error: '',
      };
    },
    methods: {
      createItem() {
        if (!this.name || !this.chain || !this.unit || !this.chain) {
          this.errors = 'You need to fill in all fields';
        }

        const data = {
          name: this.name,
          price: this.price,
          unit: this.unit,
          chain: this.chain,
        };

        this.name = this.price = this.unit = this.chain = '';

        this.$emit('create-item', data);
      },
    },
    watch: {
      errors(error) {
        this.error = error;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .create-item-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .new-item {
    width: 30vw;
    display: flex;
    flex-direction: column;

    &-row {
      .label {
        padding: 0 15px;
      }
    }

    .submit {
      border: 1px solid #2c3e50;
      border-radius: 16px;
      background: #2c3e50;
      color: #f4f4f4;
      padding: 2px 12px;
      cursor: pointer;
      font-size: 18px;
      text-transform: uppercase;
      max-width: max-content;

      &:hover {
        background: #f4f4f4;
        color: #2c3e50;
      }
    }

    .success {
      color: olive;
    }
  }

  .receipt {
    display: grid;
    grid-template-areas:
      '. chain .'
      'name price unit';
    border: 1px solid #2c3e50;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 5px;
    padding: 5px 15px;
    max-width: max-content;
    gap: 15px;
    cursor: default;

    .chain {
      grid-area: chain;
    }
    .name {
      grid-area: name;
    }
    .price {
      grid-area: price;
    }
    .unit {
      grid-area: unit;
    }
  }
</style>
