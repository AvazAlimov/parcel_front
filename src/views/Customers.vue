<template lang="pug">
    v-flex(xs12)
        v-card.pl-3.pr-3
            //- v-card-title.pb-0
            //-     v-text-field(v-model="search" placeholder="Search" append-icon="search")
            v-card-text.pt-0
                v-data-table(:headers="headers" :items="customers" hide-actions :loading="loading")
                    template(slot="no-data")
                        .body(v-if="!search") Search for client
                        .body(v-if="search") No result
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
</template>

<script>
import Account from "../services/Account";
var task = {};

export default {
    name: "Customers",
    data() {
        return {
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
                { sortable: false }
            ]
        };
    },
    created() {
        Account.getAll().then(accounts => this.customers = accounts);
    }
};
</script>

<style scoped>
</style>
