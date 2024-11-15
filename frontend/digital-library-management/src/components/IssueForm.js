import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const IssueBook = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState("ISSUED");
    const [memberId, setMemberId] = useState(null);
    const [member, setMember] = useState(true);
    const navigate = useNavigate();

    const checkMemberId = async (memId) => {
        if (memId) {
            try {
                const response = await axios.get(`http://localhost:8080/members/${memId}`, { withCredentials: true });
                if (response.status === 200) {
                    return true;
                }
            } catch (err) {
                setMember(false);
                return false;
            }
        }
        return false;
    };
    const checkMemberExists = async (memberId) => {
        try {
            const response = await axios.get(`http://localhost:8080/books/${id}/issues/member/${memberId}`, { withCredentials: true });
            
            // Return true if member does not exist, i.e., data length is 0
            return response.data.length !== 0;
            
        } catch (err) {
            console.log("Something went wrong!", err);
            return true; // Returning true as a fallback in case of an error
        }
    };
    
    const updateQty = async (action) => {
        try {
            const response = await axios.put(`http://localhost:8080/books/${id}/quantity/${action}`, action, {
                withCredentials: true
            });
            if (response.status === 200) {
                console.log("Quantity changed");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidMember = await checkMemberId(memberId);
        const memberExists = await checkMemberExists(memberId);
        if (memberExists) {
            alert("Member already issued book!");
            return;
        }
        let date;
        if (booking === "CONFIRMED") {
            date = new Date(document.getElementById("bookingDate").value);
            const today = new Date();
            
            if (date < today) {
                alert("Date cannot be in the past!");
                return;
            }
        }
        if (!isValidMember) {
            alert("Please enter a valid Member ID.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/books/${id}/issues`, {
                book: { id },
                member: { id: memberId },
                issuedStatus: booking,
                issueDate: booking === "CONFIRMED" ? date : ""
            }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

            if (response.status === 201) {
                alert("Book issued successfully!");
                updateQty("decrease");
                navigate("/books");
            }
        } catch (error) {
            console.error("Error issuing the book:", error);
            alert("An error occurred while issuing the book.");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div className="col-md-6">
                <h2 className="text-center my-3">Issue Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="bookId" className="col-sm-4 col-form-label">BookId</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly disabled className="form-control-plaintext" id="bookId" value={id} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="memberId" className="col-sm-4 col-form-label">MemberId</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="memberId" placeholder="Enter Member Id" onChange={async (e) => {
                                setMemberId(e.target.value);
                                const isValid = await checkMemberId(e.target.value);
                                setMember(isValid);
                            }} />
                            <small className="form-text text-danger" id="username-prompt" style={{ display: member ? 'none' : 'block' }}>Enter a valid member id.</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="booking" className="col-sm-4 col-form-label">BookingType</label>
                        <div className="col-sm-8">
                            <select className="form-control" id="booking" name="issuedStatus" onChange={(e) => setBooking(e.target.value)}>
                                <option value={"ISSUED"}>Normal Booking</option>
                                <option value={"CONFIRMED"}>Advanced Booking</option>
                            </select>
                        </div>
                    </div>
                    {booking === "CONFIRMED" && (
                        <div className="form-group row">
                            <label htmlFor="bookingDate" className="col-sm-4 col-form-label">BookingDate</label>
                            <div className="col-sm-8">
                                <input id="bookingDate" className="form-control" type="date" name="issueDate" />
                            </div>
                        </div>
                    )}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IssueBook;
