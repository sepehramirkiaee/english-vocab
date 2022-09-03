<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4">
    <header-toolbar>Sign Up</header-toolbar>
    <form @submit.prevent="submit" class="w-full flex flex-col gap-4">
      <the-input v-model.trim="name">Name</the-input>
      <the-input type="email" placeholder="alexander@domain.com" v-model.trim="email"
        >Email</the-input
      >
      <the-input type="password" v-model.trim="password">Password</the-input>

      <primary-button>Sign Up</primary-button>

    </form>
    <div class="decoration-blue-500 underline-offset-2 hover:decoration-2 dark:text-gray-200">
      <span class="text-sm">If you alreasy have account, you can </span>
      <router-link :to="{ name: 'login' }" class="underline">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    submit() {
      const formValidation = this.validateForm();
      if (formValidation) {
        this.axios
          .post("http://127.0.0.1:8000/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    validateForm() {
      if (this.name == "") {
        this.$store.dispatch("setNotification", {
          message: "<strong>Name</strong> can not be empty!",
          type: "error",
        });
        return false;
      }
      if (this.email == "") {
        this.$store.dispatch("setNotification", {
          message: "<strong>Email</strong> can not be empty!",
          type: "error",
        });

        return false;
      }
      if (!this.email.match(/\S+@\S+\.\S+/)) {
        this.$store.dispatch("setNotification", {
          message: "<strong>Email</strong>'s format is wrong!",
          type: "error",
        });

        return false;
      }
      if (this.password == "") {
        this.$store.dispatch("setNotification", {
          message: "<strong>Password</strong> can not be empty!",
          type: "error",
        });

        return false;
      }
      return true;
    },
  },
};
</script>