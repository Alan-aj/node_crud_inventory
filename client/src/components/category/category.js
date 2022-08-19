import React from "react"
import "./category.css"
import { useNavigate } from "react-router-dom"

const Category = () => {
    const navigate = useNavigate();

    return (
        <div className="category">
            <h1>Fashion</h1>
            <div className="button-cat" onClick={()=> console.log("click")}>View products</div>
        </div>
    )
}

export default Category