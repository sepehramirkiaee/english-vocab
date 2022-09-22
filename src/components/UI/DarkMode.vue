<template>
  <div class="flex items-center">
    <div
      v-if="getAuthStatus"
      class="
        w-10
        bg-gray-300
        rounded-full
        h-6
        shadow-inner
        transition
        duration-300
        cursor-pointer
        
      "
      :class="{ '!bg-blue-500': darkMode }"
      @click="toggleDarkMode"
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
    ...mapGetters(["darkMode", "getAuthStatus"]),
  },
  methods: {
    ...mapActions(["toggleDarkMode"]),
  },
};
</script>