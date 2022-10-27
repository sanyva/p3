<template>
  <q-select
    outlined
    emit-value
    :model-value="modelValue"
    :options="props.options"
    :error="!!errorMessage"
    :error-message="errorMessage"
    map-options
    @update:model-value="onChange"
  />
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, Ref, toRef, watchEffect } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  options: Ref<object>;
  name?: string;
  modelValue: Ref<string | number | null>;
}>();

const emits = defineEmits<{ (e: "update:modelValue", value: object): void }>();
let onChange = (newValue: string) => {
  emits("update:modelValue", newValue);
};

let errorMessage: Ref<string | undefined> | null = null;
if (props.name) {
  const name = toRef(props, "name");
  const validationField = useField(name, undefined, {
    initialValue: props.modelValue,
  });
  errorMessage = validationField.errorMessage;
  onChange = (newValue: string) => {
    validationField.handleChange(newValue, true);
    emits("update:modelValue", newValue);
  };
  watchEffect(() => validationField.handleChange(props.modelValue, true));
}
</script>
