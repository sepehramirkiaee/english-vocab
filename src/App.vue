<template>
  <div :class="{ dark: darkMode }" class="text-gray-600 relative">
    <div
      class="w-full bg-gray-50 dark:bg-gray-900 min-h-screen relative font-sans"
    >
      <div id="dialog"></div>
      <router-view v-if="!isLoading" />
    </div>
    <notification-toast></notification-toast>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["darkMode", "isLoading"]),
  },

  methods: {
    ...mapActions(["setDarkMode"]),
  },

  beforeMount() {
    if (localStorage.darkMode) {
      this.setDarkMode(localStorage.darkMode);
    }
  },
};
</script>
