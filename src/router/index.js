import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Main from "../views/Main";
import Acceptance from "../views/Acceptance";
import Customers from "../views/Customers";
import Register from "../views/Register";
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
                    path: "/customers/register",
                    name: "customers/register",
                    component: Register
                }
            ]
        },
        {
            path: "/show/:id",
            name: "show",
            component: Show
        }
    ]
});
