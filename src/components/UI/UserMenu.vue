<template>
  <div
    class="bg-transparent w-full h-screen fixed left-0 top-0 z-50"
    @click="$emit('toggleMenu')"
  >
    <div class="w-3/4 bg-black bg-opacity-80 h-screen text-white" @click.stop>
      <div class="flex justify-end">
        <span class="material-symbols-outlined p-8" @click="$emit('toggleMenu')"
          >close</span
        >
      </div>
      <ul class="flex flex-col p-8">
        <li @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["toggleMenu"],

  methods: {
    logout() {
      this.axios.post("/logout").then(() => {
        this.$store.dispatch("unsetAuthentication");
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>