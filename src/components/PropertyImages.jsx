import React from 'react';
import { Carousel } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import '../App.css';

function PropertyImages({ properties }) {
  if (!properties || properties.length === 0) {
    return <div className="text-center p-5">No properties found.</div>;
  }

  return (
    <div className="carousel-container">
    <h2 className="images-title">Discover our listed properties</h2>
    <Carousel className="custom-carousel">
      {properties.map((property) => (
        <Carousel.Item key={property.property_id}>
          <PropertyCard
            id={property.property_id}
            imageUrl={property.image}
            name={property.property_name}
            location={property.location}
            pricePerNight={`£${property.price_per_night}`}
            popularity={property.popularity}
            propertyType={property.property_type}
          />
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
}

export default PropertyImages;
