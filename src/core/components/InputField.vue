<template>
  <q-input
    :model-value="props.modelValue"
    :error="!!errorMessage"
    :error-message="errorMessage"
    @update:model-value="onChange"
  >
    <template v-for="(_, slName) in $slots" #[slName]="slotData">
      <slot :name="slName" v-bind="slotData || {}" />
    </template>
  </q-input>
</template>
<script lang="ts" setup>
import { QInput } from "quasar";
import { toRef, defineProps, defineEmits, Ref, watchEffect } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name?: string;
  modelValue: Ref<string | number | null>;
}>();
const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
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
    //validationField.handleChange(newValue, true);
    emits("update:modelValue", newValue);
  };
  // TO DO Computed
  watchEffect(() => validationField.handleChange(props.modelValue, true));
}
</script>
