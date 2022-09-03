<template>
  <div v-if="notifications" class="absolute bottom-3 w-full left-0 p-4 md:w-auto">
    <transition-group name="notification" tag="div" class="flex flex-col gap-2">
      <div
        class="py-3 px-6 w-full rounded border bg-black text-white"
        v-for="notif in notifications"
        :key="notif.id"
        @click="removeNotif(notif.id)"
        :class="{
          'border-red-500': notif.type == 'error',
          'bg-red-50': notif.type == 'error',
          'text-red-800': notif.type == 'error',
        }"
        v-html="notif.message"
      ></div>
    </transition-group>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    },
  },
  methods: {
    removeNotif(id) {
      this.$store.dispatch("removeNotificationById", id);
    },
  },
};
</script>

<style>
.notification-enter-active,
.notification-leave-active {
  @apply transition-all;
}
.notification-enter-from,
.notification-leave-to {
  @apply opacity-0;
}
</style>