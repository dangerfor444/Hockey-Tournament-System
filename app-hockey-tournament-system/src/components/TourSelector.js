import React from 'react';

const TourSelector = ({ tours, selectedTourId, onTourChange }) => {
  return (
    <div className="tour-selector">
      <h3>Выберите тур</h3>
      <select 
        value={selectedTourId} 
        onChange={(e) => onTourChange(e.target.value)}
      >
        <option value="">-- Выберите тур --</option>
        {tours.map(tour => (
          <option key={tour.id} value={tour.id}>
            {tour.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TourSelector; 