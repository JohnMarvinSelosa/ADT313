import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/admin/register', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contactNo: contactNo,
        password: password
      });

      if (response.data.message === "User created") {
        try {
          const loginResponse = await axios.post('/admin/login', {
            email: email,
            password: password
          });

          if (loginResponse.data.access_token) {
            const userData = {
              id: loginResponse.data.user.userId,
              firstName: loginResponse.data.user.firstName,
              email: loginResponse.data.user.email,
              role: loginResponse.data.user.role
            };

            login(userData, loginResponse.data.access_token);

            navigate(loginResponse.data.user.role === 'admin' ? "/homepage" : "/");
          } else {
            setError('Registration successful, but login failed.');
          }
        } catch (loginError) {
          setError('Registration successful, but could not log in automatically.');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Create an Account</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="tel" 
          placeholder="Contact Number" 
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
        />
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        
        <div className="register-buttons">
          <button className="primary-btn" onClick={handleRegister}>
            Join Now
          </button>
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Already have an account?
          </button>
          <button className="secondary-btn" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
