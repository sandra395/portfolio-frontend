import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { getUserBookings } from "../api";

const MyBookingsPage = ({ currentUser }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return;

      try {
        const data = await getUserBookings(userId);
        const bookingsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.bookings)
          ? data.bookings
          : [];
        setBookings(bookingsArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);
  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div className="single-property-container">
      <h1>My Bookings</h1>
      <div className="bookings-list">
        {bookings.map((booking, index) => (
          <Link key={index} to={`/property/${booking.property_id}`}>
            <div className="booking-card">
              <h2>{booking.property_name || "Unknown Property"}</h2>
              <img
                src={booking.image || "https://via.placeholder.com/300x200"}
                alt={booking.property_name}
              />
              <p>
                <strong>Host:</strong> {booking.host || "Unknown Host"}
              </p>
              <p>
                <strong>Check-in:</strong> {booking.check_in_date || "N/A"}
              </p>
              <p>
                <strong>Check-out:</strong> {booking.check_out_date || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
