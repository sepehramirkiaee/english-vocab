<template>
  <div :class="{ dark: darkMode }">
    <div class="w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      <router-view />
    </div>
    <notification-toast></notification-toast>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["darkMode"]),
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
