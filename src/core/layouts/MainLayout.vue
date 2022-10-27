<template>
  <q-layout view="hHh lpr lfr">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link to="/">
            <q-avatar square>
              <img src="../../assets/icon.png" />
            </q-avatar>
          </router-link>
          {{ selectedMenu }}
        </q-toolbar-title>

        <!--        <div class="top-breadcrumbs">-->
        <!--          <q-breadcrumbs>-->
        <!--            <q-breadcrumbs-el-->
        <!--              v-for="item in topBreadcrumbs"-->
        <!--              :key="item"-->
        <!--              :label="item.label"-->
        <!--              to="/campaigns"-->
        <!--            />-->
        <!--          </q-breadcrumbs>-->
        <!--        </div>-->
        <q-item>
          <q-avatar class="pointer">
            <img src="../../assets/avatar.png" draggable="false" />
          </q-avatar>
          <q-menu class="user-profile">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <router-link to="/users/profile">Profile</router-link>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section @click="logOut">LogOut</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      show-if-above
      side="left"
      bordered
    >
      <q-tree
        default-expand-all
        no-selection-unset
        :nodes="menuList"
        node-key="label"
        class="left-menu q-mt-lg"
        selected-color="primary"
        :selected="selectedMenu"
        @update:selected="onSelectMenuItem"
      />
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" :width="250" bordered>
      <component :is="component" v-if="component" />
    </q-drawer>

    <q-page-container>
      <q-page class=" ">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useMenuStore } from "@/core/store/menu";
import { useRightMenuStore } from "@/core/store/rightMenu";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/auth/store";

const { leftDrawerOpen, rightDrawerOpen, selectedMenu, menuList } = storeToRefs(
  useMenuStore()
);

const { toggleRightDrawer, toggleLeftDrawer } = useMenuStore();
const router = useRouter();

const { component } = storeToRefs(useRightMenuStore());

const onSelectMenuItem = (value: object) => {
  selectedMenu.value = value;
  const menuItem = menuList.value.find((i) => i.label === value);
  if (menuItem) {
    router.push(menuItem.path);
  }
};

const { doLogout } = useAuthStore();
const logOut = () => {
  doLogout();
  router.push("/login");
};
</script>
