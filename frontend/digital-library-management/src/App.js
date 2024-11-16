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
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated === null) {
    // Optional loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize state from localStorage on the first render
    return !!localStorage.getItem("user");
  });
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("user"));
  },[user])

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/report"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Members />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/issue"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <IssueForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details/issueHistory"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <IssueHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details/edit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditBookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members/:id/edit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditMemberForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/add"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members/add"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id/details/issueHistory/:issueId/edit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditIssueForm />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<LoginForm />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
