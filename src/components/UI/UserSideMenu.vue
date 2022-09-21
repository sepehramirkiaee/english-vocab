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
    <div v-for="item in menu" :key="item.title" class="p-2">
      <router-link
        :to="{ name: item.link.name }"
        class="flex items-center gap-2 dark:text-gray-300 whitespace-nowrap"
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
export default {
  data() {
    return {
      menu: [
        {
          title: "My List",
          icon: "view_agenda",
          link: {
            name: "vocab",
          },
        },
        {
          title: "Practice",
          icon: "view_carousel",
          link: {
            name: "practice",
          },
        },
        {
          title: "Add Word",
          icon: "variables",
          link: {
            name: "addWord",
          },
        },
        {
          title: "Logout",
          icon: "logout",
          link: {
            name: "logout",
          },
        },
      ],
    };
  },
};
</script>

<style>
.router-link-active {
  @apply after:content-[''] after:rounded-full after:dark:bg-blue-600 after:bg-blue-800 after:w-2 after:h-2 transition-all after:shrink-0;
}
</style>