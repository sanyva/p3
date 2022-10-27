<template>
  <div class="row filter-block">
    <q-ajax-bar position="top" color="warning" size="5px" />
    <base-filter-component
      v-model="filterComponent.data.value"
      :filter="filterComponent.model"
    ></base-filter-component>
  </div>

  <div class="row">
    <div class="col">
      <slot name="chart" :data="report" />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="component-body q-mb-md component-body-p-0">
        <div class="q-mb-md">
          <slot name="default" />
        </div>

        <table-component
          v-if="report.data"
          :columns="props_layout.columns"
          :rows="report.data"
          :total="report.total"
        >
          <template v-for="(_, fname) in $slots" #[fname]="slotData">
            <slot :name="fname" v-bind="slotData || {}" />
          </template>
        </table-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import BaseFilterComponent from "@/common/components/filter/BaseComponent.vue";
import useFilter from "@/common/components/Filter";
import FilterList from "@/core/types/FilterList";
import TableComponent from "@/common/components/table/TableComponent.vue";
import ReportList from "@/core/types/ReportsList";
import Formatters from "@/core/utils/formatter";
import { onBeforeRouteLeave } from "vue-router";

const props_layout = defineProps<{
  columns: object | string | number | null;
  filter: FilterList[];
  fetchData: (o: object, n: string) => object;
  name: string;
}>();

const filterComponent = useFilter(props_layout.filter);
const report = ref({});

const loadData = () => {
  setDefaultDatePeriod();

  props_layout
    .fetchData(
      {
        filters: filterComponent.data.value,
      },
      props_layout.name
    )
    .then((i: ReportList) => {
      report.value = i;
    })
    .catch((e) => {
      console.log(e.message);
    });
};

const setDefaultDatePeriod = () => {
  const dateParam = !!filterComponent.data.value.date;

  if (!dateParam) {
    if (props_layout.name === "daily") {
      //  last 3 week
      filterComponent.data.value.date = `${Formatters.addDaysToCurrent(
        -20
      )} - ${Formatters.addDaysToCurrent(0)}`;
    } else if (props_layout.name === "hourly") {
      //  last 1 week
      filterComponent.data.value.date = "";
      filterComponent.data.value.date = `${Formatters.addDaysToCurrent(
        -6
      )} - ${Formatters.addDaysToCurrent(0)}`;
    } else if (props_layout.name === "grouped") {
      filterComponent.data.value.date = `${Formatters.addDaysToCurrent(
        -20
      )} - ${Formatters.addDaysToCurrent(0)}`;
    } else if (props_layout.name === "comparison") {
      filterComponent.data.value.date = `${Formatters.addDaysToCurrent(
        -20
      )} - ${Formatters.addDaysToCurrent(0)}`;
    }
  }
};

loadData();
const unwatch = watch(
  () => filterComponent.data,
  () => {
    loadData();
  },
  { deep: true }
);

onBeforeRouteLeave(() => {
  unwatch();
});
</script>
