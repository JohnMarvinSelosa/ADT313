import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post('/user/login', {
        email,
        password
      });

      if (response.data.access_token) {
        const userData = {
          id: response.data.user.userId,
          firstName: response.data.user.firstName,
          middleName: response.data.user.middleName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          contactNo: response.data.user.contactNo,
          role: response.data.user.role
        };

        login(userData, response.data.access_token);
        navigate(response.data.user.role === 'admin' ? "/admin" : "/client");
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setError('No response from server. Please check your network connection.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
      <h1>SINEMOVIES</h1>
      <p>Login to start watching your favorite movies</p>

        
        {error && <div className="error-message">{error}</div>}
        
        <div className="login-form">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="show-password">
            <input 
              type="checkbox" 
              id="show-password" 
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Show Password</label>
          </div>
          
            <div className="login-buttons">
              <button onClick={handleLogin}>
              Login
              </button>
              <button className="secondary" onClick={() => navigate("/register")}>
              Create Account
              </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;


