<template>
  <q-input
    v-model="cDate"
    outlined
    class="period"
    dense
    :model-value="props.modelValue"
    mask="####/##/## - ####/##/##"
    @update:model-value="update($event)"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <div class="flex inline">
            <div class="row column q-pa-sm">
              <q-badge
                color="primary"
                class="q-mb-md pointer"
                @click="setPeriod(0, 0)"
              >
                Today
              </q-badge>
              <q-badge
                color="primary"
                class="q-mb-md pointer"
                @click="setPeriod(-1, -1)"
              >
                Yesterday
              </q-badge>
              <q-badge
                color="primary"
                class="q-mb-md pointer"
                @click="setPeriod(-6, 0)"
              >
                Last 7 days
              </q-badge>
              <q-badge
                color="primary"
                class="q-mb-md pointer"
                @click="setPeriod(-29, 0)"
              >
                Last 30 days
              </q-badge>
              <q-badge
                color="primary"
                class="q-mb-md pointer"
                @click="setPeriod(-89, 0)"
              >
                Last 90 days
              </q-badge>
            </div>
          </div>
          <q-date v-model="date" range></q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watchEffect } from "vue";
import Formatters from "@/core/utils/formatter";

const emits = defineEmits<{
  (e: "update:model-value", value: object): void;
}>();
const props = defineProps<{
  modelValue: string | number | null;
}>();
const update = (newVal: object) => {
  if (newVal.toString().length === 23 || newVal.toString().length === 0)
    emits("update:model-value", newVal);
};
const date = ref({ from: "", to: "" });

const cDate = computed(() => {
  if (!date.value) {
    return "";
  }
  let str = date.value.from + " - " + date.value.to;
  if (!/^\d{4}\/\d{2}\/\d{2} - \d{4}\/\d{2}\/\d{2}$/.exec(str)) {
    str = "";
  }
  emits("update:model-value", str);
  return str;
});

watchEffect(() => {
  date.value = {
    from: props.modelValue ? props.modelValue.toString().substr(0, 10) : "",
    to: props.modelValue ? props.modelValue.toString().substr(13, 24) : "",
  };
});

const setPeriod = (start: number, end: number) => {
  date.value.from = Formatters.addDaysToCurrent(start);
  date.value.to = Formatters.addDaysToCurrent(end);
};
</script>

<style scoped></style>
