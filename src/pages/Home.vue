<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner size="40px" color="primary" />
    </div>
    <div v-else-if="user">
      <p>Hello {{ user.user_metadata.name }}</p>
    </div>
    <div v-else>
      <p>Please log in.</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/useAuthStore';

  defineOptions({
    name: 'Home',
  });

  const authStore = useAuthStore();
  const { user, loading } = storeToRefs(authStore);
</script>
