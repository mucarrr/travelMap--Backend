const User = require("./models/User");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});

const createTestUser = async () => {
    try {
        // Önce mevcut test kullanıcısını sil
        await User.deleteOne({username: "testuser"});
        
        // Yeni test kullanıcısı oluştur
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("123456", salt);
        
        const newUser = new User({
            username: "testuser",
            email: "test@test.com",
            password: hash,
        });
        
        await newUser.save();
        console.log("Test user created successfully");
        console.log("Username: testuser");
        console.log("Password: 123456");
        
    } catch(err) {
        console.log("Error creating test user:", err);
    }
    process.exit();
}

createTestUser();
