<template>
  <section class="table">
    <transition name="fade">
      <div v-show="showHeader" class="table-header">
        <h1 class="title" v-for="title in titles" :key="title.id">
          <!--
          Style bind starts by finding all letters
          that are a multiple of a random number between 1 and 2.
          Then applies a drop shadow from a random array of colors
          -->
          <span
            class="letter"
            :class="isTyping"
            :style="titleStyle(i)"
            v-for="(letter, i) in title"
            :key="letter.id"
            >{{ letter }}</span
          >
        </h1>
      </div>
    </transition>
    <transition-group name="fade">
      <div
        class="table-body"
        :class="theme"
        v-show="!loading"
        v-for="(product, index) in products"
        :key="product._id"
        :data-index="index"
      >
        <div
          class="table-item"
          @mouseleave="openDetails"
          @click="openDetails(index)"
          name="category"
        >
          <span
            class="table-item-details"
            v-if="showDetails.active && showDetails.index === index"
            >{{ product.category }}</span
          >
          <span v-else>{{ product.category }}</span>
        </div>

        <div
          class="table-item"
          @mouseleave="openDetails"
          @click="openDetails(index)"
          name="name"
        >
          <span
            :class="showDetails.theme"
            class="table-item-details"
            v-if="showDetails.active && showDetails.index === index"
            >{{ product.name }}</span
          >
          <span v-else>{{ product.name }}</span>
        </div>
        <div class="table-item" name="price">{{ product.price }}</div>
        <div class="table-item table-item-last" name="unit">
          {{ product.unit }}
          <span class="add-to-cart" @click="addToCart(product)">add</span>
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script>
  import getRandomIntFrom from '../../utils/get-random-int';
  import detectMobile from '../../utils/detect-mobile';
  import { actions } from '../../store/variables';

  export default {
    name: 'products',
    props: ['products', 'colors', 'isTyping', 'loading', 'showHeader', 'theme'],
    data() {
      return {
        name: '',
        unit: '',
        category: '',
        price: 0,
        categories: ['category', 'name', 'price', 'unit'],
        showDetails: {
          active: false,
          index: 0,
          theme: this.theme,
        },
      };
    },
    methods: {
      detectMobile,
      requestTooltip() {
        this.$store.dispatch(actions.TOGGLE_TOOLTIP, 'BAG_INTRO');
      },
      addToCart(product) {
        if (!this.$store.state.productsAmount) {
          this.requestTooltip();
        }
        // using set will make the property reactive.
        if (!product.quantity) {
          this.$set(product, ['quantity'], 1);
        }
        this.$store.dispatch(actions.ADD_PRODUCT, product);
        this.$store.dispatch(actions.INCREMENT);
      },
      openDetails(index) {
        this.showDetails.active = true;
        this.showDetails.index = index;
      },
      titleStyle(i) {
        return (
          i % getRandomIntFrom(2) === 0 && {
            filter: `drop-shadow(0 0 ${getRandomIntFrom(8)}px ${
              this.colors[i]
            })`,
          }
        );
      },
      changeCategoryCopy(category, copy) {
        const allCategories = [...this.categories];
        const categoryIndex = [allCategories.indexOf(category)];
        allCategories[categoryIndex] = copy;
        return allCategories;
      },
    },
    computed: {
      titles() {
        return !this.detectMobile()
          ? this.categories
          : this.changeCategoryCopy('category', 'cat.');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../colors.scss';

  .table {
    margin-top: 5vh;

    &-header,
    &-body {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      text-transform: capitalize;
      cursor: default;
    }

    &-body {
      transition: color 150ms linear, background-color 150ms linear;

      &.dark {
        &:nth-child(even) {
          background-color: rgba($light, 0.2);
        }

        &:hover {
          color: $black;
          background-color: rgba($light, 0.6);
        }
      }

      &.light {
        &:nth-child(odd) {
          background-color: rgba($black, 0.2);
        }

        &:hover {
          color: $light;
          background-color: rgba($black, 0.6);
        }
      }
    }

    &-item {
      width: 100%;
      padding: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &-details {
        transition: all 250ms 50ms linear;

        &.light {
          background: #72787e;
          box-shadow: 2px 2px 4px #61666b, -2px -2px 4px #838a91;
        }

        &.dark {
          background: #546371;
          box-shadow: 2px 2px 4px #475460, -2px -2px 4px #617282;
        }

        &:hover,
        &:focus {
          width: max-content;
          position: absolute;
          color: $light;
          padding: 0 8px;
          border-radius: 2px;
        }
      }

      &-last {
        display: flex;
        justify-content: space-between;
      }
    }

    .control {
      display: flex;
      align-items: center;
    }
  }

  .letter {
    transition: color 500ms ease-out;
  }

  .add-to-cart {
    cursor: pointer;

    &:hover {
      filter: drop-shadow(0 0 4px $grey);
    }
  }

  .fade {
    &-enter-active {
      transition: all 0.3s ease-out;
    }

    &-leave-active {
      transition: all 0.5s ease-out;
    }

    &-enter,
    &-leave-to {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
</style>
