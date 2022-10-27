<template>
  <div class="q-py-lg flex items-center justify-between">
    <div><slot /></div>
    <div class="row inline">
      <q-pagination
        :model-value="props.modelValue"
        :min="1"
        :max-pages="5"
        :max="props.pagesTotal ? props.pagesTotal : 1"
        direction-links
        @update:model-value="emits('update:modelValue', $event)"
      />
      <span class="content-center row total-rows">
        {{ props.elementsTotal }} records</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps<{
  elementsTotal: object | string | number | null;
  pagesTotal: object | string | number | null;
  modelValue: number | string | null;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", id: object): void;
}>();
</script>
