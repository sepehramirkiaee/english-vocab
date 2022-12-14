<template>
  <header-toolbar>Login</header-toolbar>
  <content-wrapper>
    <user-side-menu></user-side-menu>
    <div class="flex flex-col gap-4 w-full">
      <form @submit.prevent="submit" class="w-full flex flex-col gap-4">
        <the-input type="password" v-model.trim="current_password"
          >Current Password</the-input
        >
        <the-input
          @input="checkStrength"
          type="password"
          v-model.trim="password"
          ><span class="flex justify-between items-center">
            Password<span
              v-if="passwordStrength.value"
              :class="{
                'bg-green-700': passwordIsValid,
                'bg-red-500': !passwordIsValid,
              }"
              class="text-white px-1 text-xs rounded"
              >{{ passwordStrength.value }}</span
            ></span
          ></the-input
        >
        <the-input type="password" v-model.trim="passwordConfirmation"
          >Confirm Password</the-input
        >
        <div>
          <div class="flex items-center">
            <span
              :class="{
                'text-green-600 dark:text-green-400': containsLowercase,
              }"
              class="material-symbols-outlined text-sm mr-2"
              >check_circle</span
            ><span class="text-xs dark:text-gray-400">Contains Lowercase</span>
          </div>
          <div class="flex items-center">
            <span
              :class="{
                'text-green-600 dark:text-green-400': containsUppercase,
              }"
              class="material-symbols-outlined text-sm mr-2"
              >check_circle</span
            ><span class="text-xs dark:text-gray-400">Contains Uppercase</span>
          </div>
          <div class="flex items-center">
            <span
              :class="{ 'text-green-600 dark:text-green-400': containsNumber }"
              class="material-symbols-outlined text-sm mr-2"
              >check_circle</span
            ><span class="text-xs dark:text-gray-400">Contains Number</span>
          </div>
          <div class="flex items-center">
            <span
              :class="{ 'text-green-600 dark:text-green-400': containsSymbol }"
              class="material-symbols-outlined text-sm mr-2"
              >check_circle</span
            ><span class="text-xs dark:text-gray-400"
              >Contains Special Character</span
            >
          </div>
          <div class="flex items-center">
            <span
              :class="{ 'text-green-600 dark:text-green-400': containsTen }"
              class="material-symbols-outlined text-sm mr-2"
              >check_circle</span
            ><span class="text-xs dark:text-gray-400"
              >Contains at least 10 Character</span
            >
          </div>
        </div>
        <primary-button>Submit</primary-button>
      </form>
    </div>
  </content-wrapper>
</template>

<script>
import { passwordStrength } from "check-password-strength";

export default {
  data() {
    return {
      current_password: "",
      password: "",
      passwordConfirmation: "",
      passwordStrength: { contains: [] },
      customPassword: [
        {
          id: 0,
          value: "Too weak",
          minDiversity: 0,
          minLength: 0,
        },
        {
          id: 1,
          value: "Weak",
          minDiversity: 2,
          minLength: 6,
        },
        {
          id: 2,
          value: "Medium",
          minDiversity: 3,
          minLength: 10,
        },
        {
          id: 3,
          value: "Strong",
          minDiversity: 3,
          minLength: 12,
        },
      ],
    };
  },

  computed: {
    containsLowercase() {
      return this.passwordStrength.contains.includes("lowercase");
    },
    containsUppercase() {
      return this.passwordStrength.contains.includes("uppercase");
    },
    containsNumber() {
      return this.passwordStrength.contains.includes("number");
    },
    containsSymbol() {
      return this.passwordStrength.contains.includes("symbol");
    },
    containsTen() {
      return this.passwordStrength.length >= 10;
    },
    passwordIsValid() {
      return (
        this.passwordStrength.value == "Medium" ||
        this.passwordStrength.value == "Strong"
      );
    },
  },

  methods: {
    submit() {
      const formValidation = this.validateForm();
      if (formValidation) {
        this.axios
          .put("/user/password", {
            current_password: this.current_password,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          })
          .then((response) => {
            if (response.status == 201) {
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
      if (this.current_password == "") {
        this.$store.dispatch("setNotification", {
          message: "<strong>Name</strong> can not be empty!",
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

      if (this.passwordConfirmation == "") {
        this.$store.dispatch("setNotification", {
          message: "<strong>Password confirm</strong> can not be empty!",
          type: "error",
        });

        return false;
      }

      if (!this.passwordIsValid) {
        this.$store.dispatch("setNotification", {
          message: "<strong>Password</strong> is not strong enough!",
          type: "error",
        });

        return false;
      }
      return true;
    },

    checkStrength() {
      this.passwordStrength = passwordStrength(
        this.password,
        this.customPassword
      );
    },
  },
};
</script>