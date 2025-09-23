import React, { useState, useEffect } from "react";
import PropertyType from "./components/PropertyType";
import GreaterOrLess from "./components/GreaterOrLess";
import Price from "./components/Price";
import SearchButton from "./components/SearchButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PriceFilter from "./components/PriceFilter";
import FilterBar from "./components/FilterBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PropertyImages from "./components/PropertyImages";
import BookingsPage from "./components/MyBookingsPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SingleProperty from "./components/SingleProperty";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import HomePage from "./components/HomePage";

function App() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 4,
    name: "Frank White",
  });

  const handleSaveProperty = (property) => {
    setSavedProperties((prev) => [...prev, property]);
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Bookings page */}
        <Route
          path="/bookings"
          element={<BookingsPage currentUser={currentUser} />}
        />

        {/* single property details */}
        <Route
          path="/property/:id"
          element={
            <SingleProperty
              saveProperty={handleSaveProperty}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} />}
        />
        <Route path="/profile/:userId/edit" element={<EditProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
