<template>
  <small
    v-if="!props.type"
    :class="[{ positive: +props.value > 0 }, { negative: +props.value < 0 }]"
    >{{ +props.value > 0 ? "+" : "" }}{{ props.value }}</small
  >
  <div
    v-if="props.type === 'full'"
    :class="[{ fullGreen: +props.value > 0 }, { fullRed: +props.value < 0 }]"
  >
    {{ +props.value > 0 ? "+" : "" }}{{ props.value }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  value: string | number | null;
  type?: string;
}>();
</script>

<style></style>
