<template>  
    <div class="w-75">
        <form class="card ">
            <div class="card-body">
                <p class="card-text text-secondary">Change Password</p>
                <hr class="text-secondary">
                <div class="form" >
                    <div class="my-4">
                        <base-input
                            type="oldPassword"
                            identity="oldPassword"
                            placeholder="Old password"
                            label="Old Password"
                            >
                        </base-input>
                        <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{display:passwordStatusDisplay}">
                        The password field must be at least 8 characters
                        </p>
                    </div>
                    <div class="my-4">
                        <base-input
                            type="newPassword"
                            identity="newPassword"
                            placeholder="New password"
                            label="New Password"
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
    import { computed } from "vue";
    import { useStore } from "vuex";

    const store = useStore()
    const userData = computed(() => {
        return store.state.auth.userLogin
    })



</script>


<style scoped>
    @import url(../../assets/main.css);
</style>

