import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import PropertyCard from './PropertyCard';

function CarouselImages() {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const endpointUrl = 'http://localhost:9090/api/properties';
    
        fetch(endpointUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProperties(data.properties);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Could not fetch properties:", error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center p-5">Loading properties...</div>;
    }

    if (error) {
        return <div className="text-center p-5 text-danger">Error: Could not load properties.</div>;
    }

    return (
        <Carousel>
            {properties.map((property, index) => (
                <Carousel.Item key={property.id || index}>
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
  );
}
export default CarouselImages;
