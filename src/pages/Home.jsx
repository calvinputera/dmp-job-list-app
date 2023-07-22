import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";

const Home = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/login";
    });
  };

  useEffect(() => {
    if (!setIsAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      Isi HOME
      <button onClick={signUserOut}>Keluar</button>
    </>
  );
};

export default Home;
