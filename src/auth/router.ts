export default [
  {
    path: "/login",
    component: /* webpackChunkName: "Auth" */ () =>
      import("./views/LoginView.vue"),
    meta: {
      noAuth: true,
    },
  },
  {
    path: "/reset-password",
    component: /* webpackChunkName: "Auth" */ () =>
      import("./views/ResetPasswordView.vue"),
    meta: {
      noAuth: true,
    },
  },
  {
    path: "/set-password/:token",
    component: /* webpackChunkName: "Auth" */ () =>
      import("./views/SetPasswordView.vue"),
    meta: {
      noAuth: true,
    },
  },
];
