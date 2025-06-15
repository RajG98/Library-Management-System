import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  

  return (
    <div>
      <h1 className="d-flex justify-content-center py-2">Digital Library Management System</h1>
      <h3 className="d-flex justify-content-center">Welcome: {user?.username}</h3>
      {user?.username==="admin" && <div className="d-flex justify-content-center py-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/books/report")}
        >
          Generate Report
        </button>
      </div>}
    </div>
  );
};

export default Home;
