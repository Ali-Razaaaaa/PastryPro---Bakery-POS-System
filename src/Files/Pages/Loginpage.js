import React, { useState } from 'react';
import { FaBirthdayCake, FaUser, FaLock } from 'react-icons/fa';
import './Loginpage.css';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          password: password
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        navigate('/main');
      } else {
        alert('Galat Password Phr se Koshish karo');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      {/* Background overlay */}
      <div className="background-overlay"></div>
      
      {/* Login Form */}
      <div className="login-form-container">
        <div className="login-card">
          {/* Brand Header */}
          <div className="brand-header">
            <FaBirthdayCake className="brand-icon" />
            <h1 className="brand-title">Pastry Pro</h1>
          </div>
          
          {/* Welcome Message */}
          <div className="welcome-section">
            <h2>Welcome Back!</h2>
            <p>Please sign in to your account</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={name}
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="login-button">
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;