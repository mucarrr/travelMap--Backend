const Pin = require("../models/Pin");

const createPin = async (req, res) => {
    try {
        // Validation kontrolü
        const { username, title, desc, rating, lat, long } = req.body;
        
        if (!username || !title || !desc || !rating || lat === undefined || long === undefined) {
            return res.status(400).json({
                error: "Tüm alanlar zorunludur",
                required: ["username", "title", "desc", "rating", "lat", "long"]
            });
        }

        if (title.length < 3) {
            return res.status(400).json({ error: "Title en az 3 karakter olmalı" });
        }

        if (desc.length < 3) {
            return res.status(400).json({ error: "Description en az 3 karakter olmalı" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating 1-5 arasında olmalı" });
        }

        const newPin = new Pin(req.body);
        const savedPin = await newPin.save();
        
        res.status(201).json({
            message: "Pin başarıyla oluşturuldu",
            pin: savedPin
        });
    } catch (err) {
        console.error("Pin oluşturma hatası:", err);
        res.status(500).json({
            error: "Pin oluşturulurken hata oluştu",
            details: err.message
        });
    }
}   
const getPins = async (req,res) => {
    try{
        const pins = await Pin.find();
        res.status(200).json({
           message: "Pins fetched successfully",
            pins: pins
        });
    } catch (err) {
        res.status(500).json({
            message: "Pins fetched failed",
            error: err.message
        });
    }
}
const getPin = async (req,res) => {
    try{
        const pin = await Pin.findById(req.params.id);
        res.status(200).json({
            message: "Pin fetched successfully",
            pin: pin
        });
    } catch (err) {
        res.status(500).json({
            message: "Pin fetched failed",
            error: err.message
        });
    }
}

module.exports = { createPin, getPins, getPin };