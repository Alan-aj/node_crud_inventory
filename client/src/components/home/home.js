import React from "react"
import "./home.css"
import { useNavigate } from "react-router-dom"
import Category from "../category/category";
import axios from "axios"

const Home = (props) => {
    const navigate = useNavigate();
    const [post, setPost] = React.useState([]);
    const [del, setDel] = React.useState(true);
    React.useEffect(() => {
        axios.get("http://localhost:9002/category").then((response) => {
            setPost(response.data);
        });
        console.log("run")
        setDel(true)
    }, [del]);

    return (
        <div className="homepage">
            <div className="nav">
                <h1>Welcome {props.user.name}</h1>
                <div className="button logout" onClick={() => props.setLoginUser({})}>Logout</div>
                <div className="button updatecat" onClick={() => navigate("/profileUpdate")}>Update profile</div>
                <div className="button" onClick={() => navigate("/addCategory")}>Add category</div>
            </div>
            <h2>CATEGORIES</h2>
            <div className="product">
                {
                    post.map((data)=>(
                        <Category key={data._id} id={data._id} categoryData = {data.name} setDel={setDel}/>
                    ))
                }
                
            </div>
        </div>
    )
}

export default Home