<template>
    <div class="row container my-5 mx-auto">
        <div class="col-lg-7">
            <img class="img-fluid"  :src="productDetail.image" alt="cardigan full" >
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title">Rp {{ productDetail.price }}</h4>
                        <p class="card-text text-end"><i class="fa-regular fa-heart fa-lg"></i></p>
                    </div>
                    <h5 class="card-text my-">{{ productDetail.name }}</h5>
                    <div class="d-flex mt-0 text-secondary">
                        <p class="card-text mt-0">{{ productDetail.size }}</p>
                        <p class="mx-2 fw-bold">&middot</p>
                        <p class="card-text mt-0">Very Good</p>
                        <p class="mx-2 fw-bold">&middot</p>
                        <p class="card-text mt-0">Denpasar</p>
                    </div>
                    <hr class="my-0">
                    <p class="card-text mt-2 mb-3">Items Description</p>
                    <h6 class="card-text my-3">
                        {{ productDetail.description }}
                    </h6>
                    <div class="d-flex justify-content-between">
                        <p class="card-text my-2">Category</p>
                        <p class="card-text my-2">{{ productDetail.category }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="card-text my-2">Size</p>
                        <p class="card-text my-2">{{ productDetail.size }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="card-text my-2">Conditions</p>
                        <p class="card-text my-2">Very Good</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="card-text my-2">Color</p>
                        <p class="card-text my-2">{{ productDetail.color }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="card-text my-2">Uploaded</p>
                        <p class="card-text my-2">5 hours ago</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="card-text my-2">Shipping</p>
                        <p class="card-text my-lg-2">Rp {{ productDetail.shipping }}</p>
                    </div>
                    <div class="d-grid gap-2 mt-2">
                        <button class="btn btn-teal text-light">Buy Now</button>
                        <button class="btn btn-outline-teal" @click="addToCart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->
    <div class="modal z-3 d-flex justify-content-center align-items-center position-fixed " v-if="modalVisible">
      <div class="modal-dialog  w-50">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img src="https://icones.pro/wp-content/uploads/2021/05/icone-de-panier-orange.png" class="w-25 my-4"/>
            <!-- <i class="fa-solid fa-cart-shopping" style="font-size: 10vw;"></i> -->
            <h3>Product successfully added to cart</h3>
            <p class="text-secondary">“Vintage chicago cubs white” successfully added to cart. Check now on the cart or continue shopping.</p>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn w-100 btn-outline-teal" @click="goToProduct">Continue Shopping</button>
            <button type="button" class="btn w-100 btn-teal" @click="moveToCart">Go to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <!-- card list -->
    <div class="container-fluid">
        <section id="popular-item" class="container-fluid my-3">
            <div class="d-flex  justify-content-between align-items-center mx-4">
                <h3>Other Product</h3>
            </div>
            <product-list
                :products="productList"
                v-if="productListStatus"
            ></product-list>
            
        </section>
    </div>
    
</template>

<style scoped>
    @import url(../../assets/main.css);
</style>

<script setup>
    import ProductList from '../product/ProductList.vue'
    import { computed, onMounted, ref } from "vue"
    
    import { useStore } from "vuex"
    import { useRoute, useRouter } from "vue-router"

    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const modalVisible = ref(false)
    onMounted(async () => {
        await store.dispatch(
            "product/getProductDetail" , route.params.id
        )
    })
    const productDetail = computed(() => {
        return store.state.product.productDetail
    })

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

    const addToCart = () => {
        store.dispatch("cart/addCart", productDetail.value);
        modalVisible.value = true
    };
    const goToProduct= () =>{
        modalVisible.value = false
        router.push("/product");
    }
    const moveToCart = () => {
        router.push("/cart");
    }
</script>
