<template>  
    <div class="w-75">
        <form class="card " @submit.prevent="changePassword">
            <div class="card-body">
                <p class="card-text text-secondary">Change Password</p>
                <hr class="text-secondary">
                <div class="form" >
                    <div class="my-4">
                        <base-input
                            type="newPassword"
                            identity="newPassword"
                            placeholder="New password"
                            label="New Password"
                            v-model="newData.newPassword"
                            @keyInput="passwordCheck"
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
                            label="Confirmation New Password"
                            v-model="newData.newPasswordConfirm"
                            @keyInput="confirmationPasswordCheck"
                        >
                        </base-input>
                        <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display:confirmPasswordDoesNotMacth}">
                        The password confirmation does not match
                        </p>
                        <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display:confirmPasswordMacth }">
                        The password confirmation does match
                        </p>
                    </div>
                    <div class="d-flex justify-content-end">
                        <!-- <input type="submit" value="Update Profile" class="btn btn-teal text-light"> -->
                        <base-button class="btn btn-teal mE-0">Save Changes</base-button>
                    </div>
                </div>
            </div>
        </form>
    </div>   

</template>

<script setup>
    import BaseInput from '../ui/BaseInput.vue';
    import BaseButton from '../ui/BaseButton.vue';
    import { computed, reactive, ref } from "vue";
    import { useStore } from "vuex";

    const store = useStore()


    const newData = reactive({
        newPassword: "",
        newPasswordConfirm: "",
    });
    
    const changePassword = async () => {
        if (
            newData.newPassword !== newData.newPasswordConfirm ||
            newData.newPassword.length < 8
        ) {
            newData.newPasswordConfirm = "";
            newData.newPassword = "";
            confirmPasswordDoesNotMacth. value = "none";
            confirmPasswordMacth. value = "none";
        }else {
              await store.dispatch('auth/changePassword', {newPassword: newData.newPassword});
        }

    };


    const passwordStatusDisplay = ref("none")
    const passwordCheck = () => {
        if ( newData.newPassword.length < 8 ) {
            passwordStatusDisplay.value = "block"
        } else {
            passwordStatusDisplay.value = "none"
        }
    }

    const confirmPasswordDoesNotMacth = ref("none");
    const confirmPasswordMacth = ref("none");
    const confirmationPasswordCheck = () => {
        if (newData.newPasswordConfirm === "") {
            confirmPasswordDoesNotMacth.value = "none";
            confirmPasswordMacth.value = "none";
            return;
        }
        if (newData.newPassword !== newData.newPasswordConfirm) {
            confirmPasswordDoesNotMacth.value = "block";
            confirmPasswordMacth.value = "none";
            return;
        }
        confirmPasswordDoesNotMacth.value = "none";
        confirmPasswordMacth.value = "block";
        
    };
</script>


<style scoped>
    @import url(../../assets/main.css);
</style>

