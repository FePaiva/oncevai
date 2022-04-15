import "./register.css"

export default function Register() {
  return (
    <div className="registerContainer">
      <div className="logo"></div>

      <form >
        <input type="text" placeholder="username"/>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password"/>
        <button className="registerBtn">Register</button>
        {/* {success && (
          <span className="success">Successful. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>} */}
      </form>
      {/* <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      /> */}
    </div>
  );
}
