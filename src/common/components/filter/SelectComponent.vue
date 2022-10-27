<template>
  <q-select
    outlined
    :model-value="props.modelValue"
    :options="props.params.options"
    emit-value
    map-options
    dense
    :label="props.params.label"
    @update:model-value="emits('update:model-value', $event)"
  />
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, Ref } from "vue";
const emits = defineEmits<{ (e: "update:model-value", value: object): void }>();
const props = defineProps<{
  params: Ref<object>;
  modelValue: Ref<object>;
}>();
</script>
