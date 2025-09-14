import React from "react";

function GreaterOrLess({ onSelectOperator }) {
    const operators = ["<", ">"];
  
    return (
      <div>
      <h2>Select &lt; or &gt;</h2>
        <select
          onChange={(e) => onSelectOperator(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select Operator --
          </option>
          {operators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>
    );
  }
  

export default GreaterOrLess;