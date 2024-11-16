import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMemberForm = () => {
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    validTill:""
  });
  const { id } = useParams();
  useEffect(() => {
    fetchMember(id);
  }, [id]);
  const fetchMember = (id) => {
    try {
      axios.get(`http://localhost:8080/members/${id}`, { withCredentials: true })
        .then((response) => {
          setMember(response.data);
      })
    } catch (err) {
      console.err("Something went wrong!", err);
    }
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/members/${id}/secure-endpoint`, member, {
        withCredentials: true
      });
      navigate("/members"); // Redirect to members list after successful addition
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={member.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={member.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={member.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={member.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="validTill" className="form-label">
            Valid Till
          </label>
          <input
            type="date"
            className="form-control"
            id="validTill"
            name="validTill"
            value={member.validTill}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Member
        </button>
      </form>
    </div>
  );
};

export default EditMemberForm;
