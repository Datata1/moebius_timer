<template>
  <div class="h-[100vh] w-full flex">
    <div class="m-auto flex flex-row">
      <span
        v-if="heatingUp"
        class="text-5xl ml-[6px] -mt-2 border-l border-l-[#f75e50] pl-6"
      >
        Heating up{{ animatedDots }}
      </span>
      <span
        v-else-if="countdown.raw < 1"
        class="text-5xl ml-[6px] -mt-2 border-l border-l-[#f75e50] pl-6"
      >
        We are Liftoff!
      </span>
      <span
        v-else
        class="text-5xl ml-[6px] -mt-2 border-l border-l-[#f75e50] pl-6"
      >
        <span
          >{{ countdown.days }}<span class="text-xs text-[#f75e50]">d</span>
          {{ countdown.hours }}<span class="text-xs text-[#f75e50]">h</span>
          {{ countdown.minutes }}<span class="text-xs text-[#f75e50]">m</span>
          {{ countdown.seconds
          }}<span class="text-xs text-[#f75e50]">s</span></span
        >
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type DHMS } from "~/composables/useFormatSeconds";
interface Props {
  countdown: DHMS;
  heatingUp: boolean;
}
const props = defineProps<Props>();

const dots = ref(0);
const animatedDots = computed(() => {
  return ".".repeat(dots.value);
});

const incDots = () => {
  dots.value++;
  if (dots.value > 3) {
    dots.value = 0;
  }
  if (props.heatingUp) {
    setTimeout(incDots, 250);
  }
};
incDots();
</script>
