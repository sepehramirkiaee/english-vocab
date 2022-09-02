<template>
  <div class="w-full p-4">
    <form @submit.prevent="submit" class="w-full p-2 flex flex-col gap-3">
      <h3 class="font-bold text-xl">Sign Up</h3>

      <div>
        <label>Name</label>
        <input
          v-model.trim="name"
          type="text"
          class="
            border border-gray-300
            w-full
            rounded
            p-2
            placeholder:text-gray-300
          "
        />
      </div>
      <div>
        <label>Email</label>
        <input
          v-model.trim="email"
          type="email"
          class="
            border border-gray-300
            w-full
            rounded
            p-2
            placeholder:text-gray-300
          "
          placeholder="example@gmail.com"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          v-model.trim="password"
          type="password"
          class="
            border border-gray-300
            w-full
            rounded
            p-2
            placeholder:text-gray-300
          "
        />
      </div>
      <button type="submit" class="bg-blue-700 text-white p-2 rounded">
        Sign Up
      </button>
      <router-link
        :to="{ name: 'login' }"
        class="text-center border-2 border-gray-800 rounded p-2"
        >Login</router-link
      >
    </form>
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
          .post('http://api.vue.com/api/register',{ name: this.name, email: this.email, password: this.password })
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
        return false;
      }
      if (this.email == "") {
        return false;
      }
      if (this.password == "") {
        return false;
      }
      return true;
    },
  },
};
</script>