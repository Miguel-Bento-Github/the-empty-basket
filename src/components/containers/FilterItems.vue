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
        <span class="example" :class="theme">integers</span>
        for page amount,<br />
        <span class="example" :class="theme">
          decimals
        </span>
        for max price and
        <br />
        <span class="example" :class="theme">letters</span>
        for product search.
      </p>
    </div>
    <div class="tooltip" v-else-if="loading">
      Loading data, please wait...
    </div>
    <div class="tooltip" v-else-if="warnUserAboutBag">
      Click on the bag to toggle the basket.
    </div>

    <bag :class="theme" class="bag" />

    <div
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @click="changeTheme"
      class="notification"
    >
      <odd v-show="showOdd" :class="theme" :show-head="theme.dark" />
    </div>
  </form>
</template>

<script>
  import Bag from '../icons/Bag';
  import Odd from '../icons/Odd';
  import { CHANGE_THEME, SET_BACKGROUND } from '../../store/mutation-types';

  export default {
    name: 'filter-items',
    props: ['theme', 'loading'],
    data() {
      return {
        filter: null,
        showOdd: false,
        showTooltip: false,
        showHeader: false,
      };
    },
    components: {
      Odd,
      Bag,
    },
    methods: {
      changeTheme() {
        this.$emit('change-theme');
        this.$store.dispatch(CHANGE_THEME);
        this.$store.dispatch(SET_BACKGROUND, this.theme);
      },
      submit() {
        if (!this.showHeader) {
          this.showHeader = true;
          this.$emit('show-header', this.showHeader);
        }
        this.$emit('change-lights');
        if (isNaN(+this.filter)) {
          this.$emit('filter', this.filter.toLowerCase());
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
    computed: {
      warnUserAboutBag() {
        const { active, type } = this.$store.state.tooltip;
        return active && type === 'BAG_INTRO';
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../colors.scss';

  .control {
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
    margin-left: -16px;
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
        background: $dark;
        color: $light;
      }

      &.dark {
        background: $light;
        color: $dark;
      }
    }

    .example {
      &.light {
        color: #24755d;
      }

      &.dark {
        color: #38b892;
      }
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
</style>
