import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/report" element={<ReportPage />} />
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/books" element={<Books />} />  
        <Route path="/members" element={<Members />} />  
        <Route path="/books/:id/details" element={<BookDetails />} /> 
        <Route path="/books/:id/issue" element={<IssueForm />} /> 
        <Route path="/books/:id/details/issueHistory" element={<IssueHistory />} /> 
        <Route path="/books/:id/details/edit" element={<EditBookForm />} /> 
        <Route path="/members/:id/edit" element={<EditMemberForm />} /> 
        <Route path="/books/add" element={<AddBook />} /> 
        <Route path="/members/add" element={<AddMember />} /> 
        <Route path="/books/:id/details/issueHistory/:issueId/edit" element={<EditIssueForm />} /> 
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
      </Routes>
    </Router>
  );
};

export default App;

