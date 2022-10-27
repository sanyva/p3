<template>
  <div class="component-body q-mb-md">
    <div class="row">
      <div class="q-mr-lg mh36 flex items-center">
        <q-icon
          name="expand_more"
          class="upp"
          :class="showChart ? '' : 'rotate'"
          @click="toggleChart()"
        />
        <span
          v-if="!showChart"
          style="position: absolute"
          class="q-ml-lg q-ml-sm q-pl-sm"
          >Chart</span
        >
      </div>
      <div
        v-if="props.title && showChart"
        class="flex items-center q-mr-lg chart-title"
      >
        {{ props.title }}
      </div>
      <Transition>
        <div v-if="showChart">
          <q-btn-toggle
            v-model="selectedChart"
            size="sm"
            toggle-color="primary"
            :options="[
              { label: 'Earnings', value: 'earnings' },
              { label: 'EPS', value: 'eps' },
              { label: 'Leads', value: 'leads' },
            ]"
          />
        </div>
      </Transition>
    </div>

    <div id="collapsed-block">
      <div id="expand-contract" :class="showChart ? 'expanded' : ''">
        <Transition>
          <LineChartComponent
            v-if="showChart"
            :chart-data="chartData"
            :chart-options="chartOptions"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LineChartComponent from "@/common/components/report/LineChartComponent.vue";
import { computed, defineProps, ref, watchEffect } from "vue";
import _ from "lodash";
import Formatters from "@/core/utils/formatter";
import ReportList from "@/core/types/ReportsList";

const props = defineProps<{
  items: ReportList;
  title?: string;
}>();

const selectedChart = ref("leads");
const toggleChart = () => {
  showChart.value = !showChart.value;
};

const showChart = ref(
  Boolean(localStorage.getItem("showChart") === "true" ? 1 : 0)
);

watchEffect(() => {
  localStorage.setItem("showChart", showChart.value.toString());
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    corsair: {
      dash: [2, 2],
      color: "#a8a0a0",
      width: 2,
    },
  },
  elements: {
    point: {
      radius: 4,
    },
  },
  scales: {
    x: {
      ticks: {
        callback: function (value: string): string {
          return this.getLabelForValue(value).substr(0, 10);
        },
        maxTicksLimit: 12,
      },
    },
  },
  parsing: {
    xAxisKey: "date",
  },
  maintainAspectRatio: false,
});
//
const chartDataF = () => {
  let result = {};

  let data = props.items.data;

  data = _.orderBy(data, "date");

  data = data.map((i) => {
    i.date = Formatters.formatCustomTime(i.date, "YYYY-MM-DD h:mm");
    return i;
  });

  switch (selectedChart.value) {
    case "earnings":
      result = earnings(data);
      break;
    case "eps":
      result = eps(data);
      break;
    case "leads":
      result = leads(data);
      break;
  }
  return result;
};

const chartData = computed(() => {
  return chartDataF();
});

function earnings(data: object) {
  return {
    labels: [],
    datasets: [
      {
        label: "Webmaster",
        data: data,
        backgroundColor: "#ec4444",
        borderColor: "#ec4444",
        parsing: {
          yAxisKey: "amount_webmaster",
        },
      },
      {
        label: "Profit",
        data: data,
        borderColor: "#449eec",
        backgroundColor: "#449eec",
        parsing: {
          yAxisKey: "amount_profit",
        },
      },
      {
        label: "Revenues",
        data: data,
        borderColor: "#d2c7bd",
        backgroundColor: "#d2c7bd",
        parsing: {
          yAxisKey: "amount_revenue",
        },
      },
    ],
  };
}

function eps(data: object) {
  return {
    labels: [],
    datasets: [
      {
        label: "WPS",
        data: data,
        borderColor: "red",
        backgroundColor: "red",
        parsing: {
          yAxisKey: "wps",
        },
      },
      {
        label: "PPS",
        data: data,
        borderColor: "blue",
        backgroundColor: "blue",
        parsing: {
          yAxisKey: "pps",
        },
      },
      {
        label: "RPS",
        data: data,
        borderColor: "grey",
        backgroundColor: "grey",
        parsing: {
          yAxisKey: "rps",
        },
      },
    ],
  };
}

function leads(data: object) {
  return {
    labels: [],
    datasets: [
      {
        label: "Leads",
        data: data,
        borderColor: "#2dd256",
        backgroundColor: "#2dd256",
        parsing: {
          yAxisKey: "leads_all",
        },
      },
      {
        label: "Calls",
        data: data,
        borderColor: "#2899ef",
        backgroundColor: "#2899ef",
        parsing: {
          yAxisKey: "calls_completed",
        },
      },
    ],
  };
}
</script>

<style scoped></style>
