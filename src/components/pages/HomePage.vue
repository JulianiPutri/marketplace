<template>
    <div>
        <div class="jumbotron">
            <div class="container">
                <div class="card "  style="width: 18rem;">
                    <div class="card-body">
                        <h3 class="card-title">Ready to declutter <br> your clotes?</h3>
                        <div class="d-grid gap-2">
                            <a href="" class="btn btn-teal" >Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id="popular-item" class="container-fluid my-5">
            <div class="d-flex  justify-content-between align-items-center mx-4">
                <h3>New Product</h3>
                <a href="product.html" class="link-teal">See All</a>
            </div>
            <product-list-home
                :products="productList"
                v-if="productListStatus"
            ></product-list-home>
            
        </section>
        <section id="shop-by-brand" class="container-fluid my-5">
            <h3 class="mx-4">Shop By Brands</h3>
            <brand-list></brand-list>
        </section>
        <section id="popular-item" class="container-fluid my-5">
            <div class="d-flex  justify-content-between align-items-center mx-4">
                <h3>New Product</h3>
                <a href="product.html" class="link-teal">See All</a>
            </div>
            <product-list-home
                :products="productList"
                v-if="productListStatus"
            ></product-list-home>
            
        </section>
    </div>
</template>

<script setup>
    import ProductListHome from "../product/ProductListHome.vue"
    import BrandList from "../brands/BrandsList.vue"
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