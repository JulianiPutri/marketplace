<template>  
    <div class="w-75">
        <form class="card ">
            <div class="card-body">
                <p class="card-text text-secondary">Edit Profile</p>
                <hr class="text-secondary">
                <div class="form" >
                    <div class="my-2">
                        <!-- <label for="" class="fw-bold form-label">Full name </label>
                        <input class="form-control" type="text" placeholder="Jack Daniel"> -->
                        <base-input
                            type="text"
                            identity="fullname"
                            :placeholder="userData.fullname"
                            label="Full Name"
                            readonly="1"
                        >
                        </base-input>
                    </div>
                    <div class="my-2">
                        <base-input
                            type="text"
                            identity="username"
                            :placeholder="userData.username"
                            label="Username"
                            readonly="1"
                        >
                        </base-input>
                        
                    </div>
                    <div class="my-2">
                        <base-input
                            type="text"
                            identity="email"
                            :placeholder="userData.email"
                            label="Email"
                            readonly="1"
                        >
                        </base-input>
                    </div>
                    <div class="d-flex justify-content-end">
                        <!-- <input type="submit" value="Update Profile" class="btn btn-teal text-light"> -->
                        <base-button class="btn btn-teal mE-0">Update Profile</base-button>
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

