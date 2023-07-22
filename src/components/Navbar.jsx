import React from "react";

const Navbar = () => {
  return (
    <div>
      Navbar
      {localStorage.getItem("email")}
    </div>
  );
};

export default Navbar;
