import React from "react"
import "./home.css"
import { useNavigate } from "react-router-dom"

const Home = (props) => {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <h1>Welcome {props.user.name}</h1>
            <div className="button" onClick={()=> props.setLoginUser({})}>Logout</div>
            <div className="button" onClick={()=> navigate("/profileUpdate")}>Update profile</div>
        </div>
    )
}

export default Home