<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 90 100"
    xml:space="preserve"
    class="odd icon"
  >
    <circle class="circle" v-if="showHead" cx="73.342" cy="9.377" r="8.305" />
    <path
      d="M74.545,23.664c-1.723-1.141-4.033-0.671-5.172,1.044l-6.539,9.855l-9.209-12.098c-0.994-1.069-2.309-2.359-4.723-2.359   l-17.736,0.011c-7.238,0-11.818,6.058-11.818,12.238v26.438c-0.017,5.596,7.282,5.596,7.282,0V32.949h2.292l-0.014,61.625   c0,2.571,2.081,4.651,4.653,4.651c2.571,0,4.656-2.08,4.656-4.651V61.572h3.161v33.001c0,2.571,2.088,4.651,4.663,4.651   c2.57,0,4.648-2.08,4.648-4.651l-0.004-63.651l9.389,12.333c0.707,0.929,1.807,1.47,2.969,1.47c0.041,0,0.08,0,0.121-0.001   c1.205-0.039,2.318-0.661,2.986-1.665l9.439-14.223C76.729,27.118,76.26,24.803,74.545,23.664z"
    />
  </svg>
</template>

<script>
export default {
  name: "Odd",
  props: ["showHead"]
};
</script>

<style lang="scss" scoped>
.circle {
  cursor: pointer;
  fill: #93dc80;
}

.odd {
  min-width: 64px;
  width: 4vw;
  max-width: 48px;
  padding: 1px;
  cursor: pointer;
  animation: disappear 2s linear reverse;

  @media screen and (max-width: 450px) {
    position: fixed;
    z-index: 1;
    bottom: 0;
    right: 0;
    transform: translateY(-50%);
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

@keyframes disappear {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
