<template>
  <div @click="handleVisibility">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      version="1.1"
      style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality;"
      viewBox="50 0 260 320"
      x="0px"
      y="0px"
      fill-rule="evenodd"
      clip-rule="evenodd"
      class="bag icon"
    >
      <path
        d="M79 76c0,67 4,134 1,201 11,5 19,10 26,16 7,4 13,10 20,15l-2 -43 -7 -177c0,-4 0,-7 0,-10l-38 -2zm50 186l120 -36c-4,-53 -3,-105 -5,-158l-30 5 0 19 -10 2 0 -20 -45 7 0 21 -10 2 0 -21 -28 4 8 175zm120 -33l-120 37 1 44 124 -42c-2,-13 -3,-26 -5,-39zm-35 -199l0 30 35 2c2,70 0,139 11,209l-133 46c-7,-7 -15,-14 -24,-20 -9,-7 -18,-12 -28,-16 2,-70 -1,-140 -1,-210l0 -2 2 0 47 -7 0 -28c0,-17 49,-22 58,-13 17,-2 33,1 33,9zm0 35l0 3 13 -2 -13 -1zm-10 4l0 -4 -5 -1 3 -8 -43 6 0 14 45 -7zm0 -18l0 -15c0,-5 -10,-6 -21,-5l0 23 21 -3zm-30 -18c-8,2 -15,5 -15,10l0 14 15 -2 0 -22zm-25 45l0 -14 -59 8 32 1 -1 9 28 -4zm0 -19l0 -19c0,-6 6,-11 14,-14 -12,-1 -30,3 -30,11l0 24 16 -2z"
      />
      <text class="amount" :class="totalProducts > 99 && 'amount-small'" :x="totalProducts > 9 ? 130 : 160" y="220">
        {{ totalProducts }}
      </text>
    </svg>
  </div>
</template>

<script>
  import { ACTIONS } from '../../store/variables';

  export default {
    name: 'Bag',
    methods: {
      handleVisibility() {
        const { state } = this.$store;
        if (state.tooltip.active) {
          this.$store.dispatch(ACTIONS.TOGGLE_TOOLTIP);
        }
        if (state.basket.length) {
          this.$store.dispatch(ACTIONS.HIDE_BASKET);
        }
      },
    },
    computed: {
      totalProducts() {
        const { productsAmount } = this.$store.state;
        return productsAmount > 0 ? productsAmount : '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../colors.scss';

  .bag {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 4vw;
    max-width: 64px;
    cursor: pointer;
    transition: filter 250ms linear;
    transform: translateY(-50%);

    &.light {
      fill: $dark;
    }

    &.dark {
      filter: drop-shadow(0 0 6px $light);
      fill: $light;
    }

    &:hover {
      filter: drop-shadow(0 0 1px $black);
    }
  }

  .amount {
    font-size: 110px;
    transform: rotate3d(100, 1100, 280, -25deg);

    &-small {
      font-size: 75px;
    }
  }
</style>
