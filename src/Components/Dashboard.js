import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [message, setmessage] = useState("")

    useEffect (()=>{
        const token = localStorage.getItem("token")

        if(!token){
            window.location.href ="/signin"
            return
        }
        axios.get("http://localhost:8080/api/auth/secure", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setmessage(res.data))
        .catch(err =>{
            console.error(err)
            alert("Session Expired. Please login again")
            localStorage.removeItem("token")
            window.location.href = '/signin'
        })
    }, [])
  return (
    <div>
      <h2>Welcome To Dashboard</h2>
      <p>{message}</p>
    </div>
  )
}

export default Dashboard
