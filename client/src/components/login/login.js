import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ({ setLoginUser, setLoginid }) => {
    const navigate = useNavigate();

    const [loginData, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...loginData,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = loginData
        if (email && password) {
            axios.post("http://localhost:9002/login", loginData)
                .then(res => {
                    alert(res.data.message)
                    setLoginUser(res.data.user)
                    localStorage.setItem("loginId",res.data.user._id)
                    setLoginid(res.data.user._id)
                    navigate("/", { replace: true })
                })
        } else {
            alert("Invalid input")
        }
    }

    return (
        <div className="login">
            <h1 className="head">Login</h1>
            <input type="text" name="email" value={loginData.email} placeholder="Enter your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={loginData.password} placeholder="Enter your Password" onChange={handleChange} ></input>
            <div className="button" onClick={login} >Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Register</div>
        </div>
    )
}

export default Login