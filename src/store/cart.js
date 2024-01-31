import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            carts: [],
            orderHistory: [],
        }
    },
    getters: {},
    mutations: {
        addToCart(state, payload) {
            state.carts.push(payload);
        },
        removeFromCart(state, id) {
            // state.carts = state.carts.filter(item => item.id !== id);
            const index = state.carts.findIndex(item => item.id === id);

            if (index !== -1) {
                state.carts.splice(index, 1);
            }
        },
        resetCart(state) {
            state.carts = [];
        },
        addToOrderHistory(state, order) {
            state.orderHistory.push(order);
        },
    },
    actions: {
        async addCart({ commit, rootState }, payload) {
            const id = Date.now(); // Example: using current timestamp as the id

            const newItem = {
                ...payload,
                id: id,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                userId: rootState.auth.userLogin.userId,
            };

            try {
                console.log(newItem)
                commit("addToCart", newItem);
            } catch (err) {
                console.log(err)
            }
        },
        async removeCartItem({ commit }, id) {
            try {
                commit("removeFromCart", id);
            } catch (err) {
                console.log(err)
            }
        },
        async placeOrder({ commit, rootState }, payload) {
            try {
              // Dapatkan data pesanan dari cart
              const id = Date.now(); 

      
              // Hitung total harga pesanan
              const totalCartPrice = rootState.cart.carts.reduce(
                (total, item) => total + 15000 + 20000 + parseInt(item.price),
                0
              );
      
              // Simpan pesanan ke dalam riwayat pesanan
              const order = {
                
                id: id,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                userId: rootState.auth.userLogin.userId,
                totalPrice: totalCartPrice,
                details : [...payload],
              };
      
              commit("addToOrderHistory", order);
      
              commit("resetCart");
      
            } catch (error) {
              console.error(error);
            }
        },
    }
}