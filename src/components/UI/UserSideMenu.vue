<template>
  <div
    class="
      hidden
      w-1/3
      lg:flex lg:flex-col
      gap-2
      p-4
      -ml-12
      sticky
      top-4
      shrink-0
    "
  >
    <div v-for="item in getUserMenu" :key="item.title" class="p-2">
      <router-link
        :to="{ name: item.link.name }"
        class="
          flex
          items-center
          gap-2
          dark:text-gray-300
          whitespace-nowrap
          transition-all
        "
      >
        <span class="material-symbols-outlined !no-underline">{{
          item.icon
        }}</span
        ><span class="text-sm grow">{{ item.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserMenu"]),
  },
};
</script>

<style scoped>
.router-link-active {
  @apply text-blue-700 dark:text-blue-400;
}
</style>