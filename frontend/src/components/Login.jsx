import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername, myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  useEffect(() => {
    axios.get('http://localhost:5000/check-session', { withCredentials: true })
    .then(response => {
      if(response.data.isAuthenticated == true){
      setCurrentUsername(response.data.user);
      myStorage.setItem("user", response.data.user);
      setShowLogin(false);}
    })
    .catch(error => {
      console.error('Error checking session', error);
    });
  }, []);

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Pin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
      <div className="loginButton google" onClick={google}>
        Google
      </div>
    </div>
  );
}
