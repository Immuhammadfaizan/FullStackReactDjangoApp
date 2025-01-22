import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import PropTypes from "prop-types";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear any previous error messages

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        // Store tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/"); // Redirect to homepage
      } else {
        navigate("/login"); // Redirect to login page after registration
      }
    } catch (error) {
      // Display an error message if the API request fails
      setErrorMessage(
        error.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Loading..." : name}
      </button>
    </form>
  );
}

Form.propTypes = {
  route: PropTypes.string.isRequired, // route should be a required string
  method: PropTypes.oneOf(['login', 'register']).isRequired // method should be 'login' or 'register'
};

export default Form;
