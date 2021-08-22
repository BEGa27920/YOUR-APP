import { RouteConfig } from "vue-router";
import { typeMeta } from "./index";

export default [
  {
    path: "YzQ4M2E5NmItNzMwNC00NDA4LTg2MGYtNjk0YzZiMjQxN2Y0",
    name: "ConvertValuesOfCSS",
    meta: { label: "Convert Values Of CSS" } as typeMeta,
    component: () => import("@/views/modules/ConvertValuesOfCSS.vue"),
  },
] as Array<RouteConfig>;
