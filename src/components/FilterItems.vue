<template>
  <form @submit.prevent class="control">
    <label class="input">
      <input
        placeholder="input search here..."
        @input.prevent="submit"
        @mouseover="show"
        @blur="blur"
        type="text"
        v-model="filter"
      />
    </label>

    <div class="tooltip" :class="theme" v-if="showTooltip">
      <p>
        Use
        <span class="example">integers</span>
        for page amount,<br />
        <span class="example">
          decimals
        </span>
        for max price and
        <br />
        <span class="example">letters</span>
        for product search.
      </p>
    </div>

    <div class="tooltip" v-else-if="loading">
      Loading data, please wait...
    </div>

    <div
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @click="changeTheme"
      class="notification "
    >
      <odd
        :show-head="theme.dark"
        v-show="showOdd"
        class="odd"
        :class="theme"
        icon-name="odd"
      />
    </div>
  </form>
</template>

<script>
  import Odd from './Odd';
  export default {
    name: 'filter-items',
    props: ['theme', 'loading'],
    data() {
      return {
        filter: null,
        showOdd: false,
        showTooltip: false,
      };
    },
    components: {
      Odd,
    },
    methods: {
      changeTheme() {
        this.$emit('change-theme');
      },
      submit() {
        this.$emit('show-header', true);
        this.$emit('change-color');
        if (isNaN(+this.filter)) {
          this.$emit('filter', this.filter);
        } else {
          this.$emit('filter', +this.filter);
        }
      },
      show({ target }) {
        target.focus();
        this.showOdd = true;
      },
      blur() {
        this.filter = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .control {
    height: 52px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media screen and (max-width: 450px) {
      position: static;
    }
  }

  .input {
    border: 0;
    outline: thin;
    padding: 8px 16px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      background: #ccc;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0;
      width: 0;
      height: 1px;
      transition: width 400ms 100ms ease-in-out;
    }

    &:hover::before,
    &:focus-within::before {
      width: 90%;
      transition: width 800ms 100ms ease-in-out;
    }
  }

  .tooltip {
    font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
    padding: 8px 16px;
    border-radius: 8px;
    position: absolute;
    right: 0;
    transform: translate3d(-50px, 5px, 0);
    z-index: 1;

    @media screen and (max-width: 450px) {
      width: 100%;
      position: fixed;
      bottom: 0;
      transform: translate3d(0, 0, 0);
      z-index: 0;
      border-radius: 0;

      &.light {
        background: #2c3e50;
        color: #f4f4f4;
      }

      &.dark {
        background: #f4f4f4;
        color: #2c3e50;
      }
    }

    .example {
      color: #38b892;
    }
  }

  .odd {
    height: 48px;
    padding: 1px;
    cursor: pointer;
    animation: disappear 2s linear reverse;

    @media screen and (max-width: 450px) {
      position: fixed;
      z-index: 1;
      bottom: 2vh;
      right: 0;
    }

    &.light {
      fill: #ccc;
      filter: drop-shadow(0 0 12px #fff);
      transition: filter 2s linear;

      &:hover {
        filter: drop-shadow(0 0 2px #000);
      }
    }

    &.dark {
      fill: #ccc;
      filter: drop-shadow(0 0 6px #000);
    }
  }

  @keyframes getThin {
    from {
      width: 300px;
    }

    to {
      width: 0;
    }
  }

  @keyframes disappear {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
</style>
