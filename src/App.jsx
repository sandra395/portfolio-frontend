
import React, { useState, useEffect } from "react";
import PropertyType from "./components/PropertyType";
import GreaterOrLess from "./components/GreaterOrLess";
import Price from "./components/Price";
import SearchButton from "./components/SearchButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PriceFilter from "./components/PriceFilter";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CarouselImages from './components/CarouselImages';
import BookingsPage from "./components/BookingsPage";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SingleProperty from "./components/SingleProperty";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const [propertyType, setPropertyType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [operator, setOperator] = useState("");
  const [price, setPrice] = useState("");
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: 4, name: "Test User" }); // replace with actual login later
  const [reviews, setReviews] = useState([]);

  const handleSaveProperty = (property) => {
    setSavedProperties((prev) => [...prev, property]);
  };

  const handleSearch = () => {
    let url = "http://localhost:9090/api/properties";
    if (propertyType) {
      url += `?property_type=${propertyType}&sort=cost_per_night&order=${sortOrder}`;
    } else {
      url += `?sort=cost_per_night&order=${sortOrder}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("Raw data from backend:", data);

      
        let arrayData = Array.isArray(data) ? data : data.properties;

   
        if (price && operator && arrayData) {
          const p = Number(price);
          arrayData = arrayData.filter(prop => {
            if (operator === "<") return prop.price_per_night < p;
            if (operator === ">") return prop.price_per_night > p;
            if (operator === "=") return prop.price_per_night === p;
            return true;
          });
        }

        setProperties(arrayData || []);
      })
      .catch(err => console.error("Error fetching data:", err));
  };
  const fetchBookings = () => {
    fetch("http://localhost:9090/api/users/4/bookings")
      .then(res => res.json())
      .then(data => {
        // Always set the array
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        console.log("Bookings set in state:", data.bookings);
      })
      .catch(err => console.error("Error fetching bookings:", err));
  };

  const fetchProperties = () => {
    fetch("http://localhost:9090/api/properties")
        .then(res => res.json())
        .then(data => {
          setProperties(Array.isArray(data) ? data : data.properties || []);
          console.log("Properties fetched:", data);
        })
    
        .catch(err => {
            console.error("Error fetching properties:", err);
        });
      };
        useEffect(() => {
          fetchProperties();
        }, []);

        const addReview = (review) => {
          setReviews([...reviews, review]);
        };
        return (
      <div>
    <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header onFetchBookings={fetchBookings} />
              <Navbar
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                operator={operator}
                setOperator={setOperator}
                price={price}
                setPrice={setPrice}
                onSearch={handleSearch}
              />
                    <CarouselImages />
                    <hr />
                    <Footer />
                  </div>
                }
              />
      
              {/* Bookings page */}
              <Route path="/bookings" element={<BookingsPage />} />

                    {/* single property details */}    
                    <Route
  path="/property/:id"
  element={<SingleProperty saveProperty={handleSaveProperty} currentUserId={4} />}
/>
<Route
  path="/profile"
  element={
    <Profile userId={5} favouriteProperties={savedProperties} />
  }
/>
<Route path="/profile/:userId/edit" element={<EditProfile />} />

      </Routes>
      </div>
   
  );
}
      
      export default App;