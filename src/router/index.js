import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Main from "../views/Main";
import Acceptance from "../views/Acceptance";
import Customers from "../views/Customers";
import Parcels from "../views/Parcels";
import Show from "../views/Show";

Vue.use(VueRouter);

export default new VueRouter({
    base: "/",
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            name: "main",
            redirect: "/acceptance",
            component: Main,
            children: [
                {
                    path: "/acceptance",
                    name: "acceptance",
                    component: Acceptance
                },
                {
                    path: "/customers/list",
                    name: "customers/list",
                    component: Customers
                },
                {
                    path: "/parcels/list",
                    name: "parcels/list",
                    component: Parcels
                }
            ]
        },
        {
            path: "/show/:code",
            name: "show",
            component: Show
        }
    ]
});
