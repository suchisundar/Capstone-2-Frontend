import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Api from "../api/api";
import PackingList from "./PackingList";
import DayList from "./DayList";
import UserContext from "../auth/UserContext"; // Import context


function TripDetail() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [weather, setWeather] = useState([]);
  const [activities, setActivities] = useState([]);
  const { unit } = useContext(UserContext); // Get unit from context

  useEffect(() => {
    async function fetchDetails() {
      try {
        const tripRes = await Api.getTrip(tripId);
        setTrip(tripRes);

        const weatherRes = await Api.getTripWeather(tripId);
        setWeather(weatherRes);

        const activitiesRes = await Api.getActivities(tripId);
        setActivities(activitiesRes);
      } catch (err) {
        console.error("Failed to load trip details", err);
      }
    }
    fetchDetails();
  }, [tripId]);

  if (!trip) return <p>Loading...</p>;

  return (
    <div>
      <h1>{trip.location}</h1>
      <h3>{trip.start_date} - {trip.end_date}</h3>

      <h2>Weather Forecast</h2>
      <DayList 
        weatherData={{ days: weather }} 
        unit={unit} 
        onDayClick={() => {}} // Provide dummy function if not used
      />

      <h2>Activities</h2>
      <ul>
        {activities.map((a) => (
          <li key={a.id}>{a.date}: {a.description}</li>
        ))}
      </ul>

      <h2>Packing List</h2>
      <PackingList tripId={tripId} />
    </div>
  );
}

export default TripDetail;
