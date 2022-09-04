<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4">
    <header-toolbar>Vocabulary</header-toolbar>
  </div>
</template>

<script>
export default {
  beforeMount() {
    const userAuth = this.$store.getters.getAuthStatus;
    if (!userAuth) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>