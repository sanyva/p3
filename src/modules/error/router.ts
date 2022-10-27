export default [
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: () => import("./views/ErrorView.vue"),
  },
];
