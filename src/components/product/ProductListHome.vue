<template>
    <div class="container-fluid row d-flex justify-content-center">
        <div  v-for="item in products" class="position-relative mx-3 "
              style="padding-top: 12px; padding-bottom: 12px; width: 18rem" width="15rem" >
            <router-link :to=" '/detail/'+ item.id" 
              class="text-decoration-none text-teal" 
            >
                <img 
                    :src="item.image" 
                    class="card-img-top" 
                    alt="..." 
                    height="240"
                    width="auto"
                    style="object-fit: cover">
                <div class="card-body">
                    <h5 class="card-title text-teal">{{ item.price }}</h5>
                    <p class="card-text">{{ item.name }}</p>
                    <div class="d-flex justify-content-between">
                        <p class="card-text text-start">{{ item.size }}</p>
                        <p class="card-text text-end"><i class="fa-regular fa-heart"></i> 12</p>
                    </div>
                </div>
            </router-link>
        </div>
        <router-link to="/product" class="text-decoration-none card h-auto bg-info bg-opacity-25" style="width: 15rem;">
            <a href="product.html" class="d-flex align-items-center justify-content-center card-body text-decoration-none">
                <h5 class="card-title text-teal">See All <br> Product</h5>
            </a>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    products: Array
  })
</script>
<style scoped>
 @import url(../../assets/main.css);
</style>