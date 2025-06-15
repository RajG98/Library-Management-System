import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import IssueForm from './components/IssueForm';
import IssueHistory from './components/IssueHistory';
import EditBookForm from './components/EditBookForm';
import AddBook from './components/AddBook';
import EditIssueForm from './components/EditIssueForm';
import Members from './components/Members';
import AddMember from './components/AddMember';
import EditMemberForm from './components/EditMemberForm';
import ReportPage from './components/ReportPage';
import axios from 'axios';
import { useAuth } from './context/AuthContext';




const App = () => {
  const { user,loading } = useAuth();

  const isAuthenticated = !!user;
  
  const ProtectedRoute = ({ children }) => {



    return isAuthenticated ? children : <Navigate to="/login?sessionExpired=true" />;
  };
  const PublicRoute = ({ children }) => {


    return isAuthenticated ? <Navigate to="/" /> : children;
  };
if (loading) {
  return <div>Loading...</div>; // or a loader component
}

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/report"
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute >
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details"
          element={
            <ProtectedRoute >
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/issue"
          element={
            <ProtectedRoute >
              <IssueForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details/issueHistory"
          element={
            <ProtectedRoute >
              <IssueHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details/edit"
          element={
            <ProtectedRoute >
              <EditBookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members/:id/edit"
          element={
            <ProtectedRoute >
              <EditMemberForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/add"
          element={
            <ProtectedRoute >
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members/add"
          element={
            <ProtectedRoute >
              <AddMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details/issueHistory/:issueId/edit"
          element={
            <ProtectedRoute >
              <EditIssueForm />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
