import Vue from "vue";
import App from "./src/App";
import router from "./src/router";
import store from "./src/store";
import Vuetify from "vuetify";
import VueQrcode from "@xkeshi/vue-qrcode";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
    theme: {
        primary: "#1565C0"
    }
});
Vue.component(VueQrcode.name, VueQrcode);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
