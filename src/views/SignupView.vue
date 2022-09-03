<template>
  <header-toolbar>Sign Up</header-toolbar>
  <form @submit.prevent="submit" class="w-full flex flex-col gap-3">
    <the-input v-model.trim="name">Name</the-input>
    <the-input
      placeholder="example@gmail.com"
      v-model.trim="email"
      >Email</the-input
    >
    <the-input type="password" v-model.trim="password">Password</the-input>

    <primary-button>Sign Up</primary-button>
    <router-link
      :to="{ name: 'login' }"
      class="text-center border-2 border-gray-800 rounded p-2"
      >Login</router-link
    >
    <notification-toast></notification-toast>
  </form>
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
          message: "Name can not be empty!",
        });
        return false;
      }
      if (this.email == "") {
        this.$store.dispatch("setNotification", {
          message: "Email can not be empty!",
        });

        return false;
      }
      if (!this.email.match(/\S+@\S+\.\S+/)) {
        this.$store.dispatch("setNotification", {
          message: "Email format is wrong",
        });

        return false;
      }
      if (this.password == "") {
        this.$store.dispatch("setNotification", {
          message: "Password can not be empty!",
        });

        return false;
      }
      return true;
    },
  },
};
</script>