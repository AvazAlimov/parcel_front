import Auth from "../../services/Auth";

const state = {
    token: localStorage.getItem("token")
};

const getters = {
    getToken: state => state.token
};

const actions = {
    signin({ commit }, user) {
        return new Promise((resolve, reject) => {
            Auth.signin(user)
                .then(token => {
                    commit("success", token);
                    resolve();
                })
                .catch(error => reject(error));
        });
    }
};

const mutations = {
    success(state, token) {
        localStorage.setItem("token", token);
        state.token = token;
    },
    logout() {
        localStorage.removeItem("token");
        state.token = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
