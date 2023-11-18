<template>
  <AppThemesSpace />

  <div class="h-full w-[20vw] bg-black/50 z-30">
    <Transition name="slide-y">
      <div
        v-if="showFirstDiv"
        class="h-screen m-0 p-0 absolute flex flex-col overflow-hidden -ml-[6px]"
      >
        <AppCountdown :heating-up="heatingUp" :countdown="d(countdownRef)" />
      </div>
    </Transition>
    <Transition name="slide-y">
      <div
        v-if="!showFirstDiv"
        class="h-screen m-0 p-0 absolute flex flex-col overflow-hidden -ml-[6px]"
      >
        <AppCountdown :heating-up="heatingUp" :countdown="d(countdownRef)" />
      </div>
    </Transition>
  </div>

  <div v-if="debug" class="absolute w-96 top-0 left-0">
    <pre
      >{{ { ...d(countdownRef), ...{ timezone, debug, end } } }}
  </pre
    >
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";

const route = useRoute();
const d = await useFormatSecondsToDHMS();

// default setup
const end = route.query.end?.toString() ?? "2023-11-29 23:59:59";
const debug = ref<boolean>(route.query.debug === "true");
const timezone =
  route.query.timezone?.toString() ??
  Intl.DateTimeFormat().resolvedOptions().timeZone.toString();

// toggle div to run animation
const showFirstDiv = ref<boolean>(false);

if (!moment.tz.zone(timezone)) {
  navigateTo("error/timezone?timezone=" + timezone);
}

// add delay to synchronize the countdown to a full second (cron like)
const heatingUp = ref<boolean>(true);

// calculate the remaining seconds
const countdownRef = computed(() => {
  // triggers the reactivity of this computed
  // eslint-disable-next-line
  showFirstDiv.value;

  // console.log(moment.tz(end, timezone).clone().local().unix() * 1000);

  const endDate = moment.tz(end, timezone).clone().local().unix() * 1000;

  const now = new Date().getTime();
  const distanceInMs = endDate - now;
  // add additional second to synchronize with the end of the animation
  return Math.floor(distanceInMs / 1000) + 1;
});

// initiate & synchronize the countdown timer
const initTimer = () => {
  const now = new Date();
  const millisecondsUntilNextSecond = 1000 - now.getMilliseconds();
  // delay countdown to start with a fill second (synchronize)
  const timeUntilNextSecond =
    millisecondsUntilNextSecond + 1000 * (1 - (now.getSeconds() % 1));

  setTimeout(() => {
    heatingUp.value = false;
    showFirstDiv.value = !showFirstDiv.value;

    const countdownTimer = setInterval(() => {
      if (countdownRef.value > 0) {
        showFirstDiv.value = !showFirstDiv.value;
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);
  }, timeUntilNextSecond);
};

onMounted(() => {
  // initiate the countdown timer once the page is fully mounted
  initTimer();
});
</script>

<style scoped>
.slide-y-enter-active,
.slide-y-leave-active {
  transition: all 1s ease;
}

.slide-y-enter-from {
  margin-top: 100vh;
}
.slide-y-leave-to {
  margin-top: -100vh;
}
</style>
