<template>
    <main class="d-flex bg-body-secondary container-fluid p-5">
            <user-menu @changeComponent="$router.push($event)"></user-menu>
                <div class="col-lg-9">
                    <component :is="component[getRoute]"></component>
                </div>
    </main>
</template>

<script setup>
    import UserMenu from "../user/UserMenu.vue"
    import ProfileUser from "../user/ProfileUser.vue"
    import ChangePassword from "../user/ChangePassword.vue"
    import HistoryUser from "../user/HistoryUser.vue"

    import { useRoute } from "vue-router"
    import { computed } from "vue"

    const route = useRoute();
    const component = {
        "profile-user": ProfileUser,
        "change-password": ChangePassword,
        "history-user": HistoryUser
    }

    const getRoute = computed(() => {
        return route.params.component
    })
    
</script>

<style scoped>
    @import url(../../assets/main.css);
    main{
        background-color: #F5F5F5;
    }
</style>