<template>
  <div id="YzQ4M2E5NmItNzMwNC00NDA4LTg2MGYtNjk0YzZiMjQxN2Y0">
    <!-- Title App -->
    <div class="font-monospace fs-3 lh-lg text-center mb-4">
      Convert Values Of CSS
    </div>

    <!-- Content -->
    <div class="content">
      <div class="g-label-cal" v-for="(o, i) of data" :key="i">
        <label>{{ o.key }}</label>
        <div class="g-label-cal__input">
          <span v-ripple @click="copyValue(o)">
            <v-svg :src="require('@/assets/icons/fi-rr-copy.svg')" />
          </span>
          <input
            :ref="`$${o.key}`"
            type="number"
            v-model="o.value"
            @input="changeValue(o)"
            @keyup.enter="changeValue(o)"
            @keyup.esc="
              o.value = 0;
              changeValue(o);
            "
          />
          <span>{{ o.key }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Vue, Component } from "vue-property-decorator";

interface dataInput {
  key: string;
  value: string | number;
  ratio: number;
}

@Component
export default class App extends Vue {
  data: dataInput[] = [
    {
      key: "px",
      value: 0,
      ratio: 1,
    },
    {
      key: "rem",
      value: 0,
      ratio: 1 / 16,
    },
    {
      key: "em",
      value: 0,
      ratio: 1 / 16,
    },
    {
      key: "vw",
      value: 0,
      ratio: 100 / window.innerWidth,
    },
    {
      key: "vh",
      value: 0,
      ratio: 100 / window.innerHeight,
    },
    {
      key: "in",
      value: 0,
      ratio: 1 / 96,
    },
    {
      key: "cm",
      value: 0,
      ratio: 2.54 / 96,
    },
    {
      key: "mm",
      value: 0,
      ratio: (2.54 * 10) / 96,
    },
  ];
  roundN?: number = undefined;

  created() {
    window.addEventListener("resize", this.resizeWindow);
  }
  destroyed() {
    window.removeEventListener("resize", this.resizeWindow);
  }

  changeValue(value: dataInput) {
    let px = Number(value.value || 0) / value.ratio;
    this.setValue(px, value.key);
  }

  setValue(value: number, key: string) {
    for (let i = 0; i < this.data.length; i++) {
      if (key === this.data[i].key) continue;
      const n = Number(value) * this.data[i].ratio;
      this.data[i].value = this.roundN
        ? Math.round(n * 10 ** Number(this.roundN)) / 10 ** Number(this.roundN)
        : n;
    }
  }

  resizeWindow() {
    const iVW = this.data.findIndex((t) => t.key === "vw");
    const iVH = this.data.findIndex((t) => t.key === "vh");
    this.data[iVW].ratio = 100 / window.innerWidth;
    this.data[iVH].ratio = 100 / window.innerHeight;
    this.setValue(Number(this.data[0].value || 0), this.data[0].key);
  }

  copyValue(value: dataInput) {
    navigator.clipboard.writeText(String(value.value) + value.key);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/modules/_convert-values-of-CSS";
</style>
