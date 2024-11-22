<template>
  <q-page padding >
    <q-form class="row items-center justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h4 text-center">Entrar</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="form.email" outlined lazy-rules :rules="emailRules" type="email">
          <template v-slot:prepend>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input label="Senha" v-model="form.password" outlined :type="isPwd ? 'password' : 'text'" lazy-rules :rules="passwordRules">
          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
        </template>
        </q-input>
        <q-btn
        label="Entrar"
        color="primary"
        class="full-width"
        id="loginButton"
        type="submit"
        />
        <div class="text-center q-mt-md">
          <p class="q-mb-none text-subtitle1">
            Esqueceu sua senha? 
            <router-link to="/" class="text-blue">Recuperar senha</router-link>
          </p>
          <p class="q-mt-none text-subtitle1">
            Ainda não possui uma conta? 
            <router-link to="/register" class="text-blue">Cadastre-se</router-link>
          </p>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import useUserAuth from "src/composables/useAuthUser";
  import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";
import { useAuthStore } from "src/stores/useAuthStore";

  defineOptions({
    name: "LoginPage",
  });
  const isPwd = ref(true)
  const emailRules = [
    (val: string) => (val && val.length > 0) || 'Insira um email!'
  ]
  const passwordRules = [
    (val: string) => (val && val.length > 0) || 'Insira uma senha!'
  ]
  
  const form = ref({
    email: "",
    password: "",
  });
  
  const router = useRouter()
  const {login} = useUserAuth()
  const { notifyError, notifySuccess } = useNotify()
  const authStore = useAuthStore()

  onMounted(() => {
    console.log(authStore.isLoggedIn())
    if(authStore.isLoggedIn()) {
      router.push({name: 'home'})
    }
  })

  const handleLogin = async () => {
    try {
      await login(form.value)
      notifySuccess('Login concluido com sucesso!')
      router.push({path: '/home'})
    } catch(error: any) {
      notifyError(error.message)
    }
  }

  </script>

  <style>
    #loginButton {
      border-radius: 8px;
  }
</style>
