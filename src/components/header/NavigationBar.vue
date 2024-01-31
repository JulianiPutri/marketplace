<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-evenly align-items-center mx-auto">
            <search-menu></search-menu>
            <component :is="components[menuComponent]"></component>
            <select-menu></select-menu>
        </div>
    </div>
</template>

<script setup>
    import SearchMenu from './SearchMenu.vue';
    import SelectMenu from './SelectMenu.vue'
    import SignupMenu from './SignupMenu.vue';
    import ProfileMenu from './ProfileMenu.vue';
    import { computed, ref, watch } from "vue";
    import { useStore } from "vuex";

    const menuComponent = ref("signup-menu");
    const store = useStore();

    const components = {
        'signup-menu' : SignupMenu,
        'profile-menu' : ProfileMenu
    }

    const getToken = computed(()=>{
        return store.state.auth.token;
    })
    if (!getToken.value) {
        menuComponent.value = "signup-menu";
    } else {
        menuComponent.value = "profile-menu";
    }


    watch(getToken, (newValue, oldValue) => {
        console.log('Token changed:', newValue);
        if (!newValue) {
            menuComponent.value = "signup-menu";
        } else {
            menuComponent.value = "profile-menu";
        }
    });

    // export default{
    //     components:{
    //         SearchMenu,
    //         SignUpMenu
    //     }
    // }

</script>

<style scoped>
    @import url(../../assets/main.css);
</style>