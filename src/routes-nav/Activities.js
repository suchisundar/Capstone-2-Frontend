import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from '../common/SearchForm';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const searchForActivities = async (location) => {
    try {
      setError(null);
      const res = await axios.get(`/activities`, {
        params: { location },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setActivities(res.data.activities);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching activities.");
    }
  };

  return (
    <div>
      <h1>Search for Activities and Tours</h1>
      <SearchForm searchFor={searchForActivities} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {activities.map((act) => (
          <li key={act.id}>
            <h2>{act.name}</h2>
            <p>{act.description}</p>
            <p>Price: ${act.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesPage;
