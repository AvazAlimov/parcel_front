<template lang="pug">
    v-flex(xs12)
        v-card.pa-4
            v-card-title.pb-0
                v-layout
                    .headline Registration
                    v-spacer
                    v-tooltip(bottom)
                        v-btn(slot="activator" flat icon @click="clear")
                            v-icon refresh
                        span Clear all
            v-card-text
                v-form(v-model="valid" ref="form")
                    v-container(grid-list-xl).pa-0
                        v-layout(row wrap)
                            v-flex(xs6)
                                v-text-field(label="First Name" v-model="first_name" :rules="validation")
                                v-text-field(label="Last Name" v-model="last_name" :rules="validation")
                                v-text-field(label="Company Name" v-model="company")
                                v-text-field(label="Phone Number" v-model="phone" :rules="validation")
                            v-flex(xs6)
                                v-text-field(label="Email" type="email" v-model="email" :rules="validation")
                                v-autocomplete(label="Country" v-model="country" :items="countries" item-text="name" item-value="name" persistent-hint :rules="validation")
                                v-layout(row).pa-0
                                    v-flex(xs6).pt-0.pb-0
                                        v-text-field(label="City" v-model="city" :rules="validation")
                                    v-flex(xs6).pt-0.pb-0
                                        v-text-field(label="Postcode" v-model="postal_code" :rules="validation")
                                v-text-field(label="Address" v-model="address" :rules="validation")
            v-card-actions
                v-alert(:value="success" type="success" outline) {{ success }}
                v-alert(:value="error" type="error" outline) {{ error }}
                v-spacer
                v-btn(color="primary" depressed @click="create" :loading="loading" :disabled="!valid") Register
</template>

<script>
import Customer from "../services/Customer";
import countries from "../assets/countries.json";

export default {
    name: "Register",
    data() {
        return {
            valid: false,
            validation: [v => !!v || "required"],
            loading: false,
            success: "",
            error: "",
            countries: countries,
            first_name: "",
            last_name: "",
            company: "",
            email: "",
            phone: "",
            postal_code: "",
            city: "",
            country: "",
            address: ""
        };
    },
    methods: {
        clear() {
            this.first_name = "";
            this.last_name = "";
            this.company = "";
            this.email = "";
            this.phone = "";
            this.postal_code = "";
            this.city = "";
            this.country = "";
            this.address = "";
        },
        create() {
            this.loading = true;
            this.error = "";
            this.success = "";
            Customer.create({
                first_name: this.first_name,
                last_name: this.last_name,
                company: this.company,
                address: this.address,
                country: this.country,
                city: this.city,
                postal_code: this.postal_code,
                phone: this.phone,
                email: this.email
            })
                .then(response => {
                    this.success = "Created";
                    this.clear();
                    this.$refs.form.reset();
                })
                .catch(error => {
                    this.error = error;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
</style>
