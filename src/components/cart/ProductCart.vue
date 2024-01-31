<template>
    <div class="row container my-5 mx-auto">
        <div class="col-lg-7">
            <!-- kondisi jumlah item -->
            <div class="d-flex justify-content-between">
                <h2 class="align-left">Cart</h2>
                <p v-show="cartItems.length === 0" class="border px-2  py-1 rounded-2">You don’t have any item yet</p>
                <p v-show="cartItems.length > 0" class="border px-2  py-1 rounded-2">{{ cartItems.length }} items</p>
            </div>
            <!-- tampilkan cart kosong apabila tidak ada data -->
            <div v-if="cartItems.length === 0" class=" d-flex justify-content-center align-items-center">
                <div class="modal-dialog  w-50">
                    <div class="modal-content">
                        <div class="modal-body text-center">
                            <img src="https://pngimg.com/d/shopping_cart_PNG17.png" class="w-25 my-4"/>
                            <!-- <i class="fa-solid fa-cart-shopping" style="font-size: 10vw;"></i> -->
                            <h3>No Orders Yet</h3>
                            <p class="text-secondary">When you buy an item, your order about it will appear here.</p>
                        </div>
                        <div class="modal-footer ">
                            <button type="button" class="btn w-100 btn-teal" @click="moveToProduct">Find Products</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tampilkan isi cart apabila terdapat data -->
            <div v-else-if="cartItems.length > 0" v-for="cart in cartItems" class="my-3 border p-3 rounded-2">
                <div class="flex in-cart align-left" >
                    <div class="cart-left">
                        <img class="w-100" :src="cart.image" alt="">
                    </div>
                    <div class="cart-middle" style="padding-left: 20px;">
                        <h6 >{{cart.name}}</h6>
                        <div class="flex"  style="width: 100%;">
                            <div class="left"  style="width: 50%;">
                                <p>{{cart.size}}</p>
                            </div>
                            <div  style="width: 50%;">
                                <p>Rp {{numberWithCommas(cart.price)}}</p>
                            </div>
                        </div>
                    
                    </div>
                </div>
                <div class="my-2">
                    <a  @click="removeCartItem(cart.id)" class="text-danger text-decoration-none fs-5" style="cursor: pointer;">Remove</a>
                </div>
            </div>
        </div>
        <!-- order summarry -->
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">Order Summary</h5>
                        <h5 class="card-text text-end">Rp {{numberWithCommas(totalCartPrice)  }}</h5>
                    </div>
                    <div class="d-flex mt-0 text-secondary  justify-content-between">
                        <p class="card-text mt-0">{{cartItems.length}} items</p>
                        <p class="card-text mt-0">not including shipping fee</p>
                    </div>
                    <hr class="my-0">
                    <div class="d-grid gap-2 mt-2">
                        <router-link to="/order-confirmation" class="btn"  :class="{ 'disabled': cartItems.length === 0,'btn-secondary': cartItems.length === 0, 'btn-teal': cartItems.length > 0 }" >
                            Check Out <span v-show="cartItems.length > 0"> ({{ uniqueCategories.length }}) </span>
                        </router-link>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- product list -->
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
    const router = useRouter()
    const store = useStore()
    
    const cartItems = computed(() => store.state.cart.carts)
    console.log(cartItems)

    // untuk menampilkan list product
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
    // remove isi cart
    const removeCartItem = (id) => {
        store.dispatch("cart/removeCartItem", id);
    };
    // menghitung total isi cart
    const totalCartPrice = computed(() => {
        let totalPrice = 0;

        for (const item of cartItems.value) {
            totalPrice += parseInt(item.price); 
        }

        return totalPrice;
    });
    // menghitung jumlah category yang masuk (digunakan pada button checkout)
    const uniqueCategories = computed(() => {
         // Set untuk mengambil nilai unik
        const categoriesSet = new Set(cartItems.value.map(item => item.category));
        // ubah set jadi array
        return Array.from(categoriesSet);
    });
    // pindah ke halaman product list
    const moveToProduct = () =>{
        router.push('/product')
    }
    // format angka harga
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
</script>