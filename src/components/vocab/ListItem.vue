<template>
  <router-link :to="{ name: 'vocab-page', params: { id: item.id } }">
    <primary-card class="flex flex-col gap-1 p-6 pr-2">
      <p class="grow capitalize">{{ item.title }}</p>
      <p v-if="item.meanings[0]" class="text-sm text-gray-400">
        {{ item.meanings[0].meaning }}
      </p>
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