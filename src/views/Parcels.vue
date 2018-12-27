<template lang="pug">
    v-flex(xs12)
        v-card.pa-3
            v-card-title
                .headline Parcels
            v-card-text
                v-data-table(:headers="headers" :items="parcels" hide-actions :loading="loading")
                    template(slot="no-data")
                        .body Loading parcels
                    template(slot="items" slot-scope="props")
                        tr(@click="show(props.item.code)")
                            td {{ props.item.code }}
                            td {{ props.item.status }}
                            td {{ props.item.items.length }}
                            td {{ props.item.weight }}
                            td {{ props.item.price }}
                            td {{ props.item.created_at }}
                //- v-divider
                //- v-layout.pt-2
                //-     v-spacer
                //-     v-btn(depressed color="primary") Manage
</template>

<script>
import Parcel from "../services/Parcel";

export default {
    name: "Parcels",
    data() {
        return {
            loading: false,
            headers: [
                { text: "Code", sortable: false, value: "code" },
                { text: "Status", sortable: false, value: "status" },
                { text: "Items", sortable: false },
                { text: "Weight (kg)", sortable: false, value: "weight" },
                { text: "Price", sortable: false, value: "price" },
                { text: "Accepted date", sortable: false, value: "created_at" }
            ],
            parcels: []
        }
    },
    methods: {
        load() {
            Parcel.getAll().then(parcels => this.parcels = parcels);
        },
        show(code) {
            this.$router.push('/show/' + code);
        }
    },
    created() {
        this.load();
    }
}
</script>

<style scoped>
</style>
