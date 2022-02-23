<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link exact-active-class="no-active" class="text-white font-bold uppercase text-2xl mr-4" to="/"> Music </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" @click.prevent="toggleAuthModal" href="#"> Login / Register </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage"> Manage </router-link>
            </li>
            <li>
              <router-link class="px-2 text-white" to="/about"> About </router-link>
            </li>
            <li>
              <a class="px-2 text-white" @click.prevent="signOut" href="#">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signOut() {
      this.$store.dispatch('signOut');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>
