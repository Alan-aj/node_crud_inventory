import React, { useState } from "react"
import "./addProduct.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const AddProduct = () => {
    const navigate = useNavigate();
    const { category, id } = useParams();


    const [data, setData] = useState({
        name: "",
        price: 0,
        category: category
    })

    const handleChange = e => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    function capitalizeFirstLetter(string) {
        let string1 = string.toLowerCase()
        return string1.charAt(0).toUpperCase() + string1.slice(1);
    }

    const register = () => {
        const { name } = data
        if (name) {
            axios.post("http://localhost:9002/addProduct", {name:capitalizeFirstLetter(name), price:data.price, id: id})
                .then(res => {
                    alert(res.data.message)
                    navigate(`/product/${category}/${id}`)
                })
        } else {
            alert("Invalid input")
        }
    }

    return (
        <div className="register">
            <h1 className="head">New product</h1>
            <input type="text" name="name" value={data.name} placeholder="Product name" onChange={handleChange} required></input>
            <label>Price:</label>
            <input type="number" min="0" name="price" value={data.price} placeholder="Product price" onChange={handleChange} required></input>
            <label>Category:</label>
            <input type="text" name="category" value={data.category} placeholder="Category" onChange={handleChange} readOnly></input>
            <div className="button" onClick={register} >Add product</div>
            <div>or</div>
            <div className="button" onClick={()=>navigate(`/product/${category}/${id}`)}>Back</div>
        </div>
    )
}

export default AddProduct