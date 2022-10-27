<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="full-height">
      <slot><router-view /></slot>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>FetchDynamic</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
