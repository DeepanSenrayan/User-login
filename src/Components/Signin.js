import axios from 'axios';
import { useState } from 'react'

const Signin = () => {
    const [formData , setFormData] = useState({
        userName:"",
        email:"",
        password:""
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:8080/api/auth/register", formData,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            alert(res.data)
            setFormData({
                userName:"",
                email:"",
                password:""
            })
        }catch(err){
            console.error(err)

            if(err.response && err.response.data){
                alert("Registration failed" + JSON.stringify(err.response.data))
            }else{
                alert("Registration Failed")
            }
        }
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>UserName:
                    <input type="text" name="userName" value={formData.userName} onChange={(e) => setFormData({...formData, userName: e.target.value})} />
                </label>
                <label>Email:
                    <input type="text" name="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                </label>
                <label>Password:
                    <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </label>
                <button type='submit'>Submit</button>
            </form>
    </>
  )
}

export default Signin
