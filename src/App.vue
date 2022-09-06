<template>
  <div :class="{ dark: darkMode }">
    <div class="w-full p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <router-view />
    </div>
    <notification-toast></notification-toast>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["darkMode"]),
  },

  beforeMount() {
    this.axios.get("/sampleData/login.json").then((response) => {
      if (response.status == 200) {
        if (response.data.authentication == true) {
          this.$store.dispatch("setAuthentication");
          if (this.$route.meta.redirectIfAuth == true) {
            this.$router.push({ name: "vocab" });
          }
        } else {
          if (this.$route.meta.needAuth == true) {
            this.$router.push({ name: "login" });
          }
        }
      }
    });
  },
};
</script>
