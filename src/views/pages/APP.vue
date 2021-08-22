<template>
  <div class="modules-app">
    <!-- Current Time -->
    <div class="modules-app__time fs-2 lh-lg text-center text-uppercase">
      {{ currentTime }}
    </div>

    <!-- List APP -->
    <div class="modules-app__g-app">
      <router-link
        v-for="o of routerModules"
        :key="o.path"
        :to="{ name: o.name }"
        :title="o.meta.label"
        class="modules-app__app"
      >
        {{ o.meta.label }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Vue, Component } from "vue-property-decorator";
import routerModules from "@/router/modules";
import moment from "moment";

@Component
export default class App extends Vue {
  routerModules = routerModules;
  currentTime = moment().format("HH:mm a");
  intervalTime: any = undefined;

  created() {
    this.intervalTime = setInterval(() => {
      this.currentTime = moment().format("HH:mm a");
    }, 60000);
  }
  destroyed() {
    clearInterval(this.intervalTime);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/pages/_APP";
</style>
