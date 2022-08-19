import React, { useState } from "react"
import "./updateCategory.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const UpdateCategory = () => {
    const navigate = useNavigate();

    const { id, category } = useParams();

    const [data, setUser] = useState({
        name: category
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...data,
            [name]: value
        })
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const update = () => {
        const { name } = data
        if (name) {
            axios.post("http://localhost:9002/updateCategory", { name: capitalizeFirstLetter(name), id: id })
                .then(res => {
                    alert(res.data.message)
                    navigate("/")
                })
        } else {
            alert("Invalid input")
        }
    }

    return (
        <div className="register">
            <h1 className="head">Update category</h1>
            <input type="text" name="name" value={data.name} placeholder="Category name" onChange={handleChange}></input>
            <div className="button" onClick={update} >Update</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/")}>Back</div>
        </div>
    )
}

export default UpdateCategory