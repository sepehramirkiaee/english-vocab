<template>
  <div :class="{ dark: darkMode }">
    <div class="w-full p-4 dark:bg-gray-900 min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["darkMode"]),
  },

};
</script>
