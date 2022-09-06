<template>
  <div
    class="bg-transparent w-full h-screen fixed left-0 top-0"
    @click="$emit('toggleMenu')"
  >
    <div class="w-3/4 bg-black bg-opacity-80 h-screen text-white">
      <div class="flex justify-end">
        <span class="material-symbols-outlined p-8" @click="$emit('toggleMenu')"
          >close</span
        >
      </div>
      <ul class="flex flex-col p-8">
        <li @click="logout">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["toggleMenu"],

  methods: {
    logout() {
      this.$store.dispatch("unsetAuthentication");
      this.$router.push({ name: "login" });
    },
  },
};
</script>