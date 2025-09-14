import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onFetchBookings }) => {
  const navigate = useNavigate();
  return (
    <header>
      {/* Logo */}
      <img src="/logo.png" alt="Logo"  onClick={() => navigate("/")} />


      <div className="header-buttons">
        {/* My Bookings Button */}
        <button onClick={() => navigate("/bookings")}>

          <img src="/booking.png" alt="Bookings Icon" width={24} height={24} />
          My Bookings
        </button>

        {/* My Profile Button */}
        <button onClick={() => navigate("/profile")}>
          <img src="/user.png" alt="Profile Icon" width={24} height={24} />
          My Profile
        </button>
      </div>
    </header>
  );
};

export default Header;