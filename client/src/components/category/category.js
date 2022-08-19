import React from "react"
import "./category.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Category = ({ id, categoryData, setDel }) => {
    const navigate = useNavigate();

    const deleteCategory = () => {
        axios.post("http://localhost:9002/deleteCategory", { id: id })
            .then(res => {
                alert(res.data.message)
                setDel(false)
                navigate("/")
            })
    }

    return (
        <div className="category">
            <h1>{categoryData}</h1>
            <div className="row">
                <div className="button-cat" onClick={() => console.log("click")}>Products</div>
                <div className="button-cat edit" onClick={() => navigate(`/updateCategory/${categoryData}/${id}`)}>Edit</div>
                <div className="button-cat delete" onClick={deleteCategory}>Delete</div>
            </div>
        </div>
    )
}

export default Category