import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    handleSearch();
  }, [input]);

  const fetchMembers = async () => {
    await axios
      .get("http://localhost:8080/members/secure-endpoint", {
        withCredentials: true
      })
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  };

  const handleDeleteMember = async (memberId) => {
    await axios
      .delete(`http://localhost:8080/members/${memberId}/secure-endpoint`, { withCredentials: true })
      .then(() => {
        fetchMembers(); // Refresh member list after deletion
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
      });
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (input)
      await axios
        .get(`http://localhost:8080/members/search?name=${input}`, { withCredentials: true })
        .then((response) => setMembers(response.data))
        .catch((err) => console.error("Something went wrong", err));
    else fetchMembers();
  };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex align-items-center justify-content-start flex-wrap">
          <h1 className="mb-0">Members List</h1>
          {user?.username === "admin" && (
            <button onClick={() => navigate("add")} className="btn btn-success ms-lg-3 align-self-center ms-sm-1">
              Add Member
            </button>
          )}
        </div>
        <form className="d-flex align-items-center" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="col">Id</th>
            <th className="col">Name</th>
            <th className="col">Email</th>
            <th className="col">Phone</th>
            <th className="col">CreatedAt</th>
            <th className="col">ValidTill</th>
            <th className="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.firstName + " " + member.lastName}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.createdAt}</td>
                <td>{member.validTill}</td>
                <td className="d-flex flex-wrap">

                  {user?.username === "admin" && (
                    <button
                      className="btn btn-light flex-grow-1"
                      onClick={() => navigate(`${member.id}/edit`)}
                      style={{ flexBasis: "40%" }}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="d-flex flex-wrap">

                  {user?.username === "admin" && (
                    <button
                      className="btn btn-danger flex-grow-1"
                      onClick={() => handleDeleteMember(member.id)}
                      style={{ flexBasis: "40%" }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No members found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
