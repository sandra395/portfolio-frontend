import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PropertyCard({
  id,
  imageUrl,
  name,
  location,
  pricePerNight,
  propertyType,
  host_name,
  popularity,
}) {
  const navigate = useNavigate();

  return (
    <div className="property-card">
      {imageUrl && <img src={imageUrl} alt={name} />}
      <h2>{name}</h2>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Price per Night:</strong> {pricePerNight}
      </p>
      <p>
        <strong>Property Type:</strong> {propertyType}
      </p>
      <p>
        <strong>Popularity:</strong> {popularity}
      </p>
      {host_name && (
        <p>
          <strong>Host:</strong> {host_name}
        </p>
      )}
      <button onClick={() => navigate(`/property/${id}`)}>View Property</button>
    </div>
  );
}

export default PropertyCard;
