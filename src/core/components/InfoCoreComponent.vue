<template>
  <slot name="default" />

  <q-tree
    default-expand-all
    no-selection-unset
    :nodes="menuList"
    node-key="label"
    no-connectors
    class="right-menu q-mt-md"
    selected-color="primary"
    :selected="selectedMenu"
    @update:selected="onSelectMenuItem"
  />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps, ref } from "vue";

const props = defineProps<{
  entityId: number;
  menuList: [];
  moduleName: string;
}>();

const router = useRouter();

const selectedMenu = ref("");
const onSelectMenuItem = (value: object) => {
  selectedMenu.value = value;

  let menuItem = props.menuList.find((i) => {
    const result = i.label === value;
    if (!result && i.children) {
      return i.children.find((y) => y.label === value);
    }
    return result;
  });

  if (menuItem?.children) {
    menuItem = menuItem.children.find((i) => i.label === value);
  }

  if (menuItem?.path) {
    router.push(`/${props.moduleName}/${props.entityId}${menuItem.path}`);
  }
};
</script>

<style scoped></style>
