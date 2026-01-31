import React, { useState } from 'react'
import axios from "axios"

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("token", res.data.token)

      alert("Login Successfull");
      window.location.href = "/profile"
    } catch (err) {
      console.error(err);
      alert("Invalid Credentails")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>UserName:</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <br /><br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;