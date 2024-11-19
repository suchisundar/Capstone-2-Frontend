// src/routes-nav/Activities.js
import React, { useState } from 'react';
import Api from '../api/api';
import SearchForm from '../common/SearchForm';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const searchFor = async (location) => {
    try {
      const results = await Api.searchActivities(location);
      setActivities(results);
    } catch (err) {
      console.error('Failed to search activities', err);
      setError(err);
    }
  };

  return (
    <div>
      <h2>Search Activities</h2>
      <SearchForm searchFor={searchFor} />
      {activities.length > 0 && (
        <div>
          <h3>Results:</h3>
          {activities.map((activity) => (
            <div key={activity.id}>
              <p><strong>{activity.name}</strong></p>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p>Error: {error[0] || error.message}</p>}
    </div>
  );
}

export default Activities;

