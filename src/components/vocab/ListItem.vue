<template>
  <router-link :to="{ name: 'vocab-page', params: { id: item.id } }">
    <div
      class="
        flex flex-col
        gap-1
        p-4
        pr-2
        rounded-md
        bg-white
        shadow
        dark:bg-gray-800 dark:text-gray-300
        dark:border
        dark:border-gray-600
      "
    >
      <p class="grow capitalize">{{ item.title }}</p>
      <div class="flex">
        <span
          v-for="meaning in item.meaning"
          :key="meaning.id"
          class="
            leading-none
            text-xs text-gray-500
            px-2
            first:pl-0
            last:pr-0
            border-r
            last:border-r-0
            dark:text-gray-400
          "
          >{{ meaning.type }}</span
        >
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["item"],

  methods: {},
};
</script>