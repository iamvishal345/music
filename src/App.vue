<template>
  <!-- Header -->
  <app-header></app-header>
  <router-view></router-view>
  <app-player />

  <!-- Auth Modal -->
  <auth-modal></auth-modal>
</template>

<script>
import AppPlayer from '@/components/Player.vue';
import AppHeader from './components/Header.vue';
import AuthModal from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>
