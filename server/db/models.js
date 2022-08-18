import mongoose from "mongoose";

const DB = process.env.MONGO_URI

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Db connected")
}).catch((error)=>{
    console.log(error.message)
})