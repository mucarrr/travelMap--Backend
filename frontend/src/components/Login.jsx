import React, { useState } from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import './Login.css'
import axios from 'axios';

const Login = ({open, setOpen, setCurrentUser}) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    try{
      const res = await axios.post("api/users/login", user);
      console.log(res.data);
      setSuccess(true);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      setOpen(false);
      e.target.reset(); // Form içeriğini temizle 

    }catch(err){
      console.log(err);
      setFailure(true);
    }
  }

  return (
    <div className="loginContainer" style={{display: open ? "flex" : "none"}}>
        <div className="logo">
        <FaLocationArrow /> LETS GO!
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit" className="loginButton">Login</button>
            {success && <span className="success">Login successful</span>}
            {failure && <span className="failure">Login failed</span>}
        </form>
        <MdOutlineCancel className="loginCancel" onClick={() => setOpen(false)}/>
    </div>
  )
}

export default Login