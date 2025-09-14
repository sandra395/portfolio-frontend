import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";

const Profile = ({ userId, favouriteProperties = [], reviews = [] }) => {
  const [user, setUser] = useState(null);
  const [ownProperties, setOwnProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  


  // ✅ Filter reviews that belong to this user
  const myReviews = reviews.filter(r => r.guest_id === userId);


  useEffect(() => {
    // Fetch user info
    fetch(`http://localhost:9090/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else console.error("User not found:", data);
      })
      .catch((err) => console.error("Error fetching user info:", err));

    // Fetch own properties
    fetch(`http://localhost:9090/api/properties?host=${userId}`)
      .then((res) => res.json())
      .then((data) => setOwnProperties(data.properties || []))
      .catch((err) => console.error("Error fetching own properties:", err));

    // Fetch upcoming bookings
    fetch(`http://localhost:9090/api/users/${userId}/bookings`)
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const upcoming = (data.bookings || [])
          .filter(b => new Date(b.check_in_date) >= today) // only future bookings
          .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date)); // sort by check-in
        setBookings(upcoming);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [userId]);



  if (!user) return <p>Loading profile...</p>;
    
  return (
    <div>
      <Header />
      <h2>
        {user.first_name} {user.surname}{" "}
        <Link to={`/profile/${userId}/edit`}>
          <img
            src="/edit.png"
            alt="Edit profile"
            style={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              marginLeft: "8px",
              verticalAlign: "middle"
            }}
          />
        </Link>
      </h2>

      {user.avatar && (
        <img
          src={user.avatar}
          alt={`${user.first_name} avatar`}
          width="100"
        />
      )}

      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <hr />

      <h3>My Properties</h3>
      {ownProperties.length === 0 ? (
        <p>You haven't added any properties yet.</p>
      ) : (
        <ul>
          {ownProperties.map((property) => (
            <li key={property.property_id}>
              <strong>{property.property_name}</strong> - {property.location} - £{property.price_per_night}/night
            </li>
          ))}
        </ul>
      )}
      <hr />

      <h3>My Favourites</h3>
      {favouriteProperties.length === 0 ? (
        <p>You haven't favourited any properties yet.</p>
      ) : (
        <ul>
          {favouriteProperties.map((property) => (
            <li key={property.id}>
              <strong>{property.title}</strong> <br />
              {property.images && <img src={property.images} alt={property.title} width="200" />}<br />
              {property.description} <br />
              {property.location} <br />
              £{property.price_per_night}/night <br />
              {property.property_type} <br />
              Favourites: {property.favourite_count}<br />
              Host: {property.host} <br />
            </li>
          ))}
        </ul>
      )}
      <hr />

      <h3>Upcoming Bookings</h3>
      {bookings.length === 0 ? (
        <p>No upcoming bookings.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.booking_id} style={{ marginBottom: "20px" }}>
              <strong>Property Name:</strong> {booking.property_name} <br />
              <strong>Host:</strong> {booking.host} <br />
              {booking.image && <img src={booking.image} alt={booking.property_name} width="200" />} <br />
              <strong>Check-in Date:</strong> {new Date(booking.check_in_date).toLocaleDateString()} <br />
              <strong>Check-out Date:</strong> {new Date(booking.check_out_date).toLocaleDateString()} <br />
            </li>
          ))}
        </ul>
      )}
    
      <h1>My Reviews</h1>
      {myReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {myReviews.map((review) => (
            <li key={review.review_id}>
              <p>Property: {review.property_name}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </li>
          ))}
        </ul>
      )}


      <hr />
      <Footer />
    </div>
  );
};

export default Profile;
