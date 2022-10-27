import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import authRouter from "../auth/router";
import errorRouter from "@/modules/error/router";
import { useAuthStore } from "../auth/store";
import AppModules from "../modules";
import { useMenuStore } from "@/core/store/menu";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "MainLayout" */ "../core/layouts/MainLayout.vue"
      ),
    children: [
      {
        path: "/",
        component: () => import("@/modules/dashboard/views/DashboardView.vue"),
      },
    ],
  },
  ...authRouter,
  ...errorRouter,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { hasUser, getUser } = useAuthStore();
  const { trySelectMenuItemByPath, menuList } = useMenuStore();
  if (to.matched.some((record) => record.meta.noAuth)) {
    next();
  } else {
    if (hasUser) {
      if (menuList.length === 0) {
        moduleInit();
      }
      trySelectMenuItemByPath(to.path);
      next();
    } else {
      getUser()
        .then(() => {
          moduleInit();
          router.replace(to.fullPath);
        })
        .catch(() => {
          next("/login");
        });
    }
  }
});

const moduleInit = () => {
  const routers = AppModules.registrationModules();
  routers.forEach((r) => {
    router.addRoute("home", r);
  });
};

export default router;
