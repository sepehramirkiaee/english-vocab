<template>
  <div
    class="bg-transparent w-full h-screen fixed left-0 top-0 z-50"
    @click="$emit('toggleMenu')"
  >
    <div class="w-3/4 bg-black bg-opacity-80 h-screen text-white" @click.stop>
      <div class="flex justify-end">
        <span
          class="material-symbols-outlined p-8 cursor-pointer"
          @click="$emit('toggleMenu')"
          >close</span
        >
      </div>
      <!-- <ul class="flex flex-col p-8">
        <router-link :to="{ name: 'logout' }">
          <li class="cursor-pointer">Logout</li>
        </router-link>
      </ul> -->
      <div
        v-for="item in getUserMenu"
        :key="item.title"
        class="py-2 px-4 active:bg-opacity-80 active:bg-gray-800"
      >
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  emits: ["toggleMenu"],

  computed: {
    ...mapGetters(["getUserMenu"]),
  },
};
</script>

<style scoped>
.router-link-active {
  @apply text-blue-300;
}
</style>