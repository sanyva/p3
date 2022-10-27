<template>
  <div class="col row no_error flex-center form-row mh35">
    <div class="col-auto title inline">
      {{ props.title }}
    </div>
    <div class="col">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  title?: string | null;
}>();
</script>

<style scoped></style>
