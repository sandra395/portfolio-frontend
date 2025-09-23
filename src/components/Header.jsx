import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="site-logo"
        onClick={() => navigate("/")}
      />

      <div className="header-buttons">
        {/* My Bookings Button */}
        <button onClick={() => navigate("/bookings")}>
          <img src="/booking.png" alt="Bookings Icon" />
          <span>My Bookings</span>
        </button>

        {/* My Profile Button */}
        <button onClick={() => navigate("/profile")}>
          <img src="/user.png" alt="Profile Icon" />
          <span>My Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
