<template lang="pug">
    v-flex(xs12)
        v-card.pa-4
            v-card-title.pb-0
                v-layout
                    .headline Acceptance
                    v-spacer
                    v-tooltip(bottom)
                        v-btn(slot="activator" flat icon @click="clear")
                            v-icon refresh
                        span Clear all
            v-card-text
                v-container(grid-list-xl).pa-0
                    v-layout(row wrap)
                        v-flex(xs12)
                            v-autocomplete(v-if="!sender"
                                :search-input.sync="sender_query"
                                :items="senders"
                                item-text="combination"
                                @change="selectSender"
                                label="Sender"
                                hide-no-data
                                return-object)

                                template(slot="item" slot-scope="props")
                                    span {{ props.item.combination }}

                            v-alert(v-if="sender" outline :value="sender" color="grey darken-2")
                                v-layout(v-if="sender.combination")
                                    v-flex(xs10)
                                        .title Sender
                                        .body-1 {{ sender.first_name }} {{ sender.last_name }}
                                        br
                                        .title(v-if="sender.company") Company
                                        .body-1(v-if="sender.company") {{ sender.title }}
                                        br(v-if="sender.company")
                                        .title Email
                                        .body-1 {{ sender.email }}
                                        br
                                        .title Phone
                                        .body-1 {{ sender.phone }}
                                        br
                                        .title Address
                                        .body-1 {{ sender.address }} {{ sender.city }} {{ sender.country }}
                                        br
                                        .title Postal Code
                                        .body-1 {{ sender.postcode }}
                                    v-spacer
                                    v-tooltip(bottom)
                                        v-btn(slot="activator" flat icon @click="sender=null")
                                            v-icon close
                                        span Delete
                            br
                            v-autocomplete(v-if="!receiver"
                                :search-input.sync="receiver_query"
                                :items="receivers"
                                item-text="combination"
                                @change="selectReceiver"
                                label="Receiver"
                                hide-no-data
                                return-object)
                            
                                template(slot="item" slot-scope="props")
                                    span {{ props.item.combination }}

                            v-alert(v-if="receiver" outline :value="receiver" color="grey darken-2")
                                v-layout(v-if="receiver.combination")
                                    v-flex(xs10)
                                        .title Receiver
                                        .body-1 {{ receiver.first_name }} {{ receiver.last_name }}
                                        br
                                        .title(v-if="receiver.company") Company
                                        .body-1(v-if="receiver.company") {{ receiver.title }}
                                        br(v-if="receiver.company")
                                        .title Email
                                        .body-1 {{ receiver.email }}
                                        br
                                        .title Phone
                                        .body-1 {{ receiver.phone }}
                                        br
                                        .title Address
                                        .body-1 {{ receiver.address }} {{ receiver.city }} {{ receiver.country }}
                                        br
                                        .title Postal Code
                                        .body-1 {{ receiver.postcode }}
                                    v-spacer
                                    v-tooltip(bottom)
                                        v-btn(slot="activator" flat icon @click="receiver=null")
                                            v-icon close
                                        span Delete

                        v-flex(xs12)
                            .title Total items: {{ items.length }}
                            br
                            v-flex(xs12)
                                v-layout
                                    v-text-field(v-model="item_query" label="Add item" @keyup.13="addItem")
                                    v-btn(icon @click="addItem" style="margin-top: 12px")
                                        v-icon add
                            template(v-for="(item, index) in items")
                                v-layout(row)
                                    v-flex(xs6).pt-0.pb-0
                                        v-text-field(v-model="items[index].title" label="Product name")
                                    v-flex(xs2).pt-0.pb-0
                                        v-text-field(v-model="items[index].quantity" label="Amount")
                                    v-flex(xs2).pt-0.pb-0
                                        v-text-field(v-model="items[index].weight" label="Weight" @keyup="calculateTotal")
                                    v-flex(xs2).pt-0.pb-0
                                        v-text-field(v-model="items[index].price" label="Price")
                                    v-spacer
                                    v-btn(flat icon color="red" @click="deleteItem(index)")
                                        v-icon close
                            v-layout(row)
                                v-flex(xs8)
                                    v-text-field(v-model="category" label="Category" prepend-icon="turned_in_not")
                                v-flex(xs2)
                                    v-text-field(v-model="weight" label="Weight (kg)" prepend-icon="fitness_center")
                                v-flex(xs2)
                                    v-text-field(v-model="price" label="Price (usd)" prepend-icon="attach_money")
                        v-flex(xs12).pb-0
                            v-textarea(v-model="note" outline label="Note")
            v-card-actions
                v-alert(type="error" :value="error") {{ error }}
                v-spacer
                v-btn(color="primary" depressed @click="accept") Accept
</template>

<script>
import Account from "../services/Account";
import Parcel from "../services/Parcel";
var task = {};

export default {
    name: "Acceptance",
    data() {
        return {
            error: null,
            sender_query: "",
            receiver_query: "",
            item_query: "",
            sender: null,
            receiver: null,
            senders: [],
            receivers: [],
            items: [],
            category: "",
            weight: 0,
            price: 0,
            note: ""
        };
    },
    methods: {
        clear() {
            this.sender_query = "";
            this.receiver_query = "";
            this.sender = null;
            this.receiver = null;
            this.senders = [];
            this.receivers = [];
            this.items = [];
            this.weight = 0;
            this.price = 0;
        },
        selectSender(value) {
            this.sender = value;
        },
        selectReceiver(value) {
            this.receiver = value;
        },
        addItem() {
            this.items.push({
                title: this.item_query,
                quantity: 1,
                weight: 0,
                price: 0
            });
            this.item_query = "";
        },
        deleteItem(index) {
            this.items.splice(index, 1);
        },
        calculateTotal() {
            var weight = 0;
            this.items.forEach(item => {
                weight += parseFloat(item.weight);
            });
            this.weight = weight;
            this.price = (weight * 7).toFixed(2);
        },
        accept() {
            var totalPrice = 0;
            this.items.forEach(item => {
                totalPrice += parseFloat(item.price);
            });

            Parcel.accept({
                sender: this.sender.id,
                receiver: this.receiver.id,
                category: this.category,
                weight: this.weight,
                price: totalPrice.toFixed(2),
                status: "accepted",
                note: this.note,
                service_fee: this.price,
                items: this.items
            })
                .then(parcel => { })
                .catch(error => {
                    this.error = error;
                });
        }
    },
    watch: {
        sender_query(value) {
            if (task.cancel) task.cancel();
            if (value) {
                Account.getAll({ query: value }, task).then(customers => {
                    this.senders = customers;
                    this.senders.forEach(sender => {
                        sender.combination =
                            sender.first_name +
                            " " +
                            sender.last_name +
                            " " +
                            sender.title +
                            " " +
                            sender.email +
                            " " +
                            sender.phone;
                    });
                });
            } else {
                this.senders = [];
            }
        },
        receiver_query(value) {
            if (task.cancel) task.cancel();
            if (value) {
                Account.getAll({ query: value }, task).then(customers => {
                    this.receivers = customers;
                    this.receivers.forEach(receiver => {
                        receiver.combination =
                            receiver.first_name +
                            " " +
                            receiver.last_name +
                            " " +
                            receiver.title +
                            " " +
                            receiver.email +
                            " " +
                            receiver.phone;
                    });
                });
            } else {
                this.receivers = [];
            }
        },
        items(value) {
            this.calculateTotal();
        },
        weight(value) {
            this.price = parseFloat(value * 7).toFixed(2);
        }
    }
};
</script>

<style scoped>
.width {
    max-width: 150px !important;
}
</style>
