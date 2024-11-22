<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Nutri+
        </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import useUserAuth from 'src/composables/useAuthUser';
import { useRouter } from 'vue-router';


  defineOptions({
    name: 'MainLayout'
  })

  const router = useRouter()

  const {logout} = useUserAuth()

  const $q = useQuasar()

  const handleLogout = async () => {
    $q.dialog({
      title: 'Confirmar saída',
      message: 'Voce deseja mesmo sair?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await logout()
      router.replace('/login')
    })

  }

</script>
