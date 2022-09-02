<template>
  <div class="w-full p-4">
    <form class="w-full p-2 flex flex-col gap-3">
      <h3 class="font-bold text-xl">Login</h3>
      <div>
        <label>Email</label>
        <input
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
          type="password"
          class="border border-gray-300 w-full rounded p-2"
        />
      </div>
      <button type="submit" class="bg-blue-700 text-white p-2 rounded">
        Login
      </button>
      <router-link
        :to="{ name: 'signup' }"
        class="text-center border-2 border-gray-800 rounded p-2"
        >Sign Up</router-link
      >
    </form>
  </div>
</template>