<template>
  <div class="flex flex-col gap-4 md:w-1/2 md:mx-auto lg:w-1/3 xl:w-1/4 p-4">
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
          .get("http://localhost:8000/sanctum/csrf-cookie")
          .then(() => {
            this.axios.post("http://localhost:8000/api/login", {
              email: this.email,
              password: this.password,
            });
          })
          // .get("../sampleData/login.json")
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
            console.log(error);
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