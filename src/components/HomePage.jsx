import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import PropertyImages from "./PropertyImages";
import { useSearchParams } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { getProperties } from "../api";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetFilters = () => {
    setSearchParams({});
    setFilteredProperties([]); // hides the table
  };

  // Reset table automatically when URL has no query parameters
  useEffect(() => {
    if (!searchParams.toString()) {
      setFilteredProperties([]);
    }
  }, [searchParams]);

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

  const handleSearch = (params) => {
    setSearchParams(params);

    let results = [...properties];

    // Filter by property type
    if (params.property_type) {
      results = results.filter(
        (p) =>
          p.property_type.toLowerCase() === params.property_type.toLowerCase()
      );
    }

    // Filter by price
    if (params.price && params.operator) {
      const priceNum = Number(params.price);
      if (params.operator === "<")
        results = results.filter((p) => p.price_per_night < priceNum);
      if (params.operator === ">")
        results = results.filter((p) => p.price_per_night > priceNum);
      if (params.operator === "=")
        results = results.filter((p) => p.price_per_night === priceNum);
    }

    // Sort
    if (params.sort) {
      results.sort((a, b) =>
        params.sort === "asc"
          ? a.price_per_night - b.price_per_night
          : b.price_per_night - a.price_per_night
      );
    }
    console.log(
      `Filtered properties with ${params.operator} ${params.price}:`,
      results.map((p) => p.price_per_night)
    );
    setFilteredProperties(results);
  };

  return (
    <>
      {/* Carousel */}
      <PropertyImages properties={properties} />

      {/* FilterBar */}
      <FilterBar searchParams={searchParams} onSearch={handleSearch} />

      {/* Filtered Properties Table */}
      {filteredProperties.length > 0 || searchParams.toString() ? (
        <div className="filtered-properties">
          <h2>Filtered Properties</h2>

          {filteredProperties.length === 0 ? (
            <p>No properties match your filter.</p>
          ) : (
            <table className="property-table">
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Location</th>
                  <th>Price Per Night</th>
                  <th>Property Type</th>
                  <th>Host</th>
                  <th>Popularity</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((p, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/property/${p.property_id}`)}
                  >
                    <td>{p.property_name}</td>
                    <td>{p.location}</td>
                    <td>£{p.price_per_night}</td>
                    <td>{p.property_type}</td>
                    <td>{p.host}</td>
                    <td>{p.popularity}</td>
                    <td>
                      {p.image && <img src={p.image} alt={p.property_name} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : null}
    </>
  );
}

export default HomePage;
