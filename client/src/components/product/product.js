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


    function ProductOne({ data, setDel }) {
        // const navigate = useNavigate();
        // const { category, id } = useParams();
        const productId = data._id
    
        const deleteProduct = () =>{
            axios.post("http://localhost:9002/deleteProduct", { id: productId })
                .then(res => {
                    alert(res.data.message)
                    setDel(false)
                    navigate(`/product/${category}/${id}`)
                })
        }
    
        return (
            <tr>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td><div className="button-cat edit but" onClick={() => navigate(`/updateProduct/${category}/${productId}`)} >Edit</div></td>
                <td><div className="button-cat delete but" onClick={deleteProduct} >Delete</div></td>
            </tr>
        );
    }



    const deleteCategory = () => {
        axios.post("http://localhost:9002/deleteCategory", { id: id })
            .then(res => {
                alert(res.data.message)
                navigate("/")
            })
    }

    return (
        <div className="homepage">
            <div className="nav">
                <h1>{category}</h1>
                <div className="button logout" onClick={() => navigate("/")}>Back</div>
                <div className="button" onClick={deleteCategory}>Delete category</div>
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
                            posts.map((data, key) => (
                                <ProductOne data={data} key={key} setDel={setDel}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product