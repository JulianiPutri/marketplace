<template>
    <div
      class="header__signup  fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none"
      style="text-align: right"
    >
      <!-- <i class="fa-solid fa-user"></i> -->
      <ul class="navbar-nav">
        <li class="nav-item dropdown d-flex">
          <!-- <img
              :src="userData.imageLink"
              alt="Profile"
              width="36"
              height="36"
              class="rounded-circle"
              style="object-fit: cover"
            /> -->
            <div class="my-auto d-flex">
              <div class="mx-1">
                <router-link to="/cart">
                  <i class="fa-solid fa-cart-shopping mx-1 text-black"  style="font-size: x-large;">
                  </i>
                  <!-- tampilan notif jumlah barang -->
                  <span v-if="cartItems.length > 0" class="badge bg-danger rounded-circle position-absolute  translate-middle">
                    {{ cartItems.length }}
                  </span>
                </router-link>
              </div>
              <i class="fa-regular fa-heart mx-2" style="font-size: x-large;"></i>
              <i class="fa-solid fa-circle-user mx-2" style="font-size:x-large;"></i>
            </div>
            <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown" 
            style="font-size: large; margin: auto;"
          >
          </a>
          <ul class="dropdown-menu">
            <router-link to="/user/profile-user" class="dropdown-item">Profile</router-link>
            <router-link to="/user/history-user" class="dropdown-item">Order</router-link>
            <li class="dropdown-item text-danger" style="cursor: pointer;"  @click="show">Logout</li>
          </ul>
        </li>
      </ul>
    </div>
    
    <div class="modal z-3 d-flex justify-content-center align-items-center position-fixed " v-if="modalVisible">
      <div class="modal-dialog  w-50">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Log Out</h5>
            <button type="button" class="btn-close" @click="hide"></button>
          </div>
          <div class="modal-body text-center">
            <image src="../../assets/images/paper-plane.png" class="w-25"/>
            <h3>Successfully Register</h3>
            <p class="text-secondary">Are you sure want to logout from vintage?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hide">Close</button>
            <button type="button" class="btn btn-danger" @click="logout">logout</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  
  import { computed, ref } from "vue";

  const modalVisible = ref(false)
  const store = useStore()
    const userData = computed(() => {
      return store.state.auth.userLogin
  })
  const router = useRouter()
  const logout = () => {
    store.commit("auth/setUserLogout")
    router.push("/login")
  }
  const show = () =>{
    modalVisible.value = true
  }
  const hide = () =>{
    modalVisible.value = false
  }

  const cartItems = computed(() => store.state.cart.carts);


</script>