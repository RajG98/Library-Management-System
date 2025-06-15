import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const location = useLocation();
  const sessionExpired = new URLSearchParams(location.search).get('sessionExpired');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    navigate("/");
  };

  return (

    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Submit
            </button>
            <div style={{
              lineHeight: 0.5,
              fontSize: '0.8rem',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              <p>Admin: {'{username:"admin", password:"admin"}'}</p>
              <p>User: {'{username:"user", password:"user"}'}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
