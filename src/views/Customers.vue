<template lang="pug">
    v-flex(xs12)
        v-card.pa-3
            //- v-card-title.pb-0
            //-     v-text-field(v-model="search" placeholder="Search" append-icon="search")
            v-card-title
                .headline Customers
            v-card-text
                v-data-table(:headers="headers" :items="customers" hide-actions :loading="loading")
                    template(slot="no-data")
                        .body Loading customers
                    template(slot="items" slot-scope="props")
                        td {{ props.item.first_name }}
                        td {{ props.item.last_name }}
                        td {{ props.item.title }}
                        td {{ props.item.address }}
                        td {{ props.item.country }}
                        td {{ props.item.city }}
                        td {{ props.item.postcode }}
                        td {{ props.item.phone }}
                        td {{ props.item.email }}
                v-divider
                v-layout.pt-2
                    v-spacer
                    v-btn(depressed color="primary" @click="dialog=true") Add Customer
        customer(v-model="dialog" :dialog="dialog")
</template>

<script>
import Account from "../services/Account";
import Customer from "../components/Customer";
var task = {};

export default {
    name: "Customers",
    components: {
        customer: Customer
    },
    data() {
        return {
            dialog: false,
            search: "",
            loading: false,
            headers: [],
            customers: [],
            headers: [
                { text: "First Name", value: "first_name" },
                { text: "Last Name", value: "last_name" },
                { text: "Company", value: "title" },
                { text: "Address", sortable: false, value: "address" },
                { text: "Country", sortable: false, value: "country" },
                { text: "City", sortable: false, value: "city" },
                { text: "Postal Code", sortable: false, value: "postcode" },
                { text: "Phone", sortable: false, value: "phone" },
                { text: "Email", sortable: false, value: "email" },
                // { sortable: false }
            ]
        };
    },
    methods: {
        load() {
            this.loading = true;
            Account
                .getAll(null, task)
                .then(accounts => this.customers = accounts)
                .finally(() => this.loading = false);
        }
    },
    created() {
        this.load();
    }
};
</script>

<style scoped>
</style>
