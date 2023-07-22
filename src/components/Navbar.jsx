import React from "react";
import logo from "../assets/images/gitHub-job-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const refreshPage = () => {
    window.location.reload(false);
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="shadow-md w-full px-4 flex justify-between items-center">
      <img
        src={logo}
        alt="logo"
        className="w-24 cursor-pointer"
        onClick={refreshPage}
      />
      <div className="dropdown dropdown-bottom dropdown-end hover:bg-none">
        <label tabIndex={0} className="btn m-1">
          <img
            src={localStorage.getItem("photoUrl")}
            alt="profil"
            className="w-8 h-8 rounded-full"
          />
          <FiChevronDown size={20} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={signUserOut}>
            <a>Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
