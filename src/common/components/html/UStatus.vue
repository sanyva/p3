<template>
  <div :class="[{ status: !props.raw }, style]">{{ name }}</div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  status: number | string | null;
  color?: boolean | null;
  raw?: boolean | null;
}>();

const name = computed(() => {
  const status = props.status?.toString();

  return status === "1"
    ? "Active"
    : status === "2"
    ? "Paused"
    : status === "3"
    ? "Lock"
    : "";
});
const style = computed(() => {
  const status = props.status?.toString();

  if (props.color) {
    return status === "1"
      ? "active"
      : status === "2"
      ? "pause"
      : status === "3"
      ? "lock"
      : "";
  }
  return "";
});
</script>

<style scoped></style>
