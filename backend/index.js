const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const pinsRoutes = require("./routes/PinsRoutes");
const usersRoutes = require("./routes/UsersRoutes");
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Connected to MongoDB");
}).catch((err)=> {
    console.log(err);
});

app.use("/api/pins", pinsRoutes);
app.use("/api/users", usersRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Backend server is running on port ${process.env.PORT}`);
})