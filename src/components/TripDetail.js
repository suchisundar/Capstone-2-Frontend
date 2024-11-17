import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DayList from "./DayList"; 
import Api from "../api/api";

const TripDetail = () => {
  const { tripId } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await Api.getTripWeather(tripId);
        setWeatherData({ days: data }); // Pass as an object with `days`
      } catch (err) {
        console.error("Failed to load trip details", err);
        setError(err);
      }
    }
    fetchDetails();
  }, [tripId]);

  if (!weatherData) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error[0]}</p>;

  return (
    <div>
      <h2>Trip Weather Details</h2>
      <DayList
        weatherData={weatherData}
        unit="us" // Assuming a unit default for demo
        onDayClick={(dayIndex) => console.log("Selected Day:", dayIndex)}
      />
    </div>
  );
};

export default TripDetail;
