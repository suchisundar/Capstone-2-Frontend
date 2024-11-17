import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import LoginSignupForm from "../auth/LoginSignupForm";
import UserContext from "../auth/UserContext";
import { NavLink } from "react-router-dom";

const NavBar = ({ logout, login, signup }) => {
  const { currentUser } = useContext(UserContext); 
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleModal = () => setShowModal(!showModal);
  const toggleLoginMode = () => setIsLoginMode(!isLoginMode);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Trip Planner</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          {currentUser ? (
            <>
              <NavLink to="/trips" className="nav-link">My Trips</NavLink>
              <NavLink to="/activities" className="nav-link">Activity Search</NavLink>
              <Nav.Link onClick={logout}>Log Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link onClick={toggleModal}>Login / Signup</Nav.Link>
              <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{isLoginMode ? "Log In" : "Sign Up"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <LoginSignupForm
                    login={login}
                    signup={signup}
                    isLoginMode={isLoginMode}
                    toggleLoginMode={toggleLoginMode}
                  />
                </Modal.Body>
              </Modal>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

