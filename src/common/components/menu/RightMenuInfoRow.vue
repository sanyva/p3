<template>
  <div class="row info-row items-center">
    <div class="col label text-weight-medium text-left">
      {{ props.label }}
    </div>
    <div class="col inline">
      <slot name="default">{{ props.value }}</slot>
    </div>
    <div class="col text-right">
      <slot style="margin-left: auto" name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  label: string | null;
  value?: string;
}>();
</script>
<style scoped></style>
