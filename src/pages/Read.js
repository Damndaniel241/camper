import React from 'react';
import { useLocation } from 'react-router-dom';

function Read() {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return <p>No form data available.</p>; // Handle missing data scenario
  }

  return (
    <div>
        <h2>Read Details</h2>
      {/* Display details from formData */}
      <p>Name: {formData.name}</p>
      {/* ... other details */}
    </div>
  )
}

export default Read