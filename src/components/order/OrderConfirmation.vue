<template>
    <div class="row container my-5 mx-auto">
        <div class="col-lg-7">
            <div  class=" border p-3 rounded-2">
                <h3 class="align-left">Order</h3>
                <div class="flex in-cart my-2 align-left" v-for="cart in cartItems" :key="cart.id" >
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
            </div>
            <div  class="my-3 border p-3 rounded-2">
                <div class="d-flex row justify-content-center in-cart m-2 " >
                    <p class="align-left text-secondary">Address</p>
                    <div class="border d-flex align-items-center rounded-3 container-fluid p-3">
                        <div>
                            <i class="text-teal bg-teal-transparent rounded-circle p-3 fa-solid fa-location-dot fs-2"></i>
                        </div>
                        <div class=" d-flex row align-items-center" style="padding-left: 20px;">
                            <h6 >PT. Timedoor Indonesia</h6>
                            <p class="text-secondary m-0">
                                Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226
                            </p>    
                        </div>
                    </div>
                </div>
            </div>
            <div  class="my-3 border p-3 rounded-2">
                <div class="d-flex row justify-content-center in-cart m-2 " >
                    <p class="align-left text-secondary">Delivery details</p>
                    <div class="border d-flex align-items-center rounded-3 container-fluid p-3">
                        <div>
                            <i class="text-teal bg-teal-transparent rounded-circle p-3 fa-solid fa-solid fa-shield fs-2"></i>
                        </div>
                        <div class=" d-flex row align-items-center" style="padding-left: 20px;">
                            <h6 >Fedex Express Shipping</h6>
                            <p class="text-secondary m-0">
                                Rp20.000
                            </p>    
                            <p class="text-secondary m-0">
                                <i class="fa-regular fa-clock"></i>  Home delivery in 1-3 working days
                            </p>    
                        </div>
                    </div>
                </div>
            </div>
            <div  class="my-3 border p-3 rounded-2">
                <div class="d-flex row justify-content-center in-cart m-2 " >
                    <p class="align-left text-secondary">Payment Method</p>
                    <div class="border d-flex align-items-center rounded-3 container-fluid p-3">
                        <div>
                            <i class="text-teal bg-teal-transparent rounded-circle p-3 fa-solid fa-solid fa-shield fs-2"></i>
                        </div>
                        <div class=" d-flex row align-items-center" style="padding-left: 20px;">
                            <h6 >0819283210323</h6>
                            <p class="text-secondary m-0">
                                23.12 &middot 123
                            </p>    
                            <p class="text-secondary m-0">
                                <i class="fa-regular fa-credit-card"></i>  {{ userData.fullname }}
                            </p>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">Order Summary</h5>
                        <!-- <h5 class="card-text text-end">Rp {{ totalCartPrice }}</h5> -->
                    </div>
                    <div class="d-flex mt-0 text-secondary  justify-content-between">
                        <p class="card-text mt-0">Order</p>
                        <p class="card-text mt-0">Rp {{numberWithCommas( totalCartPrice )}}</p>
                    </div>
                    <div class="d-flex mt-0 text-secondary  justify-content-between">
                        <p class="card-text mt-0">Protection Fee</p>
                        <p class="card-text mt-0">Rp 20.000</p>
                    </div>
                    <div class="d-flex mt-0 text-secondary  justify-content-between">
                        <p class="card-text mt-0">Shipping</p>
                        <p class="card-text mt-0">Rp  15.000</p>
                    </div>
                    <hr class="my-0">
                    <div class="d-flex mt-2  text-secondary  justify-content-between">
                        <h5 class="card-text fw-bold mt-0">Total to pay</h5>
                        <h5 class="card-text fw-bold mt-0">Rp  {{ numberWithCommas(totalPay) }}</h5>
                    </div>
                    <div class="d-grid gap-2 mt-2">
                        <button class="btn"  :class="{ 'disabled': cartItems.length === 0,'btn-secondary': cartItems.length === 0, 'btn-teal': cartItems.length > 0 }" @click="orderNow">
                            Order Now 
                        </button>

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
                <h3>Order #ORD-89123-823 placed successfully</h3>
                <p class="text-secondary">Thank you for do online shopping at Vintage. You can track and see your order on transaction history menu.</p>
            </div>
            <div class="modal-footer ">
                <button type="button" class="btn w-100 btn-outline-teal" @click="goToProduct">Continue Shopping</button>
                <button type="button" class="btn w-100 btn-teal" @click="goToHistory">Go to History Transaction</button>
            </div>
            </div>
        </div>
        </div>
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
    
    const modalVisible = ref(false)
    
    const cartItems = computed(() => store.state.cart.carts)
    console.log(cartItems)

    const userData = computed(() => {
        return store.state.auth.userLogin
    })
    
    const totalCartPrice = computed(() => {
        let totalPrice = 0;

        for (const item of cartItems.value) {
        totalPrice += parseInt(item.price); 
        }

        return totalPrice;
    });

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const totalPay = computed(() => {
        let totalPay = 0;
        let protectionFee = 20000;
        let shipping = 15000;

        totalPay = totalCartPrice.value+ protectionFee + shipping

        return totalPay;
    });

    const goToProduct= () =>{
        modalVisible.value = false
        router.push("/product");
    }
    const orderNow = () =>{
        store.dispatch("cart/placeOrder", cartItems.value);
        modalVisible.value = true
    }
    const goToHistory= () =>{
        modalVisible.value = false
        router.push("/user/history-user");
    }
</script>