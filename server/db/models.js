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

const categorySchema = new mongoose.Schema({
    name: String,
})

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: [
        { type: Schema.Types.ObjectId, ref: 'Category' }
    ]
})

// models
export const User = new mongoose.model("User", userSchema)
export const Category = new mongoose.model("Category", categorySchema)
export const Product = new mongoose.model("Product", productSchema)