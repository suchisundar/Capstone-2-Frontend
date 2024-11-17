import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/api";
import TripCard from "../components/TripCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "react-bootstrap/Button";
import UserContext from "../auth/UserContext"; 

function MyTrips() {
  const { currentUser } = useContext(UserContext); // Access currentUser from context
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTrips() {
      if (!currentUser) return; // Ensure currentUser exists before making the call
      try {
        const res = await Api.getTrips(currentUser.username); // Pass username here
        setTrips(res); // Save the fetched trips
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch trips", err);
      }
    }
    fetchTrips();
  }, [currentUser]); // Re-run effect when currentUser changes

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h1>My Trips</h1>
      <Button
        type="button"
        onClick={() => navigate("/trips/new")}
        variant="success"
        className="mb-3"
      >
        Add New Trip
      </Button>
      <div className="row">
        {trips.map((trip) => (
          <TripCard trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;

