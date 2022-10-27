import { defineStore } from "pinia";
import MenuItem from "@/core/types/MenuItem";

interface MenuStore {
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
  selectedMenu: string | null;
  menuList: MenuItem[];
  topBreadcrumbs: MenuItem[];
}

export const useMenuStore = defineStore({
  id: "menu",
  state: (): MenuStore => ({
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    selectedMenu: "",
    menuList: [],
    topBreadcrumbs: [],
  }),
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
    addMenuItem(menuItem: MenuItem) {
      this.menuList.push(menuItem);
    },
    addBreadCrumbs(item: MenuItem) {
      this.topBreadcrumbs.push(item);
    },
    trySelectMenuItemByPath(path: string) {
      if (this.menuList) {
        const menuItem = this.menuList.find((i) =>
          new RegExp(`^${i.path}`).test(path)
        );
        if (menuItem) {
          this.selectedMenu = menuItem.label;
          return;
        }
      }
      this.selectedMenu = null;
    },
    setRightOpen() {
      this.rightDrawerOpen = true;
    },
    setRightClose() {
      this.rightDrawerOpen = false;
    },
  },
});
