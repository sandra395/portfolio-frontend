import React from 'react';

function Price({ value, onChange }) {
  return (
    <label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        step="0.01"
        placeholder="Enter price"
      />
    </label>
  );
}

export default Price;