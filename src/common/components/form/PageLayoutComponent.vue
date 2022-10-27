<template>
  <div class="q-px-md q-pt-sm q-pb-md">
    <div v-if="$slots.header" class="q-pb-md">
      <slot name="header" />
    </div>

    <div class="q-pa-md component-body q-mb-md">
      <slot name="forms" />
    </div>

    <slot name="default" />
  </div>
</template>

<script lang="ts" setup></script>
