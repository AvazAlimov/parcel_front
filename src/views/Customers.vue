<template lang="pug">
    v-flex(xs12)
        v-card.pl-3.pr-3
            v-card-title.pb-0
                v-text-field(v-model="search" placeholder="Search" append-icon="search")
            v-card-text.pt-0
                v-data-table(:headers="headers" :items="customers" hide-actions :loading="loading")
                    template(slot="no-data")
                        .body(v-if="!search") Search for client
                        .body(v-if="search") No result
                    template(slot="items" slot-scope="props")
                        td {{ props.item.first_name }}
                        td {{ props.item.last_name }}
                        td {{ props.item.company }}
                        td {{ props.item.address }}
                        td {{ props.item.country }}
                        td {{ props.item.city }}
                        td {{ props.item.postal_code }}
                        td {{ props.item.phone }}
                        td {{ props.item.email }}
</template>

<script>
import Customer from "../services/Customer";
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
                { text: "Company", value: "company" },
                { text: "Address", sortable: false, value: "address" },
                { text: "Country", sortable: false, value: "country" },
                { text: "City", sortable: false, value: "city" },
                { text: "Postal Code", sortable: false, value: "postal_code" },
                { text: "Phone", sortable: false, value: "phone" },
                { text: "Email", sortable: false, value: "email" },
                { sortable: false }
            ]
        };
    },
    watch: {
        search(value) {
            if (value) {
                if (task.cancel) task.cancel();
                this.loading = true;
                Customer.get(value, task)
                    .then(customers => {
                        this.customers = customers.results;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.customers = [];
            }
        }
    }
};
</script>

<style scoped>
</style>
