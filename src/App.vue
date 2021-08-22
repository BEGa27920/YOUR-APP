<template>
  <router-view />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Vue, Component } from "vue-property-decorator";
import load from "@/services/load";

@Component
export default class App extends Vue {
  created() {
    load.load(this);

    let url: any = new URL(window.location.href);
    url = url.search.substring(1);
    url = Object.fromEntries(new URLSearchParams(location.search));
    const link = url.link;
    if (link) this.$router.push(link);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss";
</style>
