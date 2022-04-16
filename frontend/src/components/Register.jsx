import "./register.css"
import axios from "axios";
import { Cancel, Room } from "@material-ui/icons";
import { useState, useRef } from "react";


export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
  };
    try {
        await axios.post("/users/register", newUser);
        setError(false);
        setSuccess(true);
      } catch (err) {
        setError(true);
      }
    };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room/>
        Oncevai
      </div>

      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="registerBtn">Register</button>
        {success && (
          <span className="success">Successful. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
