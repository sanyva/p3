<template>
  <q-input
    outlined
    dense
    :model-value="props.modelValue"
    @update:model-value="emits('update:model-value', $event)"
  />
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const emits = defineEmits<{ (e: "update:model-value", value: object): void }>();
const props = defineProps<{
  modelValue: string | number | null;
}>();
</script>
