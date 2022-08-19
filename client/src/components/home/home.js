import React from "react"
import "./home.css"
import { useNavigate } from "react-router-dom"
import Category from "../category/category";
import axios from "axios"

const Home = (props) => {
    const navigate = useNavigate();
    const [post, setPost] = React.useState(null);
    React.useEffect(() => {
        axios.get("http://localhost:9002/category").then((response) => {
            setPost(response.data);
        });
    }, []);

    return (
        <div className="homepage">
            <div className="nav">
                <h1>Welcome {props.user.name}</h1>
                <div className="button" onClick={() => props.setLoginUser({})}>Logout</div>
                <div className="button" onClick={() => navigate("/profileUpdate")}>Update profile</div>
            </div>
            <div className="product">
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </div>
    )
}

export default Home