<template>
  <form @mouseover="setOdd" @submit.prevent class="control">
    <bag :class="theme" class="bag" />
    <label class="input">
      <input
        placeholder="input search here..."
        @input.prevent="submit"
        @blur="blur"
        type="text"
        v-model="filter"
      />
    </label>
    <tooltips
      :theme="theme"
      :showSearchInfo="showSearchInfo"
      :loading="loading"
      :warnUserAboutBag="warnUserAboutBag"
    />
    <div
      @mouseenter="showSearchInfo = true"
      @mouseleave="showSearchInfo = false"
      @click="changeTheme"
      class="notification"
    >
      <odd v-show="showOdd" :class="theme" :show-head="theme.dark" />
    </div>
  </form>
</template>

<script>
  import Bag from '../icons/Bag';
  import Tooltips from '../Tooltips';
  import Odd from '../icons/Odd';
  import { TOOLTIP_TYPES } from '../../store/variables';

  export default {
    name: 'filter-items',
    props: ['theme', 'loading'],
    data() {
      return {
        filter: null,
        showOdd: false,
        showSearchInfo: false,
        showHeader: false,
      };
    },
    components: {
      Bag,
      Tooltips,
      Odd,
    },
    methods: {
      changeTheme() {
        this.$emit('change-theme');
      },
      submit() {
        if (!this.showHeader) {
          this.showHeader = true;
          this.$emit('show-header', this.showHeader);
        }
        if (isNaN(+this.filter)) {
          this.$emit('filter', this.filter.toLowerCase());
        } else {
          this.$emit('filter', +this.filter);
        }
      },
      setOdd({ target }) {
        target.focus();
        this.showOdd = true;
      },
      blur() {
        this.filter = '';
      },
    },
    computed: {
      warnUserAboutBag() {
        const { active, activeType } = this.$store.state.tooltip;
        return active && activeType === TOOLTIP_TYPES.BAG_INTRO;
      },
    },
    mounted() {
      if (localStorage?.basket?.length) this.showOdd = true;
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

  @keyframes getThin {
    from {
      width: 300px;
    }

    to {
      width: 0;
    }
  }
</style>
