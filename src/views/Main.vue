<template lang="pug">
    v-app#inspire
        v-navigation-drawer(:clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app)
            v-list
                v-list-tile(to="/acceptance")
                    v-list-tile-action
                        v-icon check_circle
                    v-list-tile-title Acceptance
                v-list-tile(to="/customers/list")
                    v-list-tile-action
                        v-icon account_circle
                    v-list-tile-title Customers
                v-list-tile(to="/parcels/list")
                    v-list-tile-action
                        v-icon inbox
                    v-list-tile-title Parcels
                v-list-tile
                    v-list-tile-action
                        v-icon event_note
                    v-list-tile-title Archive
                v-divider
                v-list-tile(@click="logout")
                    v-list-tile-action
                        v-icon forward
                    v-list-tile-title Logout                
        v-toolbar(:clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed)
            v-toolbar-title
                v-toolbar-side-icon(@click.stop="drawer = !drawer")
                span Parcel
        v-content
            v-container(fill-height grid-list-md)
                v-layout(justify-center)
                    router-view
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { AXIOS } from "../services/Api";
import Auth from "../services/Auth";

export default {
    name: "Main",
    data() {
        return {
            drawer: true
        };
    },
    computed: {
        ...mapGetters({
            access: "auth/access"
        })
    },
    methods: {
        ...mapMutations({
            _logout: "auth/logout"
        }),
        logout() {
            this._logout();
            this.$router.push("/login");
        }
    },
    created() {
        AXIOS.interceptors.response.use(undefined, error => {
            if (error.response && error.response.status === 401) {
                this.logout();
            }
        });
        Auth.details();
    }
};
</script>

<style scoped>
</style>
