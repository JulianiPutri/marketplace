<template>
  <div class="card container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 z-2 m-auto signup-form">
      <div class="text-center">
        <!-- <img src="../../assets/images/logo.png" alt="Logo" /> -->
        <h1 class="m-0 fw-bold text-teal">Vintage</h1>
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>
      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          
            <base-input
              type="text"
              identity="fullname"
              placeholder="Ex: Jack Daniel"
              label="Full Name"
              v-model="signupData.fullname"
            >
            </base-input>

        </div>
        <div class="my-4">
          <base-input
              type="text"
              identity="username"
              placeholder="Your Username"
              label="Username"
              v-model="signupData.username"
            >
            </base-input>
        </div>
        <div class="my-4">
          <base-input
              type="email"
              identity="email"
              placeholder="Your email address"
              label="Email"
              v-model="signupData.email"
            >
            </base-input>
        </div>
        <div class="my-4">
          <base-input
              type="password"
              identity="password"
              placeholder="Your password"
              label="Password"
              @keyInput="passwordCheck"
              v-model="signupData.password"
            >
            </base-input>
            <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{display:passwordStatusDisplay}">
              The password field must be at least 8 characters
            </p>
        </div>
        <div class="my-4">
          <base-input
              type="password"
              identity="confirmationPassword"
              placeholder="Your password"
              label="Confirmation Password"
              @keyInput="confirmationPasswordCheck"
              v-model="signupData.confirmationPassword"
            >
            </base-input>
            <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display:confirmPasswordDoesNotMacth}">
              The password confirmation does not match
            </p>
            <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display:confirmPasswordMacth }">
              The password confirmation does match
            </p>
        </div>
        <div class="my-4">
        </div>
        <base-button class="btn btn-teal w-100 my-3 ">Register</base-button>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?<span style="color: #4c4ddc"
            ><router-link to="/login"  class="text-decoration-none">Login</router-link></span
          >
        </p>
      </div>
    </div>
    <div class="modal z-3 d-flex justify-content-center align-items-center position-fixed " v-if="modalVisible">
      <div class="modal-dialog  w-50">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img src="../../assets/images/paper-plane.png" class="w-25 h-auto"/>
            <!-- <i class="fa-solid fa-paper-plane text-teal" style="font-size: 10vw;"  ></i> -->
            <h3>Successfully Register</h3>
            <p class="text-secondary">Thank you for register at vintage. Start find your favorite pre-loved product here.</p>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn w-100 btn-teal" @click="move()">Go to Home Page</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import url(../../assets/main.css);
</style>

<script setup>
  import BaseInput from "../ui/BaseInput.vue"
  import BaseButton from "../ui/BaseButton.vue";
  import { reactive, ref } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  const store = useStore()
  const router = useRouter()
  const modalVisible = ref(false);
  const register = async () => {
    if (
      signupData. password !== signupData.confirmationPassword ||
      signupData. password.length < 8
    ) {
      signupData. confirmationPassword = "";
      signupData. password = "";
      confirmPasswordDoesNotMacth. value = "none";
      confirmPasswordMacth. value = "none";
    }else {
      await store.dispatch("auth/getRegisterData" , signupData);
      modalVisible.value = true
    }
  };
  
  const move = () =>{
    router.push("/");
  }

  const signupData = reactive({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmationPassword: "",
    isLogin: false,
  });

  const passwordStatusDisplay = ref("none")
  const passwordCheck = () => {
      if ( signupData.password.length < 8 ) {
        passwordStatusDisplay.value = "block"
      } else {
        passwordStatusDisplay.value = "none"
    }
  }

  const confirmPasswordDoesNotMacth = ref("none");
  const confirmPasswordMacth = ref("none");
  const confirmationPasswordCheck = () => {
    if (signupData.confirmationPassword === "") {
      confirmPasswordDoesNotMacth.value = "none";
      confirmPasswordMacth.value = "none";
      return;
    }
    if (signupData.password !== signupData.confirmationPassword) {
      confirmPasswordDoesNotMacth.value = "block";
      confirmPasswordMacth.value = "none";
      return;
    }
    confirmPasswordDoesNotMacth.value = "none";
    confirmPasswordMacth.value = "block";
    
  };


 
  
</script>