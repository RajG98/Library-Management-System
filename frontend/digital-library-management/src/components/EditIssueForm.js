import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditIssueForm = () => {
    const { id, issueId } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState({
        id: "",
        issueDate: "",
        dueDate: "",
        issuedStatus: "",
        fine: "",
        returnDate:""
    });

    const status = ["ISSUED", "RETURNED", "PENDING", "CONFIRMED", "CANCELED"];

    useEffect(() => {
        const fetchIssueData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/books/${id}/issues/${issueId}`, { withCredentials: true });
                setIssue(response.data);
            } catch (err) {
                console.error("Something went wrong", err);
            }
        };
        fetchIssueData();
    }, [id, issueId]);

    const handleChange = (e) => {
        // console.log(issue)
        setIssue({ ...issue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(issue)
        try {
            const updatedIssue = { 
                ...issue, 
                returnDate: (issue.issuedStatus === "RETURNED" && !issue.returnDate) 
                    ? new Date().toISOString().slice(0, 10) 
                    : (issue.issuedStatus !== "RETURNED") 
                    ? "" 
                    : issue.returnDate 
            };
        
            // Make the PUT request
            const response = await axios.put(
                `http://localhost:8080/books/${issueId}/issues`,
                updatedIssue,
                { withCredentials: true }
            )
                .then((response)=>console.log(response.data));
            alert("Issue updated successfully!");
            navigate(`/books/${id}/details/issueHistory`); 
        } catch (error) {
            console.error("Error updating the issue:", error);
            alert("An error occurred while updating the issue.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Issue</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="id">Issue Id</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={issue.id}
                        readOnly
                        disabled
                        className="form-control-plaintext"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="issueDate">Issue Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="issueDate"
                        name="issueDate"
                        value={issue.issueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="dueDate"
                        value={issue.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="issuedStatus">Status</label>
                    <select
                        name="issuedStatus"
                        id="issuedStatus"
                        className="form-control"
                        value={issue.issuedStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Status</option>
                        {status.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                                {statusOption}
                            </option>
                        ))}
                    </select>
                </div>
                {issue.issuedStatus==="RETURNED"?<div className="form-group mb-3">
                    <label htmlFor="returnDate">Return Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="returnDate"
                        name="returnDate"
                        value={issue.returnDate ? issue.returnDate : new Date().toISOString().slice(0, 10)}
                        onChange={handleChange}
                        required
                    />
                </div>:""}
                <div className="form-group mb-3">
                    <label htmlFor="fine">Fine</label>
                    <input
                        type="number"
                        className="form-control"
                        id="fine"
                        name="fine"
                        value={issue.fine}
                        onChange={handleChange}
                        placeholder="Enter fine amount"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Issue</button>
            </form>
        </div>
    );
};

export default EditIssueForm;
