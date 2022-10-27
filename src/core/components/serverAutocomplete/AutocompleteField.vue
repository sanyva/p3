<template>
  <q-select
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    emit-value
    map-options
    outlined
    :model-value="modelValue"
    :error="!!errorMessage"
    :error-message="errorMessage"
    :options="options"
    @filter="filterFn"
    @update:model-value="onChange"
  >
    <template #append>
      <q-icon
        v-if="!!props.modelValue"
        class="cursor-pointer"
        name="clear"
        @click.stop.prevent="emits('update:modelValue', '')"
      />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, Ref, ref, toRef, watchEffect } from "vue";
import { apiClient } from "@/core/api/httpClient";
import { useField } from "vee-validate";

const props = defineProps<{
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

watchEffect(async () => {
  if (props.modelValue) {
    const { data } = await apiClient.post(
      `admin/${props.name}/autocomplete-item`,
      {
        public_id: props.modelValue,
      }
    );
    options.value = [{ label: data.label, value: data.public_id }];
  }
});

const options = ref();
const filterFn = async (val: string, update: any) => {
  const { data } = await apiClient.post(`admin/${props.name}/autocomplete`, {
    search: val,
    limit: 40,
  });
  const result = data.map((i: { label: string; public_id: string }) => {
    return { label: i.label, value: i.public_id };
  });

  update(() => {
    options.value = result;
  });
};
</script>

<style scoped></style>
