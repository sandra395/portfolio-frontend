
import React from "react";

function PriceFilter({ operator, onChange }) {
    const options = ["None", "<", ">"];

  return (
    <label>
      Price filter
      <select value={operator} onChange={onChange}>
        {options.map(op => (
          <option key={op} value={op === "None" ? "" : op}>
            {op}
          </option>
        ))}
      </select>
    </label>
  );
}

export default PriceFilter;