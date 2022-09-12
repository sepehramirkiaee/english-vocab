<template>
  <div class="flex justify-between items-center">
    <span v-if="backButton" @click="$router.back" class="cursor-pointer select-none material-symbols-outlined dark:text-white w-10"
      >arrow_back</span
    >

    <span
      v-else-if="getAuthStatus"
      class="material-symbols-outlined dark:text-white w-10 cursor-pointer"
      @click="toggleMenu"
      >menu</span
    >
    <transition name="menu">
      <user-menu @toggleMenu="toggleMenu" v-if="showUserMenu"></user-menu>
    </transition>
    <h3 class="font-medium capitalize text-xl my-4 dark:text-white">
      <slot></slot>
    </h3>
    <div
      class="
        w-10
        bg-gray-300
        rounded-full
        h-6
        shadow-inner
        transition
        duration-300
      "
      :class="{ '!bg-blue-500': darkMode }"
      @click="toggleDarkMode"
    >
      <div
        class="
          w-4
          h-4
          bg-white
          m-1
          rounded-full
          shadow-md
          transition-all
          duration-300
        "
        :class="{ 'ml-5': darkMode }"
      ></div>
    </div>
    <input
      type="checkbox"
      class="hidden"
      :checked="darkMode"
      @change="toggleDarkMode"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserMenu from "./UserMenu.vue";

export default {
  props: ["backButton"],
  components: {
    UserMenu,
  },

  data() {
    return {
      showUserMenu: false,
    };
  },

  computed: {
    ...mapGetters(["darkMode", "getAuthStatus"]),
  },

  methods: {
    ...mapActions(["toggleDarkMode"]),

    toggleMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
  },
};
</script>

<style>
.menu-enter-active,
.menu-leave-active {
  @apply transition-all;
}

.menu-enter-from,
.menu-leave-to {
  @apply -translate-x-full;
}
</style>