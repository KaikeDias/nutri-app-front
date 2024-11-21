<template>
    <q-page padding >
      <q-form class="row items-center justify-center" @submit.prevent="handleRegister">
        <p class="col-12 text-h4 text-center">Cadastre-se</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            
            <div class="row justify-between">
                <q-input label="Nome completo" v-model="form.name" outlined class="inputRow">
                    <template v-slot:prepend>
                    <q-icon name="person"/>
                    </template>
                </q-input>
                <q-input label="Data de nascimento" v-model="form.birth_date" outlined class="inputRow">
                    <template v-slot:prepend>
                    <q-icon name="today"/>
                    </template>
                </q-input>
            </div>

            <div class="row justify-between">
                <q-input label="CPF" v-model="form.cpf" outlined class="inputRow">
                    <template v-slot:prepend>
                    <q-icon name="badge"/>
                    </template>
                </q-input>
                <q-input label="CRN" v-model="form.crn" outlined class="inputRow">
                    <template v-slot:prepend>
                    <q-icon name="badge"/>
                    </template>
            </q-input>
            </div>

          
          <q-input label="Email" v-model="form.email" outlined>
            <template v-slot:prepend>
              <q-icon name="mail"/>
            </template>
          </q-input>
          <q-input label="Senha" v-model="form.password" outlined :type="isPwd ? 'password' : 'text'">
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
          <q-input label="Confirmação de Senha" v-model="form.confirmPassowrd" outlined :type="isConfirmPwd ? 'password' : 'text'">
            <template v-slot:prepend>
              <q-icon name="vpn_key"/>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isConfirmPwd = !isConfirmPwd"
              />
            </template>
          </q-input>
          <q-btn
          label="Cadastrar-se"
          color="primary"
          class="full-width"
          id="loginButton"
          type="submit"
          />
          <div class="text-center q-mt-md">
            <p class="q-mt-none text-subtitle1">
                Já possui uma conta? 
                <router-link to="/login" class="text-blue">Entrar</router-link>
            </p> 
          </div>
        </div>
      </q-form>
    </q-page>
  </template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import useUserAuth from "src/composables/useAuthUser";
    import { useRouter } from "vue-router";
import { convertDate } from "src/utils/convert_date";
  
    defineOptions({
      name: "LoginPage",
    });
    
    const isPwd = ref(true)
    const isConfirmPwd = ref(true)
  
    const router = useRouter()
    const {register} = useUserAuth()
    

  
    const form = ref({
      email: "",
      password: "",
      confirmPassowrd: "",
      name: "",
      birth_date: "",   
      cpf: "",          
      crn: "",         
      role: '1',
    });


    const handleRegister = async () => {
      try {
        if(form.value.password !== form.value.confirmPassowrd) {
            alert('As senhas nao estão iguais')
            return
        }

        await register(form.value);
        router.push({path: '/home'})

      } catch(error: any) {
        alert(error.message)
      }
    }
  
</script>
  
<style>
    #loginButton {
        border-radius: 8px;
    }

    .inputRow {
        width: 19rem;
    }
</style>
  