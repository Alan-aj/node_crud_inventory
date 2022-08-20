import React from "react"
import "./product.css"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const Product = () => {
    const navigate = useNavigate();
    const { category, id } = useParams();
    const [posts, setPosts] = React.useState([]);
    const [del, setDel] = React.useState(true);
    React.useEffect(() => {
        axios.post("http://localhost:9002/product", { id: id }).then((response) => {
            setPosts(response.data);
        });
        setDel(true)
    }, [del]);

    return (
        <div className="homepage">
            <div className="nav">
                <h1>{category}</h1>
                <div className="button logout" onClick={() => navigate("/")}>Home</div>
                <div className="button" onClick={() => navigate(`/addProduct/${category}/${id}`)}>Add product</div>
            </div>
            <h2>PRODUCTS</h2>
            <div className="tabledata">
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {
                        posts.map((data,key) => (
                            <tr key={key}>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td><div className="button-cat edit but" >Edit</div></td>
                                <td><div className="button-cat delete but" >Delete</div></td>
                            </tr>
                        ))
                    }</tbody>
                </table>
            </div>
        </div>
    )
}

export default Product