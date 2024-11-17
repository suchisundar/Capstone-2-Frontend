import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./routes-nav/Navbar";
import MyTrips from "./routes-nav/MyTrips";
import TripDetail from "./components/TripDetail";
import Activities from "./routes-nav/Activities";
import AddTripForm from "./components/AddTripForm";
import LoginPage from "./routes-nav/LoginPage";
import UserContext from "./auth/UserContext";
import Api from "./api/api";
import LoadingSpinner from "./common/LoadingSpinner";
import { decodeToken } from "react-jwt";
import "./App.css";

const TOKEN_STORAGE_ID = "trip-planner-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (token) {
        Api.setToken(token); // Ensure token is set for all requests.
        try {
          const decoded = decodeToken(token);
          const currentUser = await Api.getCurrentUser(decoded.username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("Failed to load user data:", err);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    }
    loadUser();
  }, [token]);
  

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <UserContext.Provider value={{ currentUser }}>
      <NavBar logout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/trips" /> : <LoginPage setToken={setToken} />
          }
        />
        <Route
          path="/trips"
          element={currentUser ? <MyTrips /> : <Navigate to="/" />}
        />
        <Route
          path="/trips/:tripId/details"
          element={currentUser ? <TripDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/trips/new"
          element={currentUser ? <AddTripForm /> : <Navigate to="/" />}
        />
        <Route
          path="/activitysearch"
          element={currentUser ? <Activities /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
