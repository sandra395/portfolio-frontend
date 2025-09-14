import React from "react";

function PropertyType({ onSelectType }) {
  const propertyTypes = ["House", "Apartment", "Villa", "Studio", "Loft", "Cottage", "Chalet", "Cabin", "Mansion", "Castle"];

  return (
    <div>
      <h2>Property Type</h2>
      <select onChange={(e) => onSelectType(e.target.value)} defaultValue="">
        <option value="" disabled>
          -- Select Property Type --
        </option>
        {propertyTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
export default PropertyType;
