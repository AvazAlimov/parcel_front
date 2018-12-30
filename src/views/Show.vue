<template lang="pug">
    v-layout
        v-flex(xs12 v-if="!printMode")
            v-card.pa-4.ma-3
                v-layout(row wrap v-if="result")
                    v-flex(xs6)
                        qrcode(:value="result.code" :options="{ size: 150 }")
                        .headline {{ result.code }}
                        .body-1 Category: {{ result.category }}
                        .body-1 Status: {{ result.status }}
                        .body-1 Total weight: {{ result.weight }} kg
                        .body-1 Service fee: {{ result.service_fee }} $
                        .body-1 Total price: {{ result.price }} $
                        .body-1 Created at: {{ result.created_at }}
                    v-flex(xs6)
                        .title Sender
                        .body-1(v-if="!result.sender.is_company") {{ result.sender.first_name }} {{ result.sender.last_name }}
                        .body-1(v-if="result.sender.is_company") Company: {{ result.sender.title }}
                        .body-1 Email: {{ result.sender.email }}
                        .body-1 Phone: {{ result.sender.phone }}
                        .body-1 Address: {{ result.sender.address }} {{ result.sender.city }} {{ result.sender.country }}
                        .body-1 Postal Code: {{ result.sender.postcode }}
                        br
                        .title Receiver
                        .body-1(v-if="!result.receiver.is_company") {{ result.receiver.first_name }} {{ result.receiver.last_name }}
                        .body-1(v-if="result.receiver.is_company") Company: {{ result.receiver.title }}
                        .body-1 Email: {{ result.receiver.email }}
                        .body-1 Phone: {{ result.receiver.phone }}
                        .body-1 Address: {{ result.receiver.address }} {{ result.receiver.city }} {{ result.receiver.country }}
                        .body-1 Postal Code: {{ result.receiver.postcode }}
                        br
                        .title Items: {{ result.items.length }}
                        v-layout(row wrap)
                            v-flex(xs4)(v-for="item in result.items" :key="item.id")
                                br
                                .body-1 Title: {{ item.title }}
                                .body-1 Quantity: {{ item.quantity }}
                                .body-1 Price: {{ item.price }}
                                .body-1 Weight: {{ item.weight }}
                    v-flex(xs12)
                        v-btn(flat icon @click="print")
                            v-icon print
        v-flex(xs12 v-if="printMode")
            .ma-0.pa-0
                v-layout(row)
                    qrcode(:value="result.code" :options="{ size: 100 }")
                    v-spacer
                    img(src="../assets/logo.png" height="48")
                .caption.mt-2 SHIP TO:
                .caption {{ result.receiver.postcode }}, {{ result.receiver.address }}, {{ result.receiver.city }}, {{ result.receiver.country }}
</template>

<script>
import Parcel from "../services/Parcel";

export default {
    name: "Show",
    data() {
        return {
            error: null,
            result: null,
            printMode: false
        };
    },
    methods: {
        print() {
            this.printMode = true;
            new Promise(resolve => setInterval(resolve, 100)).then(() => {
                window.print();
                this.printMode = false;
            });
        }
    },
    created() {
        const code = this.$route.params.code;
        Parcel.getByCode(code)
            .then(data => {
                this.result = data;
            })
            .catch(error => (this.error = error));
    }
};
</script>

<style scoped>
</style>
