<template>
  <input-field v-model="model" :type="isPwd ? 'password' : 'text'">
    <template #after>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </input-field>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, computed, ref } from "vue";
import InputField from "@/core/components/InputField.vue";

const isPwd = ref(true);
const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const model = computed<string>({
  get: () => props.modelValue,
  set: (newValue: string) => {
    emits("update:modelValue", newValue);
  },
});
</script>
