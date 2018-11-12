<template lang="pug">
    v-app(style="background-color: #1565C0")
        v-content
            v-container(fill-height fluid text-xs-center)
                v-layout(row wrap align-center justify-center)
                    v-flex(xs12 sm6 md4 lg3)
                        v-card.pa-4
                            v-card-title.pb-0
                                v-layout(justify-center wrap)
                                    v-flex(xs12)
                                        img(src="../assets/logo.png" width="120")
                                    v-flex(xs12)
                                        .headline Parcel
                            v-card-text
                                v-form(v-model="valid" ref="form")
                                    v-text-field(v-model="user.username" label="Username" :rules="validation")
                                    v-text-field(v-model="user.password" label="Password" 
                                        :type="show_password ? 'text':'password'" 
                                        :rules="validation" 
                                        :append-icon="show_password ? 'visibility_off' : 'visibility'" 
                                        @click:append="show_password = !show_password")
                                    v-alert(:value="error" type="error" outline) {{ error }}
                                    br
                                    v-btn(:disabled="!valid" :loading="loading" color="primary" @click="signin") Signin
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            valid: false,
            validation: [v => !!v || "required"],
            loading: false,
            user: {
                username: "",
                password: ""
            },
            show_password: false,
            error: ""
        };
    },
    computed: {
        ...mapGetters({
            access: "auth/access"
        })
    },
    methods: {
        ...mapActions({
            _signin: "auth/signin"
        }),
        signin() {
            this.loading = true;
            this._signin(this.user)
                .then(() => {
                    this.$router.push("/");
                })
                .catch(error => {
                    this.error = error;
                    this.loading = false;
                });
        }
    },
    created() {
        if (this.access) {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
</style>
