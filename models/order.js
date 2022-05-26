const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;