<template>
  <aside class="w-25">
    <h4>Settings</h4>
    <ul type="none">
        <li class="link-secondary" style="cursor: pointer;" @click="menuClicked('profile-user')">Profile details</li>
        <li class="link-secondary" style="cursor: pointer;" @click="menuClicked('change-password')">Change Password</li>
        <li class="link-secondary" style="cursor: pointer;"  @click="menuClicked('history-user')">Transaction History</li>
    </ul>
  </aside>
</template>

<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";
    const emit = defineEmits(['changeComponent'])

    const menuClicked = option => {
        emit("changeComponent",option)
    }

    const store = useStore()
    const userData = computed(() => {
      return store.state.auth.userLogin
    })
</script>
  
<style scoped>
 @import url(../../assets/main.css);
  .user-menu:hover {
    cursor: pointer;
  }
  
  .active-color {
    color: #4c4ddc;
  }
  
  .inactive-color {
    color: #404040;
  }
</style>