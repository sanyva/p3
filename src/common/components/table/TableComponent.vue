<template>
  <q-markup-table class="no-shadow">
    <thead>
      <tr v-if="isTableTitle" v-html="tableTitleRow"></tr>
      <tr>
        <th
          v-for="item in props.columns"
          :key="item.text"
          :class="[
            item.align === 'right' ? 'text-right' : 'text-left',
            item.props?.class,
            'th',
          ]"
        >
          {{ item.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.rows" :key="row">
        <td
          v-for="colm in props.columns"
          :key="colm"
          :class="[
            colm.align === 'right' ? 'text-right' : 'text-left',
            colm.props?.class,
            row.class,
            'td',
          ]"
        >
          <slot :name="`item.${colm.value}`" :item="row">
            {{ row[colm.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="props.total">
      <tr>
        <td class="border-top-total" v-for="colm in props.columns" :key="colm">
          {{ props.total[colm.value] }}
        </td>
      </tr>
    </tfoot>
  </q-markup-table>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";

const props = defineProps<{
  columns: object | string | number | null;
  rows: object | string | number | null;
  total?: object | string | number | null;
}>();

const isTableTitle = ref(false);
const tableTitleRow = ref();

const checkOnTitle = (): boolean => {
  let result = false;
  if (props.columns) {
    for (let key in props.columns) {
      if (props.columns[key]?.props?.group) {
        result = true;
      }
    }
  }
  return result;
};

const tableTitle = (): void => {
  let str = "";
  if (checkOnTitle()) {
    if (props.columns) {
      let grName = "_*";
      for (let key in props.columns) {
        // console.log(props.columns[key]);
        if (!props.columns[key].props?.group) {
          str += '<th class="th-line th"></th>';
        } else {
          if (
            grName != props.columns[key].props?.group ||
            props.columns[key].props?.group === ""
          ) {
            let cnt = calcGroup(props.columns[key].props?.group);
            str += `<th class="th-line th" colspan="${cnt}">${props.columns[key].props?.group}</th>`;
            grName = props.columns[key].props?.group;
          }
        }
      }
    }
    isTableTitle.value = true;
    str = `<tr>${str}</tr>`;
  }
  tableTitleRow.value = str;
};

const g_cnt = ref(0);
const calcGroup = (name: string) => {
  let cnt = 0,
    flag = true;
  if (props.columns) {
    for (let key in props.columns) {
      if (+key >= +g_cnt.value) {
        if (props.columns[key]?.props?.group === name && flag) {
          g_cnt.value = +key + 1;
          if (props.columns[+key + 1]?.props?.group !== name) {
            flag = false;
          }
          cnt++;
        }
      }
    }
  }
  return cnt;
};

tableTitle();
</script>
