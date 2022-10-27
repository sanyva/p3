import { defineStore } from "pinia";
//import MenuItem from "@/core/types/MenuItem";

interface MenuStore {
  component: object | null;
}

export const useRightMenuStore = defineStore({
  id: "rightMenu",
  state: (): MenuStore => ({
    component: null,
  }),
  actions: {
    setComponent(component: object | null) {
      this.component = component;
    },
  },
});
