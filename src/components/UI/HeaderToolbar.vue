<template>
  <div
    :class="{
      'flex items-center justify-between p-4 md:mx-auto md:px-4 md:w-1/2 lg:w-full lg:px-8 lg:py-2 lg:bg-white lg:dark:bg-black lg:shadow-sm lg:border-b lg:border-gray-300 lg:dark:border-gray-700':
        getAuthStatus,
    }"
  >
    <span
      v-if="backButton"
      @click="$router.back"
      class="
        cursor-pointer
        select-none
        material-symbols-outlined
        dark:text-white
        w-10
      "
      >arrow_back</span
    >

    <span
      v-else-if="getAuthStatus"
      class="
        material-symbols-outlined
        dark:text-white
        w-10
        cursor-pointer
        lg:hidden
      "
      @click="toggleMenu"
      >menu</span
    >
    <transition name="menu">
      <user-menu @toggleMenu="toggleMenu" v-if="showUserMenu"></user-menu>
    </transition>
    <h3
      class="
        font-medium
        capitalize
        text-xl
        my-4
        lg:grow
        dark:text-white
        lg:text-2xl
      "
    >
      <slot></slot>
    </h3>
    <user-profile v-if="getAuthStatus"></user-profile>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserMenu from "./UserMenu.vue";
import UserProfile from "./UserProfile.vue";

export default {
  props: ["backButton"],
  components: {
    UserMenu,
    UserProfile,
  },

  data() {
    return {
      showUserMenu: false,
    };
  },

  computed: {
    ...mapGetters(["getAuthStatus"]),
  },

  methods: {
    toggleMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
  },
};
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  @apply transition-all;
}

.menu-enter-from,
.menu-leave-to {
  @apply -translate-x-full;
}
</style>