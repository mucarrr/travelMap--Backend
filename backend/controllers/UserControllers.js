const User = require("../models/User");

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try{
        //generate new password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //create new user 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        //save user and respond
        await newUser.save();
        res.status(200).json({
            message: "User created successfully",
            user: newUser
        });
    }catch(err){
        res.status(500).json({
            message: "User creation failed",
            error: err.message
        });
    }
}
const login = async (req, res) => {
    try{
        console.log("Login attempt for username:", req.body.username);
        const user = await User.findOne({username: req.body.username});
        if(!user){
            console.log("User not found:", req.body.username);
            return res.status(400).json({message: "User not found"});
        }
        console.log("User found:", user.username);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            console.log("Invalid password for user:", req.body.username);
            return res.status(400).json({message: "Invalid password"});
        }
        console.log("Login successful for user:", req.body.username);
        res.status(200).json({
            message: "Login successful",
            user: user
        });
    }catch(err){
        console.log("Login error:", err);
        res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
}

module.exports = { register, login };