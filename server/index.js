import express from "express";
import cors from "cors";
import "./db/models.js";


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.get("/", (req, res) => {
    res.send("My api")
})

app.listen(9002, () => {
    console.log("Server started at port 9002")
})
