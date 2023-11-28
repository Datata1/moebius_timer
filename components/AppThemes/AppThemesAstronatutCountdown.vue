<template>
  <div>
    <div
      class="absolute flex flex-col font-[Roboto] justify-center text-white font-light text-3xl mt-[33px] w-[90px]"
    >
      <div class="w-full text-center">{{ valueString }}</div>
      <div class="text-[#f75e50] text-sm w-full text-center -mt-2">
        {{ appendix }}
      </div>
    </div>
  </div>
  <svg
    height="100"
    width="100"
    class="transition-transform duration-500 ease"
    viewBox="0 0 100 100"
    :style="`transform: rotate(${angle}deg)`"
  >
    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="rgba(237, 164, 129, 1)" />
      <stop offset="100%" stop-color="rgba(247, 94, 80, 1)" />
    </linearGradient>
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke-width="5"
      stroke="url(#gradient)"
      stroke-dasharray="2 8"
      fill="rgba(0,0,0,0)"
    ></circle>
  </svg>
</template>

<script lang="ts" setup>
interface Props {
  value: number;
  valueString: string;
  multiplier: number;
  appendix: string;
}

const props = defineProps<Props>();

const angle = computed(() => {
  return props.multiplier * props.value;
});
</script>
