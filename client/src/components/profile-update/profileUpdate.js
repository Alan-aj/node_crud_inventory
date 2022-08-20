import React, { useState } from "react"
import "./profileUpdate.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const ProfileUpdate = (props) => {
    const navigate = useNavigate();

    const [update, setUpdate] = useState({
        name: props.user.name,
        email: props.user.email,
        newPassword: "",
        oldPassword: "",
        id: props.user._id
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUpdate({
            ...update,
            [name]: value
        })
    }

    const updateProfile =()=> {
        const { name, email, newPassword, oldPassword } = update
        if (name && email && newPassword && (oldPassword === props.user.password) && (newPassword != oldPassword)) {
            axios.post("http://localhost:9002/updateProfile", update)
                .then(res => {
                    alert(res.data.message)
                    props.setUpdate(true)
                    navigate("/")
                })
        } else {
            alert("Invalid password")
        }
    }

    return (
        <div className="register">
            <h1 className="head">Update Profile</h1>
            <input type="text" name="name" value={update.name} placeholder="Your Name" onChange={handleChange}></input>
            <input type="text" name="email" value={update.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="oldPassword" value={update.oldPassword} placeholder="Old Password" onChange={handleChange}></input>
            <input type="password" name="newPassword" value={update.newPassword} placeholder="New Password" onChange={handleChange}></input>
            <div className="button" onClick={updateProfile} >Update</div>
            <div>or</div>
            <div className="button" onClick={()=>navigate("/")}>Forgot password</div>
        </div>
    )
}

export default ProfileUpdate