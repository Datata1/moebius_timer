<template>
  <div class="m-auto">
    invalid date format
    <span
      v-if="route.query['endDate'] && route.query['endDate'] !== ''"
      class="-ml-1"
      >:
      <span class="text-red-500">{{ route.query["endDate"] }}</span> (expected
      format: YYYY-MM-DD hh:mm[:ss])</span
    >
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
