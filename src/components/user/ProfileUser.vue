<template>
    <div class="w-75">
      <form class="card " @submit.prevent="updateProfile">
        <div class="card-body">
          <p class="card-text text-secondary">Edit Profile</p>
          <hr class="text-secondary">
          <div class="form">
            <div class="my-2">
              <base-input
                type="text"
                identity="fullname"
                label="Full Name"
                v-model="fullname"
              ></base-input>
            </div>
            <div class="my-2">
              <base-input
                type="text"
                identity="username"
                label="Username"
                v-model="username"
              ></base-input>
            </div>
            <div class="my-2">
              <base-input
                type="text"
                identity="email"
                label="Email"
                v-model="email"
                readonly="1"
              ></base-input>
            </div>
            <div class="d-flex justify-content-end">
              <base-button class="btn btn-teal me-0" type="submit">Update Profile</base-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import BaseInput from '../ui/BaseInput.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import { computed, ref } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore()
  const userData = computed(() => {
      return store.state.auth.userLogin
  })
  
  const fullname = ref(userData.value.fullname);
  const username = ref(userData.value.username);
  const email = ref(userData.value.email);
  
  const updateProfile = async () => {
    try {
      await store.dispatch('auth/updateProfile', {
        fullname: fullname.value,
        username: username.value,
        email: email.value,
      });
      // Optionally, show a success message or navigate to another page
      console.log("succes")
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle the error, e.g., show an error message
    }
  };
  
  </script>
  
  <style scoped>
  @import url(../../assets/main.css);
  </style>
  