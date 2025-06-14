import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import NotAllowed from './NotAllowed';
const IssueHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    const getIssues = async () => {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books/${id}/issues`, { withCredentials: true })
        .then(response => {
          // console.log(response.data);
          setIssues(response.data);
        })
        .catch((err) => console.error("Something went wrong!", err.message));
    }
    getIssues();
  })
  return (
    <div className='container-fluid'>
      {user?.username === "admin" ? (
        <><div className=" d-flex align-items-center justify-content-start flex-wrap my-3">
          <h2 className="mb-0 flex-shrink-0">Issue History</h2>
          <button className="btn btn-outline-secondary ms-lg-3  ms-sm-1" onClick={() => navigate("/books")}>BackToMenu</button>
        </div><table className="table">
            <thead>
              <tr>
                <th className="col">Id </th>
                <th className="col">BookId </th>
                <th className="col">MemberId </th>
                <th className="col">IssueDate </th>
                <th className="col">DueDate </th>
                <th className="col">ReturnDate </th>
                <th className="col">IssuedStatus </th>
                <th className="col">Fine </th>
                <th className="col">Action </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(issues) && issues.length > 0 ? (
                issues.map((issues) => (
                  <tr key={issues.id}>
                    <td>{issues.id}</td>
                    <td>{issues.book.id}</td>
                    <td>{issues.member.id}</td>
                    <td>{issues.issueDate}</td>
                    <td>{issues.dueDate}</td>
                    <td>{issues.returnDate === null ? "not returned" : issues.returnDate}</td>
                    <td>{issues.issuedStatus}</td>
                    <td>{issues.fine}</td>
                    <td>
                      <button onClick={() => navigate(`${issues.id}/edit`)} className="btn btn-light ">Edit</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No books found</td>
                </tr>
              )}
            </tbody>
          </table></>
      ) : <NotAllowed />}
    </div>
  )
}

export default IssueHistory;
