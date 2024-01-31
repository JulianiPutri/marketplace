import axios from "axios";
import Cookies from "js-cookie";
export default{
    namespaced: true,
    state(){
        return{
            token: null,
            tokenExpirationDate : null,
            userLogin: {},
            isLogin: false,
        }
    },
    mutations : {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },
        setUserLogin(state, { userData, loginStatus })
            {
                state.userLogin = userData;
                state.isLogin = loginStatus;
        },
        setUserLogout(state) {
            state.token = null
            state.userLogin = {}
            state.isLogin = false
            state.tokenExpirationDate = null
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        }

    },
    actions : {
        async getRegisterData({ commit, dispatch }, payload) {
            // atur sesuai API masing-masing
            // const APIkey = "AIzaSyAhDsdxbcuBFq_F-8h7vAcpcCDhkKU1Qdc";
            // const authUrl ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            const APIkey = "AIzaSyBZdDNspfedMuorxGTJ03tZJPJrZtk5Gl8";
            const authUrl =
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                })
                const newUserData = {
                    userId: data.localId, 
                    fullname: payload.fullname,
                    username: payload.username,
                    email: payload.email, 
                };
                Cookies.set("UID", newUserData.userId);
                await dispatch("addNewUser", newUserData);
            } catch (err) {
                console.log(err);
            }
        },
        async addNewUser({ commit, state }, payload) {
            try {
                // rename sesuai nama project
                // const { data } = await axios.post(`https://vue-js-project-4de91-default-rtdb.firebaseio.com/user.json?auth=${state.token}`, payload);
                const { data } = await axios.post(
                    `https://marketplace-1c1e8-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
                    payload
                  );
            commit("setUserLogin", {userData: payload, loginStatus: true})
            } catch (err) {
                console.log(err);
            }
        },
        async getLoginData({ commit, dispatch }, payload) {
            // const APIkey = "AIzaSyAhDsdxbcuBFq_F-8h7vAcpcCDhkKU1Qdc";
            // const authUrl ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="

            const APIkey = "AIzaSyBZdDNspfedMuorxGTJ03tZJPJrZtk5Gl8";
            const authUrl =
              "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                email: payload.email, password: payload.password, returnSecureToken: true,
            });
            commit("setToken", {
                idToken: data.idToken,
                expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
            });
            await dispatch("getUser", data.localId)
            } catch (err) {
                console.log(err)
            }
        },
        async getUser({ commit }, payload) {
            try {
                // const { data } = await axios.get(`https://vue-js-project-4de91-default-rtdb.firebaseio.com/user.json`)
                const { data } = await axios.get(`https://marketplace-1c1e8-default-rtdb.firebaseio.com/user.json`)
                console.log("Data from Firebase:", data);
                for (let key in data) {
                    if (data[key].userId === payload) {
                        Cookies.set("UID", data[key].userId)
                        commit("setUserLogin",{ userData: data[key], loginStatus: true })
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },
        
    }
}
