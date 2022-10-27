import AppModule from "@/core/types/AppModule";
import router from "./router";
import { useMenuStore } from "@/core/store/menu";
import { RouteRecordRaw } from "vue-router";

class AppModules {
  modules: AppModule[] = [];

  registrationModules() {
    let routers: RouteRecordRaw[] = [];
    const { addMenuItem } = useMenuStore();

    this.modules.forEach((m) => {
      if (m.hasAccess()) {
        if (Array.isArray(m.router)) {
          routers = routers.concat(m.router);
        } else {
          router.push(m.router);
        }

        if (m.menuItem) {
          addMenuItem(m.menuItem);
        }
      }
    });

    return routers;
  }
}

export default new AppModules();
