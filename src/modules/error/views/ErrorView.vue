<template>
  <div class="row error_page content-between">
    <div class="col-12">
      <div class="logo mlr-auto">
        <img src="@/assets/icon.png" draggable="false" class="" />
      </div>
    </div>
    <div class="col-12">
      <div class="center items-center">
        <div class="code">404</div>
        <div class="text">Page not found :(</div>
        <div class="btn">
          <q-btn color="primary" label="Go home" @click="router.push('/')" />
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="bottom">
        @{{ new Date().getFullYear() }} by
        <router-link to="/">{{ url }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const url = window.location.hostname;
</script>

<style scoped></style>
