<template>
  <div class="flex justify-between items-center">
    <h3 class="font-bold text-xl my-4 dark:text-white">
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
      :class="{ 'bg-blue-500': darkMode }"
      @click="toggleDark"
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

export default {
  computed: {
    ...mapGetters(["darkMode"]),
  },

  methods: {
    ...mapActions(["toggleDarkMode"]),
    toggleDark() {
      this.toggleDarkMode();
    },
  },
};
</script>