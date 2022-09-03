<template>
  <header-toolbar>Login</header-toolbar>

  <form class="w-full flex flex-col gap-3">
    <the-input type="email" placeholder="example@gmail.com" v-model.trim="email"
      >Email</the-input
    >
    <the-input type="password" v-model.trim="password">Password</the-input>
    <button type="submit" class="bg-blue-700 text-white p-2 rounded">
      Login
    </button>
    <router-link
      :to="{ name: 'signup' }"
      class="text-center border-2 border-gray-800 rounded p-2"
      >Sign Up</router-link
    >
  </form>
</template>