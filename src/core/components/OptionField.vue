<template>
  <div class="row inline items-center q-mb-md">
    {{ props.label }}:
    <q-option-group
      :model-value="modelValue"
      :options="props.options"
      class="q-ml-sm"
      :error="!!errorMessage"
      :error-message="errorMessage"
      color="primary"
      inline
      :disable="props.disable"
      :filled="props.filled"
      emit-value
      @update:model-value="onChange"
    ></q-option-group>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, Ref, toRef, watchEffect } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  options: Ref<object>;
  name?: string;
  modelValue: Ref<string | number | null>;
  label?: string;
  disable: boolean;
  filled: boolean;
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
