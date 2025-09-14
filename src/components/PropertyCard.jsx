import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function PropertyCard({ id, imageUrl, name, location, pricePerNight, propertyType, host, popularity })  {
  const navigate = useNavigate();

  return (
    <div>
    {imageUrl && <img src={imageUrl} alt={name} />}
    <h2>{name}</h2>
    <p>Property type: {propertyType}</p>
    <p>Location: {location}</p>
    <p>Price per night: {pricePerNight}</p>
    <p>Popularity: {popularity}</p>
    <button onClick={() => navigate(`/property/${id}`)}>View Property</button>
  </div>
);
}

export default PropertyCard;
