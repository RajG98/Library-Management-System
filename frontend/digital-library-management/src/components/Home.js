import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user)
      navigate("/login");
  },[user,navigate])
  return (
    <div>
      <h1 className='d-flex justify-content-center py-2'>Digital Library Management System</h1>
      <h3 className='d-flex justify-content-center'>Welcome: { user?.username }</h3>
    </div>
  )
}
export default Home;