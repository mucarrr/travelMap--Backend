const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        min: [3, "Username must be at least 3 characters long"],
        max: [20, "Username must be at most 20 characters long"],
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [8, "Password must be at least 8 characters long"],
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", UserSchema);