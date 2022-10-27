<template>
  <div class="component-body q-mb-md">
    <pagination
      class="tp10"
      :model-value="props.currentPage"
      :elements-total="props.elementsTotal"
      :pages-total="props.totalPages"
      @update:model-value="emits('update:currentPage', $event)"
    >
      <slot name="pagingLeftSide" />
    </pagination>

    <table-component :columns="props.columns" :rows="props.data">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </table-component>

    <pagination
      :model-value="props.currentPage"
      :elements-total="props.elementsTotal"
      :pages-total="props.totalPages"
      @update:model-value="emits('update:currentPage', $event)"
    ></pagination>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import Pagination from "@/common/components/table/TablePaging.vue";
import TableComponent from "@/common/components/table/TableComponent.vue";

const props = defineProps<{
  columns: object | string | number | null;
  data: object | string | number | null;
  currentPage: number | string | null;
  elementsTotal: number | string | null;
  totalPages: number | string | null;
}>();
const emits = defineEmits<{ (e: "update:currentPage", value: string): void }>();
</script>

<style scoped></style>
