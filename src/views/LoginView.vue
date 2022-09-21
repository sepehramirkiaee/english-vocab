<template>
  <div class="md:w-1/2 md:mx-auto p-4 flex min-h-screen lg:w-full lg:p-0">
    <div class="flex flex-col gap-4 w-full lg:w-1/3 lg:p-12 lg:justify-center">
      <header-toolbar>Login</header-toolbar>

      <form @submit.prevent="login" class="w-full flex flex-col gap-4">
        <the-input
          type="email"
          placeholder="alexander@domain.com"
          v-model.trim="email"
          >Email</the-input
        >
        <the-input type="password" v-model.trim="password">Password</the-input>
        <primary-button>Login</primary-button>
      </form>
      <div
        class="
          decoration-blue-500
          underline-offset-2
          hover:decoration-2
          dark:text-gray-200
        "
      >
        <span class="text-sm">If you don't have account, you can </span>
        <router-link :to="{ name: 'signup' }" class="underline"
          >Sign up</router-link
        >
      </div>
    </div>
    <div class="hidden w-2/3 lg:flex bg-blue-700 grow items-center p-12">
      <div class="text-white text-6xl font-bold">Make Progress Easier</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      const formValidation = this.validateForm();
      if (formValidation) {
        this.axios
          .post("/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.status == 200) {
              this.$store.dispatch("setAuthentication");
              this.$router.push({ name: "vocab" });
            } else {
              this.$store.dispatch("setNotification", {
                message: "Something went wrong!",
                type: "error",
              });
            }
          })
          .catch((error) => {
            this.$store.dispatch("setNotification", {
              message: error.response.data.message,
              type: "error",
            });
          });
      }
    },

    validateForm() {
      if (this.email == "") {
        this.$store.dispatch("setNotification", {
          message: "Please enter your <strong>email</strong>",
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
          message: "Please enter your <strong>password</strong>",
          type: "error",
        });

        return false;
      }
      return true;
    },
  },
};
</script>