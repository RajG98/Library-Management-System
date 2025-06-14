import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (input)
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books?search=${input}`, { withCredentials: true })
        .then((response) => setBooks(response.data)).catch((err) => console.error("Something went wrong", err));
    else fetchBooks();
  }
  useEffect(() => {

    handleSearch();
    const fetchCategories = async () => {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books/categories`, { withCredentials: true })
        .then((response) => setCategories(response.data)).catch((err) => console.error("Something went wrong", err));
    };
    fetchCategories();

  }, [input]);
  const fetchBooks = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/books`, {
        withCredentials: true
      })
      .then((response) => {
        // console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };
  const handleDetails = (bookId) => {
    navigate(`/books/${bookId}/details`);
  }
  const handleIssueBook = (bookId) => {
    navigate(`/books/${bookId}/issue`);
  }
  const handleCategoryChange = async (e) => {
    if (e.target.value !== "")
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books/categories/${e.target.value}`, { withCredentials: true })
        .then((response) => {
          setBooks(response.data);
        }).catch((err) => console.error("Something went wrong", err));
    else fetchBooks();
  }

  return (
    <div className="container-fluid">
      <div className=" d-flex justify-content-between my-3">
        <div className=" d-flex align-items-center justify-content-start flex-wrap">
          <h1 className="mb-0 ">Books List</h1>
          {user?.username === "admin" ? (
            <button onClick={() => navigate("add")} className="btn btn-success ms-lg-3 align-self-center ms-sm-1">AddBook</button>) : ""}
        </div>
        <div className="d-lg-flex align-items-center">
          <div className="d-flex me-lg-2">
            <label className="flex-grow-1 align-self-center me-md-2" htmlFor="category">Category</label>
            <select className="form-control form-control-sm flex-grow-1 align-self-center" name="category" id="category" defaultValue={""} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              {categories.map((category) => {
                return <option value={category} key={category}>{category}</option>
              })}
            </select>
          </div>
          <form className="d-flex align-items-center" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="col">Id </th>
            <th className="col">Title </th>
            <th className="col">Author </th>
            <th className="col">Genre </th>
            <th className="col">Price </th>
            <th className="col">PublicationYear </th>
            <th className="col">Quantity </th>
            <th className="col">Actions </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>{book.publicationYear}</td>
                <td>{book.quantity}</td>
                <td className="d-flex flex-wrap">
                  <button className="btn btn-success flex-grow-1" onClick={() => handleIssueBook(book.id)} style={{ flexBasis: "40%" }}
                    disabled={book.quantity === 0 ? true : false}>IssueBook</button>
                  <button className="btn btn-light flex-grow-1" onClick={() => handleDetails(book.id)} style={{ flexBasis: "40%" }}>Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
