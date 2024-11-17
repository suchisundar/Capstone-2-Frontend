import React from "react";
import Message from "../common/Message";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/** Login/Signup form.
 *
 * Props:
 * - login: function to call for login
 * - signup: function to call for signup
 * - isLoginMode: boolean, whether the form is in login or signup mode
 * - toggleLoginMode: function to switch between login and signup modes
 * - formErrors: array of error messages to display
 *
 * On submission, calls the appropriate function (`login` or `signup`).
 */
const LoginSignupForm = ({ login, signup, isLoginMode, toggleLoginMode, formErrors = [] }) => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  /** Handle form submission */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isLoginMode) {
      await login({ username: formData.username, password: formData.password });
    } else {
      await signup(formData);
    }
  };

  /** Handle changes to form fields */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit} className="border border-3 p-4 rounded-2">
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {!isLoginMode && (
        <>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </>
      )}

      {formErrors.length > 0 && <Message type="danger" messages={formErrors} />}

      <div className="d-flex justify-content-end">
        <Button variant="info" type="submit" className="me-3">
          {isLoginMode ? "Log In" : "Sign Up"}
        </Button>

        <Button variant="secondary" onClick={toggleLoginMode}>
          {isLoginMode ? "Switch to Sign Up" : "Switch to Log In"}
        </Button>
      </div>
    </Form>
  );
};

export default LoginSignupForm;
