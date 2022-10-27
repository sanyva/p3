<template>
  <div v-if="$slots.header" class="q-px-md q-pt-sm">
    <div class="q-pb-md">
      <slot name="header" />
    </div>
  </div>

  <div class="row q-px-md q-pb-md">
    <div class="col-sm-12 col-md-6">
      <div class="m-mr-md">
        <div class="component-body"><slot name="left" /></div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 m-mt-sm">
      <div class=" ">
        <div v-if="$slots.right" class="component-body">
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
