const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
        username:{
            type: String,
            required: [true, "Username is required"],
        },
        title:{
            type: String,
            required: [true, "Title is required"],
            min: [3, "Title must be at least 3 characters long"],
        },
        desc:{
            type: String,
            required: [true, "Description is required"],
            min: [3, "Description must be at least 3 characters long"],
        },
        rating:{
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating must be at most 5"],
        },
        lat:{
            type: Number,
            required: [true, "Latitude is required"],
        },
        long:{
            type: Number,
        required: [true, "Longitude is required"],
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Pin", PinSchema);