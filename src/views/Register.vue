<template lang="pug">
    v-flex(xs12)
        v-card.pa-4
            v-card-title.pb-0
                .headline Registration    
                    v-checkbox(v-model="is_company" label="Company" hide-details)
            v-card-text
                v-form(v-model="valid" ref="form")
                    v-container(grid-list-xl).pa-0
                        v-layout(row wrap)
                            v-flex(xs6)
                                v-text-field(label="First Name" v-model="first_name" :rules="validation" v-if="!is_company")
                                v-text-field(label="Last Name" v-model="last_name" :rules="validation" v-if="!is_company")
                                v-text-field(label="Company Name" v-model="title" v-if="is_company")
                                v-text-field(label="Phone Number" v-model="phone" :rules="validation")
                                v-text-field(label="Email" type="email" v-model="email" :rules="validation")
                            v-flex(xs6)
                                v-autocomplete(label="Country" v-model="country" :items="countries" item-text="name" item-value="name" persistent-hint :rules="validation")
                                v-layout(row).pa-0
                                    v-flex(xs6).pt-0.pb-0
                                        v-text-field(label="City" v-model="city" :rules="validation")
                                    v-flex(xs6).pt-0.pb-0
                                        v-text-field(label="Postcode" v-model="postcode" :rules="validation")
                                v-text-field(label="Address" v-model="address" :rules="validation")
            v-card-actions
                v-spacer
                v-btn(color="primary" depressed @click="create" :loading="loading" :disabled="!valid") Register
        v-snackbar(:value="result") {{ result }}
</template>

<script>
import Account from "../services/Account";
import countries from "../assets/countries.json";

export default {
    name: "Register",
    data() {
        return {
            valid: false,
            validation: [v => !!v || "required"],
            loading: false,
            countries: countries,
            result: "",
            is_company: false,
            first_name: "",
            last_name: "",
            title: "",
            country: "",
            city: "",
            address: "",
            postcode: "",
            phone: "",
            email: "",
        };
    },
    methods: {
        clear() {
            this.first_name = "";
            this.last_name = "";
            this.title = "";
            this.email = "";
            this.phone = "";
            this.postcode = "";
            this.city = "";
            this.country = "";
            this.address = "";
        },
        create() {
            this.loading = true;
            Account.create({
                is_company: this.is_company,
                first_name: this.first_name,
                last_name: this.last_name,
                title: this.title,
                address: this.address,
                country: this.country,
                city: this.city,
                postcode: this.postcode,
                phone: this.phone,
                email: this.email
            })
                .then(response => {
                    this.result = "Created";
                    this.clear();
                    this.$refs.form.reset();
                })
                .catch(error => {
                    this.result = error;
                })
                .finally(() => this.loading = false);
        }
    }
};
</script>

<style scoped>
</style>
