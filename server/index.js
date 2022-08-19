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
    const { email, password } = req.body
    User.findOne({ email: email }, (err, data) => {
        if (data) {
            if (password === data.password) {
                res.send({ message: "Login successfull", user: data })
            } else {
                res.send({ message: "Wrong password" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})
app.post("/register", (req, res) => {
    // console.log(req.body)
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, data) => {
        if (data) {
            res.send({ message: "User already registered" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully registered, please login now" })
                }
            })
        }
    })
})

app.post("/updateProfile", (req, res) => {
    const { name, email, newPassword, oldPassword, id } = req.body
    var user_id = id;
    User.findByIdAndUpdate(user_id, { name: name, email: email, password: newPassword },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.send({ message: "Profile updated" })
            }
        });
})

app.listen(9002, () => {
    console.log("Server started at port 9002")
})
