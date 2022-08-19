import React, { useState } from "react"
import "./addCategory.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddCategory = () => {
    const navigate = useNavigate();

    const [data, setUser] = useState({
        name: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...data,
            [name]: value
        })
    }

    const register = () => {
        const { name } = data
        if (name) {
            axios.post("http://localhost:9002/addCategory", {name:name.toLowerCase()})
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
            <h1 className="head">New category</h1>
            <input type="text" name="name" value={data.name} placeholder="Category name" onChange={handleChange}></input>
            <div className="button" onClick={register} >Add category</div>
            <div>or</div>
            <div className="button" onClick={()=>navigate("/")}>Back</div>
        </div>
    )
}

export default AddCategory