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
            const APIkey = "AIzaSyDs_ZIz4XKHrg0Os1b3InY9uX9ykEXTMK0";
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
                    `https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
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

            const APIkey = "AIzaSyDs_ZIz4XKHrg0Os1b3InY9uX9ykEXTMK0";
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
                const { data } = await axios.get(`https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/user.json`)
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
        async updateProfile({ commit, state }, payload) {
            const userId = state.userLogin.userId;
            try {
                // Ambil data user dari Realtime Database
                const { data: getAllUsers } = await axios.get(
                    `https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/user.json?auth=${state.token}`
                );
        
                let uKey = "";
                // Cari kunci data user berdasarkan userId
                for (let key in getAllUsers) {
                    if (getAllUsers[key].userId === userId) {
                        uKey = key;
                        break;
                    }
                }
        
                // Periksa apakah userId ditemukan
                if (uKey) {
                    // Update data di Firebase Realtime Database
                    await axios.patch(
                        `https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/user/${uKey}.json?auth=${state.token}`,
                        payload
                    );
        
                    // Update data di state Vuex auth
                    commit('setUserLogin', { userData: payload, loginStatus: true });
                } else {
                    console.error('User not found in Realtime Database');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                throw new Error(error.response?.data?.error?.message || 'Failed to update profile');
            }
        },
        async changePassword({ state }, payload) {
            const token = state.token;
        
            try {
              // Ganti password di Firebase Authentication
              const { data } = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDs_ZIz4XKHrg0Os1b3InY9uX9ykEXTMK0", {
                idToken: token,
                password: payload.newPassword,
                returnSecureToken: false,
              });
        
              // Ganti password di Realtime Database
              const userId = state.userLogin.userId;
              await axios.patch(
                `https://vintage-marketplace-9a779-default-rtdb.firebaseio.com/user/${userId}.json?auth=${state.token}`,
                { password: payload.newPassword }
              );
        
              console.log('Password berhasil diubah');
            } catch (error) {
              console.error('Gagal mengganti password:', error);
            }
          },
        
    }
}
