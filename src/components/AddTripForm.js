import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/api";
import UserContext from "../auth/UserContext"; // Context to access current user

function AddTripForm() {
  const { currentUser } = useContext(UserContext); // Get the logged-in user's data
  const [formData, setFormData] = useState({
    location: "",
    start_date: "",
    end_date: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await Api.createTrip({ ...formData, username: currentUser.username }); // Automatically attach username
      navigate("/trips"); // Redirect to trips page
    } catch (err) {
      console.error("Error creating trip:", err);
      setFormErrors(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Start Date</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />

        <label>End Date</label>
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />

        <button type="submit">Add Trip</button>
      </form>

      {formErrors.length > 0 && (
        <div className="alert alert-danger">
          {formErrors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddTripForm;
