const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        default: true,
    },
    email: {
        type: String,
        required: true
    },
    orders: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;