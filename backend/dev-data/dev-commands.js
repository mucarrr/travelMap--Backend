import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Pin from "../models/Pin.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pins = JSON.parse(fs.readFileSync(`${__dirname}/pins.json`, "utf-8"));

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB komutları");
})
.catch((err) => {
    console.log(err, "MongoDB komutları bağlantı hatası");
});

const importData = async () => {
    try{
        await Pin.create(pins, {validateBeforeSave: false});
        console.log("Data imported successfully");
    }catch(err){
        console.log(err, "Data import failed");
    }
    process.exit();
}

const deleteData = async () => {
    try{
        await Pin.deleteMany();
        console.log("Data deleted successfully");
    }catch(err){
        console.log(err, "Data delete failed");
    }
    process.exit();
}

console.log(process.argv, "process.argv");

if(process.argv[2] === "--import"){
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}