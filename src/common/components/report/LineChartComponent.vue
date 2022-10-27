<template>
  <LineChartGenerator
    :chart-options="props.chartOptions"
    :chart-data="props.chartData"
    :chart-id="conf.chartId"
    :dataset-id-key="conf.datasetIdKey"
    :styles="conf.styles"
    :plugins="horisontLine"
    :width="conf.width"
    :height="conf.height"
  />
</template>

<script lang="ts" setup>
import { Line as LineChartGenerator } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import { defineProps, Ref, ref } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

const conf = ref({
  chartId: "line-chart",

  datasetIdKey: "label",
  width: 400,
  height: 400,
  cssClasses: "",
  styles: {
    type: Object,
    default: () => {
      return {};
    },
  },
  plugins: {
    type: Array,
    default: () => [],
  },
});

const horisontLine = [
  {
    id: "corsair",
    afterInit: (chart) => {
      chart.corsair = {
        x: 0,
        y: 0,
      };
    },
    afterEvent: (chart, evt) => {
      const {
        chartArea: { top, bottom },
      } = chart;
      const {
        event: { x, y },
      } = evt;
      if (y < top || y > bottom) {
        chart.corsair = {
          x,
          y,
          draw: false,
        };
        chart.draw();
        return;
      }

      chart.corsair = {
        x,
        y,
        draw: true,
      };

      chart.draw();
    },
    afterDatasetsDraw: (chart, _, opts) => {
      const {
        ctx,
        chartArea: { left, right },
      } = chart;
      const { y, draw } = chart.corsair;

      if (!draw) {
        return;
      }
      ctx.lineWidth = opts.width || 0;
      ctx.setLineDash(opts.dash || []);
      ctx.strokeStyle = opts.color || "black";
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.stroke();
      ctx.restore();
    },
  },
];

const props = defineProps<{
  chartData: Ref<object>;
  chartOptions: Ref<object>;
}>();
</script>
