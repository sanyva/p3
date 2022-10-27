<template>
  <i class="fa fa-circle" :class="style"></i>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  status: string | null;
}>();

const status = props.status?.toString();

const style = computed(() => {
  return status === "1" ? "text-success" : "";
});
</script>

<style scoped></style>
