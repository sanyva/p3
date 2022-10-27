<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted } from "vue";
/**
 * right Menu Info
 */
import { useRightMenuStore } from "@/core/store/rightMenu";
import { useMenuStore } from "@/core/store/menu";
const { setComponent } = useRightMenuStore();
const props = defineProps<{
  rightMenu: object;
}>();
const menuStore = useMenuStore();

onMounted(() => {
  setComponent(props.rightMenu);
  menuStore.setRightOpen();
});

onUnmounted(() => {
  setComponent(null);
  useMenuStore().setRightClose();
});
</script>
