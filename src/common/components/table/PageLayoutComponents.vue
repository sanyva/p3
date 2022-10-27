<template>
  <div class="q-px-md q-pt-sm q-pb-md">
    <div class="q-pb-md">
      <slot name="header" />
    </div>

    <div v-if="props_layout.filter?.length > 0" class="row filter-block">
      <base-filter-component
        v-model="filterComponent.data.value"
        :filter="filterComponent.model"
      ></base-filter-component>
    </div>

    <table-grid-component
      v-model:current-page="paging.data.currentPage.value"
      :data="data"
      :columns="props_layout.columns"
      :elements-total="paging.data.elementsTotal"
      :total-pages="paging.data.totalPages"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </table-grid-component>
  </div>
</template>

<script lang="ts" setup>
import TableGridComponent from "@/common/components/table/TableGridComponent.vue";
import BaseFilterComponent from "@/common/components/filter/BaseComponent.vue";
import { defineProps, ref, watchEffect } from "vue";
import useFilter from "../Filter";
import FilterList from "@/core/types/FilterList";
import usePaging from "@/common/components/Paging";
import ApiDataListParam from "@/core/types/ApiDataListParam";
import { onBeforeRouteLeave } from "vue-router";

const props_layout = defineProps<{
  columns: object | string | number | null;
  filter?: FilterList[];
  fetchData: (o: ApiDataListParam) => object;
}>();

const filterParam = props_layout.filter ? props_layout.filter : [];

const filterComponent = useFilter(filterParam);

const paging = usePaging();

const data = ref([]);

const loadData = () => {
  props_layout
    .fetchData({
      page: paging.data.currentPage.value,
      filters: filterComponent.data.value,
    })
    .then((i: object) => {
      data.value = i.data;
      paging.data.totalPages = i.paging.pages_total;
      paging.data.elementsTotal = i.paging.elements_total;
    });
};

const unwatch = watchEffect(() => {
  loadData();
});

onBeforeRouteLeave(() => {
  unwatch();
});
</script>
