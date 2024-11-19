// src/components/TripDetail.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../api/api";
import PackingList from "./PackingList";
import DayList from "./DayList";
import UserContext from "../auth/UserContext";

function TripDetail() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const { unit } = useContext(UserContext); // Assuming unit is stored in context

  useEffect(() => {
    async function fetchDetails() {
      try {
        const tripRes = await Api.getTrip(tripId);
        setTrip(tripRes);

        const weatherRes = await Api.getTripWeather(tripId);
        setWeatherData(weatherRes);

        const activitiesRes = await Api.getActivities(tripId);
        setActivities(activitiesRes);
      } catch (err) {
        console.error("Failed to load trip details", err);
        setError(err);
      }
    }
    fetchDetails();
  }, [tripId]);

  const handleActivityAdded = (newActivity) => {
    setActivities([...activities, newActivity]);
  };

  if (error) return <p>Error: {error[0] || error.message}</p>;
  if (!trip || !weatherData) return <p>Loading...</p>;

  return (
    <div>
      <h1>{trip.location}</h1>
      <h3>{trip.start_date} - {trip.end_date}</h3>
      <h2>Weather Forecast</h2>
      <DayList
        weatherData={weatherData}
        activities={activities}
        tripId={tripId}
        unit={unit || "us"}
        onActivityAdded={handleActivityAdded}
      />
      <h2>Packing List</h2>
      <PackingList tripId={tripId} />
    </div>
  );
}

export default TripDetail;
