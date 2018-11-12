import Auth from "../../services/Auth";
import { AXIOS } from "../../services/Api";

const state = {
    user: JSON.parse(localStorage.getItem("user"))
};

const getters = {
    access: state => {
        if (state.user) {
            return state.user.access;
        } else {
            return "";
        }
    }
};

const actions = {
    signin({ commit }, user) {
        return new Promise((resolve, reject) => {
            Auth.signin(user)
                .then(data => {
                    commit("success", data);
                    resolve();
                })
                .catch(error => reject(error));
        });
    }
};

const mutations = {
    success(state, user) {
        AXIOS.defaults.headers.common["Authorization"] =
            "Bearer " + user.access;
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
    },
    logout() {
        AXIOS.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("user");
        state.user = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
