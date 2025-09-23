import React, { useState, useEffect } from "react";
import "../App.css";

const FilterBar = ({ searchParams, onSearch }) => {
  const [propertyType, setPropertyType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [operator, setOperator] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!searchParams) return;
    setPropertyType(searchParams.get("property_type") || "");
    setOperator(searchParams.get("operator") || "");
    setPrice(searchParams.get("price") || "");
    setSortOrder(searchParams.get("sort") || "");
  }, [searchParams]);

  const handleSearchClick = () => {
    const params = {};
    if (propertyType) params.property_type = propertyType;
    if (operator) params.operator = operator;
    if (price) params.price = price;
    if (sortOrder) params.sort = sortOrder;

    onSearch(params);
  };

  return (
    <nav className="filterbar">
      <div className="filter-filters">
        <label>
          Property Type:
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Loft">Loft</option>
            <option value="Villa">Villa</option>
            <option value="Cottage">Cottage</option>
            <option value="Chalet">Chalet</option>
            <option value="Cabin">Cabin</option>
            <option value="Mansion">Mansion</option>
            <option value="Castle">Castle</option>
          </select>
        </label>

        <label>
          Sort by:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>

        <label>
          Price filter:
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="">None</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="=">=</option>
          </select>
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </label>

        <button onClick={handleSearchClick}>Search</button>
      </div>
    </nav>
  );
};

export default FilterBar;
