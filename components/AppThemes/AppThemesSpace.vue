import type nuxtConfig from '~/nuxt.config';
<template>
  <div ref="universe" class="w-[80vw] z-110 group">
    <NuxtImg
      :src="`/img/1.jpg`"
      class="absolute w-[100vw] h-full object-cover group-hover:saturate-150 transition-all duration-[1500ms]"
    />
    <NuxtImg
      :src="`/img/1_mask.png`"
      class="absolute w-[100vw] h-full object-cover z-20 group-hover:saturate-150 transition-all duration-[1500ms]"
    />
  </div>
</template>

<script lang="ts" setup>
const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const universe = ref(null);

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
    universe.value.appendChild(star);
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
      }
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
