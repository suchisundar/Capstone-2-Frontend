import React, { useState } from "react";
import Api from "../api/api";

const ActivitySearch = () => {
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await Api.searchActivities(location);
      setActivities(results);
      setError(null);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to fetch activities. Please try again.");
    }
  };

  return (
    <div>
      <h2>Search for Activities</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.name}</strong> - {activity.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitySearch;
