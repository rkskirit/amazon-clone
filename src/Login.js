import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = e => {
    e.preventDefault();
    //firebase stuff
    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push("/");
      })
      .catch(error => alert(error.messasge));
  };
  const register = e => {
    e.preventDefault();
    //firebase stuff
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        //sucessfully created new user account
        if (auth) {
          history.push("/");
        }
      })

      .catch(error => alert(error.messasge));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG1.png"
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className="login_signin">
            Sign In
          </button>
        </form>
        <p>
          By sigining in you agree to our conditions of use and sale .Please see
          our privacy Notice ,our cookies Notice and our Intrest -based Ads
          notice.
        </p>
        <button onClick={register} className="login_register">
          Create Your Account
        </button>
      </div>
    </div>
  );
}

export default Login;
