<template>
  <div v-if="notifications" class="absolute bottom-3 w-full left-0 p-4">
    <transition-group name="notification" tag="div" class="flex flex-col gap-2">
      <div
        class="p-4 bg-opacity-70 w-full rounded bg-black text-white dark:bg-white dark:text-gray-900"
        v-for="notif in notifications"
        :key="notif.id"
        @click="removeNotif(notif.id)"
      >
        {{ notif.message }}
      </div>
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