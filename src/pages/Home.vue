<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>
        Hello {{ user.user_metadata.name }}
      </p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import useUserAuth from 'src/composables/useAuthUser';
  import { ref } from 'vue'

  defineOptions({
    name: 'Home'
  })

  const {user} = useUserAuth()

</script>
