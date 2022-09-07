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

        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
      "
    >
      <p class="grow capitalize">{{ item.title }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["item"],

  methods: {},
};
</script>