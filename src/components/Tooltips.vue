<template>
  <div class="tooltip" :class="theme" v-if="showSearchInfo">
    <p>
      Use
      <span class="example" :class="theme">integers</span>
      for page amount,
      <br />
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
</template>

<script>
  export default {
    name: 'tooltips',
    props: {
      showSearchInfo: {
        type: Boolean,
        required: false,
      },
      loading: {
        type: Boolean,
        required: false,
      },
      warnUserAboutBag: {
        type: Boolean,
        required: false,
      },
      theme: {
        type: Object,
        required: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../_colors.scss';

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
</style>
