import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: 'config.env' })
const DB = process.env.MONGO_URI

// db connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Db connected")
}).catch((error) => {
    console.log(error.message)
    console.log("Db not connected")
})

// schemas
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

// models
const User = new mongoose.model("User", userSchema)
