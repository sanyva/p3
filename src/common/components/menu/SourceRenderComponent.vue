<template>
  <div class="row">
    <div class="q-pa-lg q-ma-md q-mb-md component-body source-body">
      {
      <div v-for="(k, v) in props.item" :key="k" class="row_item q-ml-xl">
        <span class="item_name">"{{ v }}"</span> :
        <span class="item_val">"{{ k }}"</span>
      </div>
      }
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  item: object | null;
}>();
</script>

<style scoped></style>
