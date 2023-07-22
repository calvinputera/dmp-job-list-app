import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";

const Login = ({ setIsAuth }) => {
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Login
      <button onClick={GoogleLogin}>Google</button>
    </div>
  );
};

export default Login;