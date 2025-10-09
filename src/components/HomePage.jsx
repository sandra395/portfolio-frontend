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
    // Convert params object to query string
    const query = new URLSearchParams(params).toString();
    navigate(`/filtered-properties?${query}`);
  };

  if (isLoading) return <p>Loading properties...</p>;
  if (error) return <p>Error loading properties.</p>;

  return (
    <div>
      {/* FilterBar */}
      <h2 className="filter-title">Find your perfect stay</h2>
      <FilterBar searchParams={searchParams} onSearch={handleSearch} />

      <PropertyImages properties={properties} />
    </div>
  );
}

export default HomePage;
