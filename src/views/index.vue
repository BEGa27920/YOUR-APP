<template>
  <div class="container">
    <FJHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FJHeader from "@/components/common/HomeHeader.vue";

@Component({
  components: { FJHeader },
})
export default class App extends Vue {}
</script>
