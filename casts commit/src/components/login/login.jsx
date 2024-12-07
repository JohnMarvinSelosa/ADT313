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
      const response = await axios.post('/admin/login', {
        email: email,
        password: password
      });

      if (response.data.access_token) {
        const userData = {
          id: response.data.user.userId,
          firstName: response.data.user.firstName,
          email: response.data.user.email,
          role: response.data.user.role
        };

        login(userData, response.data.access_token);

        navigate(response.data.user.role === 'admin' ? "/homepage" : "/");
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back</h1>
        
        {error && <div className="error-message">{error}</div>}
        
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
          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="secondary-btn" onClick={() => navigate("/register")}>
            Create Account
          </button>
          <button className="secondary-btn" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
