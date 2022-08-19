import React, { useState } from "react"
import "./login.css"
import axios from "axios"

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user
        if (email && password) {
            axios.post("http://localhost:9002/login", user)
                .then(res => alert(res.data.message))
        } else {
            alert("Invalid input")
        }
    }

    return (
        <div className="login">
            <h1 className="head">Login</h1>
            <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={handleChange} ></input>
            <div className="button" onClick={login} >Login</div>
            <div>or</div>
            <div className="button" >Register</div>
        </div>
    )
}

export default Login