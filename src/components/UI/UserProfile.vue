<template>
  <div class="relative select-none" v-click-away="closeProfileMenu">
    <div
      class="flex gap-4 items-center cursor-pointer"
      @click="toggleProfileMenu"
    >
      <div class="dark:text-gray-200 hidden lg:flex">{{ userInfo.name }}</div>
      <div
        class="w-10 h-10 rounded-full border border-gray-500 overflow-hidden"
      >
        <img :src="userAvatar" />
      </div>
    </div>
    <transition name="menu">
      <div
        v-if="showProfileMenu"
        class="
          bg-white
          p-4
          rounded
          shadow-md
          absolute
          top-11
          right-0
          border border-gray-200
          dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300
        "
      >
        <div class="flex items-center gap-2 whitespace-nowrap text-sm">
          <span>Dark Mode</span>
          <dark-mode></dark-mode>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div
            v-for="item in getUserProfileMenu"
            :key="item.title"
            
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
    </transition>
  </div>
</template>

<script>
import DarkMode from "./DarkMode.vue";
import { mapGetters } from "vuex";
import { mixin as VueClickAway } from "vue3-click-away";

export default {
  components: { DarkMode },

  data() {
    return {
      userAvatar: "/img/user-200.png",
      showProfileMenu: false,
    };
  },
  mixins: [VueClickAway],

  computed: {
    ...mapGetters(["getUserProfileMenu"]),

    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },

  methods: {
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    },

    closeProfileMenu() {
      this.showProfileMenu = false;
    },
  },

  beforeMount() {
    this.axios
      .get(
        `https://avatars.dicebear.com/api/:initials/:${this.userInfo.name}.svg`
      )
      .then((response) => {
        console.log(response);
        this.userAvatar = response.data;
      });
  },
};
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  @apply transition-all;
}

.menu-enter-from,
.menu-leave-to {
  @apply opacity-0;
}

.menu-enter-to,
.menu-leave-from {
  @apply opacity-100;
}
</style>