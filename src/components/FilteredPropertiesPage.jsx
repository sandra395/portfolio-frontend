import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard"; // Use your card component
import { useSearchParams } from "react-router-dom";
import { getProperties } from "../api";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";

function FilteredPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        const allProps = Array.isArray(data) ? data : data.properties || [];
        setProperties(allProps);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    if (!properties.length) return;

    let results = [...properties];

    const type = searchParams.get("property_type");
    const price = searchParams.get("price");
    const operator = searchParams.get("operator");
    const sort = searchParams.get("sort");

    if (type)
      results = results.filter(
        (p) => p.property_type.toLowerCase() === type.toLowerCase()
      );

    if (price && operator) {
      const priceNum = Number(price);
      if (operator === "<")
        results = results.filter((p) => p.price_per_night < priceNum);
      if (operator === ">")
        results = results.filter((p) => p.price_per_night > priceNum);
      if (operator === "=")
        results = results.filter((p) => p.price_per_night === priceNum);
    }

    if (sort) {
      results.sort((a, b) =>
        sort === "asc"
          ? a.price_per_night - b.price_per_night
          : b.price_per_night - a.price_per_night
      );
    }

    setFilteredProperties(results);
  }, [properties, searchParams]);

  if (isLoading) return <p>Loading properties...</p>;
  if (error) return <p>Error loading properties: {error.message}</p>;

  return (
    <div>
      <h2 className="filter-title">Filtered Properties</h2>
      {filteredProperties.length > 0 ? (
        <div className="filtered-properties-container">
          {filteredProperties.map((p) => (
            <PropertyCard
              key={p.property_id}
              id={p.property_id}
              imageUrl={p.image}
              name={p.property_name}
              location={p.location}
              pricePerNight={`£${p.price_per_night}`}
              popularity={p.popularity}
              propertyType={p.property_type}
              host_name={p.host}
            />
          ))}
        </div>
      ) : (
        <p>No properties match your filters.</p>
      )}
    </div>
  );
}

export default FilteredPropertiesPage;
