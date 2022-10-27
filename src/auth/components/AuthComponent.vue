<template>
  <empty-layout>
    <div class="full-width row justify-center items-center content-center">
      <div class="col col-lg-3">
        <q-slide-transition>
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">{{ props.title }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <slot></slot>
            </q-card-section>
          </q-card>
        </q-slide-transition>
      </div>
    </div>
  </empty-layout>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import EmptyLayout from "@/core/layouts/EmptyLayout.vue";

const props = defineProps<{
  title: string;
}>();
</script>
