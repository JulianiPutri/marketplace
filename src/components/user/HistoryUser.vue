<template>
  <div class="rounded border bg-white p-3">
    <h5>My Order</h5>
    <div v-if="historyItems.length === 0" class="p-5">
      <div class="modal-body text-center">
        <!-- <img src="https://pngimg.com/d/shopping_cart_PNG17.png" class="w-25 my-4"/> -->
        <i class="fa-solid fa-cart-shopping text-teal"  style="font-size: 10vw;"></i>
        <h3>Your Cart Is Empty</h3>
        <p class="text-secondary">Find your favorite items and add to cart before check out..</p>
      </div>
      <div class="modal-footer d-flex justify-content-center ">
          <button type="button" class="btn btn-teal" @click="goToProduct">Find Products</button>
      </div>
    </div>
    <div v-else>
      <div v-for="history in historyItems" :key="history.id" class="my-3 border p-3 rounded-2">
        <div class="text-secondary d-flex">
          <h6 class="text-black mx-1">Shopping</h6>
          <p class="mx-1">{{formatOrderDate(history.createdAt)}}</p>
          <p class=" bg-success bg-opacity-25 px-2 mx-1 rounded-pill text-success">Done</p>
          <p class="mx-1">ORD-{{ history.id }}/XXII/VI/1920930123</p>
        </div>
        
        <!-- Tampilkan detail item pesanan -->
        <h4>Order Items:</h4>
        <div>
          <div class="flex in-cart my-2 align-left" :key="history.details[0].id">
            <div class="cart-left p">
              <img class="w-100" :src="history.details[0].image" alt="">
            </div>
            <p>{{ history.details[0].name }} - Rp {{ numberWithCommas(history.details[0].price) }}</p>   
          </div>

          
          
          <!-- Tampilkan semua produk jika tombol "Show All Products" diklik -->
          <div v-if="history.showAllProducts">
            <div v-for="item in history.details.slice(1)" :key="item.id" class="flex in-cart my-2 align-left">
              <div class="cart-left p">
                <img class="w-100" :src="item.image" alt="">
              </div>
              <p>{{ item.name }} - Rp {{ numberWithCommas(item.price) }}</p>
              <!-- Tampilkan detail lainnya sesuai kebutuhan -->
            </div>
          </div>
            <!-- Tambahkan tombol untuk melihat lebih banyak produk -->
          <a @click="toggleProducts(history)" v-if="history.details.length > 1" style="cursor: pointer;" class=" text-decoration-none text-secondary">
            {{ history.showAllProducts ? 'Show Less' : `+ Show More (${history.details.length - 1})` }}
          </a>
          <hr>
          <div class="d-flex justify-content-between">
            <p class="border-left h-100 py-auto">Total Price: Rp {{ numberWithCommas(history.totalPrice) }}</p>
          
            <button class="btn btn-teal" @click="goToProduct">Buy Again</button>

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
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const store = useStore();
  const historyItems = computed(() => store.state.cart.orderHistory);
  console.log("history" + historyItems)
  
  // Fungsi untuk mengubah format angka harga
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatOrderDate = (timestamp) => {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formatter.format(date);
  };

  const toggleProducts = (history) => {
    history.showAllProducts = !history.showAllProducts;
  };

  const goToProduct= () =>{
    router.push("/product");
  }
</script>
  