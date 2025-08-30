import "./Register.css"
import { FaLocationArrow } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useRef } from "react";
import axios from "axios";
const Register = ({open, setOpen}) => {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try{
            const res = await axios.post("api/users/register", newUser);
            setSuccess(true);
            setOpen(false);
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
        }catch(err){
            setFailure(true);
        }
       
    }
  return (
    <div className="registerContainer" style={{display: open ? "flex" : "none"}}>
        <div className="logo">
        <FaLocationArrow /> LETS GO!
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" ref={nameRef} />
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type="submit" className="registerButton">Register</button>
            {success && <span className="success">Successfully Registered! You can login now.</span>}
            {failure && <span className="failure">Something went wrong!</span>}
        </form>
        <MdOutlineCancel className="registerCancel" onClick={() => setOpen(false)}/>

    </div>
  )
}

export default Register