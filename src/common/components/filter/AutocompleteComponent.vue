<template>
  <field-autocomplete
    :model-value="modelValue"
    outlined
    class="no_bottom_element"
    dense
    :name="props.params.options.api"
    @update:model-value="onChange"
  ></field-autocomplete>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, Ref } from "vue";
import FieldAutocomplete from "@/core/components/serverAutocomplete/AutocompleteField.vue";

const emits = defineEmits<{ (e: "update:modelValue", value: object): void }>();

const props = defineProps<{
  params: Ref<object>;
  modelValue: Ref<object>;
}>();

let onChange = (newValue: string) => {
  emits("update:modelValue", newValue);
};
</script>
