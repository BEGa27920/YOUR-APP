<template>
  <div class="fj-header pb-3">
    <div class="p-2 fj-header__container">
      <div class="fj-header__left scroll-hidden">
        <router-link
          class="fj-header__left__item"
          :to="{ name: 'app' }"
          v-ripple
        >
          <v-svg :src="require('@/assets/icons/menu-burger-solid.svg')" />
        </router-link>
        <router-link
          class="fj-header__left__item"
          :to="{ name: 'base' }"
          v-ripple
        >
          <v-svg :src="require('@/assets/icons/home-regular.svg')" />
        </router-link>
        <!-- <div class="fj-header__left__hr" /> -->
      </div>

      <div class="fj-header__right">
        <!-- Label Search -->
        <div
          class="fj-header__g-search"
          :class="{ active: activeSearch, focus: focusSearch }"
          @click="$refs.fieldSearch.focus()"
        >
          <v-svg
            class="fj-header__g-search--arrow-left"
            :src="require('@/assets/icons/fi-rr-angle-left.svg')"
            @click="activeSearch = false"
          />
          <v-svg
            class="fj-header__g-search--search-icon"
            :src="require('@/assets/icons/fi-rr-search.svg')"
            @click="activeSearch = true"
          />
          <input
            type="text"
            ref="fieldSearch"
            placeholder="Search..."
            v-model="modelSearch"
            @focus="focusSearch = true"
            @blur="focusSearch = false"
            @keydown.esc="modelSearch = undefined"
          />
        </div>

        <!-- Button Theme Mode -->
        <div
          v-if="true"
          class="fj-header__button ms-md-2"
          tabindex="0"
          v-ripple
          @click="changeThemeMode"
          @contextmenu.prevent="reChangeThemeMode"
          @keydown.enter="changeThemeMode"
          @keydown.space.prevent="changeThemeMode"
        >
          <v-svg :src="require('@/assets/icons/fi-rr-opacity.svg')" />
        </div>

        <!-- Button Login -->
        <div class="fj-header__btn-login ms-3" v-ripple v-if="false">
          <v-svg :src="require('@/assets/icons/Google__G__Logo.svg')" />
          Sign in with Google
        </div>

        <!-- Button Clound -->
        <div
          v-if="false"
          v-ripple
          class="fj-header__button state-cloud ms-3"
          @click="testClickCloud"
        >
          <v-svg
            :style="{ opacity: currentStateCloud === 'CLOUD' ? '100%' : '0%' }"
            :src="require('@/assets/icons/cloud-regular.svg')"
          />
          <!-- <v-svg
            :style="{
              opacity: currentStateCloud === 'LOADING' ? '100%' : '0%',
            }"
            :src="require('@/assets/icons/refresh-regular.svg')"
          /> -->
          <ProgressSpinner
            :style="{
              opacity: currentStateCloud === 'LOADING' ? '100%' : '0%',
            }"
            color="currentColor"
            size="100%"
          />
          <v-svg
            :style="{
              opacity: currentStateCloud === 'CLOUD_SUCCESS' ? '100%' : '0%',
            }"
            :src="require('@/assets/icons/cloud-check-regular.svg')"
          />
          <v-svg
            :style="{
              opacity: currentStateCloud === 'CLOUD_FAILED' ? '100%' : '0%',
            }"
            :src="require('@/assets/icons/cloud-failed-regular.svg')"
          />
        </div>

        <!-- Button Avatar -->
        <div class="fj-header__profile-user ms-3" v-if="false">
          <div class="fj-header__profile-user__avatar">
            <img src="https://picsum.photos/64" draggable="false" />
            <div v-ripple class="fj-header__profile-user__avatar__filter" />
          </div>
        </div>
      </div>
    </div>

    <div class="fj-header__bg-filter" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProgressSpinner from "@/components/common/ProgressSpinner.vue";
import { typeThemeMode } from "@/store/modules/theme";

const theme = namespace("theme");

@Component({
  components: { ProgressSpinner },
})
export default class App extends Vue {
  @theme.Mutation("setThemeMode") setThemeMode: any;
  @theme.State("themeMode") themeMode!: typeThemeMode;

  currentStateCloud: "CLOUD" | "LOADING" | "CLOUD_SUCCESS" | "CLOUD_FAILED" =
    "CLOUD";
  activeSearch = false;
  focusSearch = false;
  modelSearch = "";

  testClickCloud() {
    if (this.currentStateCloud !== "CLOUD") return;
    this.currentStateCloud = "LOADING";
    setTimeout(() => {
      this.currentStateCloud = "CLOUD_SUCCESS";
      setTimeout(() => {
        this.currentStateCloud = "CLOUD";
      }, 1500);
    }, 5000);
  }

  changeThemeMode() {
    switch (this.themeMode) {
      case "LIGHT":
        this.setThemeMode(typeThemeMode.DARK);
        return;
      case "DARK":
        this.setThemeMode(typeThemeMode.SYSTEM);
        return;
      case "SYSTEM":
        this.setThemeMode(typeThemeMode.LIGHT);
        return;
      default:
        this.setThemeMode(typeThemeMode.LIGHT);
        return;
    }
  }
  reChangeThemeMode() {
    switch (this.themeMode) {
      case "LIGHT":
        this.setThemeMode(typeThemeMode.SYSTEM);
        return;
      case "DARK":
        this.setThemeMode(typeThemeMode.LIGHT);
        return;
      case "SYSTEM":
        this.setThemeMode(typeThemeMode.DARK);
        return;
      default:
        this.setThemeMode(typeThemeMode.DARK);
        return;
    }
  }
}
</script>
