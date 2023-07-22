import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import logo from "../assets/images/gitHub-job-logo.png";
import googleIcon from "../assets/icons/google-logo.png";

const Login = ({ setIsAuth }) => {
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log(result);
      localStorage.setItem("isAuth", true);
      // localStorage.setItem("email", result.user.email);
      localStorage.setItem("photoUrl", result.user.photoURL);

      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-9">
      <img src={logo} alt="logo" className="w-36" />
      <hr className="border border-silver w-1/2 rounded-md -mt-5" />
      <button
        onClick={GoogleLogin}
        className="flex items-center font-semibold border-2 border-blue p-3 rounded-md text-black hover:bg-hoverBlue duration-150"
      >
        <img src={googleIcon} alt="google-icon" className="w-10" />
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
