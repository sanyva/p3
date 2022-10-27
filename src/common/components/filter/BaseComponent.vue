<template>
  <div class="component-body p0 q-mb-md">
    <div class="row">
      <template v-for="item in list" :key="item">
        <component
          :is="item.component"
          v-if="!item.params.disable"
          :params="item.params"
          :label="item.params.label"
          style="min-width: 150px; max-width: 200px; margin: 10px 10px 10px"
          :model-value="props.modelValue[item.params.param]"
          @update:model-value="
            emits('update:model-value', {
              ...props.modelValue,
              [item.params.param]: $event,
            })
          "
        ></component>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import InputComponent from "@/common/components/filter/InputComponent.vue";
import SelectComponent from "@/common/components/filter/SelectComponent.vue";
import AutocompleteComponent from "@/common/components/filter/AutocompleteComponent.vue";
import DatePeriodComponent from "@/common/components/filter/DatePeriodComponent.vue";

const componentList = {
  InputComponent,
  SelectComponent,
  AutocompleteComponent,
  DatePeriodComponent,
};

const props = defineProps<{
  filter: object | null;
  modelValue: object | [];
}>();

const list = [];
const emits = defineEmits<{ (e: "update:model-value", value: object): void }>();

for (let key: string in props.filter) {
  list.push({
    component: componentList[props.filter[key].component],
    params: props.filter[key],
  });
}
</script>
