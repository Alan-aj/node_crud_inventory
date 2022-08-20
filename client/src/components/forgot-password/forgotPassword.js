import React, { useState } from "react"
import "./forgotPassword.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const [otpemail,setOtpemail] = useState(33333)

    const [update, setUpdate] = useState({
        email: props.user.email,
        newPassword: "",
        otp: 0,
        id: props.user._id
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUpdate({
            ...update,
            [name]: value
        })
    }

    const updateProfile = () => {
        const { email, newPassword, otp } = update
        // console.log(otp)
        // console.log(otpemail)
        if (email && newPassword && otp && (otp == otpemail)) {
            axios.post("http://localhost:9002/updatePassword", update)
                .then(res => {
                    alert(res.data.message)
                    navigate("/")
                })
        } else {
            alert("Invalid OTP")
        }
    }

    const sentotp = () => {
        axios.post("http://localhost:9002/otpsent", { email: props.user.email })
            .then(res => {
                setOtpemail(res.data.otp)
                alert(res.data.message)
            })
    }

    return (
        <div className="register">
            <h1 className="head">Update Password</h1>
            <input type="text" name="email" value={update.email} placeholder="Your Email" onChange={handleChange} readOnly></input>
            <label>Enter otp:</label>
            <input type="number" name="otp" value={update.otp} placeholder="Enter OTP" onChange={handleChange} required></input>
            <label>Enter new password:</label>
            <input type="password" name="newPassword" value={update.newPassword} placeholder="New Password" onChange={handleChange} required></input>
            <div className="button" onClick={updateProfile} >Update</div>
            <div>or</div>
            <div className="button" onClick={sentotp}>Send otp</div>
        </div>
    )
}

export default ForgotPassword