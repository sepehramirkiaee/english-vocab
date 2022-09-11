<template>
  <div :class="{ dark: darkMode }">
    <div
      class="w-full bg-gray-50 dark:bg-gray-900 min-h-screen relative font-sans"
    >
      <div id="dialog"></div>
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

  beforeCreate() {
    this.axios.get("/sanctum/csrf-cookie").then(() => {
      this.axios
        .get("/api/user")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.status);
        });
    });
  },

  beforeMount() {
    if (localStorage.darkMode) {
      this.setDarkMode(localStorage.darkMode);
    }
  },
};
</script>
