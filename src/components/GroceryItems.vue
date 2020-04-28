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
            :class="isTyping && 'letter-active'"
            :style="letterStyle(i)"
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
            class="table-item-details"
            v-if="showDetails.active && showDetails.index === index"
            >{{ product.name }}</span
          >
          <span v-else>{{ product.name }}</span>
        </div>
        <div class="table-item" name="price">{{ product.price }}</div>
        <div class="table-item" name="unit">{{ product.unit }}</div>
      </div>
    </transition-group>
  </section>
</template>

<script>
  import getRandomIntFrom from '../utils/getRandomIntFrom';
  export default {
    name: 'GroceryItem',
    props: ['products', 'colors', 'isTyping', 'loading', 'showHeader', 'theme'],
    data() {
      return {
        name: '',
        price: 0,
        unit: '',
        category: '',
        headers: ['cat.', 'name', 'price', 'unit'],
        showDetails: {
          active: false,
          index: 0,
        },
      };
    },
    methods: {
      letterStyle(i) {
        return (
          i % getRandomIntFrom(2) === 0 && {
            filter: `drop-shadow(0 0 ${getRandomIntFrom(8)}px ${
              this.colors[i]
            })`,
          }
        );
      },
      detectMob() {
        return window.innerWidth <= 450 && window.innerWidth <= 600;
      },

      openDetails(index) {
        this.showDetails.active = Boolean(index);
        this.showDetails.index = index;
      },
    },
    computed: {
      titles() {
        const headers = [...this.headers];
        if (!this.detectMob()) {
          headers[0] = 'category';
        }
        return headers;
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
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      text-transform: capitalize;
      cursor: default;
    }

    &-body {
      transition: color 150ms linear, background-color 150ms linear;

      &.dark {
        &:nth-child(even) {
          background-color: rgba(#f4f4f4, 0.2);
        }

        &:hover {
          color: #1a2530;
          background-color: rgba(#f4f4f4, 0.6);
        }
      }

      &.light {
        &:nth-child(odd) {
          background-color: rgba(#1a2530, 0.2);
        }

        &:hover {
          color: #f4f4f4;
          background-color: rgba(#1a2530, 0.6);
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

        &:hover {
          width: max-content;
          position: absolute;
          background: #1a2530;
          color: #f4f4f4;
          padding: 0 8px;
        }
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
