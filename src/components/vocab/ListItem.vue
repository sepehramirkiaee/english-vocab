<template>
  <router-link :to="{ name: 'vocab-page', params: { id: item.id } }">
    <primary-card class="flex flex-col gap-1 p-4 pr-2">
      <p class="grow capitalize">{{ item.title }}</p>
    </primary-card>
  </router-link>
</template>

<script>
import PrimaryCard from "../UI/PrimaryCard.vue";
export default {
  components: { PrimaryCard },
  props: ["item"],

  methods: {},
};
</script>