<template>
  <form class="control">
    <input
      placeholder="input search here..."
      @input.prevent="submit"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
      type="text"
      class="input"
      v-model="filter"
    />
    <div class="tooltip" v-show="showTooltip">
      Use integers for page amount, <br />
      decimals for max price and <br />
      letters for product search.
      <div class="timer"></div>
      ticktack motherfucker
    </div>
  </form>
</template>

<script>
  export default {
    name: 'filter-items',
    data() {
      return {
        filter: null,
        showTooltip: false,
      };
    },
    methods: {
      submit() {
        this.$emit('change-color');

        if (isNaN(+this.filter)) {
          this.$emit('filter', this.filter);
        } else {
          this.$emit('filter', +this.filter);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .control {
    position: relative;
  }
  .tooltip {
    font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
    padding: 8px 16px;
    border-radius: 16px;
    background: #1a2530;
    border: 1px solid #1a2530;
    position: absolute;
    animation: disappear 1s 6s forwards linear;
    box-shadow: 0 0 4px #9fadbd;
    width: 350px;

    .timer {
      height: 5px;
      width: 300px;
      background: linear-gradient(45deg, #6a6787, #00c6b5);
      animation: getThin 6s forwards linear;
      border-radius: 1rem;
    }
  }

  @keyframes getThin {
    from {
      width: 300px;
    }
    to {
      width: 0px;
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
