import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header"; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9090/api/users/4/bookings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookings from backend:", data); 
        const bookingsArray = Array.isArray(data) ? data : Array.isArray(data.bookings) ? data.bookings : [];
        setBookings(bookingsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setBookings([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div>
        <Header />
        <h1>My Bookings</h1>
    <ul>
      {bookings.map((booking, index) => (
        <li key={index}>
          <h2>{booking.property_name || "Unknown Property"}</h2>
          <img
            src={booking.image || "https://via.placeholder.com/150"}
            alt={booking.property_name}
            style={{ width: "150px", height: "100px", objectFit: "cover" }}
          />
          <p>Host: {booking.host || "Unknown Host"}</p>
          <p>Check-in: {booking.check_in_date || "N/A"}</p>
          <p>Check-out: {booking.check_out_date || "N/A"}</p>
        </li>
      ))}
    </ul>
    <Footer />
    </div>
  );
};

export default Bookings;
