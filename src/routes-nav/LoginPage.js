import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Api from "../api/api";
import LoginSignupForm from "../auth/LoginSignupForm";

function LoginPage({ setToken }) {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formErrors, setFormErrors] = useState([]); // Always an array

  const toggleLoginMode = () => {
    setIsLoginMode((prev) => !prev);
    setFormErrors([]); // Clear errors on toggle
  };

  async function login(formData) {
    try {
      const token = await Api.login(formData);
      setToken(token);
      const currentUser = await Api.getCurrentUser(formData.username);
      setCurrentUser(currentUser);
      navigate("/trips");
    } catch (err) {
      setFormErrors(err); // Ensure this is an array
    }
  }

  async function signup(formData) {
    try {
      const token = await Api.signup(formData);
      setToken(token);
      const currentUser = await Api.getCurrentUser(formData.username);
      setCurrentUser(currentUser);
      navigate("/trips");
    } catch (err) {
      setFormErrors(err); // Ensure this is an array
    }
  }

  return (
    <div className="LoginPage">
      <h1>Welcome to Trip Planner</h1>
      <LoginSignupForm
        login={login}
        signup={signup}
        isLoginMode={isLoginMode}
        toggleLoginMode={toggleLoginMode}
        formErrors={formErrors} // Pass as array
      />
    </div>
  );
}

export default LoginPage;
