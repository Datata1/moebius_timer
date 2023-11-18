<template>
  <div class="m-auto">
    invalid timezone
    <span
      v-if="route.query['timezone'] && route.query['timezone'] !== ''"
      class="-ml-1"
      >: <span class="text-red-500">{{ route.query["timezone"] }}</span></span
    >
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
