import express from "express";
import cors from "cors";
import "./db/models.js";
import mongoose from "mongoose";
import { User, Category, Product } from "./db/models.js";

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

app.post("/user", (req, res) => {
    const { userId } = req.body
    User.findOne({ _id: userId }, function (err, data) {
        if (data) {
            // console.log(data)
            res.send(data)
        } else {
            console.log(err)
        }
    })
})

app.get("/category", (req, res) => {
    Category.find({}, function (err, data) {
        if (data) {
            // console.log(data)
            res.send(data)
        } else {
            console.log(err)
        }
    })

})

app.post("/product", (req, res) => {
    const {id} = req.body
    Product.find({category:id}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            res.send(docs)
        }
    })
})

app.post("/addCategory", (req, res) => {
    const { name } = req.body
    // console.log(name)
    Category.findOne({ name: name }, (err, data) => {
        if (data) {
            res.send({ message: "Category already exits" })
        } else {
            const category = new Category({
                name
            })
            category.save(err => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({ message: "Category added successfully" })
                }
            })
        }
    })
})

app.post("/addProduct", (req, res) => {
    const { name, price, id } = req.body
        Product.findOne({ name: name }, (err, data) => {
            if (data) {
                res.send({ message: "Product already exits" })
            } else {
                // console.log(mongoose.Types.ObjectId(id))
                const product = new Product({
                    name,
                    price,
                    category: mongoose.Types.ObjectId(id)
                })
                product.save(err => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.send({ message: "Product added successfully" })
                    }
                })
            }
        })
})

app.post("/updateCategory", (req, res) => {
    const { name, id } = req.body
    var user_id = id;
    Category.findByIdAndUpdate(user_id, { name: name },
        function (err, docs) {
            if (docs) {
                res.send({ message: "Category updated" })
            }
            else {
                console.log(err)
            }
        });
})

app.post("/updateProduct", (req, res) => {

})

app.post("/deleteCategory", (req, res) => {
    const { id } = req.body
    Product.deleteMany({ category: id })
        .then(Category.deleteOne({ _id: id })
            .then(function () {
                res.send({ message: "Category deleted" })
            }).catch(function (error) {
                console.log(error);
            })).catch(function (error) {
                console.log(error);
            })
})

app.post("/deleteProduct", (req, res) => {
    const {id} = req.body
    Product.deleteOne({ _id: id})
    .then(function () {
        res.send({ message: "Product deleted" })
    }).catch(function (error) {
        console.log(error);
    })
})

app.listen(9002, () => {
    console.log("Server started at port 9002")
})
