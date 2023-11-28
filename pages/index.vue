<template>
  <AppThemesAstronaut
    v-if="moebius.theme === MoebiusTheme.ASTRONAUT"
    :moebius="moebius"
  />

  <div v-if="moebius.debug" class="absolute w-96 top-0 left-0">
    <pre
      >{{
        {
          ...{
            countdown: d(moebius.countdown),
            timezone: moebius.timezone,
            debug: moebius.debug,
            endDate: moebius.endDate,
          },
        }
      }}
  </pre
    >
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import { type Moebius, MoebiusTheme } from "~/types/Moebius";

const route = useRoute();
const d = await useFormatSecondsToDHMS();

// default setup
const moebius = ref<Moebius>({
  endDate: route.query.endDate?.toString() ?? "2024-01-01 00:00:00",
  timezone:
    route.query.timezone?.toString() ??
    Intl.DateTimeFormat().resolvedOptions().timeZone.toString(),
  debug: route.query.debug === "true",
  countdown: -1,
  heatUp: true,
  theme: MoebiusTheme.ASTRONAUT,
});

// validate input
if (!moment.tz.zone(moebius.value.timezone)) {
  navigateTo("error/timezone?timezone=" + moebius.value.timezone);
}

if (!moment(new Date(moebius.value.endDate)).isValid()) {
  navigateTo("error/date?endDate=" + moebius.value.endDate);
}

// add delay to synchronize the countdown to a full second (cron like)
// calculate the remaining seconds
const tickCountdown = () => {
  // triggers the reactivity of this computed
  const endDate =
    moment
      .tz(moebius.value.endDate, moebius.value.timezone)
      .clone()
      .local()
      .unix() * 1000;

  if (Number.isNaN(endDate)) {
    navigateTo("error/date?endDate=" + moebius.value.endDate);
  }

  const now = new Date().getTime();
  const distanceInMs = endDate - now;
  moebius.value.countdown = Math.floor(distanceInMs / 1000) + 1;
};

// initiate & synchronize the countdown timer
const initTimer = () => {
  const now = new Date();
  let delayMs = 1000 - now.getMilliseconds();
  delayMs = delayMs === 1000 ? 0 : delayMs;

  setTimeout(() => {
    moebius.value.heatUp = false;
    tickCountdown();

    const countdownTimer = setInterval(() => {
      if (moebius.value.countdown > 0) {
        tickCountdown();
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);
  }, delayMs);
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
