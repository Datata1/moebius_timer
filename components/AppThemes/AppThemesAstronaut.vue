import type nuxtConfig from '~/nuxt.config';
<template>
  <div ref="universe" class="w-full">
    <NuxtImg
      src="/img/1.webp"
      class="absolute w-[100vw] h-full object-cover saturate-150"
    />
    <NuxtImg
      src="/img/1_mask.webp"
      class="absolute w-[100vw] h-full object-cover z-20 saturate-150"
    />
  </div>
  <div class="absolute z-50 w-screen h-screen">
    <div
      class="absolute left-[calc(50%-200px)] bottom-48 rounded-full bg-[black]/50 w-96 p-2 border-2 border-[#f75e50]/25"
    >
      <div
        v-if="moebius.heatUp"
        class="h-24 pt-[28px] font-[Roboto] text-center"
      >
        <div class="text-4xl w-full text-center">Heating up..</div>
      </div>
      <div
        v-else-if="moebius.countdown < 1"
        class="h-24 pt-[28px] font-[Roboto]"
      >
        <div class="text-4xl w-full text-center">We are Liftoff!</div>
      </div>
      <div v-else class="flex flex-row h-24">
        <AppThemesAstronatutCountdown
          :value="parseInt(d(moebius.countdown, false).days)"
          :value-string="d(moebius.countdown).days"
          :multiplier="365"
          appendix="d"
        />
        <AppThemesAstronatutCountdown
          :value="parseInt(d(moebius.countdown, false).hours)"
          :value-string="d(moebius.countdown).hours"
          :multiplier="15"
          appendix="h"
        />
        <AppThemesAstronatutCountdown
          :value="parseInt(d(moebius.countdown, false).minutes)"
          :value-string="d(moebius.countdown).minutes"
          :multiplier="6"
          appendix="m"
        />
        <AppThemesAstronatutCountdown
          :value="parseInt(d(moebius.countdown, false).seconds)"
          :value-string="d(moebius.countdown).seconds"
          :multiplier="6"
          appendix="s"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Moebius } from "~/types/Moebius";

interface Props {
  moebius: Moebius;
}

defineProps<Props>();

const d = await useFormatSecondsToDHMS();

const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const universe = ref<HTMLElement | null>(null);

onMounted(() => {
  const w: Window = window;
  const d: Document = document;
  const e: HTMLElement = d.documentElement;
  const g: HTMLElement = d.getElementsByTagName("body")[0];

  interface Config {
    starCount: number;
    maxTime: number;
    width: number;
    height: number;
  }

  const config: Config = {
    starCount: 400,
    maxTime: 30,
    width: w.innerWidth || e.clientWidth || g.clientWidth,
    height: w.innerHeight || e.clientHeight || g.clientHeight,
  };

  for (let i = 0; i < config.starCount; ++i) {
    const ypos: number = Math.round(Math.random() * config.height);
    const star: HTMLDivElement = document.createElement("div");
    const speed: number =
      1000 * (getRandomArbitrary(0.1, 1) * config.maxTime + 1);
    const starsp: number = 1000 * (Math.random() * config.maxTime + 1);
    star.setAttribute("class", "star" + (3 - Math.floor(starsp / 1000 / 8)));
    star.style.zIndex = Math.random() >= 0.75 ? "30" : "0";
    star.style.backgroundColor = "white";
    universe.value?.appendChild(star);
    star.animate(
      [
        {
          transform: "translate3d(" + config.width + "px, " + ypos + "px, 0)",
        },
        {
          transform:
            "translate3d(-" +
            Math.random() * 256 +
            "px, " +
            ypos * Math.random() +
            "px, 0)",
        },
      ],
      {
        delay: Math.random() * -speed,
        duration: speed,
        iterations: 1000,
      },
    );
  }
});
</script>

<style>
.star0 {
  height: 1px;
  width: 1px;
  opacity: 0.5;
  position: absolute;
}

.star1 {
  height: 2px;
  width: 2px;
  border-radius: 50%;
  opacity: 0.5;
  position: absolute;
}

.star2 {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  opacity: 0.5;
  position: absolute;
}

.star3 {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  opacity: 0.5;
  position: absolute;
}
</style>
