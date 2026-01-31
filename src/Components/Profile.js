import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("token")

        if(!token){
            window.location.href = "/login";
            return
        }
        axios.get("http://localhost:8080/api/auth/profile", {
            headers :{
                Authorization : `Bearer ${token}`,
            },
        }).then(res => setUser(res.data))
        .catch(err => {
          console.error(err)
            alert("Session Expried. Login Again");
            localStorage.removeItem("token");
            window.location.href ="/login"
        })
    }, [])

    if (!user) return <h3>Loading...</h3>
  return (
    <>
      <div className='contianer'>
        <h2>User Profile</h2>
        <p><b>User Name: </b>{user.userName}</p>
        <p><b>Email: </b>{user.email}</p>
        <button onClick={()=>{
          localStorage.removeItem("token");
          window.location.href ="/login"
        }}>Logout</button>
      </div>
    </>
  )
}

export default Profile
