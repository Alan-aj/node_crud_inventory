import express from "express";
import cors from "cors";
import "./db/models.js";
import { User } from "./db/models.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// Routes
app.post("/login", (req, res) => {
    res.send("My api login")
})
app.post("/register", (req, res) => {
    // console.log(req.body)
    const { name, email, password } = req.body
    const user = new User({
        name,
        email,
        password
    })
})

app.listen(9002, () => {
    console.log("Server started at port 9002")
})
