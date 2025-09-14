import React from "react";
import PriceFilter from "./PriceFilter";
import Price from "./Price";
import SearchButton from "./SearchButton";
import GreaterOrLess from "./GreaterOrLess";
import PropertyType from "./PropertyType";
import "../Navbar.css";

function Navbar({ 
  propertyType, setPropertyType, 
  sortOrder, setSortOrder, 
  operator, setOperator, 
  price, setPrice, 
  onSearch 
}) {

  // This function will handle the price input change
  const handlePriceChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    setPrice(numericValue);
  };

  return (
    <nav className="navbar">
      <div className="navbar-filters">
        <label>
          Property Type:
          <select value={propertyType} onChange={e => setPropertyType(e.target.value)}>
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
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>

        <label>
         Price filter
          <select value={operator} onChange={e => setOperator(e.target.value)}>
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
            onChange={handlePriceChange}
            placeholder="Enter price"
          />
        </label>

        <button onClick={onSearch}>Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
