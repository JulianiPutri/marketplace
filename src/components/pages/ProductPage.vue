<template>
    <div class="container-fluid">
        <section id="popular-item" class="container-fluid my-3">
            <div class="d-flex  justify-content-between align-items-center mx-4">
                <h3>Items</h3>
            </div>
            <product-list
                :products="productList"
                v-if="productListStatus"
            ></product-list>
            
        </section>
    </div>
</template>

<script setup>
    import ProductList from "../product/ProductList.vue"
    import { onMounted, ref } from "vue";
    import { useStore } from "vuex";

    const store = useStore();
    const productListStatus = ref(false);
    const productList = ref();

    onMounted(async () => {
        try {
            await store.dispatch("product/getProductData" );
            productListStatus.value = true;
            productList.value = store.state.product.products;
        } catch (error) {
            console.log(error);
        }
    });

</script>

<style scoped>
 @import url(../../assets/main.css);
</style>