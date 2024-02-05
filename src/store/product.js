import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            products: [],
            productDetail:{}
           
        }
    },
    getters: {},
    mutations: {
        setProductData(state, payload){
            state.products = payload
        },
        setProductDetail(state,payload){
            state.productDetail = payload
        },
    },
    actions: {
        async getProductData({commit}){
            try{
                
                const { data } = await axios.get("https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/products.json")
                const arr = []
                for (let key in data){
                    arr.push({id:key, ...data[key]})
                }
                commit("setProductData", arr)
            }catch(err){
                console.log(err)
            }
        },
        async getProductDetail({commit}, payload){
            try{
                
                const { data } = await axios.get(`https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/products/${payload}.json`)
                    commit("setProductDetail" , data)
            }catch(err){

            }
        },
    }
}