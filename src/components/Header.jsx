import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bookingIcon from "../assets/booking.png";
import logo from "../assets/logo.png";
import profileIcon from "../assets/user.png";

const Header = () => {
  const navigate = useNavigate();

  // Create handler functions for clarity
  const goToBookings = () => {
    navigate("/bookings"); 
  };

  const goToProfile = () => {
    navigate("/profile"); // Navigate to the /profile route
  };

  return (
    <header>
      {/* Add an onClick to navigate to the homepage when the logo is clicked */}
      <img
        className="site-logo"
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")} // Navigate to homepage on logo click
      />

      <div className="header-buttons">
        <button onClick={goToBookings}>
          <img src={bookingIcon} alt="Bookings Icon" />
          <span>Bookings</span>
        </button>

        <button onClick={goToProfile}>
          <img src={profileIcon} alt="Profile Icon" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
