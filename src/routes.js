import HomePageVue from "./components/pages/HomePage.vue";
import LoginPageVue from "./components/pages/LoginPage.vue";
import SignupPageVue from "./components/pages/SignupPage.vue";
import ProductPageVue from "./components/pages/ProductPage.vue";
import UserPageVue from "./components/pages/UserPage.vue";
import DetailPageVue from "./components/pages/DetailPage.vue";
import CartPageVue from "./components/pages/CartPage.vue";
import OrderConfirmationPageVue from "./components/pages/OrderConfirmationPage.vue";
import Cookies from "js-cookie"
import { store } from "./store/index";

const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if (new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
            idToken: jwtCookie,
            expiresIn: expirationDate,
        });
        store.dispatch("auth/getUser", userId);
        return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }
};


export const routes = [
    {path: "/", name:"homePage", component:HomePageVue,
    beforeEnter: () => {
        checkAuth();
    },},
    {path: "/signup", name:"signup", component:SignupPageVue},
    {path: "/login", name:"login", component:LoginPageVue},
    {path: "/product", name:"product", component:ProductPageVue},
    {path: "/cart", name:"cart", component:CartPageVue,
         beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    {path: "/order-confirmation", name:"order", component:OrderConfirmationPageVue,
         beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    {path: "/detail/:id", name:"detail", component:DetailPageVue},
    { path: "/user/:component", name: "userPage", component: UserPageVue,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    }
]