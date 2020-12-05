import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, showNavbar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) showNavbar(true);
      else showNavbar(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__show"}`}>
      <img
        className="nav__logo"
        alt="logo"
        src="https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png"
      />
      <img
        className="nav__avatar"
        alt="avatar"
        src="https://seeklogo.com/images/P/pikachu-logo-619ACB690E-seeklogo.com.png"
      />
    </div>
  );
}

export default Navbar;
