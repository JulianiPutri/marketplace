<template>
    <div class=" shadow-sm container-fluid bg-white py-3 border-bottom ">
        <div class="d-flex justify-content-evenly align-items-center mx-auto" style="width:90%">
            <router-link to="/" class="m-0 text-decoration-none text-teal fw-bold fs-4">Vintage</router-link>
            <navigation-bar></navigation-bar>
        </div>
    </div>
</template>

<script setup>
    import SearchMenu from './SearchMenu.vue';
    import NavigationBar from './NavigationBar.vue';


</script>

<style scoped>
    @import url(../../assets/main.css);
</style>