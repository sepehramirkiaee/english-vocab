<template>
  <div class="p-4 text-gray-800 dark:text-gray-50">Please Wait ...</div>
</template>

<script>
export default {
  mounted() {
    this.axios.post("/logout").then(() => {
      this.$store.dispatch("unsetAuthentication");
      this.$router.push({ name: "login" });
    });
  },
};
</script>