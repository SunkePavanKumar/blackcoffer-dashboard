import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [endYear, setEndYear] = useState('');
  const [topic, setTopic] = useState('');
  const [sector, setSector] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ endYear, topic, sector });
  };

  return (
    <div className="bg-white p-4 shadow-md mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">End Year</label>
        <input
          type="number"
          value={endYear}
          onChange={e => setEndYear(e.target.value)}
          onBlur={handleFilterChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Topics</label>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onBlur={handleFilterChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Sector</label>
        <input
          type="text"
          value={sector}
          onChange={e => setSector(e.target.value)}
          onBlur={handleFilterChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      {/* Add more filters as needed */}
    </div>
  );
};

export default Filters;
