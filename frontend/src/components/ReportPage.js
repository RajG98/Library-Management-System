import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books/report/secure-endpoint`,{withCredentials:true})
        setReportData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Issue Report</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Fine</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report, index) => (
            <tr key={index}>
              <td>{report.title}</td>
              <td>{report.authorName}</td>
              <td>{new Date(report.issueDate).toLocaleDateString()}</td>
              <td>{new Date(report.dueDate).toLocaleDateString()}</td>
              <td>${report.fineAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
