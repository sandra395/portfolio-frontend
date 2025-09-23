import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getUser,
  getUserProperties,
  getPropertyBookings,
  getUserBookings,
} from "../api";

const Profile = ({ currentUser }) => {
  const [ownProperties, setOwnProperties] = useState([]);
  const [propertyBookings, setPropertyBookings] = useState({}); // Bookings on her properties
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Fetch user info
        const userData = await getUser(currentUser.id);
        setUser(userData.user || currentUser);

        // Fetch user's own properties
        const propertiesData = await getUserProperties(currentUser.id);
        const properties = propertiesData?.properties || [];
        setOwnProperties(properties);

        // Fetch bookings for each property
        const bookingsMap = {};
        await Promise.all(
          properties.map(async (property) => {
            const bookingData = await getPropertyBookings(property.property_id);
            bookingsMap[property.property_id] = bookingData?.bookings || [];
          })
        );
        setPropertyBookings(bookingsMap);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-page-container">
      <h2 className="profile-name">
        {user.first_name} {user.surname}{" "}
        <Link to={`/profile/${user.id}/edit`}>
          <img
            src="/edit.png"
            alt="Edit profile"
            className="profile-edit-icon"
          />
        </Link>
      </h2>

      {user.avatar && (
        <img
          src={user.avatar}
          alt={`${user.first_name} avatar`}
          className="profile-avatar"
        />
      )}

      <p>
        <strong>Email:</strong> {user.email || currentUser.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone_number || currentUser.phone_number}
      </p>

      <hr />

      {/* Own Properties */}
      <h3>My Properties</h3>
      {ownProperties.length === 0 ? (
        <p>You haven't added any properties yet.</p>
      ) : (
        <ul>
          {ownProperties.map((property) => (
            <li key={property.property_id}>
              <strong>{property.property_name}</strong> <br />
              {property.image && (
                <img
                  src={property.image}
                  alt={property.property_name}
                  className="property-image"
                  width="200"
                />
              )}
              Location: {property.location} <br />
              Price: £{property.price_per_night}/night <br />
              Type: {property.property_type} <br />
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* Upcoming Bookings on Own Properties */}
      <h3>Upcoming Bookings</h3>
      {ownProperties.length === 0 ? (
        <p>No properties, so no bookings.</p>
      ) : (
        ownProperties.map((property) => (
          <div key={property.property_id}>
            <h4>{property.property_name}</h4>
            {propertyBookings[property.property_id]?.length === 0 ? (
              <p>No upcoming bookings.</p>
            ) : (
              <ul>
                {propertyBookings[property.property_id].map((booking) => (
                  <li key={booking.booking_id} className="booking-item">
                    <strong>Guest:</strong> {booking.guest_name} <br />
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.check_in_date).toLocaleDateString()}{" "}
                    <br />
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.check_out_date).toLocaleDateString()}{" "}
                    <br />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}

      <hr />

      {/* Reviews */}
      <h3>My Reviews</h3>
      <p>No reviews yet.</p>
      <hr />
    </div>
  );
};

export default Profile;
