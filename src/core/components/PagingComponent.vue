<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      :model-value="props.page"
      :max="props.totalPages"
      direction-links
      @update:model-value="emits('update:modelValue', $event)"
    />

    <span
      v-if="props.totalRecords !== null"
      class="font-weight-thin align-self-center"
    >
      {{ props.totalRecords }} records
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps<{
  totalPages: number;
  totalRecords: number;
  page: number;
}>();

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
</script>
