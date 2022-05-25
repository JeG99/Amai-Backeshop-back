const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    product_list: {
        type: Array,
        required: true,
        default:[]
    },
    total_price: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;