<template>
  <div class="row inline q-mt-sm">
    <q-btn color="primary" outline class="btn-width q-mr-md" @click="back"
      >Cancel
    </q-btn>

    <q-btn color="primary" class="btn-width" type="submit"
      >{{ props.name }}
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const back = () => {
  window.history.back();
  return false;
};
const props = defineProps<{
  name: string;
}>();
</script>

<style></style>
