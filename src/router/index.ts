import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import routerModules from "./modules";

Vue.use(VueRouter);

export interface typeMeta {
  label: string;
  img?: string;
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    redirect: "home",
    children: [
      {
        path: "home",
        name: "base",
        component: () => import("@/views/pages/Home.vue"),
      },
      {
        path: "app",
        name: "app",
        component: () => import("@/views/pages/APP.vue"),
      },
      {
        path: "modules",
        name: "modules",
        component: () => import("@/views/modules/index.vue"),
        children: routerModules,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
